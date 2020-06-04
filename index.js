import renderer from './engine/renderer/index.js';

var testText1 = `
## Title 1
'''WikiCore''' is perfectly working!
Even ''Italic'' and '''bold''' are working fine.
`;
var testText2 = `
## ''' ''test'' '''
`;

var testText = testText2;

var render = new renderer('namu', '0.0.1', testText);
console.log("Original Text: ");
console.log(testText);
console.log("Converted Text: ");
console.log(render.render());