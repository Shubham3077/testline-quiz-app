// show current active question, take answers then switch to new ques. 
import React, { useState, useCallback, } from 'react'
import QUESTIONS from '../questions.js'
import Questions from './Questions'
import Results from './Results'

const Quiz = () => {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
  // more optimized: we take 1 ans from user and then move to other ques based on length of userAnswer array, hence managing 1 less state ie of questions  

  const [userAnswers, setUserAnswers] = useState([])
  const activeQuestionIndex = userAnswers.length;
  const [startQuiz, setStartQuiz] = useState(false)

  const handleSelectAnswer = useCallback((selectedAns) => {
    setUserAnswers((prevUserAns) => [...prevUserAns, selectedAns]) // updating state based on the previous state  

    // setTimeout(() => {
    //   if(selectedAns.isCorrect === QUESTIONS[activeQuestionIndex].options[0].isCorrect) {
    //     setAnswerStatus("correct")
    //   } else {
    //     setAnswerStatus("wrong") 
    //   }

    //   setTimeout(() => {
    //     setAnswerStatus("");
    //   }, 2000)
    // }, 1000)
    
  }, [])

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  // no of answers should = no of questions & quiz is over
  const quizCompletion = activeQuestionIndex === QUESTIONS.length;

  if(quizCompletion) {
    return <Results userAnswers={userAnswers}/>
  }

  function handleStartQuiz(e) {
    setStartQuiz(true)
  }

  return (
    <div id='quiz'>
      {
        startQuiz ? (<Questions
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
        ) : <button onClick={handleStartQuiz} className='start-btn'>Start</button>
      }
      
      
    </div>
  )
}

export default Quiz;

// key is used when outputting list data. Another purpose: whenever key changes react will destroy old comp instance and creates a new one. This means it unmounts and remounts  
