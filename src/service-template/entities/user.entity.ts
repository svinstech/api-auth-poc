import { BaseEntity } from "./base_entity.entity";
import { Column, Entity } from "typeorm";

@Entity({name: "users"})
export class User  extends BaseEntity{

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
