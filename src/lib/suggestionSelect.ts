import assert = require("assert");
import { TriggerScatter_, TriggerTargets_ } from "../common/TriggerMapping";

function ranSelect<T>(target:Array<T>): T {
  return target[Math.floor(Math.random() * target.length)];
}

const SUGGESTION_SELECT_INVALID_RETURN = { suggestion: null, pivot: 0 };

function suggestionSelect(line:string, triggerScatter:TriggerScatter_, triggerTargets:TriggerTargets_): { suggestion:(string|null); pivot:number } {

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

  // Randomly select one of the valid autocomplete options
  const trigger = ranSelect(triggers);

  const suggestion = ranSelect(triggerTargets[trigger.trigger]);
  const pivot = trigger.index

  return { suggestion, pivot };
}

export default suggestionSelect;