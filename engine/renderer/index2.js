
import grammar from '../grammar/namu/0.0.1/index.js';

export default class Renderer {

    /**************************************
     *  Constructor
     **************************************/
    constructor(wikiType, version, wikiText) {
        this.wikiType = wikiType;
        this.version = version;
        this.wikiText = wikiText;
        this.structure = {};
        this.loadGrammar();
    }

    loadGrammar() {
        this.grammar = grammar;
    }

    /**************************************
     *  Method Declarations
     **************************************/

    popString(string, count) {
        return string.substring(count, string.length);
    }

    addPossibleStartTag(position, tag) {
        if(this.structure[position] == undefined) this.structure[position] = [];
        this.structure[position][0] = tag;
    }
    addPossibleEndTag(position, tag) {
        if(this.structure[position] == undefined) this.structure[position] = [];
        this.structure[position][1] = tag;
    }
    checkCompleteTag(tag) {
        for(var list in this.structure) {
            if(this.structure.hasOwnProperty(list)) {
                if(this.structure[list][0] === tag) {
                    return list;
                }
            }
        }
        return false;
    }

    render() {
        // loop through characters
        // var wikiLength = this.wikiText.length;
        var processed = '';
        var htmlText = '';
        var tagsStack = [];
        var wikiText = this.wikiText;
        var position = 0;
        while(wikiText.length > 0) {
            var character = wikiText[0];
            var found = false;

            var endTag = this.checkEndTag(wikiText, tagsStack);
            if(endTag) {
                tagsStack.pop(endTag);
                wikiText = this.popString(wikiText, endTag.endTag.length); // skip start tag
                processed += "</" + endTag.tag + ">";
                if(endTag.endTag.indexOf('\n') !== -1) processed += '\n';
                found = true;
                this.addPossibleEndTag(position, startTag);
            }
            var startTag = this.checkStartTag(wikiText);
            if(startTag) {
                tagsStack.push(startTag);
                wikiText = this.popString(wikiText, startTag.startTag.length); // skip start tag
                processed += "<" + startTag.tag + ">";
                found = true;
                this.addPossibleStartTag(position, startTag);
            }

            // add character to queue
            if(!found) {
                processed += character;
                wikiText = this.popString(wikiText, 1); // skip 1 character (already added to queue);
            }
            position += 1;
        }
        htmlText += processed;
        console.log(this.structure);
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
        for(var i = tags.length - 1 ; i >= 0 ; i--) {
            var endTag = tags[i].endTag;
            var endTagLength = endTag.length;
            var found = true;
            for(var j = 0 ; j < endTagLength && found ; j++) {
                if(queue[j] != endTag[j]) found = false;
            }
            if(found) {
                return tags[i];
            }
        }
        return false;
    }
}

