import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reviews() {
  const [reviews, setReviews] = useState('');

  const url = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews?product_id=40344';
  const headers = {
    Authorization: process.env.GH_TOKEN,
  };

  console.log(reviews);
  useEffect(() => {
    axios.get(url, { headers })
      .then((response) => {
        console.log(response);
        setReviews(response.data);
      })
      .catch((err) => {
        console.error('error getting data', err);
      });
  }, []);

  return (
    <ul>

      {reviews.results?.map((review) => (
        <li>
          {review.summary}
        </li>
      ))}

    </ul>
  );
}

export default Reviews;
