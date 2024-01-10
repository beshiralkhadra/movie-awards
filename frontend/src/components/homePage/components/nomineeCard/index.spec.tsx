import React from "react";
import { shallow } from "enzyme";
import NomineeCard from "./NomineeCard";

describe("NomineeCard", () => {
  const mockProps = [
    {
      name: "test",
      description: "test",
      votes: 1,
      stars: ["test"],
      image_url: "test",
      release_date: new Date(),
      onSelect: jest.fn(),
      isSelected: false,
    },
  ];
  it("should render correctly", () => {
    const wrapper = shallow(<NomineeCard {...mockProps[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it("should be clickable", () => {
    const wrapper = shallow(<NomineeCard {...mockProps[0]} />);
    wrapper.find('[id="vote"]').simulate("click");
    expect(mockProps[0].onSelect).toHaveBeenCalled();
  });
});
