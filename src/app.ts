import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import { ApplicationError } from './errors';
import TokenCheck from './middleware/token-middleware';
import routes from './routes';

const app = express();
const apiPrefix = '/api/v1';

app.use(
  TokenCheck.unless({
    path: [
      apiPrefix + '/auth/register',
      apiPrefix + '/auth/login',
      /\/dev\/api-docs/i,
      /\/public/i,
    ],
  }),
);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.use(
  '/public',
  express.static('public', {
    maxAge: 31557600000,
  }),
);
app.use(apiPrefix, routes);

app.use(
  (err: ApplicationError, _: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(err);
    }

    return res.status(err.status || 500).json({
      error: process.env.NODE_ENV === 'development' ? err : undefined,
      message: err.message,
    });
  },
);

export default app;
