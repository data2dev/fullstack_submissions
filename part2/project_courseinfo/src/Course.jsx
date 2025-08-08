// Course.js

// Header component
const Header = ({ name }) => <h1>{name}</h1>;

// Part component
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

// Content component
const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

// Total component
const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p><strong>Total of {total} exercises</strong></p>;
};

// Course component (combines all subcomponents)
const Course = ({ course }) => (
  <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
);

// Export Course as default
export default Course;
