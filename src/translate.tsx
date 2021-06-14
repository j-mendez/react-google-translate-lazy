/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/
import React, { memo, useCallback, Fragment } from "react";
import { useTranslator, clickTranslate } from "./utils";
import { GTranslateIcon } from "./icon";

const styles = {
  badge: {
    marginLeft: 6,
    marginRight: 6,
    background: "none",
    minWidth: 40,
    minHeight: 40,
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
  } as any,
};

const TranslateBadgeMain = ({
  inline,
  className,
  classes,
  onClick,
  component: Component,
}: {
  onClick?(e?: any): any;
  className?: string;
  inline?: boolean;
  component: any;
  classes?: {
    badge: any;
  };
}) => {
  const { setMessageListener } = useTranslator();
  const ariaT = "Translate page using google";
  const iconStyles = { color: "#959da5" };

  const onClickEvent = useCallback(async function onClickEvent(
    e: any
  ): Promise<void> {
    e.persist();
    await setMessageListener(e);
    setTimeout(() => {
      e.stopPropagation();
      clickTranslate(e);
      if (typeof onClick === "function") {
        onClick();
      }
    }, 220);
  },
  []);

  const Container = Component ? Component : "button";

  if (inline) {
    return (
      <Container
        onClick={onClickEvent}
        onMouseEnter={setMessageListener}
        className={className}
        style={{ display: "flex", alignItems: "center", fontSize: "1.05rem" }}
      >
        <Fragment>
          <GTranslateIcon style={{ marginRight: 12, ...iconStyles }} />
          Translate
        </Fragment>
      </Container>
    );
  }

  return (
    <Fragment>
      <Container
        onClick={onClickEvent}
        onMouseEnter={setMessageListener}
        aria-label={ariaT}
        style={styles.badge}
        className={`${className}${className ? " " + classes?.badge ?? "" : ""}`}
      >
        <GTranslateIcon style={iconStyles} />
      </Container>
      <div id="google_translate_element" style={styles.hidden} />
    </Fragment>
  );
};

export const TranslateBadge = memo(TranslateBadgeMain);
