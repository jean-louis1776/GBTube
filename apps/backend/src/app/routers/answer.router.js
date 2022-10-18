import { Router } from 'express';

const router = new Router();

router.post('/', /*create()*/);
router.put('/', /*edit()*/);
router.get('/:id', /*getById*/ );
router.get('/', /*getAll*/ );
router.delete('/:id', /*removeById*/)

export default router;

