const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  const Header = (props) => {
    return <h1>{props.title}</h1>;
  };

  const Part = ({ part, exercises }) => {
    return (
      <p>
        {part} {exercises}
      </p>
    );
  };

  const Total = () => {
    return (
      <p>
        Number of exercises{" "}
        {part1.exercises1 + part2.exercises2 + part3.exercises3}
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
      }}
    >
      <Header title={course} />
      <Part part={part1} exercises={part1.exercises1} />
      <Part part={part2} exercises={part2.exercises2} />
      <Part part={part3} exercises={part3.exercises3} />
      <Total />
    </div>
  );
};

export default App;
