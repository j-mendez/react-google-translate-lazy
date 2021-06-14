import React from "react";
import { action } from "@storybook/addon-actions";
import { withA11y } from "@storybook/addon-a11y";
import { TranslateBadge as Button } from "./translate";

export const Accessible = () => <Button onClick={action("clicked")} />;

export const Default = () => <Button />;

export default {
  title: "Button",
  decorators: [withA11y],
  component: Button,
};
