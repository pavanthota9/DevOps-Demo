import { randomUUID } from 'node:crypto';

const store = [];

export default {
  async list () {
    return store;
  },
  async create ({ title, done = false }) {
    const id = randomUUID();
    const item = { id, title, done: Boolean(done) };
    store.push(item);
    return item;
  }
};
