import Content from "./Content";
import Header from "./Header";
import Total from "./Total";

const Course = (props) => {
  const totalExercises = props.course.parts.reduce(
    (total, curr) => total + curr.exercises,
    0
  );
  console.log(props);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "80%",
        margin: "0 auto",
        whiteSpace: "nowrap",
      }}
    >
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default Course;
