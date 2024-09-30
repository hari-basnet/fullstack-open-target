import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const voteBank = Array.apply(null, new Array(8)).map(
    Number.prototype.valueOf,
    0
  );

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState([...voteBank]);

  const handleVoteClick = () => {
    const updatedVotes = [...votes];
    updatedVotes[selected] += 1;
    setVotes(updatedVotes);
  };

  const handleNextClick = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length);
    console.log(randomNumber);
    setSelected(randomNumber);
  };

  const maxVote = Math.max(...votes);

  const winnerVote = votes.indexOf(maxVote);

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
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <div style={{ display: "flex", alignSelf: "flex-start" }}>
        <button onClick={handleVoteClick}>Vote</button>
        <button onClick={handleNextClick}>Next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[winnerVote]}</p>
      <p>has {votes[winnerVote]} votes</p>
    </div>
  );
};

export default App;
