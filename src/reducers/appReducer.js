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
      console.log(action);
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
        questions: state.questions.map((q) => (q.question_id !== action.payload ? q : { ...q, question_helpfulness: q.question_helpfulness + 1 })),
      };

    case 'setAnswerHelpful':
      localStorage.setItem('helpfulAs', JSON.stringify([
        ...state.helpfulAs,
        action.payload.id,
      ]));
      return {
        ...state,
        helpfulAs: [
          ...state.helpfulAs,
          action.payload.id,
        ],
        questions: state.questions.map((q) => (q.question_id !== action.payload.question_id ? q : { ...q, answers: { ...q.answers, [action.payload.id]: { ...q.answers[action.payload.id], helpfulness: q.answers[action.payload.id].helpfulness + 1 } } })),
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

    case 'setReviews':
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default appReducer;
