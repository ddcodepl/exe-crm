import {DeleteButton, EditButton} from "@/components/Button";
import {User} from "@/types/users";
import {useDispatch} from "react-redux";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
`

const Modal = styled.div`
  width: 400px;
  height: 200px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const DeleteBox = (props: { user: User }) => {
    const dispatch = useDispatch()
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const handleCancel = () => {
        dispatch({
            type: 'users/setUser',
            payload: {user: null}
        })
    }

    const handleDelete = (id: string) => {
        return fetch(`${apiUrl}/users/${id}`, {
            method: 'DELETE'
        }).then(() => {
            dispatch({
                type: 'users/removeUser',
                payload: {id}
            })
        })
    }

    return (
        <ModalOverlay>
            <Modal>
                <h2>Are you sure you want to delete this user?</h2>
                <p>{props.user.name}</p>
                <Row>
                    <EditButton onClick={() => {
                        handleCancel()
                    }}>Cancel</EditButton>
                    <DeleteButton onClick={() => {
                        handleDelete(props.user._id)
                    }}>Delete</DeleteButton>
                </Row>
            </Modal>
        </ModalOverlay>
    );
};

export default DeleteBox;