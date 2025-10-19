import { triggerCursorGlitchEscalating, triggerEditorGlitchEscalating } from "../lib/glitchEffects";
import * as vscode from 'vscode';

function glitchEffectProvider(startTime:number) {

  vscode.window.showInformationMessage('Tick')
  triggerEditorGlitchEscalating(startTime);
  triggerCursorGlitchEscalating(startTime);
}

export default glitchEffectProvider;