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
        textWindow:{
            default:null,
            type:cc.Prefab
        }
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.enter:
            case cc.macro.KEY.space:
                if( this.storyIndex < this.testStory.length ){
                    this.myTextWindow.getComponent("TextWindow").setContentText(this.testStory[this.storyIndex]);
                    this.storyIndex++;
                } else {
                    cc.director.loadScene("start");
                }
                break;
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    },

    start () {
        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow); // 将生成的敌人加入节点树
        this.testStory = ["abc","def","ghi"];
        this.myTextWindow.getComponent("TextWindow").setContentText(this.testStory[0]);
        this.storyIndex = 1;
    },

    // update (dt) {},
});
