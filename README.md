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

The result is computed with JavaScript's `eval` on the typed expression, which
is fine for a local toy but is not how you would evaluate untrusted input.

## Files

```
index.html   button grid and display
style.css    layout and styling (blurred wallpaper background)
script.js    input handling and evaluation
```

## Running

Open `index.html` in a browser. No server or install is needed.
