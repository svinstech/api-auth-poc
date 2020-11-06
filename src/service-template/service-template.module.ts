import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";

import { TypeOrmConfigService } from "./services/type-orm-config.service";
import { User } from "./entities/user.entity";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [TypeOrmConfigService, UserService]
})
export class ServiceTemplateModule {
}
