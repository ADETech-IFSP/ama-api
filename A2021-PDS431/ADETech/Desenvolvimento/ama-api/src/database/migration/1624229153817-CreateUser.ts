import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1624229153817 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "user",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "last_name",
                        type: "varchar"
                    },
                    {
                        name: "birth_date",
                        type: "timestamp"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "telephone",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "photo_url",
                        type: "varchar"
                    },
                    {
                        name: "gender",
                        type: "int"
                    },
                    {
                        name: "join_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "confirm_code",
                        type: "varchar"
                    },
                    {
                        name: "verified",
                        type: "tinyint"
                    },
                    {
                        name: "user_type",
                        type: "int"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
