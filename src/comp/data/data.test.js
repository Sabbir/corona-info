import React from "react";
import { shallow } from "enzyme";
import Data from "./data";

describe("Data", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Data />);
    expect(wrapper).toMatchSnapshot();
  });
});
