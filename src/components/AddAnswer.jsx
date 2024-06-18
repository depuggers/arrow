import React, { useContext, useState } from 'react';
import axios from 'axios';

import { IoClose } from 'react-icons/io5';

import AppContext from '../context/AppContext';

function AddAnswer({ question }) {
  const [photos, setPhotos] = useState([]);

  const { store: { product }, hideModal, updateQnA } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.photos = formData.getAll('photos');
    console.log(data);
    // return;
    const response = await axios.post(`/qa/questions/${question.question_id}/answers`, data);
    if (response.status === 201) {
      updateQnA();
      hideModal();
    }
  };

  const addPhoto = () => {
    setPhotos((prevPhotos) => [...prevPhotos, (<input key={prevPhotos.length} type="text" name="photos" placeholder="Enter URL" spellCheck={false} className="form-input" />)]);
  };

  return (
    <div className="bg-base-100 text-base-content p-6 flex flex-col gap-4 relative">
      <div>
        <h1 className="text-3xl font-bold">Submit Your Answer</h1>
        <h2>{`${product.name}: ${question.question_body}`}</h2>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full">
          Your Answer*
          <textarea className="form-input resize-none" name="body" maxLength={1000} rows={3} required />
        </label>
        <label className="flex flex-col w-full">
          What is your nickname*
          <input type="text" name="name" placeholder="Example: jack543!" className="form-input" maxLength={60} required />
          <p className="text-sm text-neutral-400">For privacy reasons, do not use your full name or email address</p>
        </label>
        <label className="flex flex-col w-full">
          Your email*
          <input type="email" name="email" placeholder="Example: jack@email.com" className="form-input" maxLength={60} required />
          <p className="text-sm text-neutral-400">For authentication reasons, you will not be emailed</p>
        </label>
        <div data-testid="answer-photos" className="w-full flex flex-col gap-2">
          {photos}
          {/* {photos.map((photo, i) => <img key={i} className="w-[96px] aspect-square object-cover" src={photo} alt="" />)} */}
        </div>
        {/* <input type="file" name="photos" accept="image/png, image/jpeg" /> */}
        {photos.length < 5 ? <button type="button" onClick={addPhoto} className="form-input w-fit mx-auto">Add photo</button> : null}
        {/* <input type="hidden" name="question_id" value={question.question_id} /> */}
        <button type="submit" className="form-input">Submit Answer</button>
      </form>
      <button className="absolute right-4 top-4" onClick={hideModal}><IoClose size={32} /></button>
    </div>
  );
}

export default AddAnswer;
