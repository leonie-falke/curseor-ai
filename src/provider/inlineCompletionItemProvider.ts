import * as vscode from 'vscode';
import codeCompletions from '../lib/codeCompletions';
import { VscApiLangInterface } from '../common/LangEnum';
import { getTriggers } from '../const';

let last_completion : (string|null) = null;
let last_pivot = 0;

function inlineCompletionItemProvider(): vscode.InlineCompletionItemProvider {
  const provider : vscode.InlineCompletionItemProvider = {

    provideInlineCompletionItems(document, position, context, token) {
      const prefix = document.lineAt(position.line).text.slice(0, position.character);

      if (!(document.languageId in VscApiLangInterface)) {
        return [];
      }

      const lang_enum = VscApiLangInterface[document.languageId as keyof typeof VscApiLangInterface];
      const triggers = getTriggers(lang_enum);

      let item;
      if (last_completion && prefix.endsWith(last_completion.slice(0, last_pivot+2))) {
        last_pivot++;
        item = last_completion.slice(last_pivot + 1);
      } else {
        const completions = codeCompletions(prefix, triggers.scatter, triggers.targets);

        if (completions.length === 0) {
          return []
        }

        const completion = completions[Math.floor(Math.random() * completions.length)];
        last_completion = completion.text;
        last_pivot = completion.pivot;
        item = completion.text.slice(completion.pivot+1);
      }

      if (token.isCancellationRequested) {
        return [];
      }

      return [new vscode.InlineCompletionItem(item, new vscode.Range(position, position))]
    }
  }
  return provider
}

export default inlineCompletionItemProvider;