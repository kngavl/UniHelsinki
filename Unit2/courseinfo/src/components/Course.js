import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  //const sum = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises
  const sum = course.parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue)
  return(
    <p><strong>Number of exercises {sum}</strong></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => {
        return (<Part key={part.id} part={part}/> )
      })}
    </div>
  )
}

const Course = ({courses}) => {
    return (
      <div>
        {courses.map((course) => {
          return (
            <>
              <Header course={course}/>
              <Content course={course}/>
              <Total course={course}/>
            </>
          )
        })}
      </div>
    )}

export default Course