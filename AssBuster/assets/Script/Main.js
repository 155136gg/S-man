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
        bullet:{
            default: null,
            type: cc.Prefab
        },
        player:{
            default: null,
            type: cc.Node
        },
        enemy:{
            default: null,
            type: cc.Node
        },
        hp:{//TODO
            default: null,
            type: cc.Node
        },
        bulletCreatePeriod:0,
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        //this.spawnNewBullet();
        this.bulletPool = new cc.NodePool();
        this.bulletCreateCount = 0;
        this.enemy.getComponent('Enemy').main = this;
    },

    start () {
    },

    update (dt) {
        if( this.bulletCreateCount == this.bulletCreatePeriod){
            this.createBullet();
            this.bulletCreateCount = 0;
        } else {
            this.bulletCreateCount++;
        }
    },

    createBullet: function () {
        let bullet = null;
        if (this.bulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            console.log("reuse bullet");
            bullet = this.bulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            console.log("create bullet");
            bullet = cc.instantiate(this.bullet);
            bullet.getComponent('Bullet').main = this;
        }
        bullet.parent = this.node; // 将生成的敌人加入节点树
        bullet.setPosition(this.getNewBulletPosition());
        //bullet.getComponent('Enemy').init(); //接下来就可以调用 enemy 身上的脚本进行初始化
    },

    getNewBulletPosition: function () {
        // 返回星星坐标
        return cc.v2(this.enemy.x, this.enemy.y - this.enemy.height);
    },

    changePlayerHp: function(){
        this.player.getComponent("Player").setblinkSec(3);
    }
});
