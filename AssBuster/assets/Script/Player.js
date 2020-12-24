cc.Class({
    extends: cc.Component,

    properties: {
        /*label: {
            default: null,
            type: cc.Label
        },
        // defaults, set visually when attaching this script to the Canvas
        text: 'Hello, World!',*/
		jumpHight:0,
        jumpDuration:0,
        speed:0,
        spriteA:{
            default:null,
            type: cc.SpriteFrame
        },
        spriteB:{
            default:null,
            type: cc.SpriteFrame
        }
    },

    jumpAction: function(){
        
        var up = cc.tween().by(this.jumpDuration, {y:this.jumpHight}, {easing:'sineOut'});
        var down = cc.tween().by(this.jumpDuration, {y:-this.jumpHight}, {easing:'sineIn'});
        //return cc.tween().repeatForever(cc.tween().sequence(up,down));
        return cc.tween().sequence(up,down);
        /*return cc.tween()
                .by(this.jumpDuration, {y:this.jumpHight}, {easing:'sineOut'})
                .by(this.jumpDuration, {y:-this.jumpHight}, {easing:'sineIn'})
                .start();*/
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = true;
                break;
            case cc.macro.KEY.enter:
            case cc.macro.KEY.space:
                if( !this.jumpFlag ){
                    cc.tween(this.node)
                    .call(() => { this.jumpFlag = true; })
                    .then(this.jumpAction())
                    .call(() => { this.jumpFlag = false; })
                    .start()
                }
               
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
        }
    },

    setblinkSec: function( sec ){
        if( this.blinkframe == 0 ){
            this.nodamageFlag = true;
            this.blinkframe = sec * 60;
            this.blinkcount = 0;
        }
    },
    // use this for initialization
    onLoad: function () {

        // Jump 开关
        this.jumpFlag = false;

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        this.nodamageFlag = false;
        this.blinkframe = 0;
    },

    start(){
        var playerAnimate = cc.tween()
        .call( () => { this.node.getComponent(cc.Sprite).spriteFrame = this.spriteA; })
        .delay(0.5)
        .call( ()=>{this.node.getComponent(cc.Sprite).spriteFrame = this.spriteB;})
        .delay(0.5);

        cc.tween(this.node).repeatForever(playerAnimate).start();
    },

    // called every frame
    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.node.x -= this.speed * dt;
        }
        else if (this.accRight) {
            this.node.x += this.speed * dt;
        }

        // If need blink
        if( this.blinkframe > 0 ){
            if( this.blinkcount % 60 < 30 ){
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

    onDestroy () {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});
