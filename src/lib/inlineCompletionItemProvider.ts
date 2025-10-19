import * as vscode from 'vscode';
import codeCompletions from './codeCompletions';
import { VscApiLangInterface } from '../common/LangEnum';
import { getTriggers } from '../root';

function inlineCompletionItemProvider(): vscode.InlineCompletionItemProvider {
  const provider : vscode.InlineCompletionItemProvider = {

    provideInlineCompletionItems(document, position, context, token) {
      const prefix = document.lineAt(position.line).text.slice(0, position.character);

      if (!(document.languageId in VscApiLangInterface)) {
        return [];
      }

      const lang_enum = VscApiLangInterface[document.languageId as keyof typeof VscApiLangInterface];
      const triggers = getTriggers(lang_enum);
      const completions = codeCompletions(prefix, triggers.scatter, triggers.targets);

      if (completions.length === 0) {
        return []
      }

      const items = []

      for (let _text of completions) {
        items.push(new vscode.InlineCompletionItem(_text, new vscode.Range(position, position)))
      }

      if (token.isCancellationRequested) {
        return []
      }

      return items;
    }
  }
  return provider
}

export default inlineCompletionItemProvider;