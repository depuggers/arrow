import appReducer from '../reducers/appReducer'

describe('Overview', () => {
  test('sets selectedImage to specified image index', () => {
    expect(appReducer({}, {type: "setSelectedImage", payload: 1})).toEqual({selectedImage: 1});
  });
});
