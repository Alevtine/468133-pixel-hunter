import {assert} from 'chai';
import * as game from './game-data.js';


describe(`Changing levels`, () => {
  it(`should be 3 if level is 3`, () => {
    assert.equal(game.turnLevel(3), 3);
  });
  it(`should be maximum if level >= max level`, () => {
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
  it(`should be 0 if no lives and answer is wrong`, () => {
    assert.equal(game.calculateLives(0, -1), 0);
  });
  it(`should be 3 if all lives and answer is correct`, () => {
    assert.equal(game.calculateLives(3, 1), 3);
  });
  it(`should be 2 if 2 lives and answer is correct`, () => {
    assert.equal(game.calculateLives(2, 1), 2);
  });
  it(`should be 2 if all lives and answer is wrong`, () => {
    assert.equal(game.calculateLives(3, 0), 2);
  });
});

describe(`Getting score`, () => {
  it(`should be -1 when less than 10 answers are present`, () => {
    assert.equal(game.getScore([], 3), -1);
  });
  it(`should be -1 when less than 10 answers are present`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `fast`, `slow`, `correct`], 3), -1);
  });
  it(`should be -1 when lives < 0`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `fast`, `slow`, `correct`, `fast`, `correct`, `slow`, `fast`, `slow`], -1), -1);
  });
  it(`should be -1 when no lives left`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `fast`, `slow`, `correct`, `fast`, `correct`, `slow`, `fast`, `slow`], 0), -1);
  });
  it(`should be -1 when lives qtty < 0`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `fast`, `slow`, `correct`, `fast`, `correct`, `slow`, `fast`, `slow`], -1), -1);
  });
  it(`should be -1 when lives qtty > 3`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `fast`, `slow`, `correct`, `fast`, `correct`, `slow`, `fast`, `slow`], 4), -1);
  });
  it(`should be 1150 when time is average, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`slow`, `fast`, `slow`, `fast`, `slow`, `fast`, `slow`, `fast`, `slow`, `fast`], 3), 1150);
  });
  it(`should be 1150 when time is average, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`, `correct`], 3), 1150);
  });
  it(`should be 1650 when time is fast, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`, `fast`], 3), 1650);
  });
  it(`should be 650 when time is slow, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`, `slow`], 3), 650);
  });
  it(`should be 900 when answers are slow and correct, all answers are present, all lives are saved`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `correct`, `slow`, `correct`, `slow`, `correct`, `slow`, `correct`, `slow`], 3), 900);
  });
  it(`should be 1000 when answers are slow, fast and correct, all answers are present, 1 live is left`, () => {
    assert.equal(game.getScore([`correct`, `slow`, `fast`, `slow`, `correct`, `fast`, `correct`, `slow`, `fast`, `slow`], 1), 1000);
  });
});

describe(`Checking time`, () => {
  it(`should be 24 when time is 25 sec`, () => {
    assert.equal(game.startTimer(25), 24);
  });
  it(`should see a string - Time is out - when time is 0 sec`, () => {
    assert.equal(game.startTimer(0), `Time is out`);
  });
  it(`should see a string - Time is out -  when time is less than 0 sec`, () => {
    assert.equal(game.startTimer(-1), `Time is out`);
  });
});
