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
        backGround: {
            default:null,
            type:cc.Node
        },
        blackCover:{
            default:null,
            type:cc.Node
        },
        textWindow:{
            default:null,
            type:cc.Prefab
        },
        BgFrames: [cc.SpriteFrame]
    },

    resetGlobal() {
        Global = {
            endIndex: 0,
            enemyHp:1,
            playerHp:1,
            powerUpFlag:false
        };
    },
    // LIFE-CYCLE CALLBACKS:

    onSecPart(){
        var story = null;
        var nextProcess = null;

        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow);
        switch(Global.endIndex){
            case 0: //player lose
                this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[2];
                story = ["bbbbbbb","aaaaaa"];
                nextProcess = () => {
                    this.resetGlobal();
                    cc.director.loadScene("start");
                };
                break;
            case 1: //player win
                this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[3];
                story = ["ccccccc","ddddddd"];
                nextProcess = () => {

                    this.node.emit("thirdPart");
                };
                break;
        };

        this.myTextWindow.getComponent("TextWindow").setup(story, nextProcess);
    },

    onThirdPart(){
        this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[4];
        var story = ["dsssddsd"];

        this.myTextWindow.getComponent("TextWindow").setup(story, () => {
            this.myTextWindow.destroy();
            cc.tween(this.blackCover)
            .to(3,{opacity:255})
            .call(() => { this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[5]; })
            .delay(2)
            .to(3,{opacity:0})
            .call(() => {this.node.emit("fourthPart");})
            .start();
        });
    },

    onFourthPart(){
        var story = ["eeeeeeeeeee"];

        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow);
        this.myTextWindow.getComponent("TextWindow").setup(story, () => {
            this.resetGlobal();
            cc.director.loadScene("start");
        });
    },

    onLoad () {
        Global.endIndex = 1;
        this.node.once("secPart",this.onSecPart, this);
        this.node.once("thirdPart",this.onThirdPart, this);
        this.node.once("fourthPart",this.onFourthPart, this);
    },

    start () {
        cc.tween(this.backGround)
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[0];}).delay(2)
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[1];}).delay(2)
        .to(0, { scale: 2 })
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[0];}).delay(1)
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[1];}).delay(1)
        .to(0, { scale: 2.5 })
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[0];}).delay(0.5)
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[1];}).delay(0.5)
        .to(0, { scale: 3 })
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[0];}).delay(0.25)
        .call(()=>{this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[1];}).delay(0.25)
        .to(0, { scale: 1 })
        .call(()=>{this.backGround.getComponent("ShakeEffect").shakeRadius = 0;})
        .call(()=>{this.node.emit("secPart");})
        .start();

/*
        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow);
        switch(Global.endIndex){
            case 0: //player lose
                this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[2];
                this.end = ["bbbbbbb","aaaaaa"];
                break;
            case 1: //player win
                this.end = ["ccccccc","ddddddd"];
                break;
        };

        this.myTextWindow.getComponent("TextWindow").setup(this.end, () => {
            this.resetGlobal();
            cc.director.loadScene("start");
        });

        cc.tween(this.node).sequence(endFirst,).start();*/
    },

    // update (dt) {},
});
