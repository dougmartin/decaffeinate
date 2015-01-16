import parse from './utils/parse';
import traverse from './utils/traverse';
import MagicString from 'magic-string';
import patchThis from './patchers/patchThis';
import patchPrototypeAccess from './patchers/patchPrototypeAccess';
import patchCallParens from './patchers/patchCallParens';
import patchCommas from './patchers/patchCommas';
import patchDeclarations from './patchers/patchDeclarations';


/** @typedef {{commas: boolean, callParens: boolean, functionParens: boolean, this: boolean, prototypeAccess: boolean, declarations: boolean}} */
var ConvertOptions;


/**
 * Decaffeinate CoffeeScript source code by adding optional punctuation.
 *
 * @param source
 * @param {{ConvertOptions}=} options
 * @returns {string}
 */
export function convert(source, options) {
  var ast = parse(source, { raw: true });
  var patcher = new MagicString(source);

  const commas = (options && ('commas' in options)) ? options.commas : true;
  const functionParens = (options && ('functionParens' in options)) ? options.functionParens : true;
  const callParens = (options && ('callParens' in options)) ? options.callParens : true;
  const _this = (options && ('this' in options)) ? options.this : true;
  const prototypeAccess = (options && ('prototypeAccess' in options)) ? options.prototypeAccess : true;
  const declarations = (options && ('declarations' in options)) ? options.declarations : true;

  traverse(ast, function(node) {
    if (_this) {
      patchThis(node, patcher);
    }

    if (prototypeAccess) {
      patchPrototypeAccess(node, patcher);
    }

    if (callParens) {
      patchCallParens(node, patcher);
    }

    if (commas) {
      patchCommas(node, patcher);
    }

    if (declarations) {
      patchDeclarations(node, patcher);
    }
  });

  return patcher.toString();
}