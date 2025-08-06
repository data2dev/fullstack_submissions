import { useState } from 'react'

//defining statistics as a separate component
const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good + neutral + bad)/3
  const positive = (good/(good + bad + neutral))*100

    if (total === 0) {
    return <p>No feedback given</p>
  }

    return (
    <div>
      <h1>Statistics</h1>

      
      {
        <>
          <p>Good: {good}</p>
          <p>Neutral: {neutral}</p>
          <p>Bad: {bad}</p>
          <p>Total: {total}</p>
          <p>Average: {average}</p>
          <p>Positive: {positive}%</p>
        </>
      }
    </div>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // event handlers
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleNeutralClick}>Neutral</button>
      <button onClick={handleBadClick}>Bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App
