import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();    

    return createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "amabeta",
        synchronize: true,
        logging: false,
        entities: [
            "src/entity/**/*.ts"
        ],
        migrations: [
            "src/database/migration/**/*.ts"
        ],
        cli: {
            "entitiesDir": "src/entity",
            "migrationsDir": "src/database/migration"
        }
    });
}