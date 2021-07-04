/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { memo, Fragment, SyntheticEvent, FC } from "react";
import { useTranslator, clickTranslate } from "./utils";
import { GTranslateIcon } from "./icon";

interface Props {
  onClick?(e?: any): any;
  className?: string;
  inline?: boolean;
  component?: FC | "button";
  classes?: {
    badge: any;
  };
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}

const TranslateBadgeMain = ({
  inline,
  className,
  classes,
  onClick,
  component: Component = "button",
  style,
  containerStyle,
}: Props) => {
  const { setMessageListener } = useTranslator();
  const ariaT = "Translate page using google";
  const styles = {
    badge: {
      marginLeft: 6,
      marginRight: 6,
      background: "none",
      border: "none",
    },
    hidden: {
      border: "none",
      clip: "rect(1px 1px 1px 1px)",
      clipPath: "inset(50%)",
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      width: 1,
      height: 1,
    } as React.CSSProperties,
  };

  const onClickEvent = async (e: SyntheticEvent): Promise<void> => {
    await setMessageListener(e);
    setTimeout(() => {
      clickTranslate(e);
      if (typeof onClick === "function") {
        onClick();
      }
    }, 240);
  };

  const badgeClassName = classes?.badge ?? "";
  const containerClasses = `${className ?? ""}${
    className ? " " + badgeClassName : badgeClassName
  }`;

  const props = {
    onClick: onClickEvent,
    onMouseEnter: setMessageListener,
    "aria-label": ariaT,
    style: {
      ...styles.badge,
      ...containerStyle,
    },
    className: containerClasses,
  };

  if (inline) {
    return (
      <Component
        {...props}
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "1.05rem",
          ...props.style,
        }}
      >
        <Fragment>
          <GTranslateIcon style={{ marginRight: 12, ...style }} />
          Translate
        </Fragment>
      </Component>
    );
  }

  return (
    <Fragment>
      <Component {...props}>
        <GTranslateIcon style={style} />
      </Component>
      <div id="google_translate_element" style={styles.hidden} />
    </Fragment>
  );
};

export const TranslateBadge = memo(TranslateBadgeMain);
