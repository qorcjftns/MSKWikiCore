// Namuwiki grammar 0.0.1
import { DefaultGrammarRule } from '../../object/index.js';
var grammar = {
    'version': '0.0.1',
    'data': [
        new DefaultGrammarRule("'''", "'''", 'b'),
        new DefaultGrammarRule("''", "''", 'i'),
        new DefaultGrammarRule('~~', '~~', 'del'),
        new DefaultGrammarRule('--', '--', 'del'),
        new DefaultGrammarRule('__', '__', 'u'),
        new DefaultGrammarRule('^^', '^^', 'sup'),
        new DefaultGrammarRule(',,', ',,', 'sub'),
        new DefaultGrammarRule('## ', '\n', 'h1', {newline: true}),
        
    ]
}
export default grammar;