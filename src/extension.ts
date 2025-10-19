import * as vscode from 'vscode';
import documentChangeHandler from './handler/documentChangeHandler';
import { loadTriggers } from './root';

export function activate(context: vscode.ExtensionContext) {
	console.log("Welcome to Curseor-AI, the most powerful AI coding assistant in the world.");
	loadTriggers();
	const documentChangeDisposable = vscode.workspace.onDidChangeTextDocument(documentChangeHandler);
	context.subscriptions.push(documentChangeDisposable);
}

export function deactivate() {}
