import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBreed1632264663167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "breed",
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
                    {
                        name: "species_id",
                        type: "int"
                    }
                ],
                foreignKeys: [
                    {
                        name: "species_breed",
                        referencedTableName: "species",
                        referencedColumnNames: ["id"],
                        columnNames: ["species_id"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('breed');
    }
}
