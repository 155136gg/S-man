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
        moveSpeed:0,
    },


    setblinkSec: function( sec ){
        if( this.blinkframe == 0 ){
            this.nodamageFlag = true;
            this.blinkframe = sec * 60;
            this.blinkcount = 0;
        }
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.directionType = {
            LEFT:-1, RIGHT:1
        }
        this.direction = this.directionType.RIGHT;
        this.nodamageFlag = false;
        this.blinkframe = 0;
    },

    start () {
        this.borderWidth = this.main.node.width/2 - this.node.width;
    },

    update (dt) {
        this.node.x += this.direction * this.moveSpeed;
        if( Math.abs(this.node.x) >= this.borderWidth ){
            this.direction *= -1;
        }

        // If need blink
        if( this.blinkframe > 0 ){
            if( this.blinkcount %  30 < 15 ){
                this.node.opacity = 0;
            } else {
                this.node.opacity = 255;
            }
            this.blinkcount++;
            if( this.blinkcount == this.blinkframe ){
                this.blinkframe = 0;
                this.nodamageFlag = false;
            }
        }
    },
});
