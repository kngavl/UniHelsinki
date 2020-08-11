import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => <><h1>{text}</h1></>

const Button = ({mood, setMood}) => <><button onClick={setMood}>{mood}</button></>

const Statistic = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <p>No feedback given</p>
    )
  } else {
    return (
      <table>
        <tbody>
          <Statistic text={props.goodMood} value={props.good}/>
          <Statistic text={props.neutralMood} value={props.neutral}/>
          <Statistic text={props.badMood} value={props.bad}/>
          <Statistic text={props.totalMood} value={props.total}/>
          <Statistic text={props.averageMood} value={props.average}/>
          <Statistic text={props.positiveMood} value={props.positive}/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => setGood(good+1)
  const handleClickNeutral = () => setNeutral(neutral+1)
  const handleClickBad = () => setBad(bad+1)

  let total = good+bad+neutral;
  let average = (good-bad)/total;
  let positive = (good/total)*100 + "%"

  return (
    <div>
      <Header text="Give Feedback"/>
      <Button mood="good" setMood={handleClickGood}/>
      <Button mood="neutral" setMood={handleClickNeutral}/>
      <Button mood="bad" setMood={handleClickBad}/>
      <Header text="Statistics"/>
      <Statistics
        goodMood={"good"} good={good}
        neutralMood={"neutral"} neutral={neutral}
        badMood={"bad"} bad={bad}
        totalMood={"all"} total={total}
        averageMood={"average"} average={average}
        positiveMood={"positive"} positive={positive}
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)