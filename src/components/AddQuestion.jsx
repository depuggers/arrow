import React, { useContext } from 'react';
import axios from 'axios';

import { IoClose } from 'react-icons/io5';

import AppContext from '../context/AppContext';

function AddQuestion() {
  const { store: { product }, productID, hideModal } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target)
    const data = Object.fromEntries(new FormData(e.target));
    data.product_id = parseInt(data.product_id);
    console.log(data);
    const response = await axios.post('/qa/questions', data);
    if (response.status === 201) {
      hideModal();
    }
  };

  return (
    <div className="bg-white text-neutral-600 p-6 flex flex-col gap-4 relative">
      <div>
        <h1 className="text-3xl font-bold">Ask Your Question</h1>
        <h2>{`About the ${product.name}`}</h2>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="flex flex-col w-full">
          Your Question*
          <textarea className="form-input resize-none" name="body" placeholder="Why did you like the product or not?" maxLength={1000} rows={3} required />
        </label>
        <label className="flex flex-col w-full">
          What is your nickname*
          <input type="text" name="name" placeholder="Example: jackson11!" className="form-input" maxLength={60} required />
          <p className="text-sm text-neutral-400">For privacy reasons, do not use your full name or email address</p>
        </label>
        <label className="flex flex-col w-full">
          Your email*
          <input type="email" name="email" placeholder="Example: jackson@email.com" className="form-input" maxLength={60} required />
          <p className="text-sm text-neutral-400">For authentication reasons, you will not be emailed</p>
        </label>
        <input type="hidden" name="product_id" value={productID} />
        <button type="submit" className="form-input">Submit Question</button>
      </form>
      <button className="absolute right-4 top-4" onClick={hideModal}><IoClose size={32} /></button>
    </div>
  );
}

export default AddQuestion;
