
class Renderer {

    /**************************************
     *  Constructor
     **************************************/
    constructor(grammar, version, wikiText) {
        this.grammar = grammar;
        this.version = version;
        this.wikiText = wikiText;
    }

    loadGrammar() {
        this.grammar = import('../grammar/' + this.grammar + '/' + this.version);
    }

    /**************************************
     *  Method Declarations
     **************************************/
    render() {
        // loop through characters
        var wikiLength = this.wikiText.length;
        var textQueue = '';
        var tagsQueue = [];
        for (var index = 0; index < wikiLength; i++) {
            var character = this.wikiText[index];
            // add character to queue
            textQueue += character;
            
            var checkTag;
            

        }
    }
    checkGrammarStart(queue) {
        for(var i = 0 ; i < this.grammar.data.length ; i++) {
            if(queue == this.grammar.data[i].beginTag) return this.grammar.data[i];
        }
        return false;
    }
    checkGrammarEnd(queue) {
        for(var i = 0 ; i < this.grammar.data.length ; i++) {
            if(queue == this.grammar.data[i].endTag) return this.grammar.data[i];
        }
        return false;
    }
}

