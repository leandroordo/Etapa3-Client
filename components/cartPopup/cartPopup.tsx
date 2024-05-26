"use client";
import { Cart } from "@/api/types";
import { useCart } from "@/app/store/store";
import { setCart } from "@/app/store/store";
import Image from "next/image";
import {
  MdAddCircleOutline,
  MdDeleteOutline,
  MdOutlineClose,
  MdRemoveCircleOutline,
} from "react-icons/md";
import { useDispatch } from "react-redux";
import { useOutsideClick } from "@/hooks/useOutsideClick";

export default function CartPopup({
  clearCartAction,
  removeProductAction,
  incrementProductQuantityAction,
  decrementProductQuantityAction,
  closePopupAction,
  show,
}: {
  clearCartAction: () => Promise<Cart>;
  removeProductAction: (productId: string) => Promise<Cart>;
  incrementProductQuantityAction: (productId: string) => Promise<Cart>;
  decrementProductQuantityAction: (productId: string) => Promise<Cart>;
  closePopupAction: () => void;
  show: boolean;
}) {
  const dispatch = useDispatch();
  const cart = useCart();

  const getTotalAction = () => {
    return cart.products.reduce(
      (previousValue, { price, quantity }) => previousValue + price * quantity,
      0
    );
  };

  const ref = useOutsideClick(() => {
    closePopupAction();
  });

  return (
    <>
      <div className={show ? "cart__container active" : "cart__container"}>
        <div className="cart__closebutton">
          <button
            className="button button-cartpopup"
            onClick={closePopupAction}
          >
            <MdOutlineClose />
          </button>
        </div>
        {cart.products.length === 0 && (
          <p>No hay nada en su carrito de compras.</p>
        )}
        {cart.products.length > 0 && (
          <ul className="cart__itemlist">
            {cart.products.map((product, index) => (
              <li key={index} className="cart__item">
                <div className="cart__itemimage">
                  <Image
                    src={`data:${product.contentType};base64,${product.photo}`}
                    alt={product.name}
                    width={100}
                    height={86}
                    className="card__image-fluid"
                  />
                </div>
                <div className="cart__itemproductdetail">
                  <p className="cart__itemproductname">{product.name}</p>
                  <div className="cart__itemproductcantidad">
                    <p>Cant:</p>
                    <div>
                      <button
                        className="button button-cartpopup"
                        onClick={async () => {
                          dispatch(
                            setCart(
                              await decrementProductQuantityAction(
                                product.productId
                              )
                            )
                          );
                        }}
                      >
                        <MdRemoveCircleOutline />
                      </button>
                    </div>
                    <div>{product.quantity}</div>
                    <div>
                      <button
                        className="button button-cartpopup"
                        onClick={async () => {
                          dispatch(
                            setCart(
                              await incrementProductQuantityAction(
                                product.productId
                              )
                            )
                          );
                        }}
                      >
                        <MdAddCircleOutline />
                      </button>
                    </div>
                  </div>

                  <p className="cart__itemproductprice">
                    {(product.price * product.quantity).toLocaleString(
                      "en-US",
                      {
                        style: "currency",
                        currency: "USD",
                      }
                    )}
                  </p>
                </div>
                <div>
                  <button
                    className="button button-cartpopup"
                    onClick={async () => {
                      dispatch(
                        setCart(await removeProductAction(product.productId))
                      );
                    }}
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <div className="cart__totalcontainer">
          <p>
            Total:
            <span className="cart__totalvalue">
              ${getTotalAction().toFixed(2)}
            </span>
          </p>
        </div>
      </div>
      {show && <div id="backgroundOverlay" ref={ref}></div>}
    </>
  );
}
