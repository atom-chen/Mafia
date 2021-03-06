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
 * 滑动列表类
 * author 陈可
 * date 2017/9/22
 * @class ScrollList
 */
var ScrollList = (function (_super) {
    __extends(ScrollList, _super);
    function ScrollList() {
        var _this = _super.call(this) || this;
        _this._scrollListItemArr = [];
        _this._scrollListHeightArr = [];
        _this._scrollRect = undefined;
        _this._lastPos = null;
        _this._curShowItem = null;
        _this._widthCount = -1;
        _this._dataList = [];
        _this.horizontalScrollPolicy = "off";
        return _this;
    }
    /**
     * 初始化ScrollList
     * @param ScrollListItemClass
     * @param dataList
     * @param scrollRect
     */
    ScrollList.prototype.init = function (ScrollListItemClass, dataList, scrollRect) {
        this._listItemClass = ScrollListItemClass;
        this._scrollRect = scrollRect;
        var content = new BaseDisplayObjectContainer();
        this.content = content;
        this.setContent(this.content);
        if (dataList == null || (!dataList.length) || dataList.length < 1) {
            this.width = scrollRect.width;
            this.height = scrollRect.height;
            this.addEventListener(egret.Event.CHANGE, this.changeHandler, this);
            this.addEventListener(egret.Event.COMPLETE, this.moveCompleteHandler, this);
            return;
        }
        this._dataList = dataList;
        var l = dataList.length;
        var data = undefined;
        var scrollListItem = undefined;
        var lastY = 0;
        var lastX = 0;
        for (var i = 0; i < l; i++) {
            data = dataList[i];
            scrollListItem = ScrollListItem.create(ScrollListItemClass, i, data);
            // scrollListItem["init"](i,data);
            if (lastX + scrollListItem.width - scrollListItem.getSpaceX() > this._scrollRect.width) {
                if (this._widthCount < 0) {
                    this._widthCount = i > 0 ? i : 1;
                }
                if (i > 0) {
                    lastX = 0;
                    if (this._scrollListItemArr.length > 0) {
                        lastY = lastY + this._scrollListItemArr[this._scrollListItemArr.length - 1].height;
                    }
                    else {
                        lastY = lastY + scrollListItem.height;
                    }
                }
            }
            scrollListItem.setPosition(lastX, lastY);
            // content.addChild(scrollListItem);
            this._scrollListItemArr.push(scrollListItem);
            var itemRect = scrollListItem.getBounds();
            itemRect.x += scrollListItem.x;
            itemRect.y += scrollListItem.y;
            this._scrollListHeightArr.push(itemRect);
            if (lastX + scrollListItem.width - scrollListItem.getSpaceX() <= this._scrollRect.width) {
                lastX += scrollListItem.width;
            }
            if (i == l - 1) {
                lastY = lastY + scrollListItem.height;
            }
        }
        content.width = scrollListItem.width;
        content.height = lastY;
        this.addEventListener(egret.Event.CHANGE, this.changeHandler, this);
        this.addEventListener(egret.Event.COMPLETE, this.moveCompleteHandler, this);
        this.width = scrollRect.width;
        this.height = scrollRect.height;
    };
    ScrollList.prototype.setEmptyTip = function (emptyStr, color) {
        var content = this.content;
        if (content && (content instanceof egret.DisplayObjectContainer)) {
            var emptyTxt = content.getChildByName("emptyTxt");
            if (emptyTxt) {
                emptyTxt.text = emptyStr;
                emptyTxt.visible = true;
            }
            else {
                if (this._ScrV_Props_._scrollStarted == false) {
                    this.setScrollTop(0);
                }
                emptyTxt = ComponentManager.getTextField(emptyStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
                content.addChild(emptyTxt);
                emptyTxt.name = "emptyTxt";
                if (this._dataList && this._dataList.length > 0) {
                    emptyTxt.visible = false;
                }
            }
            if (color) {
                emptyTxt.textColor = color;
            }
            emptyTxt.setPosition((this._scrollRect.width - emptyTxt.width) / 2, (this._scrollRect.height - emptyTxt.height) / 2);
        }
    };
    ScrollList.prototype.checkEmptyTip = function (isShow) {
        var content = this.content;
        if (content && (content instanceof egret.DisplayObjectContainer)) {
            if (this._ScrV_Props_._scrollStarted = false) {
                this.setScrollTop(0);
            }
            var emptyTxt = content.getChildByName("emptyTxt");
            if (emptyTxt) {
                emptyTxt.visible = isShow;
            }
        }
    };
    ScrollList.prototype.moveCompleteHandler = function (e) {
    };
    ScrollList.prototype.getItemByIndex = function (index) {
        return this._scrollListItemArr[index];
    };
    /**
     * 根据数据刷新列表
     * @param dataList 数据列表，非必须，如果和初始化是同一个数据对象，无需传
     */
    ScrollList.prototype.refreshData = function (dataList) {
        this._onScrollFinished();
        this._dataList = dataList;
        var l = this._scrollListItemArr.length;
        // let className:string=egret.getQualifiedClassName(this._scrollListItemArr[0]);
        for (var i = l - 1; i >= 0; i--) {
            ScrollListItem.release(this._scrollListItemArr.pop());
        }
        this._scrollListHeightArr.length = 0;
        if (this._dataList == null || (!this._dataList.length) || this._dataList.length < 1) {
            this.checkEmptyTip(true);
            return;
        }
        this.checkEmptyTip(false);
        l = this._dataList.length;
        var data = undefined;
        var scrollListItem = undefined;
        var lastY = 0;
        var lastX = 0;
        for (var i = 0; i < l; i++) {
            data = dataList[i];
            scrollListItem = ScrollListItem.create(this._listItemClass, i, data);
            if (lastX + scrollListItem.width - scrollListItem.getSpaceX() > this._scrollRect.width) {
                if (this._widthCount < 0) {
                    this._widthCount = i > 0 ? i : 1;
                }
                if (i > 0) {
                    lastX = 0;
                    // lastY=lastY+scrollListItem.height;
                    if (this._scrollListItemArr.length > 0) {
                        lastY = lastY + this._scrollListItemArr[this._scrollListItemArr.length - 1].height;
                    }
                    else {
                        lastY = lastY + scrollListItem.height;
                    }
                }
            }
            scrollListItem.setPosition(lastX, lastY);
            // content.addChild(scrollListItem);
            this._scrollListItemArr.push(scrollListItem);
            var itemRect = scrollListItem.getBounds();
            itemRect.x += scrollListItem.x;
            itemRect.y += scrollListItem.y;
            this._scrollListHeightArr.push(itemRect);
            if (lastX + scrollListItem.width - scrollListItem.getSpaceX() <= this._scrollRect.width) {
                lastX += scrollListItem.width;
            }
            if (i == l - 1) {
                lastY = lastY + scrollListItem.height;
            }
        }
        if (scrollListItem) {
            this.content.width = scrollListItem.width;
        }
        this.content.height = lastY;
        this.width = this._scrollRect.width;
        this.height = this._scrollRect.height;
        this._lastPos = null;
        this._curShowItem = null;
        this.setScrollTop(this.scrollTop);
        this.changeHandler(null);
    };
    ScrollList.prototype.changeHandler = function (e) {
        if (this._lastPos == null || this.scrollRect.y != this._lastPos.y) {
            var lastMin = this._curShowItem ? this._curShowItem.min : -1;
            var lastMax = this._curShowItem ? this._curShowItem.max : -1;
            var containMin = NaN;
            var containMax = NaN;
            var isFind = false;
            var l = this._scrollListItemArr.length;
            var useRect = egret.Rectangle.create();
            useRect.copyFrom(this.scrollRect);
            useRect.width = this._scrollRect.width;
            useRect.height = this._scrollRect.height;
            var islookDown = true;
            if (this._lastPos == null || this.scrollRect.y > this._lastPos.y) {
                islookDown = true;
                var findMin = lastMin == -1 ? 0 : lastMin;
                for (var i = findMin; i < l; i++) {
                    var rect = this._scrollListHeightArr[i];
                    if (useRect.intersects(rect)) {
                        if (isNaN(containMin)) {
                            containMin = i;
                        }
                        isFind = true;
                    }
                    else {
                        if (isFind && isNaN(containMax)) {
                            containMax = i + this._widthCount - 1;
                            break;
                        }
                    }
                }
            }
            else {
                islookDown = false;
                var findMax = this._curShowItem.max >= l ? l - 1 : this._curShowItem.max;
                for (var i = findMax; i >= 0; i--) {
                    var rect = this._scrollListHeightArr[i];
                    if (useRect.intersects(rect)) {
                        if (isNaN(containMax)) {
                            containMax = i;
                        }
                        isFind = true;
                    }
                    else {
                        if (isFind && isNaN(containMin)) {
                            containMin = i - this._widthCount + 1;
                            break;
                        }
                    }
                }
            }
            if (isNaN(containMax)) {
                containMax = l - 1;
            }
            if (isNaN(containMin)) {
                containMin = 0;
            }
            if (containMin < 0) {
                containMin = 0;
            }
            if (containMax > l - 1) {
                containMax = l - 1;
            }
            if (this._curShowItem) {
                this._curShowItem.min = containMin;
                this._curShowItem.max = containMax;
            }
            else {
                this._curShowItem = { min: containMin, max: containMax };
            }
            if (lastMin == -1 && lastMax == -1) {
                for (var i = containMin; i <= containMax; i++) {
                    this.showItem(i);
                }
            }
            else {
                if (lastMin != containMin) {
                    var big = lastMin > containMin ? lastMin : containMin;
                    var small = lastMin < containMin ? lastMin : containMin;
                    var opera = null;
                    if (islookDown) {
                        opera = lastMin < containMin ? this.hideItem : this.showItem;
                    }
                    else {
                        opera = lastMin < containMin ? this.hideItem : this.showItem;
                    }
                    for (var i = small; i < big; i++) {
                        opera.call(this, i);
                    }
                }
                if (lastMax != containMax) {
                    var big = lastMax > containMax ? lastMax : containMax;
                    var small = lastMax < containMax ? lastMax : containMax;
                    var opera = lastMax > containMax ? this.hideItem : this.showItem;
                    if (islookDown) {
                        opera = lastMax > containMax ? this.hideItem : this.showItem;
                    }
                    else {
                        opera = lastMax < containMax ? this.hideItem : this.showItem;
                    }
                    for (var i = small; i <= big; i++) {
                        opera.call(this, i);
                    }
                }
            }
            // App.LogUtil.show(lastMin,lastMax,">>",containMin,containMax);
            if (!this._lastPos) {
                this._lastPos = egret.Point.create(this.scrollRect.x, this.scrollRect.y);
            }
            else {
                this._lastPos.setTo(this.scrollRect.x, this.scrollRect.y);
            }
        }
    };
    ScrollList.prototype.hideItem = function (index) {
        if (this.content instanceof egret.DisplayObjectContainer) {
            var item = this._scrollListItemArr[index];
            if (this.content.contains(item)) {
                this.content.removeChild(item);
                // App.LogUtil.show("remove",index);
            }
        }
    };
    ScrollList.prototype.showItem = function (index) {
        if (this.content instanceof egret.DisplayObjectContainer) {
            var item = this._scrollListItemArr[index];
            if (item && this.content && this.content.contains(item) == false) {
                this.content.addChild(item);
                // App.LogUtil.show("show",index);
            }
        }
    };
    /**
     * 添加触摸回调
     */
    ScrollList.prototype.addTouchTap = function (touchTapHandler, touchTapHandlerThisObj, touchTapHandlerParams) {
        var ths = this;
        if (this._touchTapHelper == null) {
            //局部调用，勿改
            var tapHandler = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                if (event.type == egret.TouchEvent.TOUCH_END) {
                    var scrollRect = ths.scrollRect;
                    var offx = scrollRect ? scrollRect.x : 0;
                    var offy = scrollRect ? scrollRect.y : 0;
                    var min = ths._curShowItem ? ths._curShowItem.min : 0;
                    var max = ths._curShowItem ? ths._curShowItem.max : ths._scrollListItemArr.length - 1;
                    var checkRect = egret.Rectangle.create();
                    var _a = ths.content.globalToLocal(event.stageX, event.stageY), x = _a.x, y = _a.y;
                    for (var i = min; i <= max; i++) {
                        var item = ths._scrollListItemArr[i];
                        var tmpX = ths._scrollListHeightArr[i].x;
                        var tmpY = ths._scrollListHeightArr[i].y;
                        var itemRect = ths._scrollListItemArr[i].getBounds(ths._scrollListHeightArr[i]);
                        itemRect.x = tmpX;
                        itemRect.y = tmpY;
                        checkRect.setTo(itemRect.x, itemRect.y, itemRect.width - item.getSpaceX(), itemRect.height - item.getSpaceY());
                        if (checkRect.contains(x, y)) {
                            var btnList = this.findBtn(item);
                            var btnL = btnList.length;
                            for (var ii = 0; ii < btnL; ii++) {
                                var childRect = btnList[ii].getBounds();
                                childRect.x = itemRect.x + btnList[ii].x;
                                childRect.y = itemRect.y + btnList[ii].y;
                                if (childRect.contains(x, y)) {
                                    return;
                                }
                            }
                            //处理点击逻辑
                            event.data = i;
                            if (touchTapHandler) {
                                var params = [event];
                                if (args && args.length > 0) {
                                    params.concat(args);
                                }
                                touchTapHandler.apply(touchTapHandlerThisObj, params);
                            }
                            break;
                        }
                    }
                    egret.Rectangle.release(checkRect);
                }
            };
            this._touchTapHelper = TouchHelper.addTouch(this.content, tapHandler, this, touchTapHandlerParams, true);
        }
    };
    ScrollList.prototype.findBtn = function (item) {
        var btnList = [];
        var itemChildNum = item.numChildren;
        for (var ii = 0; ii < itemChildNum; ii++) {
            var child = item.getChildAt(ii);
            if (child instanceof BaseButton) {
                btnList.push(child);
            }
            else if (child instanceof egret.DisplayObjectContainer) {
                this.findBtn(child);
            }
        }
        return btnList;
    };
    /**
     * 移动到指定位置
     * @param index 元素索引
     * @param duration 缓动时间
     */
    ScrollList.prototype.setScrollTopByIndex = function (index, duration) {
        var scrollTop = this._scrollListHeightArr[index].y + this._scrollListHeightArr[index].height / 2;
        var endRect = this._scrollListHeightArr[this._scrollListHeightArr.length - 1];
        var maxY = endRect.y + endRect.height;
        var isTop = false;
        var isEnd = false;
        if (scrollTop < this._scrollRect.height / 2) {
            scrollTop = 0;
        }
        else if (scrollTop > maxY - this._scrollRect.height / 2) {
            scrollTop = maxY - this._scrollRect.height;
        }
        else {
            scrollTop = this._scrollListHeightArr[index].y + this._scrollListHeightArr[index].height / 2 - this._scrollRect.height / 2;
        }
        this.setScrollTop(scrollTop, duration);
    };
    ScrollList.prototype.dispose = function () {
        this.removeTouchTap();
        this.removeTouch();
        _super.prototype.dispose.call(this);
        this._scrollListItemArr.length = 0;
        this._scrollListHeightArr.length = 0;
        if (this._scrollRect) {
            this._scrollRect = null;
        }
        if (this._lastPos) {
            egret.Point.release(this._lastPos);
            this._lastPos = null;
        }
        this._curShowItem = null;
        this._widthCount = -1;
    };
    return ScrollList;
}(ScrollView));
__reflect(ScrollList.prototype, "ScrollList");
