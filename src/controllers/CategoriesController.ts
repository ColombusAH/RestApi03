import categoryService from '../services/Categories.Service';
import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors';

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categoryService.getCategories();
    res.status(OK).send(categories);
  } catch (error) {
    next(error);
  }
}

async function getProductsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await categoryService.getCategoryProducts(req.params.id);
    if (products.length !== 0) {
      return res.status(OK).send(products);
    } else {
      throw new NotFoundError('No products with such category id');
    }
  } catch (error) {
    next(error);
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await categoryService.findCategoryById(req.params.id);
    if (category) {
      return res.status(OK).send(category);
    } else {
      throw new NotFoundError('No category with this id');
    }
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newCategory = await categoryService.addCategory(req.body);
    res.status(CREATED).send(newCategory);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    if (updatedCategory) return res.status(OK).send(updatedCategory);
    else throw new NotFoundError('no such Category');
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const removed = await categoryService.removeCategory(req.params.id);
    if (removed == true) {
      res.status(NO_CONTENT).send('Category removed');
    } else {
      throw new NotFoundError('Category not found');
    }
  } catch (error) {
    next(error);
  }
}

const categoryController = {
  findAll,
  create,
  findById,
  update,
  remove,
  getProductsById
};

export default categoryController;
