import React from "react";
import "./Menu.css";
import MenuItem from "./MenuItem";

export const PRODUCTS_ROUTE = "PRODUCTS_ROUTE";
export const OFFERS_ROUTE = "OFFERS_ROUTE";
export const SHOPPING_CART = "SHOPPING_CART";

const menu = props => {
  const menuItems = props.items.map((item, index) => {
    return (
      <MenuItem
        selected={item.selected}
        index={index}
        name={item.name}
        key={index}
        clickHandler={props.clickHandler}
      />
    );
  });

  return (
    <div className="MenuContainer">
      <ul className="Menu">{menuItems}</ul>
    </div>
  );
};

export default menu;