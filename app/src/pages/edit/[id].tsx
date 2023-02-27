import Head from "next/head";
import {MainView} from "@/components/MainView";
import {useForm} from "react-hook-form";
import {useRouter} from "next/router";
import {CancelButton, SubmitButton} from "@/components/Button";
import {Form, Input, Label, Span, Error} from "@/components/Form";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {emailRegex} from "@/utils/forms";
import {FormValues} from "@/types/forms";
import Loader from "@/components/Loader";
import Row from "@/components/Row";
import {apiUrl} from "@/utils/api";

const EditUser = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.users.user);
    const loading = useSelector((state: any) => state.users.loading);
    const error = useSelector((state: any) => state.users.error);

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        values: user
    });

    const {id} = router.query;

    useEffect(() => {
        fetchUser()
    }, [id])

    const fetchUser = async() => {
        dispatch({type: 'users/getUser'})
        const url = `${apiUrl}/users/${id}`

        return fetch(url).then((res) => res.json()).then((data) => {
            if (data.statusCode === 500) {
                router.push('/404')
            }
            dispatch({type: 'users/getUserSuccess', payload: {user: data}})
        }).catch((err) => {
            dispatch({type: 'users/getUserError', payload: {error: err}})
        })
    }

    const handleCancel = () => {
        dispatch({
            type: 'users/resetUser'
        })
        router.push('/home')
    }

    const onSubmit = (data: FormValues) => {
        fetch(`${apiUrl}/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then(async(data) => {
                if (data.statusCode === 500) {
                    alert(data.message)
                } else {
                    dispatch({
                        type: 'users/resetUser'
                    })
                    router.push('/home')
                }
            })
            .catch((err) => alert(err));
    }

    if (loading) return (
        <MainView>
            <Loader />
        </MainView>
    )

    if (error) return <h1>{error}</h1>

    return (
        <>
            <Head>
                <title>ProExe CRM | Edit user</title>
                <meta name="description" content="ProExe Edit user"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <meta name="robots" content="noindex"/>
            </Head>
            <main>
                <MainView>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Label>
                            <Span>Name:</Span>
                            <Input {...register("name", {required: true})} />
                            {errors.name && <Error>This field is required</Error>}
                        </Label>

                        <Label>
                            <Span>Username:</Span>
                            <Input {...register("username", {required: true})} />
                            {errors.username && <Error>This field is required</Error>}
                        </Label>

                        <Label>
                            <Span>Email:</Span>
                            <Input {...register("email", {
                                required: true,
                                pattern: emailRegex
                            })} />
                            {errors.email && <Error>Please enter a valid email</Error>}
                        </Label>

                        <Label>
                            <Span>City:</Span>
                            <Input {...register("city", {required: true})} />
                            {errors.city && <Error>This field is required</Error>}
                        </Label>

                        <Row>
                            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                            <SubmitButton type="submit">Submit</SubmitButton>
                        </Row>
                    </Form>
                </MainView>
            </main>
        </>
    );
};

export default EditUser;
