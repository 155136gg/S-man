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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.directionType = {
            LEFT:-1, RIGHT:1
        }
        this.direction = this.directionType.RIGHT * this.moveSpeed;
    },

    start () {
        this.borderWidth = this.main.node.width/2 - this.node.width;
    },

    update (dt) {
        this.node.x += this.direction;
        if( Math.abs(this.node.x) >= this.borderWidth ){
            this.direction *= -1;
        }
    },
});
