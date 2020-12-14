// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        heightScale:0,
        widthScale:0,
        content: {
            default: null,
            type: cc.Node
        },
        contentScale:0,
    },

    setContentText( text ){
        this.label.string = "";
        this.contentText = text;
        this.contentTextIndex = 0;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.height = this.node.parent.height * this.heightScale;
        this.node.width = this.node.parent.width * this.widthScale;
        this.node.x = 0;
        this.node.y = -0.4*this.node.parent.height + 0.5*this.node.height;
        this.content.height = this.node.height * this.contentScale;
        this.content.width = this.node.width * this.contentScale;

        this.label = this.content.getComponent(cc.Label);
        this.label.string = "";
        this.contentText = "";
        this.contentTextIndex = 0;
    },

    start () {
    },

    update (dt) {
        if( this.contentTextIndex < this.contentText.length ){
            this.label.string = this.label.string.concat(this.contentText.charAt(this.contentTextIndex));
            this.contentTextIndex++;
        }
    },
});
