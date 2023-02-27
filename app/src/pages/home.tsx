import Head from "next/head";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {User} from "@/types/users";
import {useRouter} from "next/router";
import {MainView, HorizontalOverlay} from "@/components/MainView";
import {AddButton, DeleteButton, EditButton} from "@/components/Button";
import DeleteBox from "@/components/DeleteBox";
import {TableKey} from "@/types/table";
import Loader from "@/components/Loader";
import {Table} from "@/components/Table";
import {apiUrl} from "@/utils/api";

const Index = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: any) => state.users.users);
    const user = useSelector((state: any) => state.users.user);

    const loading = useSelector((state: any) => state.users.loading);
    const error = useSelector((state: any) => state.users.error);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            dispatch({
                type: 'users/resetUser'
            }) // it's here because I want to reset user when I go back to home page, like click back button in browser
        }
        fetchUsers()
    }, [])

    const fetchUsers = async() => {
        dispatch({
            type: 'users/getUsers'
        })

        return fetch(`${apiUrl}/users`).then((res) => res.json()).then((data) => {
            dispatch({
                type: 'users/getUsersSuccess',
                payload: data
            })
        }).catch((err) => {
            dispatch({
                type: 'users/getUsersError',
                payload: err
            })
        })
    }

    const handleSort = (key: string) => () => {
        dispatch({type: 'users/sortUsers', payload: {key}})
    }

    const handleAdd = () => {
        router.push('/add')
    }

    const handleEdit = (id: string) => {
        router.push(`/edit/${id}`)
    }

    const handleDelete = (user: User) => {
        dispatch({
            type: 'users/setUser',
            payload: {user}
        })
    }

    const tableKeys: TableKey[] = [
        {key: 'name', label: 'Name'},
        {key: 'username', label: 'Username'},
        {key: 'email', label: 'E-mail'},
        {key: 'city', label: 'City'},
    ] // if I would use i18n this could be driven only by keys

    if (loading) return (
        <MainView>
            <Loader/>
        </MainView>
    )

    if (error) return <h1>{error}</h1>

    return (
        <>
            <Head>
                <title>ProExe CRM | Home</title>
                <meta name="description" content="ProExe CRM"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            {
                (user && user._id) && (
                    <DeleteBox user={user}/>
                )
            }
            <MainView>
                <AddButton onClick={handleAdd}>Add new user</AddButton>
                <HorizontalOverlay>
                    {
                        users && users.length > 0 && (
                            <Table>
                                <Table.Head>
                                    <Table.TR>
                                        {tableKeys.map((key) => (
                                            <Table.TH key={key.key} onClick={handleSort(key.key)}>{key.label}</Table.TH>
                                        ))}
                                        <Table.TH>Actions</Table.TH>
                                    </Table.TR>
                                </Table.Head>
                                <Table.Body>
                                    {users.map((user: User) => (
                                        <Table.TR key={user._id}>
                                            {
                                                tableKeys.map((key) => (
                                                    <Table.TD key={`${user._id}-${key.key}`}>{user[key.key]}</Table.TD>
                                                ))
                                            }
                                            <Table.TDActions>
                                                <EditButton onClick={() => {
                                                    handleEdit(user._id)
                                                }}>Edit</EditButton>
                                                <DeleteButton onClick={() => {
                                                    handleDelete(user)
                                                }}>Delete</DeleteButton>
                                            </Table.TDActions>
                                        </Table.TR>
                                    ))}
                                </Table.Body>
                            </Table>
                        ) || (
                            <h1>No users found</h1>
                        )
                    }
                </HorizontalOverlay>
            </MainView>
        </>
    )
}

export default Index