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
 * 书院vo
 * author yanyuling
 * date 2017/11/24
 * @class BookroomInfoVo
 */
var BookroomInfoVo = (function (_super) {
    __extends(BookroomInfoVo, _super);
    function BookroomInfoVo() {
        var _this = _super.call(this) || this;
        _this.servantid = "";
        _this.et = 0;
        return _this;
    }
    BookroomInfoVo.prototype.initData = function (data) {
        if (data) {
            this.servantid = data.servantid;
            this.et = data.et;
        }
    };
    BookroomInfoVo.prototype.isStudyOver = function () {
        if (this.et > 0 && this.et <= GameData.serverTime) {
            return true;
        }
        else {
            return false;
        }
    };
    BookroomInfoVo.prototype.dispose = function () {
        this.servantid = "";
        this.et = 0;
        this.posId = "";
    };
    return BookroomInfoVo;
}(BaseVo));
__reflect(BookroomInfoVo.prototype, "BookroomInfoVo");
