
export default class Renderer {

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
        var tagsStack = [];
        for (var index = 0; index < wikiLength; index++) {
            var character = this.wikiText[index];
            // add character to queue
            textQueue += character;
            
            var startTag = this.checkStartTag(textQueue);
            if(!startTag) {
                tagsStack.push(startTag);
            }

        }
    }
    checkStartTag(queue) {
        var tags = this.grammar.data;
        for(var i = 0 ; i < tags.length ; i++) {
            var startTag = tags[i].startTag;
            var startTagLength = startTag.length;
            var found = true;
            for(var j = startTagLength - 1 ; j >= 0 && found ; j--) {
                if(queue[queue.length - 1] != startTag[j]) found = false;
            }
            if(found) return tags[i];
        }
        return false;
    }
    checkEndTag(queue, tags) {
        for(var i = 0 ; i < tags.length ; i++) {
            var startTag = tags[i].startTag;
            var startTagLength = startTag.length;
            var found = true;
            for(var j = startTagLength - 1 ; j >= 0 && found ; j--) {
                if(queue[queue.length - 1] != startTag[j]) found = false;
            }
            if(found) return tags[i];
        }
        return false;
    }
}

