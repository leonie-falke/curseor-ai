import * as vscode from 'vscode'
import suggestionSelect from '../lib/suggestionSelect';
import { LangEnumType_, VscApiLangInterface } from '../common/LangEnum';
import { getTriggers } from '../root';
import { LangTriggers_, TriggerLangMapping_ } from '../common/TriggerMapping';

function contentChangeHandler(event:vscode.TextDocumentContentChangeEvent, doc:vscode.TextDocument, triggers:LangTriggers_) {
  const pos = event.range.end;
  const line = pos.line;
  const character = pos.character;

  const line_content = doc.lineAt(line).text;

  // Ensure cursor is at end of line
  if (line_content.length !== character+1) {
    return;
  }

  const suggestion = suggestionSelect(line_content, triggers.scatter, triggers.targets)

  vscode.window.showInformationMessage(`Suggestion: ${suggestion.suggestion}`);
}

function documentChangeHandler(event:vscode.TextDocumentChangeEvent) {

  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    return;
  }

  if (event.document !== editor.document) {
    return;
  }

  const document = event.document;
  const changes = event.contentChanges;

  const lang_id = document.languageId;

  if (!(lang_id in VscApiLangInterface)) {
    return
  }

  const lang = VscApiLangInterface[lang_id as keyof typeof VscApiLangInterface];
  const lang_triggers = getTriggers(lang);

  changes.forEach((x) => contentChangeHandler(x, document, lang_triggers));
}

export default documentChangeHandler