import Product from '../models/productModel';
import uuidv1 from 'uuid/v1';
import requirePromise from 'request-promise';

const products = new Array() as Product[];

const productService = {
  /**
   * @returns -return products array;
   */
  getProducts: async () => {
    try {
      let ptp = [];
      if (products.length === 0) {
        ptp = await requirePromise.get(
          'http://localhost:3000/static/products.json',
          { json: true }
        );

        if (!ptp) {
          throw new Error('Unable to get data ');
        }
      }
      products.push(...ptp);
      return Promise.resolve(products);
    } catch (error) {
      throw error;
    }
  },

  /**
   * @returns -add category and returns the new added product.
   * @param newProduct: the new category to add.
   */
  addProduct: async (newProduct: Product) => {
    newProduct.id = uuidv1();
    products.push(newProduct);
    return Promise.resolve(newProduct);
  },

  /**
   * @returns -returns the product by id  or undifined if not found.
   * @param id: the id of the product
   */
  findProductById: async (id: string) => {
    const product = products.find(p => p.id.localeCompare(id) === 0);
    return Promise.resolve(product);
  },

  /**
   * @returns -update a product
   * @param id: the id of product to update
   * @param updatedProduct: the product info
   */
  updateProduct: async (id: string, updatedProduct: Product) => {
    const index = products.findIndex(p => p.id.localeCompare(id) === 0);
    if (index !== -1) {
      products[index] = updatedProduct;
      return Promise.resolve(updatedProduct);
    } else {
      return Promise.resolve(undefined);
    }
  },

  /**
   * @returns -true if removed , false else.
   * @param id: the id of product to remove
   *
   */
  removeProduct: async (id: string) => {
    const index = products.findIndex(p => p.id.localeCompare(id) === 0);
    if (index !== -1) {
      products.splice(index, 1);
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }
};

export default productService;
