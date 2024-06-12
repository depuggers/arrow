const convertStars = (data) => {
  if (!data || !data.ratings) {
    console.error('invalid data');
    return {};
  }
  const stars = Object.fromEntries(Object.entries(data.ratings).map(([k, v]) => [`stars${k}`, parseInt(v)]));
  return stars; //obj
};

export default convertStars;