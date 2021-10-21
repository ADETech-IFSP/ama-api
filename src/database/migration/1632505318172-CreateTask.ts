import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTask1632505318172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "task",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "task",
                        type: "varchar"
                    },
                    {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "color",
                        type: "varchar"
                    },
                    {
                        name: "icon",
                        type: "int"
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "pet_id",
                        type: "int"
                    },
                    {
                        name: "user_id",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        name: "pet_task",
                        referencedTableName: "id",
                        referencedColumnNames: ["pet"],
                        columnNames: ["pet_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "user_task",
                        referencedTableName: "id",
                        referencedColumnNames: ["user"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('task');
    }

}
