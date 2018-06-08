const rapports = (state = [], action) => {
  switch (action.type) {
    case "ADD_RAPPORT":
      return [
        ...state,
        {
          id: action.payload.id,
          datetime: action.payload.datetime,
          taille_avalanche: action.payload.taille_avalanche,
          declenchement: action.payload.declenchement,
          type_avalanche: action.payload.type_avalanche,
          plan_glissement: action.payload.plan_glissement,
          emplacement: action.payload.emplacement,
          info_complementaires: action.payload.info_complementaires
        }
      ];
    default:
      return state;
  }
};

export default rapports;
