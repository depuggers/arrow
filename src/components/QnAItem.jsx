import React, { useState, useContext } from 'react';

import Helpful from './Helpful';
import AddAnswer from './AddAnswer';

import AppContext from '../context/AppContext';

function QnAItem({ question }) {
  const [visibleAnswers, setVisibleAnswers] = useState(2);

  const { showModal } = useContext(AppContext);

  const sortedAnswers = Object.values(question.answers).sort((a, b) => (a.helpfulness >= b.helpfulness || a.answerer_name.toLowerCase() === 'seller' ? -1 : 1));
  console.log(sortedAnswers);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">
          {`Q: ${question.question_body}`}
        </p>
        <span className="text-sm text-neutral-500"><Helpful helpfulCount={question.question_helpfulness} childAction={() => showModal(<AddAnswer question={question} />)}>Add Answer</Helpful></span>
      </div>
      <div
        className="flex flex-col gap-4 overflow-y-auto"
        style={{
          maxHeight: document.documentElement.clientHeight / 2,
        }}
      >
        {sortedAnswers.slice(0, visibleAnswers).map((answer) => (
          <div className="flex gap-2">
            <span className="text-xl font-bold">A: </span>
            <div className="flex flex-col gap-4 pt-[0.125rem]">
              <p>{answer.body}</p>
              <ul className="grid grid-cols-[repeat(10,1fr)] gap-2">
                {answer.photos.map((photo, i) => (
                  <li key={i} className="aspect-square w-full">
                    <img className="w-full h-full object-cover" src={photo} alt="" />
                  </li>
                ))}
              </ul>
              <div className="flex gap-4 divide-x-2 text-sm text-neutral-500">
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
                <div className="pl-4">
                  <Helpful helpfulCount={answer.helpfulness}>
                    Report
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
