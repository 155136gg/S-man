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
        scene:{
            default:null,
            type:cc.Sprite
        },
        sceneSprite:{
            default: null,
            type: cc.SpriteFrame
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.story1 = [
            "「午間快訊，屎哥再度出沒，呼籲民眾減少開車外出，並錯開到公家機關辦事的時間...」",
            "...",
            "..."
        ];
        this.story2 = [
            "轉眼間也已習武十余年，看來是時候派上用場了。",
            "今天我就要制服暴徒，替　天　行　道　！"
        ];
        this.node.once("toSence2", ()=>{
            this.myTextWindow = cc.instantiate(this.textWindow);
            this.node.addChild(this.myTextWindow);
            this.myTextWindow.getComponent("TextWindow").setup(this.story2, () => {cc.director.loadScene("main");});
        });
    },

    start () {
        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow); // 将生成的敌人加入节点树

        this.myTextWindow.getComponent("TextWindow")
        .setup(this.story1, () => {
            this.scene.spriteFrame = this.sceneSprite;
            this.node.emit("toSence2");
        });
        /*cc.tween(this)
        .call(() => { this.myTextWindow.getComponent("TextWindow").setup(this.story1, () => {this.scene.spriteFrame = this.sceneSprite;}); })
        .call(() => { this.myTextWindow.getComponent("TextWindow").setup(this.story2, () => {cc.director.loadScene("main");});})
        .start()*/
/*
        const promise = new Promise((resolve)=>{resolve();});
        promise
        .then(()=>{this.myTextWindow.getComponent("TextWindow").setup(this.story1, () => {this.scene.spriteFrame = this.sceneSprite;});})
        .then(()=>{this.myTextWindow.getComponent("TextWindow").setup(this.story2, () => {cc.director.loadScene("main");});});*/
    },

    // update (dt) {},
});
