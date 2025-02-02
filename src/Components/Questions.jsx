import React from 'react'
import Timer from './Timer'
import Answers from './Answers'
import QUESTIONS from '../questions.js'
import { useState } from 'react'

const Questions = ({ onSelectAnswer, onSkipAnswer, index,}) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null 
  })
  
  // reset timer if answer is selected
  let resetTimer = 10000;
  if(answer.selectedAnswer ) {
    resetTimer = 1000;
  }
  if(answer.isCorrect !== null) {
    resetTimer = 2000;
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer, 
      isCorrect: null
    })
  
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer, 
        isCorrect: QUESTIONS[index].options[0].isCorrect === answer.isCorrect
      })

      setTimeout(() => {
        onSelectAnswer(answer)
      }, 2000)
    }, 1000)
  }
  let answerState = ''   

  if(answer.selectedAnswer && answer.isCorrect !== null ) {
    answerState = answer.isCorrect ? "correct" : "wrong"   
  } else if (answer.selectedAnswer) {
    answerState = 'answered';
  } 
   
  return (
    <div id='question'>
      {/* {Timer should be reset when ques change, so we use 'key'} */}
      <Timer 
        timeout={resetTimer} 
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} 
        mode={answerState} 
        key={resetTimer}
      />
      <h2>{QUESTIONS[index].question}</h2>

      <Answers 
        answers={QUESTIONS[index].options} 
        selectedAnswer={answer.selectedAnswer} 
        answerStatus={answerState} 
        onSelect={handleSelectAnswer}
        />
      </div>
  )
}

export default Questions;
