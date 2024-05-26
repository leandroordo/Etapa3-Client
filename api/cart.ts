"use server";
import { createCart, getCart, updateCart } from "@/utils/cart";
import { Cart, Product, ProductToAdd } from "./types";

const cart: Cart = {
  cartId: "",
  products: [],
};

export const setLocalCartId = (cartId: string) => {
  cart.cartId = cartId;
};

export const getCartProducts = async (): Promise<Cart> => {
  if (cart.cartId && cart.cartId !== "") {
    const productsInCart = await getCart(cart.cartId);
    if (productsInCart) {
      cart.products = productsInCart;
    }
  }
  return cart;
};

export const addToCart = async (product: Product): Promise<Cart> => {
  if (product) {
    //Si cartId está vacío, crear un nuevo cart en el servidor
    //agregar el producto con cantidad 1
    if (cart.cartId === "") {
      const productToAdd: ProductToAdd = {
        productId: product._id,
        quantity: 1,
      };
      cart.cartId = await createCart(productToAdd);

      //Agregar el producto en el store
      cart.products.push({
        name: product.name,
        productId: product._id,
        price: product.price,
        quantity: 1,
        photo: product.photo,
        contentType: product.contentType,
      });
    } else {
      //Si cartId no está vacío, ya se ha creado el cart en el servidor
      //Actualizar los datos en el servidor y en el store
      const productInCart = cart.products.find(
        ({ productId }) => product._id === productId
      );
      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        cart.products.push({
          name: product.name,
          productId: product._id,
          price: product.price,
          quantity: 1,
          photo: product.photo,
          contentType: product.contentType,
        });
      }

      await updateCartInServer();
    }
  }

  return cart;
};

export const removeProduct = async (productId: string): Promise<Cart> => {
  if (cart.products) {
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );
  }

  await updateCartInServer();
  return cart;
};

export const incrementProductQuantity = async (
  productId: string,
  amount: number
): Promise<Cart> => {
  if (cart.products) {
    const product = cart.products.find(
      (product) => product.productId === productId
    );
    if (product) {
      product.quantity += amount;

      if (product.quantity === 0) await removeProduct(productId);
    }
    await updateCartInServer();
  }
  return cart;
};

export const clearCart = async (): Promise<Cart> => {
  cart.products = [];
  await updateCartInServer();
  return cart;
};
async function updateCartInServer() {
  const productsToAdd: ProductToAdd[] = getProductsToAdd();

  //Actualizar el cart en el servidor con todos los productos
  await updateCart(cart.cartId!, productsToAdd);
}

function getProductsToAdd(): ProductToAdd[] {
  return cart.products.map((p) => ({
    productId: p.productId,
    quantity: p.quantity,
  }));
}
