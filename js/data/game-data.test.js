import {assert} from 'chai';
import * as game from './game-data.js';


describe(`Changing levels`, () => {
  it(`should be 3 if level is 3`, () => {
    assert.equal(game.turnLevel(3), 3);
  });
  it(`shuold be maximum if level >= max level`, () => {
    assert.equal(game.turnLevel(10), 10);
    assert.equal(game.turnLevel(11), 10);
  });
  it(`should be 1 if level <= min level`, () => {
    assert.equal(game.turnLevel(0), 1);
    assert.equal(game.turnLevel(1), 1);
    assert.equal(game.turnLevel(-1), 1);
  });
});

describe(`Lives left`, () => {
  it(`should be 0 if no lives but answer is correct`, () => {
    assert.equal(game.calculateLives(1, 0), 0);
  });
  it(`should be 3 if all lives and answer is correct`, () => {
    assert.equal(game.calculateLives(3, 2), 3);
  });
  it(`should be -1 if no lives and answer is wrong`, () => {
    assert.equal(game.calculateLives(0, 0), -1);
  });
});

describe(`Getting score`, () => {
  it(`should be -1 when less than 10 answers are present`, () => {
    assert.equal(game.getScore([], 3), -1);
  });
  it(`should be 1150 when time is average, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`slow`, `fast`, `slow`, `fast`, `slow`, `fast`, `slow`, `fast`, `slow`, `fast`], 3), 1150);
  });
  it(`should be 1150 when time is average, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`default`, `default`, `default`, `default`, `default`, `default`, `default`, `default`, `default`, `default`], 3), 1150);
  });
  it(`should be 1650 when time is fast, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`], 3), 1650);
  });
  it(`should be 650 when time is slow, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`], 3), 650);
  });
  it(`should be 900 when answers are slow and default, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`default`, `slow`, `default`, `slow`, `default`, `slow`, `default`, `slow`, `default`, `slow`], 3), 900);
  });
});
