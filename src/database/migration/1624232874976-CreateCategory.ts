import {Column, MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategory1624232874976 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "category",
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
                       name: "description",
                       type: "varchar"
                   },
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('category');
    }

}
