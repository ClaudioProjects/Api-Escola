import { Router } from 'express';
import usercontroller from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', usercontroller.store);
router.get('/', usercontroller.index);

router.get('/:id', usercontroller.show);
router.put('/', loginRequired, usercontroller.update);
router.delete('/', loginRequired, usercontroller.delete);

export default router;
