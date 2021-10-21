import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePet1624233778069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pet",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name:"name",
                        type:"varchar"
                    },
                    {
                        name:"breed",
                        type:"varchar"
                    },
                    {
                        name: "species_id",
                        type: "int"
                    },
                    {
                        name: "birth_date",
                        type: "timestamp"
                    },
                    {
                        name: "gender",
                        type: "boolean"
                    },
                    {
                        name: "photo_url",
                        type: "varchar"
                    },
                    {
                        name: "join_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "description",
                        type: "varchar"
                    },
                    {
                        name: "owner_id",
                        type: "int"
                    }
                ],
                foreignKeys:[
                    {
                        name: "user_pet",
                        referencedTableName: "user",
                        referencedColumnNames: ["id"],
                        columnNames:["owner_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "category_pet",
                        referencedTableName: "category",
                        referencedColumnNames: ["id"],
                        columnNames:["category_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('pet');     
    }

}
