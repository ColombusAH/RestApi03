//*********/ Builded only for simulate work with DB //*********/
import products from "../data/products.json";
import uuidv1 from "uuid/v1";

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  itemInStock: number;
}
/**
 * @returns -return products array;
 */
async function getProducts(): Promise<Product[]> {
  return Promise.resolve(products);
}

/**
 * @returns -returns all the products by selected category.
 * @param id: the id of the category
 */
async function getProductsByCategoryId(categoryId: string): Promise<Product[]> {
  const categoriesSelectedProducts = products.filter(
    p => p.categoryId.localeCompare(categoryId) === 0
  );
  return Promise.resolve(categoriesSelectedProducts);
}

/**
 * @returns -add category and returns the new added product.
 * @param newProduct: the new category to add.
 */
async function addProduct(newProduct: Product): Promise<Product> {
  newProduct.id = uuidv1();
  products.push(newProduct);
  return Promise.resolve(newProduct);
}

/**
 * @returns -returns the product by id  or undifined if not found.
 * @param id: the id of the product
 */
async function findProductById(id: string): Promise<Product | undefined> {
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  const product = products[index];
  return Promise.resolve(product);
}

/**
 * @returns -update a product
 * @param id: the id of product to update
 * @param updatedProduct: the product info
 */
async function updateProduct(
  id: string,
  updatedProduct: Product
): Promise<Product | undefined> {
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  if (index !== -1) {
    products[index] = updatedProduct;
    return Promise.resolve(updatedProduct);
  } else {
    return Promise.resolve(undefined);
  }
}

/**
 * @returns -true if removed , false else.
 * @param id: the id of product to remove
 *
 */
async function removeProduct(id: string): Promise<boolean> {
  const index = products.findIndex(p => p.id.localeCompare(id) === 0);
  if (index !== -1) {
    products.splice(index, 1);
    return Promise.resolve(true);
  } else {
    return Promise.resolve(false);
  }
}

const productService = {
  getProducts,
  addProduct,
  findProductById,
  updateProduct,
  removeProduct,
  getProductsByCategoryId
};
export { products };
export default productService;
