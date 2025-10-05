import memory from './memory.js';
let impl = memory;

if (String(process.env.USE_DYNAMO).toLowerCase() === 'true') {
  const { default: dynamo } = await import('./dynamo.js');
  impl = dynamo;
}

export default impl;
