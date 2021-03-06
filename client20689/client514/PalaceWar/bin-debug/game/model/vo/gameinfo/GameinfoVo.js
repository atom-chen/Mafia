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
var GameinfoVo = (function (_super) {
    __extends(GameinfoVo, _super);
    function GameinfoVo() {
        return _super.call(this) || this;
    }
    GameinfoVo.prototype.initData = function (data) {
        if (data) {
            for (var key in data) {
                this[key] = data[key];
            }
        }
    };
    GameinfoVo.prototype.dispose = function () {
        this.newerflag = 0;
    };
    return GameinfoVo;
}(BaseVo));
__reflect(GameinfoVo.prototype, "GameinfoVo");
