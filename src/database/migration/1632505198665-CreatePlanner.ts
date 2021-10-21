import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePlanner1632505198665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "planner",
                columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "to_do",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "state",
                    type: "int"
                },
                {
                    name: "task_id",
                    type: "int"
                }  
                ],
                foreignKeys: [
                    {
                        name: "task_planner",
                        referencedTableName: "id",
                        referencedColumnNames: ["task"],
                        columnNames: ["task_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('planner');
    }

}
