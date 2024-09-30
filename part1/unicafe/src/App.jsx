import { useState } from "react";
import Big from "big.js";

const Statistics = (props) => {
  return props.totalFeedback > 0 ? (
    <>
      <StatisticsLine text="Good" value={props.good} />
      <StatisticsLine text="Bad" value={props.bad} />
      <StatisticsLine text="Neutral" value={props.neutral} />
      <StatisticsLine text="All" value={props.totalFeedback} />
      <StatisticsLine text="Average" value={props.averageFeedback} />
      <StatisticsLine text="Positive" value={props.positiveFeedback} />
    </>
  ) : (
    <p>No feedback given</p>
  );
};

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const StatisticsLine = ({ text, value }) => {
  return (
    <p>
      {text + ":"} {value}
    </p>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAverage(average + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAverage(average + 0);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
    setAverage(average - 1);
  };

  const totalFeedback = Big(good).plus(neutral).plus(bad).toNumber();
  const averageFeedback =
    totalFeedback > 0 ? Big(average).div(totalFeedback).toNumber() : 0;
  const positiveFeedback =
    totalFeedback > 0 ? Big(good).div(totalFeedback).toNumber() : 0;

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
      <div>
        <h1>Give feedback</h1>
        <Button text="Good" handleClick={handleGoodClick} />
        <Button text="Neutral" handleClick={handleNeutralClick} />
        <Button text="Bad" handleClick={handleBadClick} />
      </div>
      <div>
        <h1>Statistics</h1>
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          totalFeedback={totalFeedback}
          averageFeedback={averageFeedback}
          positiveFeedback={positiveFeedback}
        />
      </div>
    </div>
  );
};

export default App;
