const initialState = {
  cart: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "addProduct":
      const cItem = action.payload;
      const cartCopy = state.cart;

      let check = false;
      for(let i =0; i < cartCopy.length; ++i){
        if(cartCopy[i].id == cItem.id){
          check = true;
          break;
        }
      }

      if (check == false) {
        cartCopy.push(cItem);
      } else {
        cartCopy.map((cart) => {
          cart.quantity = cart.quantity + 1;
        });
      }
      return {
        ...state,
        cart: cartCopy,
      };
    case "removeProduct":
      return [2];
    case "changeQuantity":
      return [3];
    default:
      return state;
  }
};

export default cartReducer;
