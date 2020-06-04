import {DefaultGrammarRule} from './engine/grammar/object/index.js';
import renderer from './engine/renderer/index.js';
import grammar from './engine/grammar/namu/0.0.1/index.js';

var testText = `
    ## Title 1
    ''WikiCore'' is perfectly working!
    Even '''Italic''' and ''bold'' are working fine.
`;

var rule = new DefaultGrammarRule('\'\'\'', '\'\'\'', 'b');

console.log(rule.render('blahblah'));

var render = new renderer('namu', '0.0.1', testText);
render.render();