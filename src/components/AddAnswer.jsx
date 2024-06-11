import React, { useContext, useState } from 'react';
import axios from 'axios';

import { IoClose } from 'react-icons/io5';

import AppContext from '../context/AppContext';

function AddAnswer({ question }) {
  const [photos, setPhotos] = useState([]);

  const { store: { product }, hideModal } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    data.question_id = parseInt(data.question_id);
    data.photos = photos;
    console.log(data);
    const response = await axios.post('/qa/questions', data);
    if (response.status === 201) {
      hideModal();
    }
  };

  const addPhoto = () => {
    if (photos.length < 5) {
      setPhotos((prevPhotos) => [...prevPhotos, 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80']);
    }
  };

  return (
    <div className="bg-white text-neutral-600 p-6 flex flex-col gap-4 relative">
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
        {photos ? (
          <div className="w-full flex justify-center gap-2">
            {photos.map((photo, i) => <img className="w-[96px] aspect-square object-cover" src={photos[i]} alt="" />)}
          </div>
        ) : null}
        {photos.length < 5 ? <button type="button" onClick={addPhoto} className="form-input w-fit mx-auto">Add photo</button> : null}
        <input type="hidden" name="question_id" value={question.question_id} />
        <button type="submit" className="form-input">Submit Answer</button>
      </form>
      <button className="absolute right-4 top-4" onClick={hideModal}><IoClose size={32} /></button>
    </div>
  );
}

export default AddAnswer;
