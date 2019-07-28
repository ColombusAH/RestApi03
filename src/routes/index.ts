import { Router } from 'express';
import productsRoutes from './products';
import categoriesRoute from './categories';
const router = Router();

router.use('/products', productsRoutes);
router.use('/categories', categoriesRoute);
export default router;
