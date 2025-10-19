import { LangTriggers_, TriggerLangMapping_ } from "./common/TriggerMapping";
import { LangEnumType_, StaticSourceLangInterface } from "./common/LangEnum";

const triggerMapping : TriggerLangMapping_ = {}
let messages : Array<string> = [];

function loadTriggers() {
  const source_data : Record<string, Record<string, Array<string>>> = require("../static/suggestions.json");

  Object.keys(source_data).forEach((_lang) => {
    const lang_value = source_data[_lang];
    const lang_enum = StaticSourceLangInterface[_lang as keyof typeof StaticSourceLangInterface];

    triggerMapping[lang_enum] = { scatter: {}, targets: {} };
    
    // Map the autocomplete triggers to all of their characters
    Object.keys(lang_value).forEach((_trigger) => {
      
      // The array needs to be in reverse order. This allows the engine to easily find the largest overlap and discard further matches.
      for (let i = _trigger.length; i >= 0; i--) {
        let char = _trigger[i];

        if (triggerMapping[lang_enum].scatter[char] === undefined) {
          triggerMapping[lang_enum].scatter[char] = [];
        }
        triggerMapping[lang_enum].scatter[char].push({ trigger: _trigger, index: i });
      }
    });

    triggerMapping[lang_enum].targets = lang_value;
  })
}

function loadMessages() {
  messages = require("../static/msg.json");
}

function getTriggers(lang:LangEnumType_) : LangTriggers_ {
  return triggerMapping[lang];
}

function getMessages() {
  return messages;
}

export {
  loadTriggers,
  loadMessages,
  getTriggers,
  getMessages
};

