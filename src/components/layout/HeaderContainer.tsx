import { memo, ReactElement } from "react";
import "./HeaderContainer.css";
import DrawerMenu from "@components/layout/DrawerMenu";
import CartButton from "@components/features/cart/CartButton";
import { isVisualUser } from "@utils/Credentials";

interface LeftComponentProps {
  leftComponent: ReactElement;
}

interface RightComponentProps {
  rightComponent: ReactElement;
}

interface TitleProps {
  title: string;
}

interface HeaderContainerProps {
  customClass?: string;
  secondaryLeftComponent?: ReactElement;
  secondaryRightComponent?: ReactElement;
  secondaryTitle?: string;
}

// Move component definitions outside with proper types
const LeftComponent = memo<LeftComponentProps>(({ leftComponent }) => (
  <div className="left_component">{leftComponent}</div>
));

const RightComponent = memo<RightComponentProps>(({ rightComponent }) => (
  <div className="right_component">{rightComponent}</div>
));

const Title = memo<TitleProps>(({ title }) => (
  <span className="title" data-test="title">
    {title}
  </span>
));

const HeaderContainer = memo<HeaderContainerProps>(({
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

// Add display names for better debugging
LeftComponent.displayName = 'LeftComponent';
RightComponent.displayName = 'RightComponent';
Title.displayName = 'Title';
HeaderContainer.displayName = 'HeaderContainer';

export default HeaderContainer;