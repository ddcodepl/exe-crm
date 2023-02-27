import {User} from "@/types/users";

export interface TableKey {
    key: keyof User,
    label: string
}