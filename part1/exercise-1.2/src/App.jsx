const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

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
    return <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>;
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
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
      <Total />
    </div>
  );
};

export default App;
