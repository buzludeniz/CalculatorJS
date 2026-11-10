// Safe arithmetic evaluator (shunting-yard). Replaces eval().
// Supports: + - * / % (JS semantics, % is remainder), parentheses,
// decimals, unary +/-, and the number strings JS can print for results
// (exponent form such as 1e+21, Infinity, NaN) so a result can be reused.

const BINARY = {
    '+': { prec: 1, fn: (a, b) => a + b },
    '-': { prec: 1, fn: (a, b) => a - b },
    '*': { prec: 2, fn: (a, b) => a * b },
    '/': { prec: 2, fn: (a, b) => a / b },
    '%': { prec: 2, fn: (a, b) => a % b },
}
const UNARY_PREC = 3

function tokenize(input) {
    const tokens = []
    const re = /\s*(?:(\d+\.?\d*(?:e[+-]?\d+)?|\.\d+(?:e[+-]?\d+)?|Infinity|NaN)|([-+*/%()])|(\S))/gy
    let m
    while (re.lastIndex < input.length && (m = re.exec(input)) !== null) {
        if (m[1] !== undefined) tokens.push({ type: 'num', value: Number(m[1]) })
        else if (m[2] !== undefined) tokens.push({ type: 'op', value: m[2] })
        else throw new SyntaxError('Unexpected character: ' + m[3])
    }
    return tokens
}

// Convert tokens to reverse Polish notation.
function toRpn(tokens) {
    const out = []
    const stack = []
    let expectOperand = true // true at start, after '(' and after an operator

    for (const t of tokens) {
        if (t.type === 'num') {
            if (!expectOperand) throw new SyntaxError('Unexpected number')
            out.push(t)
            expectOperand = false
        } else if (t.value === '(') {
            if (!expectOperand) throw new SyntaxError('Unexpected (')
            stack.push(t)
        } else if (t.value === ')') {
            if (expectOperand) throw new SyntaxError('Unexpected )')
            while (stack.length && stack[stack.length - 1].value !== '(') out.push(stack.pop())
            if (!stack.length) throw new SyntaxError('Unbalanced )')
            stack.pop()
        } else if (expectOperand) {
            // unary + or -
            if (t.value !== '-' && t.value !== '+') throw new SyntaxError('Unexpected operator ' + t.value)
            stack.push({ type: 'unary', value: t.value })
        } else {
            const op = BINARY[t.value]
            while (stack.length) {
                const top = stack[stack.length - 1]
                if (top.value === '(') break
                const topPrec = top.type === 'unary' ? UNARY_PREC : BINARY[top.value].prec
                if (topPrec >= op.prec) out.push(stack.pop())
                else break
            }
            stack.push(t)
            expectOperand = true
        }
    }
    if (expectOperand) throw new SyntaxError('Unexpected end of expression')
    while (stack.length) {
        const t = stack.pop()
        if (t.value === '(') throw new SyntaxError('Unbalanced (')
        out.push(t)
    }
    return out
}

function evaluate(input) {
    const rpn = toRpn(tokenize(String(input)))
    const stack = []
    for (const t of rpn) {
        if (t.type === 'num') stack.push(t.value)
        else if (t.type === 'unary') {
            const a = stack.pop()
            stack.push(t.value === '-' ? -a : a)
        } else {
            const b = stack.pop()
            const a = stack.pop()
            stack.push(BINARY[t.value].fn(a, b))
        }
    }
    return stack[0]
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { evaluate }
}
