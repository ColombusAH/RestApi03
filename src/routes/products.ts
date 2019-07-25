import { Router } from "express";
import {
  validateNameLength,
  validateIdLength
} from "../middlewares/validatesMiddlewares";
import productController from "../controllers/ProductsController";

const router = Router();

router
  .route("/")
  .get(productController.findAll)
  .post(validateNameLength, productController.create);

router
  .route("/:id")
  .get(validateIdLength, productController.findById)
  .put(validateIdLength, validateNameLength, productController.update)
  .delete(validateIdLength, productController.remove);
export default router;
