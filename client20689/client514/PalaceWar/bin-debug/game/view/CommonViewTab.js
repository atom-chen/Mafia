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
 * 通用tab页面
 * author dmj
 * date 2017/9/18
 * @class CommonViewTab
 */
var CommonViewTab = (function (_super) {
    __extends(CommonViewTab, _super);
    function CommonViewTab() {
        return _super.call(this) || this;
    }
    return CommonViewTab;
}(ViewTab));
__reflect(CommonViewTab.prototype, "CommonViewTab");
