const appReducer = (state, action) => {
  console.log(JSON.stringify(action));
  switch (action.type) {
    case 'setProductDetails':
      return {
        ...state,
        ...action.payload,
      };
    case 'setSelectedStyle':
      return {
        ...state,
        selectedStyle: action.payload,
        selectedSKU: null,
      };
    case 'setSelectedSKU':
      return {
        ...state,
        selectedSKU: action.payload,
      };
    case 'setSelectedImage':
      return {
        ...state,
        selectedImage: action.payload,
      };
    case 'switchImage':
      console.log(state.styles, state.selectedStyle, state.styles[state.selectedStyle]);
      return {
        ...state,
        selectedImage: Math.min(Math.max(state.selectedImage + action.payload, 0), state.styles[state.selectedStyle].photos.length - 1),
      };
    case 'addToCart':
      return {
        ...state,
        cart: [
          ...state.cart,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default appReducer;
