import React, { useState, useContext } from 'react';

import Helpful from './Helpful';
import AddAnswer from './AddAnswer';

import AppContext from '../context/AppContext';

function QnAItem({ question }) {
  const [visibleAnswers, setVisibleAnswers] = useState(2);

  const { showModal } = useContext(AppContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-xl font-bold">
          {`Q: ${question.question_body}`}
        </p>
        <span className="text-sm text-neutral-500"><Helpful childAction={() => showModal(<AddAnswer question={question} />)}>Add Answer</Helpful></span>
      </div>
      <div
        className="flex flex-col gap-4"
      >
        {Object.values(question.answers).slice(0, visibleAnswers).map((answer) => (
          <div className="flex gap-2">
            <span className="text-xl font-bold">A: </span>
            <div className="flex flex-col gap-4 pt-[0.125rem]">
              <p>{answer.body}</p>
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
                  <Helpful>
                    Report
                  </Helpful>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleAnswers < Object.keys(question.answers).length ? <button className="pl-7 font-bold w-fit" onClick={() => setVisibleAnswers(visibleAnswers + 2)}>LOAD MORE ANSWERS</button> : null}
    </div>
  );
}

export default QnAItem;
