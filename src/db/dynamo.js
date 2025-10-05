import { DynamoDBClient, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { randomUUID } from 'node:crypto';

const region = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
const tableName = process.env.DYNAMO_TABLE || 'todos';
const ddb = new DynamoDBClient({ region });

export default {
  async list () {
    const cmd = new ScanCommand({ TableName: tableName });
    const out = await ddb.send(cmd);
    const items = (out.Items || []).map(i => ({
      id: i.id.S,
      title: i.title.S,
      done: i.done.BOOL
    }));
    return items;
  },
  async create ({ title, done = false }) {
    const id = randomUUID();
    const cmd = new PutItemCommand({
      TableName: tableName,
      Item: {
        id: { S: id },
        title: { S: title },
        done: { BOOL: Boolean(done) }
      }
    });
    await ddb.send(cmd);
    return { id, title, done: Boolean(done) };
  }
};
