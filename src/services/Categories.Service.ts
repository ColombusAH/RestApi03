import Category from '../models/categoriesModel';
import uuidv1 from 'uuid/v1';
import requirePromise from 'request-promise';
import productService from './Products.Service';

const categories = new Array() as Category[];

const categoryService = {
  /**
   * @returns -return categories array;
   */
  getCategories: async () => {
    try {
      let ctp;
      if (categories.length === 0) {
        ctp = await requirePromise.get(
          'http://localhost:3000/static/categories.json',
          { json: true }
        );

        if (!ctp) {
          throw new Error('Unable to get data ');
        }
        categories.push(...ctp);
      }
      return Promise.resolve(categories);
    } catch (error) {
      throw error;
    }
  },
  getCategoryProducts: async (id: string) => {
    const products = await productService.getProducts();
    const productByCategoryId = products.filter(
      p => p.categoryId.localeCompare(id) == 0
    );
    return Promise.resolve(productByCategoryId);
  },

  /**
   * @returns -returns the category by id  or undifined if not found.
   * @param id: the id of the category
   */
  findCategoryById: async (id: string) => {
    const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
    const category = categories[index];
    return Promise.resolve(category);
  },

  /**
   * @returns -add category and returns the new added category
   * @param newCategory: the new category to add
   */
  addCategory: async (newCategory: Category) => {
    newCategory.id = uuidv1();
    categories.push(newCategory);
    return Promise.resolve(newCategory);
  },

  /**
   * @returns -update a category
   * @param id: the id of category to update
   * @param updatedCategory: the Category info
   */
  updateCategory: async (id: string, updatedCategory: Category) => {
    const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
    if (index !== -1) {
      categories[index] = updatedCategory;
      return Promise.resolve(updatedCategory);
    } else {
      return Promise.resolve(undefined);
    }
  },

  /**
   * @returns -true if removed , false else.
   * @param id: the id of category to remove
   *
   */
  removeCategory: async (id: string) => {
    const index = categories.findIndex(c => c.id.localeCompare(id) === 0);
    if (index !== -1) {
      categories.splice(index, 1);
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
};

export default categoryService;
