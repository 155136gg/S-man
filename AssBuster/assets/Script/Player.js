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
		maxMoveSpeed:0,
		accel:0
    },

    jumpAction: function(){
        var up = cc.tween().by(this.jumpDuration, {y:this.jumpHight}, {easing:'sineOut'});
        var down = cc.tween().by(this.jumpDuration, {y:-this.jumpHight}, {easing:'sineIn'});
        //return cc.tween().repeatForever(cc.tween().sequence(up,down));
        return cc.tween().sequence(up,down);
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.enter:
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
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
        }
    },
    // use this for initialization
    onLoad: function () {

        // Jump 开关
        this.jumpFlag = false;

        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this); 
    },

    // called every frame
    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }

        // 限制主角的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            // if speed reach limit, use max speed with current direction
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed * dt;
    },

    onDestroy () {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
});
