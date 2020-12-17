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
        contentBox: {
            default: null,
            type: cc.Node
        },
        contentScale:0,
    },

    setup( textArray, endProcess ){
        this.contentAll = textArray;
        this.contentAllIndex = 0;
        this.endProcess = endProcess;
        this.showContent(this.contentAll[this.contentAllIndex]);
    },

    showContent( text ){
        this.label.string = "";
        this.content = text;
        this.contentIndex = 0;
        this.contentAllIndex++;
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.enter:
            case cc.macro.KEY.space:
                if( this.contentAllIndex < this.contentAll.length ){
                    this.showContent(this.contentAll[this.contentAllIndex]);
                } else {
                    if(this.endProcess){
                        this.endProcess();
                    }
                    this.node.destroy();
                }
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.height = this.node.parent.height * this.heightScale;
        this.node.width = this.node.parent.width * this.widthScale;
        this.node.x = 0;
        this.node.y = -0.4*this.node.parent.height + 0.5*this.node.height;
        this.contentBox.height = this.node.height * this.contentScale;
        this.contentBox.width = this.node.width * this.contentScale;

        this.label = this.contentBox.getComponent(cc.Label);
        this.contentAll = "";
        this.contentAllIndex = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start () {
    },

    update (dt) {
        if( this.contentIndex < this.content.length ){
            this.label.string = this.label.string.concat(this.content.charAt(this.contentIndex));
            this.contentIndex++;
        }
    },
});
