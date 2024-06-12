import React, { useContext, useState } from 'react';

import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import QnAItem from './QnAItem';

import AddQuestion from './AddQuestion';

import AppContext from '../context/AppContext';

function QnA() {
  const [filter, setFilter] = useState('');

  const { store: { questions }, showModal } = useContext(AppContext);

  const filteredQuestions = filter.length >= 3 ? questions.filter((question) => question.question_body.toLowerCase().includes(filter.toLowerCase())) : questions;

  console.log(questions);

  return (
    <section className="flex flex-col gap-6 text-neutral-600 w-full">
      {filteredQuestions ? (
        <>
          <h3>QUESTIONS & ANSWERS</h3>
          <div className="relative">
            <input type="search" name="qna_search" onChange={(e) => setFilter(e.target.value)} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className="form-input w-full" />
            <FaMagnifyingGlass size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {filteredQuestions.map((question) => <QnAItem question={question} />)}
          <div className="flex gap-4">
            <button className="form-input">MORE ANSWERED QUESTIONS</button>
            <button className="form-input flex justify-between items-center gap-4" onClick={() => showModal(<AddQuestion />)}>
              ADD A QUESTION
              <FaPlus size={24} />
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
}

export default QnA;
