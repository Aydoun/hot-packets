import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../../openapi.json';
import PacketRouter from './packets';
import AuthRouter from './auth';
import UserRouter from './users';

const router = Router();

router.use('/packets', PacketRouter);
router.use('/auth', AuthRouter);
router.use('/user', UserRouter);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get(
    '/dev/api-docs',
    swaggerUi.setup(apiSpec, {
      customCss: '.swagger-ui .topbar { display: none }',
    }),
  );
}

export default router;
