import express from 'express';

const app = express();
const port = 3000;

// TODO: create, import db and scheduler

app.listen(port, () => {
  console.log(`Scheduler is up and running on port ${port}`);
});
