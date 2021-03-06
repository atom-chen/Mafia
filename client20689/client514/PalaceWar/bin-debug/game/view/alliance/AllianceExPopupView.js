/**
 * 积分兑换道具板子
 * author dky
 * date 2017/12/7
 * @class AllianceExPopupView
 */
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
var AllianceExPopupView = (function (_super) {
    __extends(AllianceExPopupView, _super);
    function AllianceExPopupView() {
        var _this = _super.call(this) || this;
        _this._index = 0;
        return _this;
    }
    AllianceExPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        this._pointText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._pointText.y = 11;
        this.addChildToContainer(this._pointText);
        // this._pointText = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BLACK);
        // this._pointText.y = 11;
        // this.addChildToContainer(this._pointText);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 540, 710);
        var allianceVo = Api.allianceVoApi.getAllianceVo();
        var dataList = new Array();
        var cfg = Config.AlliancebaseCfg.allianceShop;
        for (var index = 1; index < 20; index++) {
            if (cfg[index.toString()]) {
                if (allianceVo.level >= (cfg[index.toString()].needAllianceLv - 1)) {
                    dataList.push(cfg[index.toString()]);
                }
            }
            else {
                break;
            }
        }
        this._scrollList = ComponentManager.getScrollList(AllianceExScrollItem, dataList, rect);
        this.addChildToContainer(this._scrollList);
        this._scrollList.setPosition(23, 40);
        this.resetPointText();
    };
    AllianceExPopupView.prototype.doBuy = function (event) {
        var data = event.data;
        this._index = data.index;
        this.request(NetRequestConst.REQUEST_ALLIANCE_SHOPBUY, { shopkey: data.key });
    };
    //请求回调
    AllianceExPopupView.prototype.receiveData = function (data) {
        if (data.data.cmd == NetRequestConst.REQUEST_ALLIANCE_SHOPBUY) {
            if (data.data.data && data.data.data.rewards) {
                var rewards = GameData.formatRewardItem(data.data.data.rewards);
                if (rewards && rewards.length > 0) {
                    App.CommonUtil.playRewardFlyAction(rewards);
                }
            }
            var index = this._index;
            var wideItem = this._scrollList.getItemByIndex(index);
            wideItem.refreshData(index);
            // this._pointText.text = gem.toString();
            this.resetPointText();
        }
    };
    AllianceExPopupView.prototype.resetPointText = function () {
        var acVo = Api.allianceVoApi.getMyAllianceVo();
        this._pointText.text = LanguageManager.getlocal("allianceBuildScore", [acVo.ctv + "/" + acVo.tctv]);
        this._pointText.x = this.viewBg.width / 2 - this._pointText.width / 2;
        // this._pointText.text = App.DateUtil.getFormatBySecond(1,2)
    };
    AllianceExPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM, this.doBuy, this);
        // this._pointText = null;
        // this._isLoading = false;
        // this._buyClickId = null;
        this._scrollList = null;
        this._pointText = null;
        this._index = null;
        _super.prototype.dispose.call(this);
    };
    return AllianceExPopupView;
}(PopupView));
__reflect(AllianceExPopupView.prototype, "AllianceExPopupView");
