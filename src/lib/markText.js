import React from 'react';

const markText = (string, search) => {
  const regex = new RegExp(search, 'gi');
  const splits = string.split(regex);
  const matches = [...string.matchAll(regex)];
  // console.log(matches);

  const result = [];
  // console.log('test')
  if (matches[0].index !== 0) {
    result.push(<span key={`${Math.random()}`}>{splits[0]}</span>);
    for (const [index, split] of splits.entries()) {
      // console.log(index);
      if (index !== 0) {
        result.push(<span key={`${Math.random()}`}>{split}</span>);
      }
      if (matches[index]) {
        result.push(<mark key={`${Math.random()}`} className="bg-amber-300">{matches[index][0]}</mark>);
      }
    }
  } else {
    result.push(<mark key={`${Math.random()}`} className="bg-amber-300">{matches[0][0]}</mark>);
    for (const [index, split] of splits.entries()) {
      if (split !== '') {
        // console.log('split')
        result.push(<span key={`${Math.random()}`}>{split}</span>);
      }
      if (matches[index] && index !== 0) {
        // console.log('match')
        result.push(<mark key={`${Math.random()}`} className="bg-amber-300">{matches[index][0]}</mark>);
      }
    }
  }
  return result;
};

export default markText;
