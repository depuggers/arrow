import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import AppContext from '../context/AppContext';
import { ProductCharacteristicsReview } from './ProductCharacteristics';

function NewReview() {
  const formRef = useRef;
  const {
    store: { product }, store: { reviews }, hideModal,
  } = useContext(AppContext);
  const [counter, setCounter] = useState(0);
  const [currentStar, setCurrentStar] = useState(0);

  const handleSubmit = () => {
    const data = Object.fromEntries(new FormData(formRef.current));
    data.review_id = parseInt(reviews.id, 10);
    try {
      const response = axios.post('/reviews', 10);
      if (response.status === 201) {
        alert('Review Posted');
        hideModal();
      }
    } catch (error) {
      alert('Error Posting Review');
      hideModal();
    }
  };
  return (
    <>
      <div className="text-base-content overscroll-contain max-h-full overflow-y-auto relative">
        <button className="absolute right-0 top-0 dark:text-white dark:bg-white text-black hover:bg-slate-300" onClick={hideModal}>
          <IoClose size={32} />
        </button>
        <div className="border-2 w-full flex flex-col">
          <h1 className="text-3xl font-bold">Write Your Review</h1>
          <h3>{`About the ${product.name}`}</h3>
          <form className="pt-6 pb-4 flex flex-col gap-2">
            <div className="rating flex flex-row font-bold pr-6">
              <h2 className="pr-8">Overall Rating </h2>
              <input
                key={0}
                type="radio"
                className="invisible mask mask-star-2 bg-primary pr-6"
                disabled
                checked={Math.round(currentStar === 0)}
              />

              {[1, 2, 3, 4, 5].map((rating) => (
                <input
                  key={rating}
                  type="radio"
                  className="mask mask-star-2 bg-primary pr-6"
                  onMouseOver={() => setCurrentStar(rating)}
                  checked={Math.round(currentStar === rating)}
                />
              ))}
              <p className="">{currentStar === 0 && <h1 />}</p>
              <p className="">{currentStar === 1 && <h1>Poor</h1>}</p>
              <p className="">{currentStar === 2 && <h1>Fair</h1>}</p>
              <p className="">{currentStar === 3 && <h1>Average</h1>}</p>
              <p className="">{currentStar === 4 && <h1>Good</h1>}</p>
              <p className="">{currentStar === 5 && <h1>Great</h1>}</p>
            </div>
            <h3>Do you reccommend this product?</h3>
            <label>
              <input type="radio" name="reccommend" value="yes" />
              Yes
              <input type="radio" name="reccommend" value="no" />
              No
            </label>
            <h2>Please rate your experience with the following:</h2>
            <ProductCharacteristicsReview />

            <label>
              Summary:
              <input
                className="form-input resize-none w-full pb-8"
                type="text"
                name="reviewSummary"
                id="reviewSumary"
                placeholder="Example: Best purchase ever!"
                maxLength={60}
                required
              />
            </label>
            <div>
              <h1> Review:</h1>
              <textarea
                className="form-input resize-none w-full"
                name="reviewBody"
                id="reviewBody"
                rows={3}
                placeholder="Why did you like the product?"
                onChange={(e) => setCounter(50 - e.target.value.length)}
                required
                minLength={50}
                maxLength={1000}
              />
              <p className="pb-6 text-sm text-neutral-400">
                {counter < 50
                  ? (`Minimum required characters left:${counter}`)
                  : 'Minimum reached'}
              </p>
            </div>
            <label>
              What is your nickname?*
              <input
                className="form-input resize-none w-full"
                type="text"
                name="nickname"
                id="reviewSumary"
                placeholder="Example: John Smith"
                maxLength={60}
                required
              />
            </label>
            <label>
              What is your email?*
              <input
                className="form-input resize-none w-full"
                type="email"
                name="nickname"
                id="reviewSumary"
                placeholder="Example: jackson11@email.com"
                maxLength={60}
                required
              />
              <p className="text-sm text-neutral-400">For authentication reasons, you will not be emailed</p>
            </label>

            <button className="absolute right-0 top-0 text-black hover:bg-slate-300" onClick={hideModal}>
              <IoClose size={32} />
            </button>
            <button
              onClick={handleSubmit}
              type="submit"
              className="form-input"
            >
              Submit Review
            </button>
          </form>

        </div>
      </div>
    </>
  );
}
export default NewReview;
