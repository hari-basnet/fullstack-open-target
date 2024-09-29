const App = () => {
  const course = "Half Stack application development";

  const contents = [
    {
      part: "Fundamentals of React",
      exercises: 10,
    },
    {
      part: "Using props to pass data",
      exercises: 7,
    },
    {
      part: "State of a component",
      exercises: 14,
    },
  ];

  const Header = (props) => {
    return <h1>{props.title}</h1>;
  };

  const Content = (data) => {
    console.log(data);
    return data.data.map((content) => {
      return (
        <p key={content.part}>
          {content.part} {content.exercises}
        </p>
      );
    });
  };

  const Total = () => {
    return (
      <p>
        Number of exercises{" "}
        {contents.reduce((sum, acc) => sum + acc.exercises, 0)}
      </p>
    );
  };

  return (
    <div>
      <Header title={course} />
      <Content data={contents} />
      <Total />
    </div>
  );
};

export default App;
