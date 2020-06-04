import renderer from './engine/renderer/index.js';

var testText = `
    ## Title 1
    '''WikiCore''' is perfectly working!
    Even ''Italic'' and '''bold''' are working fine.
`;

var render = new renderer('namu', '0.0.1', testText);
console.log(testText);
console.log(render.render());