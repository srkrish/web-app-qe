import React from "react";
import HeaderContainer from "../../components/layout/HeaderContainer";
import Button, { BUTTON_TYPES } from "../../components/common/Button";
import { withRouter } from "storybook-addon-react-router-v6";

export default {
  title: "SwagLabs/Headers",
  component: HeaderContainer,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => (
  <>
    <HeaderContainer {...args} />
    <p>
      Resize the preview to see the mobile view. The Sauce Bot will disappear in
      mobile view.
    </p>
  </>
);

export const HeaderDefault = Template.bind({});
HeaderDefault.args = {};

export const HeaderLeftComponent = Template.bind({});
HeaderLeftComponent.args = {
  secondaryLeftComponent: (
    <Button
      label="Back to Products"
      onClick={() => {}}
      type={BUTTON_TYPES.BACK}
    />
  ),
};

export const HeaderTitle = Template.bind({});
HeaderTitle.args = {
  secondaryTitle: "Title only",
};

export const HeaderTitleBotRight = Template.bind({});
HeaderTitleBotRight.args = {
  secondaryHeaderBot: true,
  secondaryRightComponent: (
    <Button
      label="Go to something"
      onClick={() => {}}
      type={BUTTON_TYPES.ACTION}
    />
  ),
  secondaryTitle: "Title and Bot",
};
