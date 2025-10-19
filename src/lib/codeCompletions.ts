import { Completion_ } from "../common/Completion";
import { TriggerScatter_, TriggerTargets_ } from "../common/TriggerMapping";

function codeCompletions(line:string, triggerScatter:TriggerScatter_, triggerTargets:TriggerTargets_): Array<Completion_> {

  const last_char = line.at(-1);

  if (!last_char) {
    return [];
  }

  let triggers = triggerScatter[last_char];

  if (!triggers) {
    return [];
  }

  // seen_triggers ensures that only the match with the longest overlap is chosen.
  const seen_triggers = new Set();
  triggers = triggers.filter((_trigger) => {
    let res = line.endsWith(_trigger.trigger.substring(0, _trigger.index+1)) && !seen_triggers.has(_trigger.trigger);
    if (res) {
      seen_triggers.add(_trigger.trigger);
    }
    return res;
  })

  const completion_array : Array<Completion_> = [];

  for (let _trigger of triggers) {
    for (let _text of triggerTargets[_trigger.trigger]) {
      completion_array.push({ 
        text: _text, 
        pivot: _trigger.index 
      });
    }
  }

  return completion_array
}

export default codeCompletions;