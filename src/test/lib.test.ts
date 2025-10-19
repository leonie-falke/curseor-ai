import * as assert from 'assert';
import * as vscode from 'vscode';
import suggestionSelect  from '../lib/suggestionSelect';
import { multiIndexOf } from '../lib/suggestionSelect';
import { TriggerTargets_ } from '../common/TriggerMapping';

suite("lib unittest", () => {
  vscode.window.showInformationMessage("Running unit tests for lib module.")

  test("multiIndexOf", () => {
    const str = "12112121";
    const expected = [1, 4, 6];
    const indices = multiIndexOf(str, "2");
    assert.deepStrictEqual(indices, expected);
  })
  
  test("suggestionSelect full key", () => {
    const target = "test";
    const trigger = "test";
    const expected = "test 1234";
    
    const scatter = {
      "t": [trigger],
      "e": [trigger],
      "s": [trigger],
    };
    const map: TriggerTargets_ =  {};
    map[trigger] = [expected];

    const result = suggestionSelect(target, scatter, map);

    assert.strictEqual(result.suggestion, expected);
    assert.strictEqual(result.pivot, 3);
  })

  test("suggestionSelect partial key", () => {
    const target = "te";
    const trigger = "test";
    const expected = "test 1234";

    const scatter = {
      "t": [trigger],
      "e": [trigger],
      "s": [trigger],
    };
    const map: TriggerTargets_ =  {};
    map[trigger] = [expected];

    const result = suggestionSelect(target, scatter, map);

    assert.strictEqual(result.suggestion, expected);
    assert.strictEqual(result.pivot, 1)
  })

  test("suggestionSelect no match", () => {
    const target = "rest";
    const trigger = "test";

    const scatter = {
      "t": [trigger],
      "e": [trigger],
      "s": [trigger],
    };
    const map: TriggerTargets_ = {};
    map[trigger] = [" "];

    const result = suggestionSelect(target, scatter, map);

    assert.strictEqual(result.suggestion, null);
    assert.strictEqual(result.pivot, 0);
  })
})