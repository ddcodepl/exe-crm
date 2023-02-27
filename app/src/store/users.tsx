import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppDispatch, RootState} from "@/store";
import {User} from "@/types/users"

type Status = 'idle' | 'loading' | 'succeeded' | 'failed'
type SortDirection = 'asc' | 'desc' | undefined

interface UsersState {
    users: User[]
    user: User | undefined | null
    sort: {
        [key in keyof User]?: SortDirection
    }
    status: Status,
    error: string | null
}

const initialState: UsersState = {
    users: [],
    user: undefined,
    sort: {},
    status: 'idle',
    error: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state) => {
            state.status = 'loading'
        },
        getUsersSuccess: (state, action: PayloadAction<User[]>) => {
            state.status = 'succeeded'
            state.users = state.users = action.payload
        },
        getUsersError: (state, action: PayloadAction<string>) => {
            state.status = 'failed'
            state.error = action.payload
        },
        sortUsers: (state, action: PayloadAction<{ key: keyof User }>) => {
            const {key} = action.payload
            const value = state.sort[key] === undefined ? 'asc' : state.sort[key] === 'asc' ? 'desc' : 'asc'

            state.sort[key] = value
            state.users = state.users.sort((a, b) => {
                if (value === 'asc') {
                    return a[key] > b[key] ? 1 : -1
                } else {
                    return a[key] < b[key] ? 1 : -1
                }
            })
        },
        getUser: (state, action: PayloadAction<{ user: User | undefined }>) => {
            state.status = 'loading'
        },
        getUserSuccess: (state, action: PayloadAction<{ user: User }>) => {
            state.status = 'succeeded'
            state.user = action.payload.user
        },
        getUserError: (state, action: PayloadAction<string>) => {
            state.status = 'failed'
            state.error = action.payload
        },
        removeUser(state, action: PayloadAction<{ id: string }>) {
            state.users = state.users.filter(user => user._id !== action.payload.id)
            state.user = undefined
        },
        setUser(state, action: PayloadAction<{ user: User }>) {
            state.user = action.payload.user
        },
        resetUser(state) {
            state.user = undefined
        }
    },
})

export const {
    getUsers,
    getUsersSuccess,
    getUsersError,
    sortUsers,
    getUser,
    getUserSuccess,
    removeUser,
    setUser
} = usersSlice.actions

export default usersSlice.reducer