import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
)
  
const Statistics = ({good, neutral, bad}) => {
  const all = good+neutral+bad
  const average = (good-bad)/all
  const percentile = ((good/all)*100)
  const positive = !isNaN(percentile) ? parseFloat(percentile).toFixed(2).concat(' %') : 0
  if(all===0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <table>
    <tbody>
    <tr>
      <th> Statistics </th>
    </tr>
  <StatisticsLine text='Good' value={good}/>
  <StatisticsLine text='Neutral' value={neutral}/>
  <StatisticsLine text='Bad' value={bad}/>
  <StatisticsLine text='All' value={all}/>
  <StatisticsLine text='Average' value={parseFloat(average).toFixed(2)}/>
  <StatisticsLine text='Positive' value={positive}/>
    </tbody>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Please give feedback!</h1>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App