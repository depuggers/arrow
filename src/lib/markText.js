import React from 'react';

const markText = (string, search) => {
  const regex = new RegExp(search, 'gi');
  const splits = string.split(regex);
  const matches = [...string.matchAll(regex)];
  // console.log(matches);

  const result = [];

  if (matches[0].index !== 0) {
    result.push(<>{splits[0]}</>);
    for (const [index, split] of splits.entries()) {
      // console.log(index);
      if (index !== 0) {
        result.push(<>{split}</>);
      }
      if (matches[index]) {
        result.push(<mark className="bg-amber-300">{matches[index][0]}</mark>);
      }
    }
  } else {
    result.push(<mark className="bg-amber-300">{matches[0][0]}</mark>);
    for (const [index, split] of splits.entries()) {
      if (split !== '') {
        // console.log('split')
        result.push(<>{split}</>);
      }
      if (matches[index] && index !== 0) {
        // console.log('match')
        result.push(<mark className="bg-amber-300">{matches[index][0]}</mark>);
      }
    }
  }
  return result;
};

export default markText;
