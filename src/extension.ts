import * as vscode from 'vscode';
import { loadTriggers } from './const';
import getInlineCompletionItemProvider from './lib/getInlineCompletionItemProvider';
import { VscApiLangInterface } from './common/LangEnum';

export function activate(context: vscode.ExtensionContext) {
	console.log("Welcome to Curseor-AI, the most powerful AI coding assistant in the world.");
	loadTriggers();

	vscode.languages.registerInlineCompletionItemProvider(
    Object.keys(VscApiLangInterface),
    getInlineCompletionItemProvider()
  )
}

export function deactivate() {}
