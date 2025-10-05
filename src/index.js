import app from './server.js';

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const payload = {
    msg: 'server_started',
    port: Number(PORT),
    env: process.env.NODE_ENV || 'development',
    git_sha: process.env.GIT_SHA || 'local-dev'
  };
  console.log(JSON.stringify(payload));
});
