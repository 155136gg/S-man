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
        endLogo:{
            default:null,
            type:cc.Node
        },
        textWindow:{
            default:null,
            type:cc.Prefab
        },
        playerSound:{
            default: null,
            type: cc.AudioClip
        },
        enemySound:{
            default: null,
            type: cc.AudioClip
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
                story = ["....現在的你是沒法背負這一切的","重新來過吧!"];
                nextProcess = () => {
                    this.myTextWindow.destroy();
                    this.onFinish();
                    //this.resetGlobal();
                    //cc.director.loadScene("start");
                };
                break;
            case 1: //player win
                this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[3];
                story = [".....好!我等像你這樣身具勇氣與實力的人很久了","我的夢想就託付給你了"];
                nextProcess = () => {

                    this.node.emit("thirdPart");
                };
                break;
        };

        this.myTextWindow.getComponent("TextWindow").setup(story, nextProcess);
    },

    onThirdPart(){
        this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[4];
        var story = ["用自己的〇喚醒沉睡的人們，讓他們發現被統治者掩蓋在虛假穩定下的真正惡臭吧!","永別了，兄弟!","...","......"];

        this.myTextWindow.getComponent("TextWindow").setup(story, () => {
            this.myTextWindow.destroy();
            cc.tween(this.blackCover)
            .to(3,{opacity:255})
            .call(() => { this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[5]; }) // TODO
            .delay(2)
            .to(3,{opacity:0})
            .call(() => {this.node.emit("fourthPart");})
            .start();
        });
    },

    onFourthPart(){
        var story = [
            "雖然不久前的暴徒在熱心民眾的協助下已被逮捕，近期又出現手法相似的暴徒。",
            "不排除有非法組織的存在，國家不會容許破壞和平的分子存在!","......"
        ];

        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow);
        this.myTextWindow.getComponent("TextWindow").setup(story, () => {
            this.myTextWindow.destroy();
            this.onFinish();
            //this.resetGlobal();
            //cc.director.loadScene("start");
        });
    },

    onFinish() {
        cc.tween(this.endLogo)
        .call(()=> {this.endLogo.getComponent(cc.Label).string = "END " + Global.endIndex;})
        .to(2, {opacity:255})
        .delay(3)
        .to(2, {opacity:0})
        .call(()=>{
            this.resetGlobal();
            cc.director.loadScene("finish");
        })
        .start();
    },

    onLoad () {
        this.node.once("secPart",this.onSecPart, this);
        this.node.once("thirdPart",this.onThirdPart, this);
        this.node.once("fourthPart",this.onFourthPart, this);
    },

    onSound( who ){
        switch(who){
            case 0://player
                if( cc.audioEngine.getState(this.enemyID) != cc.audioEngine.AudioState.ERROR ){
                    cc.audioEngine.stop(this.enemyID);
                }
                this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[0];
                this.playerID = cc.audioEngine.play(this.playerSound, true, 1);
                break;
            case 1:
                if( cc.audioEngine.getState(this.playerID) != cc.audioEngine.AudioState.ERROR ){
                    cc.audioEngine.stop(this.playerID);
                }
                this.backGround.getComponent(cc.Sprite).spriteFrame = this.BgFrames[1];
                this.enemyID = cc.audioEngine.play(this.enemySound, true, 1);
                break;
        }
    },

    start () {
        this.playerID = null;
        this.enemyID = null;
        cc.tween(this.backGround)
        .call(()=>{this.onSound(0);}).delay(2)
        .call(()=>{this.onSound(1);}).delay(2)
        .to(0, { scale: 2 })
        .call(()=>{this.onSound(0);}).delay(1)
        .call(()=>{this.onSound(1);}).delay(1)
        .to(0, { scale: 2.5 })
        .call(()=>{this.onSound(0);}).delay(0.5)
        .call(()=>{this.onSound(1);}).delay(0.5)
        .to(0, { scale: 3 })
        .call(()=>{this.onSound(0);}).delay(0.25)
        .call(()=>{this.onSound(1);}).delay(0.25)
        .to(0, { scale: 1 })
        .call(()=>{
            if( cc.audioEngine.getState(this.enemyID) != cc.audioEngine.AudioState.ERROR ){
                cc.audioEngine.stop(this.enemyID);
            }
            this.backGround.getComponent("ShakeEffect").shakeRadius = 0;
        })
        .call(()=>{this.node.emit("secPart");})
        .start();
    },

    // update (dt) {},
});
