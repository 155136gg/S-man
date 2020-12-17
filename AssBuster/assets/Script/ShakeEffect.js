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
        shakeRadius:0
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var randX = (Math.random() - 0.5) * this.shakeRadius * 2;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = (Math.random() - 0.5) * this.shakeRadius * 2;
        // 根据屏幕宽度，随机得到一个星星 x 坐标
        // 返回星星坐标
        this.node.setPosition(cc.v2(randX, randY));
    },
});
