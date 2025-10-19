import { TriggerScatter_, TriggerTargets_ } from "../common/TriggerMapping";

function multiIndexOf(source:string, substring:string): Array<number> {
  let lastIndex = 0;
  const indices = [];

  while (1) {
    lastIndex = source.indexOf(substring, lastIndex + 1);
    if (lastIndex === -1) {
      break;
    } 
    indices.push(lastIndex);
  }
  return indices;
}

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

  let pivot = 0
  triggers = triggers.filter((x) => {
    return multiIndexOf(x, last_char).some(y => {
      if (line.endsWith(x.substring(0, y+1))) {
        pivot = y;
        return true;
      }
      return false;
    });
  })

  if (triggers.length == 0) {
    return SUGGESTION_SELECT_INVALID_RETURN;
  }

  // Randomly select one of the valid autocomplete options
  const trigger = ranSelect(triggers);
  const suggestion = ranSelect(triggerTargets[trigger]);

  return { suggestion, pivot };
}

export default suggestionSelect;

export {
  multiIndexOf
};