import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVotes1632505285210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "votes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "vote",
                        type: "int"
                    },
                    {
                        name: "user_id",
                        type: "int"
                    },
                    {
                        name: "question_id",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        name: "user_votes",
                        referencedTableName: "id",
                        referencedColumnNames: ["user"],
                        columnNames: ["user_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    },
                    {
                        name: "question_votes",
                        referencedTableName: "id",
                        referencedColumnNames: ["question"],
                        columnNames: ["question_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('votes');
    }

}
