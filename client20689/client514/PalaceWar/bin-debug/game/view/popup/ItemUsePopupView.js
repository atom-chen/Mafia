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
 * 道具使用弹板
 * author dmj
 * date 2017/9/25
 * @class ItemUsePopupView
 */
var ItemUsePopupView = (function (_super) {
    __extends(ItemUsePopupView, _super);
    function ItemUsePopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        return _this;
    }
    ItemUsePopupView.prototype.initView = function () {
        var itemId = this.param.data.itemId;
        var itemInfoVo = Api.itemVoApi.getItemInfoVoById(itemId);
        this._useCallback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var itemName = itemInfoVo.name;
        var iconPic = itemInfoVo.icon;
        var effectDesc = itemInfoVo.desc;
        this._maxNum = itemInfoVo.num;
        if (this.param.data.maxNum) {
            this._maxNum = Math.min(this.param.data.maxNum, Api.itemVoApi.getItemNumInfoVoById(itemId));
        }
        if (this._maxNum > 100) {
            this._maxNum = 100;
        }
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 224;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this.addChildToContainer(bg);
        var temX = 35;
        var temY = 23;
        var temW = 100;
        var temH = 100;
        var itembg = BaseBitmap.create(itemInfoVo.iconBg);
        itembg.x = temX;
        itembg.y = temY;
        this.addChildToContainer(itembg);
        //点击物品增加文字说明 添加物品iconitem
        var itemCfg = Config.ItemCfg.getItemCfgById(Number(itemId));
        if (!itemCfg) {
            itemCfg = GameData.getRewardItemVoByIdAndType(itemId);
        }
        var iconItem = GameData.getItemIcon(itemCfg, true);
        iconItem.x = temX;
        iconItem.y = temY;
        this.addChildToContainer(iconItem);
        var numTF = ComponentManager.getTextField(itemInfoVo.num.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        ;
        numTF.x = temX + itembg.width - numTF.width - 5;
        numTF.y = temY + itembg.height - numTF.height - 5;
        this.addChildToContainer(numTF);
        var bg1 = BaseBitmap.create("public_9_bg1");
        bg1.width = 387;
        bg1.height = temH;
        bg1.x = temX + temW + 10;
        bg1.y = temY;
        this.addChildToContainer(bg1);
        var nameTF = ComponentManager.getTextField(itemName, TextFieldConst.FONTSIZE_CONTENT_COMMON);
        nameTF.setColor(TextFieldConst.COLOR_LIGHT_RED);
        nameTF.x = bg1.x + 8;
        nameTF.y = bg1.y + 8;
        this.addChildToContainer(nameTF);
        var effectDescTF = itemInfoVo.getDescTxt(true);
        effectDescTF.x = nameTF.x;
        effectDescTF.y = nameTF.y + nameTF.height + 5;
        effectDescTF.width = 366;
        this.addChildToContainer(effectDescTF);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = temX + 55;
        dragProgressBar.y = bg1.y + bg1.height + 27;
        this.addChildToContainer(dragProgressBar);
        this._numBg = BaseBitmap.create("public_9_bg5");
        this._numBg.width = 90;
        this._numBg.x = bg.x + bg.width - 10 - this._numBg.width;
        this._numBg.y = bg1.y + bg1.height + 20;
        this.addChildToContainer(this._numBg);
        this._selectedNumTF = ComponentManager.getTextField(this._useNum + "", TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._selectedNumTF.textAlign = TextFieldConst.ALIGH_LEFT;
        this._selectedNumTF.setColor(TextFieldConst.COLOR_WARN_YELLOW);
        this._selectedNumTF.y = this._numBg.y + this._numBg.height / 2 - this._selectedNumTF.height / 2;
        this.addChildToContainer(this._selectedNumTF);
        this._maxNumTF = ComponentManager.getTextField("/" + this._maxNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        this._maxNumTF.textAlign = TextFieldConst.ALIGH_RIGHT;
        // this._maxNumTF.x = this._numBg.x + this._numBg.width/2;
        this._maxNumTF.y = this._numBg.y + this._numBg.height / 2 - this._maxNumTF.height / 2;
        this.addChildToContainer(this._maxNumTF);
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = bg.y + bg.height + 15;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
    };
    ItemUsePopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        this._selectedNumTF.text = this._useNum + "";
        var numTFW = this._selectedNumTF.width + this._maxNumTF.width;
        this._selectedNumTF.x = this._numBg.x + (this._numBg.width - numTFW) / 2;
        this._maxNumTF.x = this._selectedNumTF.x + this._selectedNumTF.width;
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    ItemUsePopupView.prototype.useHandler = function (param) {
        this._useCallback.apply(this._handler, [this._useNum, this.param.data.itemId]);
        this.hide();
    };
    ItemUsePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2"
        ]);
    };
    ItemUsePopupView.prototype.dispose = function () {
        this._useCallback = null;
        this._useNum = 1;
        if (this._selectedNumTF) {
            this.removeChildFromContainer(this._selectedNumTF);
            this._selectedNumTF.dispose();
            this._selectedNumTF = null;
        }
        if (this._maxNumTF) {
            this.removeChildFromContainer(this._maxNumTF);
            this._maxNumTF.dispose();
            this._maxNumTF = null;
        }
        this._maxNum = 0;
        if (this._numBg) {
            this.removeChildFromContainer(this._numBg);
            this._numBg.dispose();
            this._numBg = null;
        }
        this._handler = null;
        _super.prototype.dispose.call(this);
    };
    return ItemUsePopupView;
}(PopupView));
__reflect(ItemUsePopupView.prototype, "ItemUsePopupView");
