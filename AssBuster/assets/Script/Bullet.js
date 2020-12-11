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
        pickupRadius:0,
        fallSpeed:0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    },

    update (dt) {
        this.node.y -= this.fallSpeed;
        if (this.getPlayerDistance() < this.pickupRadius) {
            // 调用收集行为
            this.onHit();
        }
        if( this.node.y <= -0.5*this.main.node.height){
            console.log("into pool");
            this.main.bulletPool.put(this.node);
        }
    },

    onHit: function() {
        // 当星星被收集时，调用 Game 脚本中的接口，生成一个新的星星
        this.main.changePlayerHp();
        // 然后销毁当前星星节点
        this.main.bulletPool.put(this.node);
    },

    getPlayerDistance: function () {
        // 根据 Player 节点位置判断距离
        var playerPos = this.main.player.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    }
});
