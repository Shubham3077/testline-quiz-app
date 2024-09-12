import React from 'react'
import quizCompletedImg from '../assets/quiz-complete.png'
import QUESTIONS from '../questions.js'


const Results = ({ userAnswers }) => {
  const skippedAnswer = userAnswers.filter(ans => ans === null)
  const correctAnswer = userAnswers.filter((answer, index) => answer === QUESTIONS[index].options[0])

  // %
  const percentSkipped = Math.round((skippedAnswer.length / userAnswers.length) * 100)
  const percentCorrect = Math.round((correctAnswer.length / userAnswers.length) * 100);

  const percentWrong = 100 - (percentCorrect + percentSkipped);

  console.log(userAnswers)
  return ( 
    <div id="summary">
      <img src={quizCompletedImg} alt="quiz-completed.png" />
      <h2>Quiz Completed!</h2>

      <div id="summary-stats">
        <p>
          <span className='number'>{percentSkipped}%</span>
          <span className='text'>Skipped</span>
        </p>
        <p>
          <span className='number'>{percentCorrect}%</span>
          <span className='text'>Answered correctly</span>
        </p>
        <p>
          <span className='number'>{percentWrong}%</span>
          <span className='text'>Answered incorrectly</span>
        </p>
      </div>

      <ol>
        {
          userAnswers.map((answer, index) => {
            let cssClass = "user-answer"

            if(answer === null) {
              cssClass += " skipped"
              console.log(answer)
            } else if(answer === QUESTIONS[index].options[0]) {
              cssClass += " correct"
            } else {
              cssClass += " wrong"
            }

            return (
              <li key={index}>
                <h3>{index+1}</h3>
                <p className='question'>{QUESTIONS[index].question}</p>
                <p className={cssClass}>{answer ? answer.text : "skipped"}</p>
              </li>
            )
          })
        }

      </ol>
    </div>
  )
}

export default Results
