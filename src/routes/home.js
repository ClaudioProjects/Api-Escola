import { Router } from 'express';
import homecontroller from '../controllers/HomeController';

const router = new Router();

router.get('/', homecontroller.index);

export default router;
