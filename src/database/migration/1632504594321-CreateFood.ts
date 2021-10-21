import {MigrationInterface, QueryRunner, Table} from "typeorm";
import { isDate } from "util";

export class CreateFood1632504594321 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "food",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "pet_id",
                        type: "int"
                    }
                ],
                foreignKeys:[
                    {
                        name: "pet_food",
                        referencedTableName: "pet",
                        referencedColumnNames: ["id"],
                        columnNames: ["pet_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('food');
    }

}
