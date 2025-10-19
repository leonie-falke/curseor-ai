import * as vscode from 'vscode';
import { getMessages } from '../const';

function messageProvider() {
  const messages = getMessages();
  const message = messages[Math.floor(Math.random() * messages.length)];
  vscode.window.showInformationMessage(message);
}

export {
  messageProvider
}