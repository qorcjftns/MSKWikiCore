
import grammar from '../grammar/namu/0.0.1/index.js';

export default class Renderer {

    /**************************************
     *  Constructor
     **************************************/
    constructor(wikiType, version, wikiText) {
        this.wikiType = wikiType;
        this.version = version;
        this.wikiText = wikiText;
        this.structure = [];
        this.loadGrammar();
    }

    loadGrammar() {
        this.grammar = grammar;
    }

    checkTag(text, tag) {
        for(var i = 0 ; i < tag.length ; i++) {
            if(i >= text.length || text[i] !== tag[i]) return false;
        }
        return true;
    }

    analyze() {
        var wiki = this.wikiText;
        var processed = '';
        var tags = this.grammar.data;
        var possibleTag = [];
        var position = 0;
        while(wiki.length > 0) {
            processed += wiki[0];
            wiki = wiki.substring(1);
            position += 1;

            // loop through possible end tag
            for(var i = 0 ; i < possibleTag.length ; i++) {
                var wikiTag = possibleTag[i][1];
                if(this.checkTag(wiki, wikiTag.endTag)) {
                    this.structure.push([possibleTag[i][0], position, wikiTag, []]);
                    // console.log("end tag found: ("+wikiTag.tag+") " + position + "");

                    possibleTag.pop(wikiTag);

                    wiki = wiki.substring(wikiTag.endTag.length - 1);
                    position += wikiTag.endTag.length - 1;
                }
            }

            // loop through possible start tag
            for(var i = 0 ; i < tags.length ; i++) {
                var wikiTag = tags[i];
                if(this.checkTag(wiki, wikiTag.startTag)) {
                    possibleTag.push([position, wikiTag]);
                    // console.log("start tag found: ("+wikiTag.tag+") " + position + "");

                    wiki = wiki.substring(wikiTag.startTag.length - 1);
                    position += wikiTag.startTag.length - 1;
                }
            }
        }

        // sort structure by its start tag position
        this.structure = this.structure.sort(function(a, b) { return a[0] - b[0]; });
    }

    addToTree(tree, item) {
        for(var i = 0 ; i < tree.length ; i++) {
            if(tree[i][0] < item[0] && item[1] < tree[i][1]) { // parent found
                var added = this.addToTree(tree[i][3], item);
                tree[i][3] = added;
                return tree;
            }
        }
        // not found OR tree length is 0
        tree[tree.length] = item;
        return tree;
    }

    structureToTree() {
        var tree = [];
        for(var i = 0 ; i < this.structure.length ; i++) {
            tree = this.addToTree(tree, this.structure[i]);
        }
        this.structure = tree;
    }
    printStructure(structure, pre = "") {
        for(var i = 0 ; i < structure.length ; i++) {
            console.log(pre + structure[i][0] + " ~ " + structure[i][1] + " : " + structure[i][2].tag);
            this.printStructure(structure[i][3], pre + " " );
        }
    }

    render() {
        this.analyze();
        this.structureToTree();
        // console.log("total length: " + this.wikiText.length);
        // this.printStructure(this.structure);

        return this.renderText(this.wikiText, this.structure, 0);
        
    }

    renderText(text, taglist, offset) {
        var converted = "";
        var last_pos = 0;
        for(var i = 0 ; i < taglist.length ; i++) {
            var tag = taglist[i];
            var start = tag[0] + tag[2].startTag.length - offset;
            var end = tag[1] - offset;

            // console.log("rendering : (" + text + ")");
            // console.log("       tag: " + tag);
            
            // render
            var content = text.substring(start, end);
            content = tag[2].render(this.renderText(content, tag[3], offset + start)).html;
            // console.log("result    : (" + content + ")");

            converted += text.substring(last_pos, start - tag[2].startTag.length);
            converted += content;

            last_pos = end + tag[2].endTag.length;

        }
        converted += text.substring(last_pos, text.length);
        return converted;
    }

}

