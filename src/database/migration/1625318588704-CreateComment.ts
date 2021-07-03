import { type } from "os";
import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateComment1625318588704 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await  queryRunner.createTable(
            new Table({
                name : "comment",
                columns : [
                    {
                        name: "id",
                        type:"int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy : "increment"
                    },
                    {
                        name :"user_id",
                        type : "int"
                    },
                    {
                        name : "comment",
                        type : "varchar"
                    },
                    { 
                        name : "is_solution",
                        type : "tinyint"
                    },
                    {
                        name: "question_id",
                        type : "int"
                    }

                ],
                foreignKeys:[
                    {
                        name: "user_comment",
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        columnNames:["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "question_pet",
                        referencedTableName: "question",
                        referencedColumnNames: ["id"],
                        columnNames:["question_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comment')
    }

}
