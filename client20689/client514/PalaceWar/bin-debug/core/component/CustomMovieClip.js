var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * Created by Saco on 2015/5/27.
 */
var CustomMovieClip = (function (_super) {
    __extends(CustomMovieClip, _super);
    /**
     * @autoDispose 是否支持从舞台移除时候自动释放对象，默认不释放
     */
    function CustomMovieClip() {
        var _this = _super.call(this) || this;
        _this._frameImages = [];
        _this._frameRate = 60;
        _this._timeRate = 0.001; //按时间播放
        _this._playingIndex = 0;
        _this._playCount = 0;
        _this.isPlaying = false;
        _this._endFunc = null;
        _this._removeStop = false;
        _this._autoDispose = false;
        _this._playFrameTime = 0; //上次回调总时间
        _this._playFrameSpace = 100; //回调间隔时间，控制帧频。(单位毫秒)
        return _this;
    }
    Object.defineProperty(CustomMovieClip.prototype, "sheetName", {
        set: function (sheetName) {
            this._frameImages = RES["configInstance"].keyMap[sheetName].subkeys;
            ;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMovieClip.prototype, "frameImages", {
        set: function (textureNames) {
            this._frameImages = textureNames;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMovieClip.prototype, "frameRate", {
        set: function (rate) {
            this._frameRate = rate;
            this.stop();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CustomMovieClip.prototype, "playFrameRate", {
        /**
         *
         * @param rate 满帧60，间隔时间
         */
        set: function (rate) {
            if (rate) {
                this._playFrameSpace = rate;
            }
        },
        enumerable: true,
        configurable: true
    });
    CustomMovieClip.prototype.updateFrame = function (timeStamp) {
        // App.LogUtil.log("QAZ ",this.name);
        if (timeStamp < this._playFrameTime) {
            return false;
        }
        this._playFrameTime = timeStamp + this._playFrameSpace;
        if (this._playingIndex >= this._frameImages.length) {
            this._playingIndex = 0;
            this._playCount--;
        }
        if (this._playCount <= 0) {
            this.stop();
            if (this._endFunc && this._endObj) {
                this._endFunc.apply(this._endObj, [this]);
            }
            return false;
        }
        this.texture = ResourceManager.getRes(this._frameImages[this._playingIndex]);
        if (this["anchorX"]) {
            this.anchorOffsetX = this.texture.textureWidth * this["anchorX"];
        }
        if (this["anchorY"]) {
            this.anchorOffsetY = this.texture.textureHeight * this["anchorY"];
        }
        //
        //if(this.texture==null)
        //{
        //    Log.show("QAZ 缺少图片资源::" + this._frameImages[this._playingIndex]);
        //}
        this._playingIndex++;
        return false;
    };
    /**
     *
     * @param count 动画播放次数
     */
    CustomMovieClip.prototype.play = function (count) {
        if (count === void 0) { count = 0; }
        if (this.isPlaying == false) {
            this.isPlaying = true;
            this._playCount = count <= 0 ? 99999 : count;
            egret.startTick(this.updateFrame, this);
            // App.TimerManager.doFrame(this._frameRate, 0, this.updateFrame, this);
        }
    };
    CustomMovieClip.prototype.goToAndPlay = function (frame) {
        this._playingIndex = frame < 0 ? 0 : frame;
    };
    CustomMovieClip.prototype.stop = function () {
        this.isPlaying = false;
        egret.stopTick(this.updateFrame, this);
        // App.TimerManager.remove(this.updateFrame, this);
    };
    CustomMovieClip.prototype.onAddToStage = function () {
        if (this._removeStop) {
            this.play(this._playCount);
        }
    };
    CustomMovieClip.prototype.onRemoveFromStage = function () {
        this.stop();
        this._removeStop = true;
        if (this._autoDispose) {
            this.dispose();
        }
    };
    CustomMovieClip.prototype.setPosition = function (pointOrX, yOrNull) {
        var firstParamIsPoint = false;
        if (pointOrX != null) {
            if (typeof pointOrX == "number") {
                if (this.x != pointOrX) {
                    this.x = pointOrX;
                }
            }
            else {
                firstParamIsPoint = true;
                if (this.x != pointOrX.x || this.y != pointOrX.y) {
                    this.x = pointOrX.x;
                    this.y = pointOrX.y;
                }
            }
        }
        if (firstParamIsPoint == false && yOrNull != null && this.y != yOrNull) {
            this.y = yOrNull;
        }
    };
    CustomMovieClip.prototype.setScale = function (s) {
        this.scaleX = s;
        this.scaleY = s;
    };
    CustomMovieClip.prototype.setEndCallBack = function (f, o) {
        this._endFunc = f;
        this._endObj = o;
    };
    Object.defineProperty(CustomMovieClip.prototype, "timeRate", {
        //根据时间播放动画
        //
        set: function (rate) {
            this._timeRate = rate;
            this.stop();
            //this.play(this._playCount);
        },
        enumerable: true,
        configurable: true
    });
    CustomMovieClip.prototype.playWithTime = function (count) {
        if (this.isPlaying == false) {
            this.isPlaying = true;
            this._playCount = count <= 0 ? 99999 : count;
            egret.startTick(this.updateFrame, this);
        }
    };
    CustomMovieClip.prototype.dispose = function () {
        this.stop();
        this._frameImages = [];
        this._frameRate = 60;
        this._timeRate = 0.001; //按时间播放
        this._playingIndex = 0;
        this._playCount = 0;
        this.isPlaying = false;
        this._endFunc = null;
        this._endObj = null;
        this._removeStop = false;
        this.texture = null;
        this._playFrameTime = 0;
        this._playFrameSpace = 50;
        _super.prototype.dispose.call(this);
    };
    return CustomMovieClip;
}(BaseBitmap));
__reflect(CustomMovieClip.prototype, "CustomMovieClip");
