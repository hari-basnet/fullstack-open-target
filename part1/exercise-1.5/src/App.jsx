const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = ({ course }) => {
    return <h1>{course}</h1>;
  };

  const Content = ({ parts }) => {
    return parts.map((part) => {
      return (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      );
    });
  };

  const Total = () => {
    return (
      <p>
        Number of exercises{" "}
        {course.parts.reduce((sum, acc) => sum + acc.exercises, 0)}
      </p>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        margin: "0 auto",
        wordWrap: "nowrap",
        whiteSpace: "nowrap",
      }}
    >
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total />
    </div>
  );
};

export default App;
