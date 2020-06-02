// Namuwiki grammar 0.0.1
import { DefaultGrammarObject } from '../../object';
var grammar = {
    'version': '0.0.1',
    'data': [
        new DefaultGrammarObject('\'\'\'', '\'\'\'', 'b'),
        new DefaultGrammarObject('\'\'', '\'\'', 'i'),
        new DefaultGrammarObject('~~', '~~', 'del'),
        new DefaultGrammarObject('--', '--', 'del'),
        new DefaultGrammarObject('__', '__', 'u'),
        new DefaultGrammarObject('^^', '^^', 'sup'),
        new DefaultGrammarObject(',,', ',,', 'sub'),
    ]
}