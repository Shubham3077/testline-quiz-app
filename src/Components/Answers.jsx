import React from 'react'
import { useRef } from 'react';

const Answers = ({answers, selectedAnswer, answerStatus, onSelect}) => {
  const shuffledAnswersref = useRef();  // useRef is used to manage values that are independent of the component lifecycle 

  if(!shuffledAnswersref.current  ) {
    // shuffling options in answers 
    shuffledAnswersref.current = [...answers ]; 
    shuffledAnswersref.current.sort(() => Math.random() - 0.5)
  }

  return (
    <ul id='answers'>
      {shuffledAnswersref.current.map((answer) => {
        let buttonCssClass = '';
        const isSelected = selectedAnswer === answer;

        if(answerStatus === "answered" && isSelected) {
          buttonCssClass = 'selected'
        } 
        if((answerStatus === 'correct' || answerStatus === 'wrong') && isSelected) {
          buttonCssClass = answerStatus;
        }
        return (
          <li key={answer.text} className='answer'>
            <button 
              onClick={() => onSelect(answer)} 
              className={buttonCssClass}
              disabled={answerStatus !== ''}
            >
              {answer.text}
            </button> 
          </li>
        )
      })}
      </ul>
  )
}

export default Answers
