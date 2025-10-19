import { TriggerLangMapping_ } from "./common/TriggerMapping";
import { LangEnumType_, StaticSourceLangInterface } from "./common/LangEnum";

const triggerMapping : TriggerLangMapping_ = {}

function loadTriggers() {
  const source_data : Record<string, Record<string, Array<string>>> = require("../static/suggestions.json");

  Object.keys(source_data).forEach((_lang) => {
    const lang_value = source_data[_lang];
    const lang_enum = StaticSourceLangInterface[_lang as keyof typeof StaticSourceLangInterface];

    triggerMapping[lang_enum] = { scatter: {}, targets: {} };
    
    // Map the autocomplete triggers to all of their characters
    Object.keys(lang_value).forEach((_trigger) => {
      const scatter = new Set(_trigger);
      
      for (let char of scatter) {
        if (triggerMapping[lang_enum].scatter[char] === undefined) {
          triggerMapping[lang_enum].scatter[char] = [];
        }
        triggerMapping[lang_enum].scatter[char].push(char);
      }
    });

    triggerMapping[lang_enum].targets = lang_value;
  })
}

function getTriggers(lang:LangEnumType_) : TriggerLangMapping_ {
  return triggerMapping[lang];
}

export {
  loadTriggers,
  getTriggers
};

