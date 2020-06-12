
export class DefaultGrammarRule {
    constructor(startTag, endTag, tag, attr = {}) {
        this.startTag = startTag;
        this.endTag = endTag;
        this.tag = tag;
        this.attr = attr;
    }
    render(text) {
        var attr = "";
        for(var i = 0 ; i < this.attr.attribute ; i++) attr += " " + this.attr.attribute[i][0] + "=" + this.attr.attribute[i][1];
        return {
            html: "<"+this.tag+attr+">" + text + "</"+this.tag+">" + (this.attr.newline ? "\n" : ""),
            pre: undefined,
            post: undefined
        };
    }
}
