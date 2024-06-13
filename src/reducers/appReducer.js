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
      if (true) {
        const newCart = [
          ...state.cart,
          action.payload,
        ];
        localStorage.setItem('cart', JSON.stringify(newCart));
        return {
          ...state,
          cart: newCart,
        };
      }
      return state;

    case 'setQuestionHelpful':
      if (!state.helpfulQs.includes(action.payload)) {
        const newHelpfulQs = [
          ...state.helpfulQs,
          action.payload,
        ];
        localStorage.setItem('helpfulQs', JSON.stringify(newHelpfulQs));
        return {
          ...state,
          helpfulQs: newHelpfulQs,
        };
      }
      return state;
    case 'setAnswerHelpful':
      if (!state.helpfulAs.includes(action.payload)) {
        const newHelpfulAs = [
          ...state.helpfulAs,
          action.payload,
        ];
        localStorage.setItem('helpfulAs', JSON.stringify(newHelpfulAs));
        return {
          ...state,
          helpfulAs: newHelpfulAs,
        };
      }
      return state;
    case 'setAnswerReported':
      if (!state.reportedAs.includes(action.payload)) {
        const newReportedAs = [
          ...state.reportedAs,
          action.payload,
        ];
        localStorage.setItem('reportedAs', JSON.stringify(newReportedAs));
        return {
          ...state,
          reportedAs: newReportedAs,
        };
      }
      return state;
    default:
      return state;
  }
};

export default appReducer;
