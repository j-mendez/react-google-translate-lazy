import React from "react";
import { create } from "react-test-renderer";
import { TranslateBadge as Button } from "../src";

describe("Button component", () => {
  test("Matches the snapshot", () => {
    const button = create(<Button />);
    expect(button.toJSON()).toMatchSnapshot();
  });
});
