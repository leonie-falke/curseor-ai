import * as vscode from 'vscode';
import { CursedPanelProvider } from './cursedPanelProvider';

export function activate(context: vscode.ExtensionContext) {
  const startTime = Date.now();

  const cursedPanel = new CursedPanelProvider(context.extensionUri, startTime);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider('cursedPanel', cursedPanel)
  );

  const glitchLoop = setInterval(() => {
    triggerEditorGlitchEscalating(startTime);
    triggerCursorGlitchEscalating(startTime);
  }, 120000); 
  context.subscriptions.push({ dispose: () => clearInterval(glitchLoop) });
}

export function deactivate() {}


function getGlitchFactor(startTime: number): number {
  const elapsed = Date.now() - startTime;
  return 1 + Math.min((elapsed / 600000) * 4, 4); // Skala 1–5
}


function triggerEditorGlitchEscalating(startTime: number) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {return;}


  const factor = getGlitchFactor(startTime);
  const decoType = vscode.window.createTextEditorDecorationType({
    backgroundColor: getRandomColor(0.08 * factor),
    color: getRandomColor(1),
    fontStyle: Math.random() > 0.5 ? 'italic' : 'normal'
  });

  const lineCount = editor.document.lineCount;
  const numLines = Math.min(Math.floor(4 * factor), lineCount);
  const ranges = [];

  for (let i = 0; i < numLines; i++) {
    const line = Math.floor(Math.random() * lineCount);
    ranges.push(editor.document.lineAt(line).range);
  }

  editor.setDecorations(decoType, ranges);
  setTimeout(() => decoType.dispose(), 150 * factor);
}


function triggerCursorGlitchEscalating(startTime: number) {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {return;}

  const factor = getGlitchFactor(startTime);
  const line = editor.selection.active.line;

  const deco = vscode.window.createTextEditorDecorationType({
    borderWidth: `${factor}px`,
    borderStyle: 'solid',
    borderColor: getRandomColor(1)
  });

  editor.setDecorations(deco, [editor.document.lineAt(line).range]);
  setTimeout(() => deco.dispose(), 200 * factor);
}


function getRandomColor(alpha = 1) {
  const colors = ['#ff7f50', '#ffa500', '#ffcc66', '#d9d9d9'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  return alpha < 1 ? `${color}${Math.floor(alpha * 255).toString(16)}` : color;
}
