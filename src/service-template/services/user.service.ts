import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from "../entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUserDto } from "../dtos/create-user.dto";
import { UpdateUserDto } from "../dtos/update-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.save(createUserDto);
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userRepository.save({ id: id, ...updateUserDto });
    }

    async remove(id: string): Promise<User|null> {
        const user: User = await this.userRepository.findOneOrFail(id);
        const result: DeleteResult = await this.userRepository.delete(id);
        return result.affected ? user : null;
    }

    async find(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id);

        if (!user) {
            throw new NotFoundException;
        }
        return user;

    }
}
