import React, { memo } from "react";
import PropTypes from "prop-types";
import "./HeaderContainer.css";
import DrawerMenu from "components/layout/DrawerMenu";
import CartButton from "components/features/cart/CartButton";
import { isVisualUser } from "utils/Credentials";

// Move component definitions outside
const LeftComponent = memo(({ leftComponent }) => (
  <div className="left_component">{leftComponent}</div>
));

const RightComponent = memo(({ rightComponent }) => (
  <div className="right_component">{rightComponent}</div>
));

const Title = memo(({ title }) => (
  <span className="title" data-test="title">
    {title}
  </span>
));

const HeaderContainer = memo(({
  customClass,
  secondaryLeftComponent,
  secondaryRightComponent,
  secondaryTitle,
}) => {
  console.log('HeaderContainer render called with props:', {
    customClass,
    hasLeftComponent: !!secondaryLeftComponent,
    hasRightComponent: !!secondaryRightComponent,
    secondaryTitle
  });

  const extraClass = customClass ? ` ${customClass}` : "";
  const isVisualFailure = isVisualUser();
  const shoppingCartContainerClass = `shopping_cart_container${
    isVisualFailure ? " visual_failure" : ""
  }`;

  return (
    <div
      id="header_container"
      className={`header_container${extraClass}`}
      data-test="header-container"
    >
      <div className="primary_header" data-test="primary-header">
        <div id="menu_button_container">
          <DrawerMenu />
        </div>
        <div className="header_label">
          <div className="app_logo">Swag Labs</div>
        </div>
        <div
          id="shopping_cart_container"
          className={shoppingCartContainerClass}
        >
          <CartButton />
        </div>
      </div>
      <div className="header_secondary_container" data-test="secondary-header">
        {secondaryLeftComponent && (
          <LeftComponent leftComponent={secondaryLeftComponent} />
        )}
        {secondaryTitle && <Title title={secondaryTitle} />}
        {secondaryRightComponent && (
          <RightComponent rightComponent={secondaryRightComponent} />
        )}
      </div>
    </div>
  );
});

// Add PropTypes for the internal components
LeftComponent.propTypes = {
  leftComponent: PropTypes.element.isRequired,
};

RightComponent.propTypes = {
  rightComponent: PropTypes.element.isRequired,
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

HeaderContainer.propTypes = {
  customClass: PropTypes.string,
  secondaryLeftComponent: PropTypes.element,
  secondaryRightComponent: PropTypes.element,
  secondaryTitle: PropTypes.string,
};

HeaderContainer.defaultProps = {
  customClass: undefined,
  secondaryLeftComponent: undefined,
  secondaryRightComponent: undefined,
  secondaryTitle: undefined,
};

export default HeaderContainer;