import React, { useState, useContext, useRef } from 'react';
import axios from 'axios';
import { IoClose } from 'react-icons/io5';
import AppContext from '../context/AppContext';

function NewReview() {
  const {
    store: { ratings }, store: { reviews }, hideModal,
  } = useContext(AppContext);

  const productChars = ratings.characteristics;
  const relevantChars = Object.keys(productChars);
  const [formError, setFormError] = useState(null);
  const [attempted, setAttempted] = useState;
  const [counter, setCounter] = useState(0);
  const [currentStar, setCurrentStar] = useState(0);
  const formRef = useRef(null);

  const productFeatures = {
    Size: ['Too Small', 'Perfect', 'Too Wide'],
    Comfort: ['Uncomfortable', 'Ok', 'Perfect'],
    Fit: ['Runs Tight', 'Perfect', 'Runs Long'],
    Width: ['Too Narrow', 'Perfect', 'Too Wide'],
    Length: ['Runs Short', 'Perfect', 'Runs Long'],
    Quality: ['Poor', 'What I Expected', 'Perfect'],
  };


  const data = Object.fromEntries(new FormData(formRef.current));
  data.review_id = parseInt(reviews.id, 10);
  try {
    const response = axios.post('/reviews', 10);
    if (response.status === 201) {
      alert('Review Posted');
      hideModal();
    }
  } catch (error) {
    console.error('error posting review', error);
  }

// const isValid = () => {
//   const errorMessages = {};
//   const form = formRef.current;
//   if (!form.reviewBody.value || form.reviewBody.value.length < 50) {
//     errorMessages.reviewBody = 'A review of at least 50 characters';

//     if (!form.email.validity.valid) {
//       errorMessages.body = 'A review of at least 50 characters';
//     }
//     if (!form.nickname.value) {
//       errorMessages.nickname = 'A review of at least 50 characters';
//     }
//     if (!form.reccommend.value) {
//       errorMessages.reccommend = 'A review of at least 50 characters';
//     }
//   }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setAttempted(true);
//     if (!isValid()) return;
//     setFormError(errorMessages);
//     return Object.keys(errorMessages).length === 0;
//   };

  return (
    <>
      <div className="overscroll-contain max-h-full overflow-y-auto relative">
        <button className="absolute right-0 top-0 text-black hover:bg-slate-300" onClick={hideModal}>
          <IoClose size={32} />
        </button>
        <div className="border-2 w-full flex flex-col bg-slate-100">
          <h1 className="text-3xl font-bold">Write Your Review</h1>
          <h3>{`About the ${product.name}`}</h3>
          <form ref={useRef} className="pt-6 pb-4 flex flex-col gap-2">
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
            {/* </div> */}
            <h3>Do you reccommend this product?</h3>
            <label>
              <input type="radio" name="reccommend" value="yes" />
              Yes
              <input type="radio" name="reccommend" value="no" />
              No
            </label>
            <label>
              {relevantChars.includes('Size')
              && (
                <div className="rating flex flex-row">
                  {productFeatures.Size.map((option, index) => (
                    <div className="flex flex-row" key={index}>
                      <input type="radio" name="size" value={option} />
                      <h4 className="text-base">{option}</h4>
                    </div>
                  ))}
                </div>
              )}
              <div className="rating flex flex-row">
                {relevantChars.includes('Comfort')
              && productFeatures.Comfort.map((option, index) => (
                <div className="flex flex-row" key={index}>
                  <h4 className="text-base w-full">{option}</h4>
                  <input type="radio" name="comfort" value={option} />
                </div>
              ))}
              </div>
              <div className="rating flex flex-row">
                {relevantChars.includes('Fit')
              && productFeatures.Fit.map((option, index) => (
                <div className="flex flex-row" key={index}>
                  <h4 className="text-base w-full">{option}</h4>
                  <input type="radio" name="fit" value={option} />
                </div>
              ))}
              </div>
              <div className="rating flex flex-row">
                {relevantChars.includes('Width')
              && productFeatures.Width.map((option, index) => (
                <div className="flex flex-row" key={index}>
                  <h4 className="text-base w-full">{option}</h4>
                  <input type="radio" name="width" value={option} />
                </div>
              ))}
              </div>
              <div className="rating flex flex-row">
                {relevantChars.includes('Length')
              && productFeatures.Length.map((option, index) => (
                <div className="flex flex-row" key={index}>
                  <h4 className="text-base w-full">{option}</h4>
                  <input type="radio" name="length" value={option} />
                </div>
              ))}
              </div>
              <div className="rating flex flex-row">
                {relevantChars.includes('Quality')
              && productFeatures.Quality.map((option, index) => (
                <div className="flex flex-row" key={index}>
                  <h4 className="text-base w-full">{option}</h4>
                  <input type="radio" name="quality" value={option} />
                </div>
              ))}
              </div>
            </label>
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
            <button className="form-input pb-8 w-24 h-1/16">Add Photos</button>
            <div>You must enter the following</div>
            {/* {Object.values(formError).map((error, index) => <p key={index} className="text-red-500">{error}</p>)} */}
            <button
            // onClick={handleSubmit}
            type="submit" className="form-input">Submit Review</button>
          </form>

        </div>
      </div>
    </>
  );
};

export default NewReview;

