
export class DefaultGrammarRule {
    constructor(startTag, endTag, tag, attr = {}) {
        this.startTag = startTag;
        this.endTag = endTag;
        this.tag = tag;
        this.attr = attr;
    }
    render(text, options = {}) {
        var attr = "";
        for(var i = 0 ; i < this.attr.attribute ; i++) attr += " " + this.attr.attribute[i][0] + "=" + this.attr.attribute[i][1];
        return {
            html: "<"+this.tag+attr+">" + text + "</"+this.tag+">" + (this.attr.newline ? "\n" : ""),
            pre: undefined,
            post: undefined
        };
    }
}



export class ListGrammarRule {
    constructor(startTag, endTag, tag, attr = {}) {
        this.startTag = startTag;
        this.endTag = endTag;
        this.tag = tag;
        this.attr = attr;
    }

    /**
     * Render List as ul / li form
     * @param {String} text String data of current list item (li) 
     * @param {Object} options 
     *      - options.type: determine if this item is first or last: 1 if first, -1 if last, 0 otherwise.
     */
    render(text, options = {}) {
        // TODO - render

    }
}

var grammar = new ListGrammarRule("\n * ", "\n", "ul", {attribute: ['class', 'wiki-list']});
grammar.render("test 1", {order: 1}); // -> <ul class="wiki-list"><li>test 1</li>
grammar.render("test 2", {order: 0}); // -> <li>test 2</li>
grammar.render("test 3", {order: 0}); // -> <li>test 3</li>
grammar.render("test 4", {order: 0}); // -> <li>test 4</li>
grammar.render("test 5", {order: -1}); // -> <li>test 5</li></ul>