import { router } from 'express';

import todoRouter from './todo/router.js';

router.use('/todos', todoRouter);

export default todoRouter;
