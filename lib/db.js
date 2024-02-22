import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://kkarapetyan2012:ycfilyZSzh7OmS0d@cluster0.d7vdnyd.mongodb.net/auth-demo?retryWrites=true&w=majority'
  );

  return client;
}