import * as cors from 'cors';
import routes from './routes';
import * as express from 'express';
import config from './config/config';
import * as bodyParser from 'body-parser';
import * as errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFoundError);

app.listen(config.app.port, () => {
  console.log(`Listening on port ${config.app.baseUrl}`);
});

export default app;
