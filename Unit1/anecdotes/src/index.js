import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (<div><button onClick={props.handleClick}>{props.text}</button></div>)

const Header = ({text}) => (<><h1>{text}</h1></>)

const Anecdote = ({text, count}) => (
<>
  <p>{text}</p>
  <p>has {count} votes</p>
</>)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteTally, setVoteTally] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })

  const handleClick = () => {
    let randomNum = Math.floor(Math.random() * 6);
    setSelected(randomNum)
  }

  const handleVoteClick = () => {
    setVoteTally({...voteTally, [selected]: ++voteTally[selected]})
  }

  let highest = Object.keys(voteTally).reduce((a, b) => voteTally[a] > voteTally[b] ? a : b);
  let highestAnecdote = props.anecdotes[highest];

  return (
    <div>
      <Header text="Andecdote of the day"/>
      {props.anecdotes[selected]}
      <Button text="Vote" handleClick={handleVoteClick}/>
      <Button text="Next Anecdote" handleClick={handleClick}/>
      <Header text="Andecdote with the most votes"/>
      <Anecdote text={highestAnecdote} count={voteTally[highest]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)