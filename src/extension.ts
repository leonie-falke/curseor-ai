import * as vscode from 'vscode';
import { CursedPanelProvider } from './provider/cursedPanelProvider';
import '../media/glitch.css';
import glitchEffectProvider from './provider/glitchEffectProvider';

export function activate(context: vscode.ExtensionContext) {
  const startTime = Date.now();

  const cursedPanel = new CursedPanelProvider(context.extensionUri, startTime);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('cursedPanel', cursedPanel)
  );

  const glitchLoop = setInterval(() => glitchEffectProvider(startTime), 1000);
  context.subscriptions.push({ dispose: () => clearInterval(glitchLoop) });
}

export function deactivate() {}
