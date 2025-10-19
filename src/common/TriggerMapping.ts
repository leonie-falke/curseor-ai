import { LangEnumType_ } from "./LangEnum";

type TriggerScatter_ = Record<string, Array<string>>;

type TriggerTargets_ = Record<string, Array<string>>;

type TriggerLangMapping_ = Record<LangEnumType_, {scatter:TriggerScatter_, targets:TriggerTargets_}>

export {
  TriggerScatter_,
  TriggerTargets_,
  TriggerLangMapping_
};