import React, { useState, useContext } from 'react';
import axios from 'axios';

import Helpful from './Helpful';
import AddAnswer from './AddAnswer';

import AppContext from '../context/AppContext';

import markText from '../lib/markText';

function QnAItem({ question, filter }) {
  const [visibleAnswers, setVisibleAnswers] = useState(2);

  const {
    showModal, dispatch, store: { helpfulQs }, store: { helpfulAs }, store: { reportedAs },
  } = useContext(AppContext);
  // console.log(helpfulQs);

  const answers = Object.values(question.answers);
  const newerQuestions = answers.length > 0 ? answers.filter((answer) => new Date(answer.date) > new Date(2024, 5)) : [];
  const sortedAnswers = newerQuestions.sort((a, b) => (a.helpfulness >= b.helpfulness || a.answerer_name.toLowerCase() === 'seller' ? -1 : 1));
  // console.log(sortedAnswers);

  const markQuestionHelpful = async (id) => {
    if (!helpfulQs.includes(id)) {
      const response = await axios.put(`/qa/questions/${id}/helpful`);
      if (response.status === 204) {
        dispatch({ type: 'setQuestionHelpful', payload: id });
        return true;
      }
      return false;
    }
    return false;
  };

  const markAnswerHelpful = async (id) => {
    // console.log('answer: ', id)
    if (!helpfulAs.includes(id)) {
      const response = await axios.put(`/qa/answers/${id}/helpful`);
      // console.log(response);
      if (response.status === 204) {
        dispatch({ type: 'setAnswerHelpful', payload: { id, question_id: question.question_id } });
        return true;
      }
      return false;
    }
    return false;
  };

  const reportAnswer = (id) => {
    if (!reportedAs.includes(id)) {
      dispatch({ type: 'setAnswerReported', payload: id });
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <span className="text-xl font-bold">Q:</span>
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center w-full">
          <span className="text-xl font-bold">{filter.length >= 3 ? markText(question.question_body, filter) : question.question_body}</span>
          <Helpful helpfulCount={question.question_helpfulness} childAction={() => showModal(<AddAnswer question={question} />)} helpfulAction={() => markQuestionHelpful(question.question_id)}>Add Answer</Helpful>
        </div>
      </div>
      <div
        className="flex flex-col gap-4 overflow-y-auto"
        style={{
          maxHeight: document.documentElement.clientHeight / 2,
        }}
      >
        {sortedAnswers.slice(0, visibleAnswers).map((answer) => (
          <div key={answer.id} className="flex gap-2">
            <span className="text-xl font-bold">A: </span>
            <div className="flex flex-col gap-2 md:gap-4 pt-[0.125rem]">
              <p>{answer.body}</p>
              {answer.photos.length > 0 ? (
                <ul className="grid grid-cols-[repeat(5,1fr)] md:grid-cols-[repeat(10,1fr)] gap-2">
                  {answer.photos.map((photo, i) => (
                    <li key={i} className="aspect-square w-full">
                      <img className="w-full h-full object-cover" src={photo} alt="" />
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="flex flex-col md:flex-row gap-2 md:gap-4 md:divide-x-2 text-sm text-neutral-500">
                <p>
                  {'by '}
                  <span className={`${answer.answerer_name.toLowerCase() === 'seller' ? 'font-bold' : ''}`}>{answer.answerer_name === 'seller' ? 'Seller' : answer.answerer_name}</span>
                  {', '}
                  {new Date(answer.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
                <div className="md:pl-4">
                  <Helpful helpfulCount={answer.helpfulness} helpfulAction={() => markAnswerHelpful(answer.id)} childAction={() => reportAnswer(answer.id)}>
                    {`Report${reportedAs.includes(answer.id) ? 'ed' : ''}`}
                  </Helpful>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {Object.keys(question.answers).length > 2 ? (
        <button
          className="pl-7 font-bold w-fit"
          onClick={() => {
            if (visibleAnswers < Object.keys(question.answers).length) {
              setVisibleAnswers(visibleAnswers + 2);
            } else {
              setVisibleAnswers(2);
            }
          }}
        >
          {`${visibleAnswers < Object.keys(question.answers).length ? 'LOAD MORE ANSWERS' : 'COLLAPSE ANSWERS'}`}
        </button>
      ) : null}
    </div>
  );
}

export default QnAItem;
