const appReducer = (state, action) => {
  // console.log(JSON.stringify(action));
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
      // console.log(state.styles, state.selectedStyle, state.styles[state.selectedStyle]);
      return {
        ...state,
        selectedImage: Math.min(Math.max(state.selectedImage + action.payload, 0), state.styles[state.selectedStyle].photos.length - 1),
      };
    case 'addToCart':
      const newCart = [
        ...state.cart,
        action.payload,
      ];
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };

    case 'setQuestionHelpful':
      localStorage.setItem('helpfulQs', JSON.stringify([
        ...state.helpfulQs,
        action.payload,
      ]));
      return {
        ...state,
        helpfulQs: [
          ...state.helpfulQs,
          action.payload,
        ],
      };

    case 'setAnswerHelpful':
      localStorage.setItem('helpfulAs', JSON.stringify([
        ...state.helpfulAs,
        action.payload,
      ]));
      return {
        ...state,
        helpfulAs: [
          ...state.helpfulAs,
          action.payload,
        ],
      };

    case 'setAnswerReported':
      localStorage.setItem('reportedAs', JSON.stringify([
        ...state.reportedAs,
        action.payload,
      ]));
      return {
        ...state,
        reportedAs: [
          ...state.reportedAs,
          action.payload,
        ],
      };

    default:
      return state;
  }
};

export default appReducer;
