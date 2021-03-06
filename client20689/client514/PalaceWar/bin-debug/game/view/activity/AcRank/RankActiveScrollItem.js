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
 * 冲榜
 * author dky
 * date 2018/2/27
 * @class RankActiveScrollItem
 */
var RankActiveScrollItem = (function (_super) {
    __extends(RankActiveScrollItem, _super);
    function RankActiveScrollItem() {
        return _super.call(this) || this;
    }
    RankActiveScrollItem.prototype.initItem = function (index, acVo) {
        this._acVo = acVo;
        this.width = GameConfig.stageWidth;
        this.height = 312 + this.getSpaceY();
        var bg = BaseBitmap.create("ranactivecellbg");
        bg.x = this.width / 2 - bg.width / 2;
        // Bg.y = 40;
        this.addChild(bg);
        var acBgStr = "rankactive_bg_" + acVo.atype;
        var acBg = BaseLoadBitmap.create(acBgStr);
        this.addChild(acBg);
        acBg.x = 35;
        acBg.y = 20;
        var nameBg = BaseBitmap.create("rankactivenamebg");
        nameBg.x = 30;
        nameBg.y = 8;
        this.addChild(nameBg);
        var acNameStr = "rankactive_name_" + acVo.atype;
        var acName = BaseLoadBitmap.create(acNameStr);
        if (PlatformManager.checkIsTextHorizontal()) {
            acName.x = nameBg.x + 16;
            acName.y = nameBg.y + 5;
        }
        else {
            acName.x = nameBg.x + 16;
            acName.y = nameBg.y + 20;
        }
        this.addChild(acName);
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(acVo.aid, String(acVo.code));
        // acRankActiveDesc1
        var rankDescTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        // rankDescTxt = rankDescTxt;
        rankDescTxt.multiline = true;
        rankDescTxt.lineSpacing = 5;
        // rankDescTxt.width = 240;
        rankDescTxt.text = LanguageManager.getlocal("acRankActiveDesc" + acVo.atype, [rankcfg.getMaxRangValue()]);
        rankDescTxt.x = 40;
        rankDescTxt.y = 210;
        this.addChild(rankDescTxt);
        var acTimeTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        var stTxt = App.DateUtil.getFormatBySecond(acVo.st, 7);
        var etTxt = App.DateUtil.getFormatBySecond(acVo.et - 86400, 7);
        var timeStr = App.DateUtil.getOpenLocalTime(acVo.st, acVo.et, true);
        acTimeTxt.multiline = true;
        acTimeTxt.lineSpacing = 3;
        // acTimeTxt.width = activity_rank_rightBg2.width - 50;
        acTimeTxt.text = acVo.getAcLocalTime(true);
        //  LanguageManager.getlocal("acRank_actime",[timeStr]);
        // this.acVo.acLocalCountDown;
        acTimeTxt.x = 40;
        acTimeTxt.y = rankDescTxt.y + rankDescTxt.height + 8;
        this.addChild(acTimeTxt);
        var deltaT = acVo.et - 86400 - GameData.serverTime;
        var acCDTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._acCDTxt = acCDTxt;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
        acCDTxt.x = 40;
        acCDTxt.y = acTimeTxt.y + acTimeTxt.height + 8;
        ;
        this.addChild(acCDTxt);
        var rankListBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "acRank_enter", this.rankListBtnHandler, this);
        rankListBtn.x = 470;
        rankListBtn.y = 240;
        this.addChild(rankListBtn);
        //产出跨服
        if (rankcfg.isCross == 1) {
            var crossTip = BaseLoadBitmap.create("atkracecross_tip");
            crossTip.setPosition(360, 20);
            this.addChild(crossTip);
        }
        TickManager.addTick(this.tick, this);
    };
    RankActiveScrollItem.prototype.tick = function () {
        var deltaT = this._acVo.et - 86400 - GameData.serverTime;
        if (this._acCDTxt && deltaT > 0) {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [App.DateUtil.getFormatBySecond(deltaT, 1)]);
            // return true;
        }
        else {
            this._acCDTxt.text = LanguageManager.getlocal("acRank_acCD", [LanguageManager.getlocal("acRank_acCDEnd")]);
        }
    };
    RankActiveScrollItem.prototype.rankListBtnHandler = function (event) {
        ViewController.getInstance().openView("Ac" + App.StringUtil.firstCharToUper(this._acVo.aid) + "View", this._acVo.code);
    };
    RankActiveScrollItem.prototype.refreshData = function (id) {
        var wifeInfo = Api.wifeVoApi.getWifeInfoVoById(id);
        this._intimacyTF.text = wifeInfo.intimacy.toString();
        this._glamourTF.text = wifeInfo.glamour.toString();
    };
    RankActiveScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    RankActiveScrollItem.prototype.dispose = function () {
        this._intimacyTF = null;
        this._glamourTF = null;
        this._wifeInfoVo = null;
        this._acVo = null;
        this._acCDTxt = null;
        TickManager.removeTick(this.tick, this);
        _super.prototype.dispose.call(this);
    };
    return RankActiveScrollItem;
}(ScrollListItem));
__reflect(RankActiveScrollItem.prototype, "RankActiveScrollItem");
