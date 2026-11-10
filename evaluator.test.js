const test = require('node:test')
const assert = require('node:assert/strict')
const { evaluate } = require('./evaluator.js')

test('basic arithmetic and precedence', () => {
    assert.equal(evaluate('1+2'), 3)
    assert.equal(evaluate('2+3*4'), 14)
    assert.equal(evaluate('10-4-3'), 3)
    assert.equal(evaluate('100/10/5'), 2)
    assert.equal(evaluate('7%4'), 3)
    assert.equal(evaluate('2+7%4*2'), 8)
})

test('parentheses', () => {
    assert.equal(evaluate('(2+3)*4'), 20)
    assert.equal(evaluate('2*(3+(4-1))'), 12)
})

test('decimals', () => {
    assert.equal(evaluate('0.5+0.25'), 0.75)
    assert.equal(evaluate('5+.5'), 5.5)
    assert.equal(evaluate('5.'), 5)
})

test('unary minus, e.g. continuing from a negative result', () => {
    assert.equal(evaluate('-5+3'), -2)
    assert.equal(evaluate('2*-3'), -6)
    assert.equal(evaluate('-(2+1)'), -3)
})

test('result strings can be reused', () => {
    assert.equal(evaluate('1e+21+1'), 1e21)
    assert.equal(evaluate('Infinity+1'), Infinity)
    assert.ok(Number.isNaN(evaluate('NaN+1')))
})

test('matches JS division by zero', () => {
    assert.equal(evaluate('1/0'), Infinity)
})

test('invalid input throws', () => {
    for (const bad of ['', '5+', '*5', '1.2.3', '(1+2', '1+2)', '()', '2 3', 'alert(1)', 'process', '1**2', '1;2']) {
        assert.throws(() => evaluate(bad), SyntaxError, bad)
    }
})
