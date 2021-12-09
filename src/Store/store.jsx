import { createStore } from "redux";
import cartReducer from "../Reducers/CartReducer";

const store = createStore(cartReducer);
export default store;