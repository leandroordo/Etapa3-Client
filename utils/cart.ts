import { ProductInCart, ProductToAdd } from "@/api/types";

export async function createCart(productToAdd: ProductToAdd): Promise<string> {
  try {
    const uri = process.env.API_URL || "";
    const endpoint = "cart";

    const res = await fetch(uri + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(productToAdd),
    });

    if (res.status === 200 || res.status === 201) {
      const json = await res.json();
      if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed to create cart");
      }

      return json._id;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create cart");
  }
  return "";
}

export async function updateCart(cartId: string, products: ProductToAdd[]) {
  try {
    const uri = process.env.API_URL || "";
    const endpoint = `cart/${cartId}`;

    const res = await fetch(uri + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify(products),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update cart");
  }
}

export async function getCart(cartId: string): Promise<ProductInCart[]> {
  try {
    const uri = process.env.API_URL || "";
    const endpoint = `cart/${cartId}`;

    const res = await fetch(uri + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        //Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (res.status === 200) {
      const json = await res.json();
      if (json.errors) {
        console.error(json.errors);
        throw new Error("Failed to get cart");
      }

      return json;
    }
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get cart");
  }
  return [];
}
