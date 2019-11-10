import { Db, MongoClient } from 'mongodb';

export let database: Db;

export async function connectMongoDbAsync(
  url: string,
  databaseName: string
): Promise<void> {
  const mongoClient = await MongoClient.connect(url, {
    useUnifiedTopology: true,
  });

  database = mongoClient.db(databaseName);

  // TODO: Handle graceful shutdown.
}
