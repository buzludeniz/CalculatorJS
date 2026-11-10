# CalculatorJS

A small browser calculator in plain HTML, CSS and JavaScript, with no build
step and no dependencies.

## Features

- Digits, decimal point, and the operators `+ - * / %`
- Clear (`AC`) and delete-last-character (`DEL`)
- A two-line display: the expression being typed and the result
- Input guards: no leading `.`, no double `.`, no two operators in a row, no
  operator on an empty expression
- Pressing an operator after a result continues the calculation from that result
- Invalid expressions show `Error` instead of throwing

The result is computed by a small shunting-yard evaluator (`evaluator.js`), not
`eval`, so only numbers, `+ - * / %` and parentheses are ever interpreted.
Pressing `=` on an empty expression does nothing.

## Files

```
index.html   button grid and display
style.css    layout and styling (blurred wallpaper background)
wallpaper.jpg  background image (1920x1200, ~135 KB)
script.js    input handling
evaluator.js safe expression evaluator (shunting-yard)
evaluator.test.js  tests, run with `node --test`
```

## Tests

```
node --test
```

## Running

Open `index.html` in a browser. No server or install is needed.
