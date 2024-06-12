import React, {
  useContext, useState, useRef, useEffect,
} from 'react';

import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';
import QnAItem from './QnAItem';

import AddQuestion from './AddQuestion';

import AppContext from '../context/AppContext';

function QnA() {
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [filter, setFilter] = useState('');
  const [scrolling, setScrolling] = useState(false);

  const questionsRef = useRef(null);

  const { store: { questions }, showModal } = useContext(AppContext);

  const filteredQuestions = filter.length >= 3 ? questions.filter((question) => question.question_body.toLowerCase().includes(filter.toLowerCase())) : questions;

  console.log(questions);

  useEffect(() => {
    if (questionsRef.current && questionsRef.current.scrollHeight > questionsRef.current.clientHeight) {
      setScrolling(true);
    }
    console.log('scrolling: ', scrolling, questionsRef.current?.scrollHeight, questionsRef.current?.clientHeight);
  }, [visibleQuestions]);

  return (
    <section
      className="flex flex-col gap-6 text-neutral-600 w-full"
      style={{
        maxHeight: document.documentElement.clientHeight,
      }}
    >
      {filteredQuestions ? (
        <>
          <h3>QUESTIONS & ANSWERS</h3>
          <div className="relative">
            <input type="search" name="qna_search" onChange={(e) => setFilter(e.target.value)} placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..." className="form-input w-full" />
            <FaMagnifyingGlass size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <div
            className={`flex flex-col gap-6 overflow-y-auto ${scrolling ? 'pr-6' : ''}`}
            ref={questionsRef}
          >
            {filteredQuestions.slice(0, visibleQuestions).map((question) => <QnAItem question={question} />)}
          </div>
          <div className="flex gap-4">
            {visibleQuestions < filteredQuestions.length ? <button className="form-input" onClick={() => setVisibleQuestions(visibleQuestions + 2)}>MORE ANSWERED QUESTIONS</button> : null}
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
