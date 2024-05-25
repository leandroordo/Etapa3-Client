"use client";

import { Cart } from "@/api/types";
import { useCart } from "@/app/store/store";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineShoppingBag, MdSearch } from "react-icons/md";
import CartPopup from "../cartPopup/cartPopup";
import { useKeyboardShortcut } from "@/hooks/useKeyboard";
import { menuItems } from "./menuItem";
import Dropdown from "./dropDownMenu";

export default function Header({
  clearCartAction,
  removeProductAction,
  incrementProductQuantityAction,
  decrementProductQuantityAction,
}: {
  clearCartAction: () => Promise<Cart>;
  removeProductAction: (productId: string) => Promise<Cart>;
  incrementProductQuantityAction: (productId: string) => Promise<Cart>;
  decrementProductQuantityAction: (productId: string) => Promise<Cart>;
}) {
  const cart = useCart();
  const [showCart, setShowCart] = useState(false);

  const closePopup = () => setShowCart(false);
  useKeyboardShortcut(["escape"], closePopup);

  return (
    <>
      <header>
        <nav>
          <div className="container navbar__container">
            <div className="navbar__body">
              <Link className="navbar__logo" href="/">
                <Image src="/logo.png" alt="Logo" width={100} height={95} />
              </Link>
              <div className="navbar__nav">
                {menuItems.map((item) => {
                  return item.hasOwnProperty("children") ? (
                    <Dropdown item={item} key={item.id} />
                  ) : (
                    <Link
                      className="navitem__link"
                      key={item.id}
                      href={item?.route || ""}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
              <div className="navbar__search">
                <div className="navbar__search-items">
                  <MdSearch />
                  <input type="text" placeholder="Buscar..." />
                </div>
              </div>
              <div className="navbar__shoppingbag">
                <button
                  className="button button-small"
                  onClick={() => {
                    setShowCart(!showCart);
                  }}
                >
                  <MdOutlineShoppingBag />
                  <span className="navbar__shoppingbag-badge">
                    {cart.products.reduce(
                      (previousValue, { quantity }) => previousValue + quantity,
                      0
                    )}
                  </span>
                </button>
                <CartPopup
                  clearCartAction={clearCartAction}
                  removeProductAction={removeProductAction}
                  closePopupAction={() => setShowCart(false)}
                  incrementProductQuantityAction={
                    incrementProductQuantityAction
                  }
                  decrementProductQuantityAction={
                    decrementProductQuantityAction
                  }
                  show={showCart}
                />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
