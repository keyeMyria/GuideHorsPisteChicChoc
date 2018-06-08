const purge = (state = [], action) => {
  switch (action.type) {
    case "PURGE":
      console.log("PURGE!");
      return {};
    case "REHYDRATING":
      console.log("REHYDRATING!");
      return state;
    default:
      return state;
  }
};

export default purge;
