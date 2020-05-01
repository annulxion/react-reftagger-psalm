import { useState, useEffect } from 'react';

const addScript = setScriptAdded => {
  setScriptAdded(true);
  const el = document.createElement('script');
  el.type = 'text/javascript';
  el.async = true;
  el.src = 'https://api.reftagger.com/v2/RefTagger.js';
   document.getElementsByTagName('head')[0].appendChild(el);
};

const addRefTagger = () => {
  window.refTagger = {
    _settings: {
      bibleVersion: "KJV",
      roundCorners: true,
      socialSharing: ["faithlife", "twitter", "facebook"],
      tooltipStyle: "dark"
    },
    get settings() {
      return this._settings;
    },
    set settings(value) {
      this._settings = value;
    },
  };
};

export const RefTagger = () => {
  const [scriptAdded, setScriptAdded] = useState(false);

  useEffect(() => {
    !scriptAdded && addScript(setScriptAdded);
    window && !window.refTagger && addRefTagger();
    window.refTagger && window.refTagger.tag && window.refTagger.tag();
    return () => window.refTagger.tag();
  }, []);

  return null;
};
