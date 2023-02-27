import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./users.dto";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @Get()
    async getAllUsers() {
        try {
            return this.usersService.getAllUsers();
        } catch (e) {
            return e;
        }
    }

    @Get('seed')
    async seedUsers() {
        try {
            return this.usersService.seedUsers();
        } catch (e) {
            return e;
        }
    }

    /**
     * Get user by id
     */
    @Get(':id')
    async getUserById(@Param('id') id: string) {
        console.log(id);
        try {
            return this.usersService.getUserById(id);
        } catch (e) {
            return e;
        }
    }

    /**
     * Create user
     */
    @Post('create')
    async createUser(@Body() user: CreateUserDto) {
        try {
            return this.usersService.createUser(user);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Update user
     */
    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() user: CreateUserDto) {
        try {
            return this.usersService.updateUser(id, user);
        } catch (e) {
            return e;
        }
    }

    /**
     * Delete user
     */
    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        try {
            return this.usersService.deleteUser(id);
        } catch (e) {
            return e;
        }
    }
}
