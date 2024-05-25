"use client";
import { type Cart } from "@/api/types";
import { setCart } from "@/app/store/store";
import { MdShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Bounce, toast } from "react-toastify";

export default function AddToCart({
  addToCartAction,
}: {
  addToCartAction: () => Promise<Cart>;
}) {
  const dispatch = useDispatch();

  return (
    <button
      className="button button-rounded"
      onClick={async () => {
        dispatch(setCart(await addToCartAction()));

        toast("✅ Agregado al carrito", {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }}
    >
      Comprar
      <MdShoppingCart />
    </button>
  );
}
