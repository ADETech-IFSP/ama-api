import { networkInterfaces, type } from "os";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAuth1624233407785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
            await queryRunner.createTable(
                new Table({
                    name: "auth",
                    columns: [
                        {
                           name: "id",
                            type: "int",
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: "increment"
                        },
                        {
                            name : "user_id",
                            type : "int"
                        },
                        
                        {
                            name: "token",
                            type: "varchar"
                        },
                        {
                            name: "created_date",
                            type: "timestamp",
                            default: "now()"
                        },
                        {
                            name: "expira_date",
                            type: "timestamp"
                        },   
                    ],
                    foreignKeys: [
                        {
                            name: "user_auth",
                            referencedTableName: "user",
                            referencedColumnNames: ["id"],
                            columnNames: ["user_id"],
                            onDelete: "CASCADE",
                            onUpdate: "CASCADE"
                        }
                           ] 
                })
            );
        }
    
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('auth');
        }
    }

   


