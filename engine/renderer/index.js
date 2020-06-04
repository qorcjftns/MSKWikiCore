
import grammar from '../grammar/namu/0.0.1/index.js';

export default class Renderer {

    /**************************************
     *  Constructor
     **************************************/
    constructor(wikiType, version, wikiText) {
        this.wikiType = wikiType;
        this.version = version;
        this.wikiText = wikiText;
        this.loadGrammar();
    }

    loadGrammar() {
        this.grammar = grammar;
    }

    /**************************************
     *  Method Declarations
     **************************************/

    popString(string, count) {
        return string.substring(count, string.length - 1);
    }

    render() {
        // loop through characters
        // var wikiLength = this.wikiText.length;
        var processed = '';
        var htmlText = '';
        var tagsStack = [];
        var wikiText = this.wikiText;
        while(wikiText.length > 0) {
            var character = wikiText[0];
            // add character to queue
            processed += character;

            wikiText = this.popString(wikiText, 1); // skip 1 character (already added to queue);
            
            var startTag = this.checkStartTag(wikiText);
            if(startTag) {
                tagsStack.push(startTag);
                wikiText = this.popString(wikiText, startTag.startTag.length); // skip start tag
                processed += "(" + startTag.tag + ")";
            }

        }
        htmlText += processed;
        return htmlText;
    }
    checkStartTag(queue) {
        var tags = this.grammar.data;
        for(var i = 0 ; i < tags.length ; i++) {
            var startTag = tags[i].startTag;
            var startTagLength = startTag.length;
            var found = true;
            for(var j = 0 ; j < startTagLength && found ; j++) {
                if(queue[j] != startTag[j]) found = false;
            }
            if(found) {
                return tags[i];
            }
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

