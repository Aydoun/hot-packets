import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../../openapi.json';
import PacketRouter from './packets';
import AuthRouter from './auth';
import UserRouter from './users';
import FileRouter from './files';

const router = Router();

const swaggerOptions = {
  authAction: {
    JWT: {
      name: 'x-api-key',
      schema: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
        description: '',
      },
      value: 'Bearer lala',
    },
  },
  customCss: '.swagger-ui .topbar { display: none }',
};

router.use('/packets', PacketRouter);
router.use('/auth', AuthRouter);
router.use('/user', UserRouter);
router.use('/file', FileRouter);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerOptions));
}

export default router;
