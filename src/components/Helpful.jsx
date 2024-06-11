import React from 'react';

function Helpful({ children, helpfulAction, childAction }) {
  return (
    <div className="divide-x-2 flex gap-4">
      <p className="flex gap-2">
        Helpful?
        <span onClick={helpfulAction} className="underline cursor-pointer">Yes</span>
        {'(25)'}
      </p>
      <span className="pl-4 underline cursor-pointer" onClick={childAction}>{children}</span>
    </div>
  );
}

export default Helpful;
