import * as actions from "./rapports";

describe("actions", () => {
  it("should create an action to add a rapports", () => {
    const payload = { test: "test" };
    const expectedAction = {
      type: actions.ADD_RAPPORT,
      payload: payload
    };
    expect(actions.addRapport(payload)).toEqual(expectedAction);
  });
});
