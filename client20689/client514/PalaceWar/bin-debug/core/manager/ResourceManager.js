/**
 * author 陈可
 * date 2017/9/11
 * @class ResourceManager
 */
var ResourceManager;
(function (ResourceManager) {
    var cacheDic = {};
    /**
     * 加载资源组
     * @param groupName 资源组名
     * @param onLoadComplete 加载完成回调
     * @param onLoadProgress 加载进度回调
     * @param onLoadThisObj 加载回调拥有对象
     */
    function loadGroup(groupName, onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError) {
        App.ResourceUtil.loadGroup(groupName, onLoadComplete, onLoadProgress, onLoadThisObj, onLoadError);
    }
    ResourceManager.loadGroup = loadGroup;
    /**
     * 按照配置key加载单个资源，需要先配置
     * @param key 配置里面的key
     * @param onLoadComplete 加载完成回调
     * @param thisObj 加载回调拥有对象
     */
    function loadItem(key, onLoadComplete, thisObj) {
        App.ResourceUtil.loadItem(key, onLoadComplete, thisObj);
    }
    ResourceManager.loadItem = loadItem;
    /**
     * 使用url加载配置外单个资源
     * @param url 需要加载的资源url
     * @param onLoadComplete 加载完成回调
     * @param thisObj 加载回调拥有对象
     */
    function loadItemByUrl(url, onLoadComplete, thisObj, type) {
        App.ResourceUtil.loadItemByUrl(url, onLoadComplete, thisObj, type);
    }
    ResourceManager.loadItemByUrl = loadItemByUrl;
    /**
     * 加载混合资源
     * @param resources 资源数组
     * @param groups 资源组数组
     * @param onResourceLoadComplete 加载完成回调
     * @param onResourceLoadProgress 加载进度回调
     * @param onResourceLoadTarget 加载回调拥有对象
     */
    function loadResources(resources, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError) {
        return App.ResourceUtil.loadResource(resources, groups, onResourceLoadComplete, onResourceLoadProgress, onResourceLoadTarget, onLoadError);
    }
    ResourceManager.loadResources = loadResources;
    /**
     * 获取资源
     * @param key
     */
    function getRes(key) {
        var res = RES.getRes(key);
        if (res) {
            var scale9Cfg = Scale9gridCfg.getScale9gridCfg(key);
            if (scale9Cfg) {
                if (!res["scale9Grid"]) {
                    var rect = egret.Rectangle.create();
                    var scale9Arr = scale9Cfg.split(",");
                    rect.setTo(Number(scale9Arr[0]), Number(scale9Arr[1]), Number(scale9Arr[2]), Number(scale9Arr[3]));
                    res["scale9Grid"] = rect;
                }
            }
        }
        return RES.getRes(key);
    }
    ResourceManager.getRes = getRes;
    function hasRes(key) {
        var result = RES.hasRes(key);
        return result;
    }
    ResourceManager.hasRes = hasRes;
    function isItemLoaded(key) {
        return ResourceManager.getRes(key) ? true : false;
    }
    ResourceManager.isItemLoaded = isItemLoaded;
    /**
     * 释放对象
     * @param name 配置文件中加载项的name属性或资源组名。
     */
    function destroyRes(name) {
        RES.destroyRes(name, false);
    }
    ResourceManager.destroyRes = destroyRes;
    function dispose() {
    }
    ResourceManager.dispose = dispose;
    /**
     * 单线程加载资源，同时只有一个资源在加载，否则会影响其他功能界面加载
     */
    function autoLoadRes() {
    }
    ResourceManager.autoLoadRes = autoLoadRes;
})(ResourceManager || (ResourceManager = {}));
