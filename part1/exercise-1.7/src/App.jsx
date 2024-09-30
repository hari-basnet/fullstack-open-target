import { useState } from "react";
import Big from "big.js";

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
        alignItems: "center",
        width: "80%",
        margin: "0 auto",
        whiteSpace: "nowrap",
      }}
    >
      <div>
        <h1>Give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {totalFeedback}</p>
      <p>Average: {averageFeedback}</p>
      <p>positive: {positiveFeedback} %</p>
    </div>
  );
};

export default App;
