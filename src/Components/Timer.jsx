import React, { useEffect, useState } from 'react'

const Timer = ({timeout, onTimeout, mode}) => {
  //update progress bar every milisecond
  const [remainingtime, setRemainingtime] = useState(timeout)

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout)

    return () => {
      clearTimeout(timer)
    } // clean up function
  }, [onTimeout, timeout])

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingtime(prevRemainingTime => prevRemainingTime - 100);
    }, 100) 

    return () => {
      clearInterval(interval)
    } // cleanup func: runs by react before it runs effect func again or when this component is unmounted from the DOM.
  }, [])

  return (
    <progress id='question-time' max={timeout} value={remainingtime} className={mode}/>
  )
}

export default Timer
