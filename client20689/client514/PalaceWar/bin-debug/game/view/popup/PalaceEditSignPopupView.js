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
 * 皇宫编辑签名历史
 * author yanyuling
 * date 2017/11/02
 * @class PalaceEditSignPopupView
 */
var PalaceEditSignPopupView = (function (_super) {
    __extends(PalaceEditSignPopupView, _super);
    function PalaceEditSignPopupView() {
        return _super.call(this) || this;
    }
    PalaceEditSignPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_SIGN), this.editBtnhandlerCallback, this);
        var uiData = this.param.data;
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var tarWidth = 520;
        var tarHeight = 100;
        //输入框
        var inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE, TextFieldConst.FONTSIZE_CONTENT_SMALL, tarWidth, tarHeight, "public_9_bg4", LanguageManager.getlocal("palace_editTip"), TextFieldConst.COLOR_WHITE);
        inputTF.x = this.viewBg.x + this.viewBg.width / 2 - tarWidth / 2;
        inputTF.y = 9;
        var textField = inputTF.getChildByName("textField");
        textField.y -= 30;
        this._nodeContainer.addChild(inputTF);
        this._inputTextField = inputTF.getChildByName("textField");
        this._inputTextField.height = tarHeight;
        this._inputTextField.width = tarWidth;
        this._inputTextField.maxChars = 20;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_editTip2"), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2;
        tipTxt.y = inputTF.y + tarHeight + 9;
        this._nodeContainer.addChild(tipTxt);
        var editBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.editBtnhandler, this);
        editBtn.x = inputTF.x + tarWidth / 2 - editBtn.width / 2;
        editBtn.y = tipTxt.y + tipTxt.height + 15;
        editBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(editBtn);
    };
    PalaceEditSignPopupView.prototype.editBtnhandlerCallback = function (event) {
        var titleId = this.param.data;
        Api.palaceVoApi.updateRoleSign(titleId, this._inputTextField.text);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_REFRESHSIGN_AFTER_EDIT, titleId);
        App.CommonUtil.showTip(LanguageManager.getlocal("palace_edit_succeed"));
        this.hide();
    };
    PalaceEditSignPopupView.prototype.editBtnhandler = function () {
        if (!this._inputTextField.bindData) {
            this._inputTextField.bindData = "";
            this._inputTextField.text = "";
        }
        if (Config.ShieldCfg.checkOnlyShield(this._inputTextField.text) == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("chatShieldTip"));
            return;
        }
        // titleId 对应的称号
        NetManager.request(NetRequestConst.REQUEST_PALACE_SIGN, { sign: this._inputTextField.text, titleId: this.param.data });
    };
    PalaceEditSignPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "shield_cn",
        ]);
    };
    PalaceEditSignPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_SIGN), this.editBtnhandlerCallback, this);
        this._nodeContainer = null;
        this._inputTextField = null;
        _super.prototype.dispose.call(this);
    };
    return PalaceEditSignPopupView;
}(PopupView));
__reflect(PalaceEditSignPopupView.prototype, "PalaceEditSignPopupView");
