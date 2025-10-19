import * as vscode from 'vscode';
import inlineCompletionItemProvider from './provider/inlineCompletionItemProvider';
import glitchEffectProvider from './provider/glitchEffectProvider';
import { CursedPanelProvider } from './provider/cursedPanelProvider';
import { VscApiLangInterface } from './common/LangEnum';
import { loadMessages, loadTriggers } from './const';
import { messageProvider } from './provider/messageProvider';

export function activate(context: vscode.ExtensionContext) {

  const startTime = Date.now();
	loadTriggers();
  loadMessages();

	vscode.languages.registerInlineCompletionItemProvider(
    Object.keys(VscApiLangInterface),
    inlineCompletionItemProvider()
  );

  const cursedPanel = new CursedPanelProvider(context.extensionUri, startTime);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('cursedPanel', cursedPanel)
  );

  const glitchLoop = setInterval(() => glitchEffectProvider(startTime), 1000);
  const messageLoop = setInterval(messageProvider, 10000);

  vscode.window.showInformationMessage('Curseor AI ready. Welcome to the singularity.')

  context.subscriptions.push({ dispose: () => clearInterval(glitchLoop) });
  context.subscriptions.push({ dispose: () => clearInterval(messageLoop) });
}

export function deactivate() {}
