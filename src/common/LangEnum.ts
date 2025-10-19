
const LangEnum = Object.freeze({
  Bash: 0,
  C: 1,
  Javascript: 2,
  Python: 1,
});

const VscApiLangInterface = {
  'shellscript': LangEnum.Bash,
  'c': LangEnum.C,
  'javascript': LangEnum.Javascript,
  'python': LangEnum.Python,
};

const StaticSourceLangInterface = {
  'bash': LangEnum.Bash,
  'c': LangEnum.C,
  'javascript': LangEnum.Javascript,
  'python': LangEnum.Python
};

type LangEnumType_ = number;

export {
  LangEnum,
  VscApiLangInterface,
  StaticSourceLangInterface,
  LangEnumType_
};