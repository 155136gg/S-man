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
            default: null,
            type: cc.Prefab
        },
        background:{
            default: null,
            type: cc.Node
        },
        backgroundSound:{
            default: null,
            type: cc.AudioClip
        },
        enemy:{
            default: null,
            type: cc.Node
        },
        powerupSprite:{
            default: null,
            type: cc.SpriteFrame
        }
    },

    onPowerup(){
        var testStory = ["喔喔喔喔喔喔!!!!!!"];
        //this.myTextWindow = cc.instantiate(this.textWindow);
        //this.node.addChild(this.myTextWindow);
        this.myTextWindow.getComponent("TextWindow").setup(testStory, () => {
            this.background.active = true;
            cc.tween(this.enemy)
            .blink(5,30, {easing:"quadIn"})
            .call(()=>{ 
                this.enemy.getComponent(cc.Sprite).spriteFrame = this.powerupSprite;
            })
            .delay(3)
            .call(()=>{cc.director.loadScene("main");})
            .start();
        });
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.once("onPowerup",this.onPowerup, this);
        this.bgmID = cc.audioEngine.play(this.backgroundSound, true, 1);
    },

    start () {
        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow); // 将生成的敌人加入节点树
        var testStory = ["沒想到你還挺行的，看來我也該拿出真本事啦!"];
        this.myTextWindow.getComponent("TextWindow").setup(testStory, () => {
            //this.node.emit("onPowerup");
            this.node.dispatchEvent( new cc.Event.EventCustom('onPowerup', true) )
        });
    },

    // update (dt) {},

    onDestroy: function () {
        cc.audioEngine.stop(this.bgmID);
    },
});
