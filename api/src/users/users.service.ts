import { Injectable } from '@nestjs/common';
import {User, UserDocument} from "../schemas/user.schema";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import users from "../seeds/users.seed";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) {
    }

    async seedUsers() {
        const usersCount = await this.userModel.countDocuments();

        if (usersCount === 0) {
            return this.userModel.insertMany(users)
        } else {
            throw new Error('Users already seeded');
        }
    }

    async getAllUsers() {
        return this.userModel.find({
            deletedAt: null,
        });
    }

    async getUserById(id: string){
        const user = await this.userModel.findOne({
            _id: id,
            deletedAt: null,
        })

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    async createUser(user: User) {
        const userExists = await this.userModel.findOne({
            $or: [
                { username: user.username },
                { email: user.email },
            ],
        });

        if (userExists) {
            throw new Error('User already exists');
        }

        return this.userModel.create(user);
    }

    async updateUser(id: string, user: User) {
        const userToUpdate = await this.userModel.findById(id);

        if (!userToUpdate) {
            throw new Error('User not found');
        }

        return this.userModel.findByIdAndUpdate(id, user);
    }

    async deleteUser(id: string) {
        const user = await this.userModel.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        user.deletedAt = new Date();

        return this.userModel.findByIdAndUpdate(id, user);
    }
}
