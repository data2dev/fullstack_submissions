// Header component 
// to be used in App
const Header = ({ course }) => {
  return <h1>{course}</h1>
}

// Part component
// to be used in Content
const Part = ({ name, exercises }) => {
  return <p>{name} {exercises}</p>
}

// Content component 
// to be used in App
const Content = ({ parts }) => (
  <div>
    {parts.map((part, index) => (
      <Part key={index} name={part.name} exercises={part.exercises} />
    ))}
  </div>
)

// Total component 
// to be used in App
const Total = ({ exercises1, exercises2, exercises3 }) => {
  const totalExercises = exercises1 + exercises2 + exercises3
  return <p>Number of exercises {totalExercises}</p>
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      
      <Header course={course} />
      
      <Content part={part1} exercises={exercises1} />
      <Content part={part2} exercises={exercises2} />
      <Content part={part3} exercises={exercises3} />

      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />

    </div>
  )
}

export default App