const calculateRating = (data) => {
  const ratings = Object.entries(data.ratings)
    .reduce((allRatings, current) => allRatings.concat(Array.from(
      { length: parseInt(current[1], 10) },
      () => parseInt(current[0], 10),
    )), []);
  const avgRating = (ratings.reduce((sum, current) => sum + current, 0) / ratings.length).toFixed(2);
  return { average: avgRating, total: ratings.length };
};

export default calculateRating;
