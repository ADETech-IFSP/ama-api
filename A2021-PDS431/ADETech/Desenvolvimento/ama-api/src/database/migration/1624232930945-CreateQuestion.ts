import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateQuestion1624232930945 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "question",
                columns: [
                    {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"   
                },
                {
                    name: "title",
                    type: "varchar"
                },
                {
                    name: "question",
                    type: "varchar"
                },
                {
                    name: "vote_down",
                    type: "int"
                },
                {
                    name: "vote_up",
                    type: "int"
                },
                {
                    name: "state",
                    type: "int"
                },
                {
                    name: "created_date",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "closed_date",
                    type: "timestamp"
                },
                {
                    name: "question_owner",
                    type: "int"
                }
            ],
            foreignKeys: [
                {
                    name: "user_question",
                    referencedTableName: "user",
                    referencedColumnNames: ["id"],
                    columnNames: ["question_owner"],
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE"
                }
            ]
        })
    );
}
        public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('question');
}
}