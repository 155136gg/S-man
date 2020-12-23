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
        },
        backGround:{
            default:null,
            type:cc.Sprite
        },
        BgFrames: [cc.SpriteFrame]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.story1 = [
            "「各位民眾請留意暴徒出沒，如有目擊可疑人士請速通知警方...」",
            "...",
            "......"
        ];
        this.story2 = [
            "我這一身功夫，看來是時候派上用場了。",
            "今天我就要制服暴徒，守護社會的和平！"
        ];
        this.story3 = [
            "我還以為會有更多人呢，憑你一人以為有辦法阻止我嗎?",
            "就讓我來會會你吧!"
        ];
        this.node.once("toIntro2", ()=>{
            this.myTextWindow.getComponent("TextWindow").setup(this.story2, () => {
                this.backGround.spriteFrame = this.BgFrames[1];
                this.node.emit("toIntro3");
            });
        });
        this.node.once("toIntro3", ()=>{
            this.myTextWindow.getComponent("TextWindow").setup(this.story3, () => {cc.director.loadScene("main");});
        });
    },

    start () {
        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow); // 将生成的敌人加入节点树

        this.myTextWindow.getComponent("TextWindow")
        .setup(this.story1, () => {
            this.backGround.spriteFrame = this.BgFrames[0];
            this.node.emit("toIntro2");
        });
    },

    // update (dt) {},
});
