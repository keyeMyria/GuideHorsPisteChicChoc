const rapports = (state = [], action) => {
    switch (action.type) {
      case 'ADD_RAPPORT':
        return [
          ...state,
          {
            id: action.payload.id,
            timestamp: action.payload.timestamp,
            lieu: action.payload.lieu,
            description: action.payload.description
          }
        ]
      default:
        return state
    }
  }
  
  export default rapports;
  