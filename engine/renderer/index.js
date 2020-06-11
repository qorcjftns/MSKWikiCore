
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
                    this.structure.push([possibleTag[i][0], position - wikiTag.endTag.length, wikiTag, []]);

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

    render() {
        console.log(this.wikiText.length);
        this.analyze();
        this.structureToTree();
        console.log(this.structure);
        
    }

    renderText(text, tag, offset) {
        
    }

}

