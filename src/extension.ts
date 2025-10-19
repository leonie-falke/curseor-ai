import * as vscode from 'vscode';
import getInlineCompletionItemProvider from './lib/getInlineCompletionItemProvider';
import glitchEffectProvider from './provider/glitchEffectProvider';
import { CursedPanelProvider } from './provider/cursedPanelProvider';
import { VscApiLangInterface } from './common/LangEnum';
import { loadTriggers } from './const';

export function activate(context: vscode.ExtensionContext) {

  const startTime = Date.now();
	loadTriggers();

	vscode.languages.registerInlineCompletionItemProvider(
    Object.keys(VscApiLangInterface),
    getInlineCompletionItemProvider()
  )

  const cursedPanel = new CursedPanelProvider(context.extensionUri, startTime);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('cursedPanel', cursedPanel)
  );

  const glitchLoop = setInterval(() => glitchEffectProvider(startTime), 1000);
  context.subscriptions.push({ dispose: () => clearInterval(glitchLoop) });
}

export function deactivate() {}
