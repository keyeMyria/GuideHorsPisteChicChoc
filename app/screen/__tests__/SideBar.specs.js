import "react-native";
import React from "react";
import SideBar from "../SideBar";

import renderer from "react-test-renderer";

import { shallow } from "enzyme";
import toJson from "enzyme-to-json"; //added this line

describe("Testing SideBar component", () => {
  it("renders as expected", () => {
    const wrapper = shallow(<SideBar />);
    expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
  });
});
