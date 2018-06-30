import * as offline_actions from "./offline";

describe("actions", () => {
  it("should create an action to add a todo", () => {
    const groupe = "montagne_a";
    const payload = { test: "test" };
    const expectedAction = {
      type: offline_actions.ADD_OFFLINE_REGION,
      groupe: groupe,
      payload: payload
    };
    expect(offline_actions.addOfflineRegion(groupe, payload)).toEqual(expectedAction);
  });
});
