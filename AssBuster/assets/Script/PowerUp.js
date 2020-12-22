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
        cc.log(this.myTextWindow);
        var testStory = ["qweqwe"];
        //this.myTextWindow = cc.instantiate(this.textWindow);
        //this.node.addChild(this.myTextWindow);
        this.myTextWindow.getComponent("TextWindow").setup(testStory, () => {
            this.background.active = true;
            cc.tween(this.enemy)
            .blink(5,30, {easing:"quadIn"})
            .call(()=>{ 
                cc.log(this);
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
    },

    start () {
        this.myTextWindow = cc.instantiate(this.textWindow);
        this.node.addChild(this.myTextWindow); // 将生成的敌人加入节点树
        var testStory = ["aaaaa","sdsdsdsd"];
        this.myTextWindow.getComponent("TextWindow").setup(testStory, () => {
            //this.node.emit("onPowerup");
            this.node.dispatchEvent( new cc.Event.EventCustom('onPowerup', true) )
        });
    },

    // update (dt) {},
});
