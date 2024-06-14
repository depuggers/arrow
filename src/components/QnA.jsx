import React, {
  useContext, useState, useRef, useEffect, useLayoutEffect,
} from 'react';

import { FaPlus, FaMagnifyingGlass } from 'react-icons/fa6';

import QnAItem from './QnAItem';
import AddQuestion from './AddQuestion';

import AppContext from '../context/AppContext';

function QnA() {
  const [visibleQuestions, setVisibleQuestions] = useState(2);
  const [filter, setFilter] = useState('');
  const [scrolling, setScrolling] = useState(false);
  const [mobile, setMobile] = useState(false);

  const questionsRef = useRef(null);

  const { store: { questions }, showModal } = useContext(AppContext);

  const loading = !questions;

  let filteredQuestions = [];
  filteredQuestions = filter.length >= 3 ? questions.filter((question) => question.question_body.toLowerCase().includes(filter.toLowerCase())) : questions;
  const sortedQuestions = filteredQuestions ? filteredQuestions.sort((a, b) => (a.question_helpfulness >= b.question_helpfulness ? -1 : 1)) : [];

  // console.log(questions);

  useEffect(() => {
    if (questionsRef.current && questionsRef.current.scrollHeight > questionsRef.current.clientHeight) {
      setScrolling(true);
    }
    // console.log('scrolling: ', scrolling, questionsRef.current?.scrollHeight, questionsRef.current?.clientHeight);
  }, [visibleQuestions]);

  useLayoutEffect(() => {
    const checkMobile = () => {
      if (document.documentElement.clientWidth < 768) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, [mobile]);

  return (
    <section
      className="flex flex-col gap-6 text-base-content w-full"
      style={{
        maxHeight: document.documentElement.clientHeight,
      }}
    >
      <h3>QUESTIONS & ANSWERS</h3>
      <div className="relative">
        <input data-testid="qna-search" type="search" name="qna_search" onChange={(e) => setFilter(e.target.value)} placeholder={mobile ? 'SEARCH FOR ANSWERS...' : 'HAVE A QUESTION? SEARCH FOR ANSWERS...'} className="form-input w-full" />
        <FaMagnifyingGlass size={20} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
      {!loading ? (
        <div
          data-testid="questions"
          className={`flex flex-col gap-6 overflow-y-auto ${scrolling ? 'pr-6' : ''}`}
          ref={questionsRef}
        >
          {sortedQuestions.slice(0, visibleQuestions).map((question) => <QnAItem key={question.question_id} filter={filter} question={question} />)}
        </div>
      ) : null}
      <div className="flex flex-col md:flex-row gap-4">
        {visibleQuestions < sortedQuestions.length ? <button data-testid="more-questions" className="form-input" onClick={() => setVisibleQuestions(visibleQuestions + 2)}>MORE ANSWERED QUESTIONS</button> : null}
        <button className="form-input flex justify-between items-center gap-4" onClick={() => showModal(<AddQuestion />)}>
          ADD A QUESTION
          <FaPlus size={24} />
        </button>
      </div>
    </section>
  );
}

export default QnA;
