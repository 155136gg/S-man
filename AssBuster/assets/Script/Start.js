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
        guide:{
            default:null,
            type: cc.Node
        }
    },

    onStartClick(){
        cc.director.loadScene("intro");
    },

    onGuideClick(){
        this.guide.y = 0;
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
            case cc.macro.KEY.enter:
            case cc.macro.KEY.space:
                this.guide.y = 600;
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.guide.on('touchstart', function (event) {
            this.guide.y = 600;
          }, this);
    },

    start () {

    },

    // update (dt) {},
});
