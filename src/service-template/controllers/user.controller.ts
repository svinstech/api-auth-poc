import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";
import { ApiInternalServerErrorResponse, ApiNotFoundResponse } from "@nestjs/swagger";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {

    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/')
    public async getPolicies(): Promise<User[]> {
        return await this.userService.find();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:user_id')
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    public async getUser(@Param('user_id') userId: string): Promise<User> {
        return await this.userService.findOne(userId);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Put(':id')
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    @ApiNotFoundResponse()
    @ApiInternalServerErrorResponse()
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
