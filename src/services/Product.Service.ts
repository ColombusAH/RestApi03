import Product from "../models/productModel";
import uuidv1 from "uuid/v1";
import requirePromise from "request-promise";

export default class ProductService {
  constructor(private _products: Product[] = [] as Product[]) {}

  /**
   * @returns -return products array;
   */
  public getProducts: () => Promise<Product[]> = async () => {
    try {
      let products = [];
      if (this._products.length === 0) {
        products = await requirePromise.get(
          "http://localhost:3000/static/categories.json",
          { json: true }
        );

        if (!products) {
          throw new Error("Unable to get data ");
        }
      }
      this._products.push(...products);
      return Promise.resolve(this._products);
    } catch (error) {
      throw error;
    }
  };

  /**
   * @returns -add category and returns the new added product.
   * @param newProduct: the new category to add.
   */
  public addProduct: (
    newProduct: Product
  ) => Promise<Product> = async newProduct => {
    newProduct.id = uuidv1();
    this._products.push(newProduct);
    return Promise.resolve(newProduct);
  };

  /**
   * @returns -returns the product by id  or undifined if not found.
   * @param id: the id of the product
   */
  public findProductById: (id: string) => Promise<Product | undefined> = id => {
    const index = this._products.findIndex(p => p.id.localeCompare(id) === 0);
    const product = this._products[index];
    return Promise.resolve(product);
  };

  /**
   * @returns -update a product
   * @param id: the id of product to update
   * @param updatedProduct: the product info
   */
  public updateProduct: (
    id: string,
    updatedProduct: Product
  ) => Promise<Product | undefined> = (id, updatedProduct) => {
    const index = this._products.findIndex(p => p.id.localeCompare(id) === 0);
    if (index !== -1) {
      this._products[index] = updatedProduct;
      return Promise.resolve(updatedProduct);
    } else {
      return Promise.resolve(undefined);
    }
  };

  /**
   * @returns -true if removed , false else.
   * @param id: the id of product to remove
   *
   */
  public removeProduct: (id: string) => Promise<boolean> = id => {
    const index = this._products.findIndex(p => p.id.localeCompare(id) === 0);
    if (index !== -1) {
      this._products.splice(index, 1);
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  };
}
