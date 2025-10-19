import * as vscode from 'vscode';
import { loadTriggers } from './root';
import inlineCompletionItemProvider from './lib/inlineCompletionItemProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log("Welcome to Curseor-AI, the most powerful AI coding assistant in the world.");
	loadTriggers();
	
	vscode.languages.registerInlineCompletionItemProvider(
    ["python", "javascript", "c", "shellscript"],
    inlineCompletionItemProvider()
  )
}

export function deactivate() {}
