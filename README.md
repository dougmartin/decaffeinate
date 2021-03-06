# decaffeinate [![Build Status](https://travis-ci.org/decaffeinate/decaffeinate.svg?branch=master)](https://travis-ci.org/decaffeinate/decaffeinate) [![npm](https://img.shields.io/npm/v/decaffeinate.svg)](https://www.npmjs.com/package/decaffeinate)

Goodbye CoffeeScript, hello JavaScript!

JavaScript is the future, in part thanks to CoffeeScript. Now that it has served
its purpose, it's time to move on. Convert your CoffeeScript source to modern
JavaScript with decaffeinate.

## Install

```
$ npm install -g decaffeinate
```

See the [Conversion Guide][conversion-guide].

## Status

**Mostly complete.** Check the [issues] page for outstanding bugs and incomplete
features. This project may be relied upon for production use, but no guarantees
are made.

## Goals

* Fully automated conversion of the CoffeeScript language to modern JavaScript.
* Preserve whitespace, formatting, and comments as much as possible to allow
  a full one-time conversion of your CoffeeScript source code.
* Provide helpful error messages when it encounters an unsupported language
  construct.

## Usage

```
$ decaffeinate input.coffee
input.coffee → input.js
```

Options:
* `--keep-commonjs`: Do not convert `require` and `module.exports` to `import`
  and `export`.
* `--prefer-const`: Use `const` when possible in output code.
* `--loose-default-params`: Convert CS default params to JS default params.
* `--loose-for-expressions`: Do not wrap expression loop targets in `Array.from`.
* `--loose-for-of`: Do not wrap JS `for...of` loop targets in `Array.from`.
* `--loose-includes`: Do not wrap in `Array.from` when converting `in` to `includes`.
* `--allow-invalid-constructors`: Don't error when constructors use `this`
  before super or omit the `super` call in a subclass.
* `--enable-babel-constructor-workaround`: Use a hacky babel-specific workaround
  to allow `this` before `super` in constructors.

For more usages examples, see the output of `decaffeinate --help`.

[issues]: https://github.com/decaffeinate/decaffeinate/issues
[conversion-guide]: https://github.com/decaffeinate/decaffeinate/blob/master/docs/conversion-guide.md
