import React from 'react';

import starMask from '../images/star-mask.svg?url';
import starMask0 from '../images/star-mask-0.svg?url';
import starMask1 from '../images/star-mask-1.svg?url';
import starMask2 from '../images/star-mask-2.svg?url';
import starMask3 from '../images/star-mask-3.svg?url';
import starMask4 from '../images/star-mask-4.svg?url';

function StarRating({ rating, size }) {

  const masks = [starMask0, starMask1, starMask2, starMask3];

  return (
    <ul className="grid grid-cols-[repeat(5,1fr)]">
      {Array.from({ length: 5 }).map((star, i) => {
        const fraction = Math.floor((rating % 1) * 4);
        const mask = rating >= i + 1 ? starMask4 : rating - i + 1 < 1 ? starMask0 : masks[fraction];
        return (
          <li
            key={i}
            className="aspect-square bg-primary"
            style={{
              width: `${size}rem`,
              mask: `url(${starMask}) 0 0 / 100% 100% intersect, url(${mask}) 0 0 / 100% 100% intersect`,
              // maskComposite: 'intersect',
            }}
          />
        );
      })}
    </ul>
  );
}

export default StarRating;
