import {
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    @ApiProperty({ format: 'uuid' })
    id: string;

    @CreateDateColumn({ name: 'created_at' })
    @IsDate()
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    @IsDate()
    updatedAt: Date;
}
