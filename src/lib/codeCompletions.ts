import assert = require("assert");
import { TriggerScatter_, TriggerTargets_ } from "../common/TriggerMapping";

function ranSelect<T>(target:Array<T>): T {
  return target[Math.floor(Math.random() * target.length)];
}

const SUGGESTION_SELECT_INVALID_RETURN : Array<string> = [];

function codeCompletions(line:string, triggerScatter:TriggerScatter_, triggerTargets:TriggerTargets_): Array<string> {

  const last_char = line.at(-1);

  if (!last_char) {
    return SUGGESTION_SELECT_INVALID_RETURN;
  }

  let triggers = triggerScatter[last_char];

  if (!triggers) {
    return SUGGESTION_SELECT_INVALID_RETURN;
  }

  // Seen ensures that only the match with the longest overlap is chosen.
  const seen = new Set()
  triggers = triggers.filter((_trigger) => {
    let res = line.endsWith(_trigger.trigger.substring(0, _trigger.index+1)) && !seen.has(_trigger.trigger);
    if (res) seen.add(_trigger.trigger);
    return res;
  })

  if (triggers.length == 0) {
    return SUGGESTION_SELECT_INVALID_RETURN;
  }

  const completion_array : Array<string> = [];

  for (let _trigger of triggers) {
    for (let _text of triggerTargets[_trigger.trigger]) {
      completion_array.push(_text.slice(_trigger.index+1))
    }
  }

  return completion_array
}

export default codeCompletions;