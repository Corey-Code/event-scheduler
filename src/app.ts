import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Scheduler is up and running on port ${port}`);
});

// export for jest
export default app;
