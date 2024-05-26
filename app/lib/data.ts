"use server";

import { Product } from "@/api/types";

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const uri = process.env.API_URL || "";
    const endpoint = "products";

    const res = await fetch(uri + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //Authorization: `Bearer ${API_TOKEN}`,
      },
      cache: "no-store",
    });

    const json = await res.json();

    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }

    const result: Product[] = json;
    return result;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fech products!");
  }
};
