import React from 'react';

function StarRating({ rating, name }) {
  // const rating = { average: 3.75 };
  // console.log(rating.average);

  const paths = ['0 0, 51% 0, 51% 51%, 0 51%', '0 49%, 51% 49%, 51% 100%, 0 100%', '49% 49%, 100% 49%, 100% 100%, 49% 100%', '49% 0, 100% 0, 100% 51%, 49% 51%'];

  return (
    <div className="rating grid grid-cols-[repeat(5,1fr)]">
      {Array.from({ length: 20 }).map((v, i) => (
        <input
          key={i}
          type="radio"
          name={name}
          className="mask mask-star-2 bg-primary"
          disabled
          checked={Math.round(rating * 4) === i + 1}
          style={
          {
            gridColumn: `${Math.floor(i / 4) + 1} / ${Math.floor(i / 4) + 1}`,
            gridRow: 1,
            clipPath: `polygon(${paths[Math.floor(i % 4)]})`,
          }
        }
        />
      ))}

    </div>
  );
}

export default StarRating;
