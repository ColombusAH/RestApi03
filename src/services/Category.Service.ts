import Category from "../models/categoriesModel";
import uuidv1 from "uuid/v1";
import requirePromise from "request-promise";
import ProductService from "./Product.Service";

export default class CategoryService {
  static productService = new ProductService();

  constructor(private _categories: Category[] = new Array() as Category[]) {}

  /**
   * @returns -return categories array;
   */
  public getCategories: () => Promise<Category[]> = async () => {
    try {
      let categories = [];
      if (this._categories.length === 0) {
        categories = await requirePromise.get(
          "http://localhost:3000/static/categories.json",
          { json: true }
        );

        if (!categories) {
          throw new Error("Unable to get data ");
        }
      }
      this._categories.push(...categories);
      return Promise.resolve(this._categories);
    } catch (error) {
      throw error;
    }
  };

  public getCategoryProducts: (
    id: string
  ) => Promise<Category[]> = async id => {
    const products = await CategoryService.productService.getProducts();
    const productByCategoryId = products.filter(
      p => p.categoryId.localeCompare(id) == 0
    );
    return Promise.resolve(productByCategoryId);
  };

  /**
   * @returns -returns the category by id  or undifined if not found.
   * @param id: the id of the category
   */
  public findCategoryById: (
    id: string
  ) => Promise<Category | undefined> = async id => {
    const index = this._categories.findIndex(c => c.id.localeCompare(id) === 0);
    const category = this._categories[index];
    return Promise.resolve(category);
  };

  /**
   * @returns -add category and returns the new added category
   * @param newCategory: the new category to add
   */
  public addCategory: (
    newCategory: Category
  ) => Promise<Category> = async newCategory => {
    newCategory.id = uuidv1();
    this._categories.push(newCategory);
    return Promise.resolve(newCategory);
  };

  /**
   * @returns -update a category
   * @param id: the id of category to update
   * @param updatedCategory: the Category info
   */
  public updateCategory: (
    id: string,
    updatedCategory: Category
  ) => Promise<Category | undefined> = async (id, updatedCategory) => {
    const index = this._categories.findIndex(c => c.id.localeCompare(id) === 0);
    if (index !== -1) {
      this._categories[index] = updatedCategory;
      return Promise.resolve(updatedCategory);
    } else {
      return Promise.resolve(undefined);
    }
  };

  /**
   * @returns -true if removed , false else.
   * @param id: the id of category to remove
   *
   */
  public removeCategory: (id: string) => Promise<boolean> = async id => {
    const index = this._categories.findIndex(c => c.id.localeCompare(id) === 0);
    if (index !== -1) {
      this._categories.splice(index, 1);
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  };
}
