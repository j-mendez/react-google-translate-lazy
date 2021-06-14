/*
 * Copyright (c) A11yWatch, LLC. and its affiliates.
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 **/

import { useEffect } from "react";
import { loadTranslate } from "./load-translate";
import { inlineTranslate } from './gscript'


const useTranslator = (): any => {
  const readyChange = (event: any) => {
    if (event.target.readyState === "complete") {
      document.removeEventListener("readystatechange", readyChange);
      requestAnimationFrame(loadTranslate)
    }
  };
  
  const receiveMessage = (event: any) => {
    if (
      event.data === "TRX_FINISHED" &&
      event.origin !== window?.location?.origin
    ) {
      document.addEventListener("readystatechange", readyChange);
      window.removeEventListener("message", receiveMessage);
    }
  };
  
  const setMessageListener = (_: any, cb?: () => any) => {
    if (typeof document !== "undefined") {
      const translateLoaded = document.querySelector(
        `script[data-name="lazy-google-translate"]`
      );
  
      if (translateLoaded) {
        loadTranslate();
        return;
      }
  
      const script = document.createElement("script");
      script.innerHTML = inlineTranslate;
      script.dataset.name = "lazy-google-translate"
      script.defer = true;
      document.body.appendChild(script);

      window?.addEventListener("message", receiveMessage, false);
      script.addEventListener ("load", loadTranslate, false);
    }
  };

  useEffect(() => {
    return () => {
      window?.removeEventListener("message", receiveMessage);
      document?.removeEventListener("readystatechange", readyChange);
    };
  }, []);

  return {
    setMessageListener,
  };
};

export { useTranslator };
