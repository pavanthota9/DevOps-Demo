import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import client from 'prom-client';
import healthRouter from './routes/health.js';
import todosRouter from './routes/todos.js';

const app = express();
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics();

const httpRequestDurationMs = new client.Histogram({
  name: 'http_request_duration_ms',
  help: 'HTTP request duration in ms',
  labelNames: ['method', 'route', 'code'],
  buckets: [5, 15, 50, 100, 300, 1000]
});

app.use(pinoHttp({ logger }));
app.use(express.json());

app.use((req, res, next) => {
  const end = httpRequestDurationMs.startTimer();
  res.on('finish', () => {
    const route = req.route?.path || req.path;
    end({ method: req.method, route, code: res.statusCode });
  });
  next();
});

app.use('/healthz', healthRouter);
app.use('/api/v1/todos', todosRouter);

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

export default app;
