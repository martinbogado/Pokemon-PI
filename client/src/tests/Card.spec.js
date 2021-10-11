import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import Card from "../components/Card/Card.jsx";

configure({ adapter: new Adapter() });

describe("<Card />", () => {
  let wrapper;
  let name;
  let types
  beforeEach(() => {
    name = "pika2";
    types = ["fire","ghost"]
    wrapper = mount(<Card name={name} types={types} />);
  });

  it('deberia renderizar un "h3" que contenga el "name" que recibe por props', () => {
    expect(wrapper.contains(<h3>{name}</h3>)).toEqual(true);
  });
});
