
class DefaultGrammarObject {
    constructor(startTag, endTag, tag, attr = []) {
        this.startTag = startTag;
        this.endTag = endTag;
        this.tag = tag;
        this.attr = attr;
    }
    render(text) {
        var attr = "";
        for(var i = 0 ; i < this.attr ; i++) attr += " " + this.attr[i][0] + "=" + this.attr[i][1];
        return "<"+this.tag+attr+">" + text + "</"+this.tag+">";
    }
}

export { DefaultGrammarObject };