import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
        type: String,
    })
    readonly name: string;
    @ApiProperty({
        description: 'The username of the user',
        example: 'johndoe',
        type: String,
    })
    readonly username: string;
    @ApiProperty({
        description: 'The email of the user',
        example: 'joe.doe@gmail.com',
        type: String,
    })
    readonly email: string;
    @ApiProperty({
        description: 'The city of the user',
        example: 'New York',
        type: String,
    })
    readonly city: string;
}