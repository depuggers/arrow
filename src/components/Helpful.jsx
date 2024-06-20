import React from 'react';

function Helpful({
  children, helpfulCount, helpfulAction, childAction,
}) {
  return (
    <div className="divide-x-2 flex gap-4 text-sm text-secondary-content">
      <p className="flex gap-2">
        Helpful?
        <span onClick={helpfulAction} className="underline cursor-pointer hover:no-underline">Yes</span>
        {`(${helpfulCount})`}
      </p>
      <span className="pl-4 underline cursor-pointer hover:no-underline" onClick={childAction}>{children}</span>
    </div>
  );
}

export default Helpful;
