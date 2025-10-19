import { LangEnumType_ } from "./LangEnum";

type ScatterGroup_ = { trigger:string, index:number }

type TriggerScatter_ = Record<string, Array<ScatterGroup_>>;

type TriggerTargets_ = Record<string, Array<string>>;

type LangTriggers_ = { scatter:TriggerScatter_, targets:TriggerTargets_}

type TriggerLangMapping_ = Record<LangEnumType_, LangTriggers_>

export {
  TriggerScatter_,
  TriggerTargets_,
  LangTriggers_,
  TriggerLangMapping_
};