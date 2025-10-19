import * as assert from 'assert';
import * as vscode from 'vscode';
import codeCompletions  from '../src/lib/codeCompletions';
import { TriggerTargets_ } from '../src/common/TriggerMapping';

suite("suggestSelect unittest", () => {
  vscode.window.showInformationMessage("Running unit tests for lib module.")

  const TRIGGER = "test";
  const EXPECTED = "test 1234"

  const SCATTER = {
    "t": [{trigger:TRIGGER, index:3}, {trigger:TRIGGER, index:0}],
    "e": [{trigger:TRIGGER, index:1}],
    "s": [{trigger:TRIGGER, index:2}]
  }
  const TRIGGER_TARGETS : TriggerTargets_= {};
  TRIGGER_TARGETS[TRIGGER] = [EXPECTED];

  test("suggestionSelect simple match", () => {
    const target = "test";
    const result = codeCompletions(target, SCATTER, TRIGGER_TARGETS);
    assert.deepStrictEqual(result, [' 1234'])
  })
  
  test("suggestionSelect full match", () => {
    const target = "This is a test";
    const result = codeCompletions(target, SCATTER, TRIGGER_TARGETS);
    assert.deepStrictEqual(result, [' 1234'])
  })

  test("suggestionSelect partial match", () => {
    const target = "This is a t";
    const result = codeCompletions(target, SCATTER, TRIGGER_TARGETS);
    assert.deepStrictEqual(result, ['est 1234'])
  })

  test("suggestionSelect no match", () => {
    const target = "This is also a tesd";
    const result = codeCompletions(target, SCATTER, TRIGGER_TARGETS);
    assert.deepStrictEqual(result, []);
  })
})