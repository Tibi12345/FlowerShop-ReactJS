import {
  SHOW_SPINNER,
  HIDE_SPINNER,
  NEW_MENU_ACTIVE,
  SHOW_DIALOG,
  HIDE_DIALOG,
  UPDATE_CART,
  SET_CURRENT_PRODUCT,
  UPDATE_PRODUCT_QUANTITY,
  HIDE_DELETE_DIALOG,
  SHOW_DELETE_DIALOG
} from "../Actions/ui";
import { PRODUCTS_ROUTE, OFFERS_ROUTE, SHOPPING_CART } from "./../../Menu/Menu";

const initUi = {
  pending: false,
  orderInProgress: false,
  deleteInProgress: false,
  currentProduct: {},
  isLoggedIn: true,
  shoppingCart: [],
  menu: [
    {
      name: "Produse",
      selected: true,
      route: PRODUCTS_ROUTE
    },
    {
      name: "Oferte",
      selected: false,
      route: OFFERS_ROUTE
    },
    {
      name: "Shopping cart",
      selected: false,
      route: SHOPPING_CART
    }
  ]
};

export function uiReducer(state = initUi, action) {
  switch (action.type) {
    case SHOW_SPINNER:
      return { ...state, pending: true };

    case HIDE_SPINNER:
      return { ...state, pending: false };

    case NEW_MENU_ACTIVE:
      return { ...state, menu: [...action.payload] };

    case SHOW_DIALOG:
      return { ...state, orderInProgress: true };

    case HIDE_DIALOG:
      return { ...state, orderInProgress: false };

    case SET_CURRENT_PRODUCT:
      return { ...state, currentProduct: action.payload };

    case UPDATE_CART:
      return { ...state, shoppingCart: [...action.payload] };

    case UPDATE_PRODUCT_QUANTITY:
      return {
        ...state,
        currentProduct: { ...state.currentProduct, quantity: action.payload }
      };

    case SHOW_DELETE_DIALOG:
      return { ...state, deleteInProgress: true };

    case HIDE_DELETE_DIALOG:
      return { ...state, deleteInProgress: false };
    default:
      return state;
  }
}