const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  average: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "GOOD":
      return {...state, good: state.good + 1};
    case "OK":
      return {...state, ok: state.ok + 1};
    case "BAD":
      return {...state, bad: state.bad + 1};
    case "INCREASEAVERAGE":
      return {...state, average: state.average + 1};
    case "AVERAGEZERO":
      return {...state, average: state.average + 0};
    case "DECREASEAVERAGE":
      return {...state, average: state.average - 1};
    case "ZERO":
      return state;
    default:
      return state;
  }
};

export default counterReducer;
