/**
 * 称帝入口界面
 * author qianjun
 */
class EmperorWarEnterView extends CommonView {
    public constructor() {
		super();
    }

    private _timeDesc : BaseTextField = null;
    private _midBtn : BaseButton = null;
    private _time : number = 0;
    private _bg : BaseLoadBitmap = null;
    private _guard1 : any = null;
    private _guard2 : any = null;
    private _stopClick : boolean = false;
    private _empbottom : BaseBitmap = null;

    protected getResourceList(): string[] {
		return super.getResourceList().concat([
            "icon_fight_tex_png","icon_fight_tex_json","icon_fight_ske",
            "emparena_bottom", "empdetail_down", "empdetail", "empgodbless_tip_bg", "emprankinglist_line",
            "boss_start_war","boss_start_war_down","empenter","empenter_down","empbming","empbming_down",
            "empgquan","emphfangbg","uncompress","empweishi1","empweishi2",
            "emperorwarbg1_1","emperorwarbg1_2","emperorwarguard_ske","emperorwarguard_tex_png","emperorwarguard_tex_json"
        ]);
    }

    protected getRequestData():{requestType:string,requestData:any}{
		return {requestType:NetRequestConst.REQUEST_EMPEROR_GETACTIVE,requestData:{}};
    }

    private get api(){
        return Api.emperorwarVoApi;
    }

    protected getSoundBgName():string
	{
		return SoundConst.MUSIC_CHALLENGE;
	}

    //请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
        let view = this;
        let cmd = data.data.cmd;
        if(cmd == NetRequestConst.REQUEST_EMPEROR_GETACTIVE){
            if (data.data.data.activeinfo)
            {
                Api.emperorwarVoApi.setActiveInfo(data.data.data);
            }
        }
    }

    private getModelCallback(evt : egret.Event):void{
        let data = evt.data.data.data;
        Api.emperorwarVoApi.setDataInfo(data.myemperor);
    }

    // 背景图名称
	protected getBgName():string
	{
		return "emperorwarbg1_1";
    }
    
    protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			if(this.isTouchMaskClose())
			{
				this.viewBg.touchEnabled=true;
			}
            this.addChild(this.viewBg);
            this.viewBg.width = GameConfig.stageWidth;
            // this.viewBg.height = 1136;
            // this.setLayoutPosition(LayoutConst.horizontalCenterbottom, this.viewBg, this, [0,GameConfig.stageHeigth - 1136]);
            // 
            this.viewBg.height = GameConfig.stageHeigth;
            // this.viewBg.y = (GameConfig.stageHeigth - 1136)/2;
		}
    }
    
    private showBtn = false;
    protected initView():void{
        let view = this;
        view._maskBmp.alpha = 0;
        view.swapChildren(view._maskBmp, view.viewBg);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_GETMODEL),this.getModelCallback,this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BMLIST),this.receiveBmlist,this);
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_GETMODEL, {
            version : view.api.getVersion(),
        });
        NetManager.request(NetRequestConst.REQUEST_EMPEROR_BMLIST, {
            version : view.api.getVersion(),
            sort : view.api.type <= 2 ? 1 : 2// 1报名时间排序 2消耗人望币排序
        });
        //活动详情
        let detailBtn = ComponentManager.getButton(`empdetail`, ``, view.clickDetail, this);
        view.setLayoutPosition(LayoutConst.lefttop, detailBtn, view.titleBg, [10,view.titleBg.height + 10]);
        view.addChild(detailBtn);
        //倒计时提示
        let timeBg = BaseBitmap.create(`empgodbless_tip_bg`);
        view.setLayoutPosition(LayoutConst.horizontalCentertop, timeBg, view.titleBg, [0,view.titleBg.height + 12]);
        view.addChild(timeBg);
        //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
        let type = view.api.judge_time();
        view._time = view.api.getCountDownTime();
        view._timeDesc = ComponentManager.getTextField(LanguageManager.getlocal(`emperorTimeDesc${type}`, [App.DateUtil.getFormatBySecond(view._time)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if(view.api.isInCalSignTime()){
            view._timeDesc.text = LanguageManager.getlocal(`emperorWarPrepareTime`, [App.DateUtil.getFormatBySecond(view._time)]);
        }
        if(type == 4){
            let period = view.api.getFightPeriod2();
            view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc${type}-${period}`, [App.DateUtil.getFormatBySecond(view._time)]);
        }
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._timeDesc, timeBg);
        view.addChild(view._timeDesc);
        //背景图
        let bg : any = view.viewBg;
        bg.setload(type <= 2 ? `emperorwarbg1_1` : `emperorwarbg1_2`);
        //报名按钮 按时间段显示
        view._midBtn = ComponentManager.getButton(type < 3 ? "empbming" : "empenter","",this.enterHandle,this);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._midBtn, view);
        view._midBtn.setEnable(type > 1);
        view._midBtn.alpha = 0;
        view.addChild(view._midBtn);
        //底部
        let emparena_bottom = BaseBitmap.create(`emparena_bottom`);
        view.setLayoutPosition(LayoutConst.horizontalCenterbottom, emparena_bottom, view);
        view.addChild(emparena_bottom);
        view._empbottom = emparena_bottom;

        let rewardBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, `emperorReward`, view.rewardClick, view);
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rewardBtn, emparena_bottom);
        view.addChild(rewardBtn);
        //人物骨骼
        let dgbone : any = null;
        let dgbone2 : any = null;
        view.showBtn = false;
        view._stopClick = true;
        if(App.CommonUtil.check_dragon())
        {
            dgbone = App.DragonBonesUtil.getLoadDragonBones('emperorwarguard',-1);
            dgbone.setAnchorOffset(-150,-380);
            dgbone.resume();
            dgbone.setMovieCompleteFunc(dragonBones.AnimationEvent.COMPLETE,view.changemc,view);
            
            dgbone2 = App.DragonBonesUtil.getLoadDragonBones('emperorwarguard',-1);
            dgbone2.setAnchorOffset(-150,-380);
            dgbone2.resume();
            dgbone2.setMovieCompleteFunc(dragonBones.AnimationEvent.COMPLETE, view.changemc, this);
        }
        else{
            dgbone = BaseLoadBitmap.create(view.api.type < 3 ? 'empweishi1' : 'empweishi2');
            dgbone2 = BaseLoadBitmap.create(view.api.type < 3 ? 'empweishi1' : 'empweishi2');
            dgbone.width = dgbone2.width = view.api.type < 3 ? 466 : 286;
            dgbone.height = dgbone2.height = view.api.type < 3 ? 627 : 746;
            dgbone.anchorOffsetX = view.api.type < 3 ? 150 : 0;
            dgbone.anchorOffsetY = 60;
            dgbone2.anchorOffsetX = view.api.type < 3 ? 150 : 0;
            dgbone2.anchorOffsetY = 60;
        }
        dgbone.scaleX = -1;
        view.setLayoutPosition(LayoutConst.leftbottom, dgbone, view, [GameConfig.stageWidth / 2 - 50,emparena_bottom.height-60]);
        view.setLayoutPosition(LayoutConst.leftbottom, dgbone2, view, [GameConfig.stageWidth / 2 + 50,emparena_bottom.height-60]);

        view.addChild(dgbone);
        view.addChild(dgbone2);
        view._guard1 = dgbone;
        view._guard2 = dgbone2;

        if(App.CommonUtil.check_dragon()){
            view.guard_play();
        }
        else{
            view.show_mid();
        }
    }

    //活动详情弹窗
    private clickDetail():void{
        let view = this;
        if(view._stopClick){
            return;
        }
        //ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARSHOPVIEW);
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARDETAILPOPUPVIEW);
    }

    private guard_play():void{
        let view = this;
        if(App.CommonUtil.check_dragon()){
            //时间阶段判断 1还未开始 2报名阶段 3助威阶段 4战斗 5结束 可回放
            if(view.api.type < 3){//view.api.type < 3
                view._guard1.playDragonMovie('turn2',1);
                view._guard2.playDragonMovie('turn2',1);
            }
            else{
                view._guard1.playDragonMovie('turn',1);
                view._guard2.playDragonMovie('turn',1);
            }
        }
        else{
            
        }
    }

    private changemc(evt: dragonBones.ArmatureEvent): void {
        let view = this;
        switch (evt.animationName) {
            case 'turn':
                view._guard1.playDragonMovie('idle2',0);
                view._guard2.playDragonMovie('idle2',0);
                break;
            case 'turn2':
                view._guard1.playDragonMovie('idle1',0);
                view._guard2.playDragonMovie('idle1',0);        
                break;
        }
        if(!view.showBtn){
            view.show_mid();
        }else{
            view._stopClick = false;
        }
    }

    private show_mid() : void{
        let view = this;
        view.swapChildren(view._midBtn, view._guard2);
        view.setChildIndex(view._guard1, view.getChildIndex(view._guard2) - 1);
        egret.Tween.get(view._midBtn, {onChange : ()=>{
            view._midBtn.x = (GameConfig.stageWidth - view._midBtn.width * view._midBtn.scaleX)/2, 
            view._midBtn.y = (GameConfig.stageHeigth - view._midBtn.height * view._midBtn.scaleY)/2
        }, onChangeObj : view}).to({scaleX : 1.3, scaleY : 1.3, alpha : 0.3}, 50).
        to({scaleX : 1, scaleY : 1, alpha : 1}, 500).call(()=>{
            view._stopClick = false;
        },view);
        view.showBtn = true;
    }

    protected tick():void{
        let view = this;
        if(view.api.type == 5){
            return;
        }
        // -- view._time;
        // view.api.setCountDownTime(view._time);
        let oldType = view.api.type;
        view._time = view.api.getCountDownTime();
        let type = view.api.type;
        view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc${view.api.type}`, [App.DateUtil.getFormatBySecond(view._time)]);
        let bg : any = view.viewBg;
        bg.setload(type <= 2 ? `emperorwarbg1_1` : `emperorwarbg1_2`);
        view._midBtn.setEnable(type > 1);
        view._midBtn.setBtnBitMap(type < 3 ? "empbming" : "empenter");
        if(view.api.isInCalSignTime()){
            view._timeDesc.text = LanguageManager.getlocal(`emperorWarPrepareTime`, [App.DateUtil.getFormatBySecond(view._time)]);
        }
        if(type == 3){
            view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc${type}`, [App.DateUtil.getFormatBySecond(view._time)]);
            if(type > oldType){
                NetManager.request(NetRequestConst.REQUEST_EMPEROR_GETMODEL, {
                    version : view.api.getVersion(),
                });
                view.showBtn = true;
                view._stopClick = true;
                if(App.CommonUtil.check_dragon()){
                    view.guard_play();
                }
                else{
                    view._guard1.width = view._guard2.width = view.api.type < 3 ? 466 : 286;
                    view._guard1.height = view._guard2.height = view.api.type < 3 ? 627 : 746;
                    view._guard1.anchorOffsetX = 0;
                    view._guard1.anchorOffsetY = 60;
                    view._guard2.anchorOffsetX = 0;
                    view._guard2.anchorOffsetY = 60;
                    view._guard1.setload('empweishi2');
                    view._guard2.setload('empweishi2');
                    view.setLayoutPosition(LayoutConst.leftbottom, view._guard1, view, [GameConfig.stageWidth / 2 - 50,view._empbottom.height-60]);
                view.setLayoutPosition(LayoutConst.leftbottom, view._guard2, view, [GameConfig.stageWidth / 2 + 50,view._empbottom.height-60]);
                }
            }
        }
        if(type == 4){
            let period = view.api.getFightPeriod2();
            view._timeDesc.text = LanguageManager.getlocal(`emperorTimeDesc4-${period}`, [App.DateUtil.getFormatBySecond(view._time)]);
        }
        view._timeDesc.x = (GameConfig.stageWidth - view._timeDesc.textWidth) / 2;
        if(type == 5){
            view.hide();
        }
    }

    //中部按钮
    private enterHandle():void{
        let view = this;
        if(view._stopClick){
            return;
        }
        let type = view.api.type;
        if(view.api.isInCalSignTime()){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarPrepareTimeTip"));
            return;
        }
        switch(type){
            case 1:
                App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
                return;
            case 2:
                //报名弹窗
                ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARSIGNPOPVIEW);
                break;
            case 3:
            case 4:
            case 5:
                //vs弹窗
                if(view.api.getBmlistData().length == 0){
                    App.CommonUtil.showTip(LanguageManager.getlocal("emperorWarCancel"));
                    return;
                }
                view.showEnterMovie();
                break;
        }
    }

    private showEnterMovie() : void{
        let view = this;
        view._stopClick = true;
        egret.Tween.get(view._midBtn,{onChange : ()=>{
            view._midBtn.x = (GameConfig.stageWidth - view._midBtn.width * view._midBtn.scaleX)/2, 
            view._midBtn.y = (GameConfig.stageHeigth - view._midBtn.height * view._midBtn.scaleY)/2
        }, onChangeObj : view}).to({scaleX : 0.7, scaleY : 0.7}, 50).to({scaleX : 1, scaleY : 1}, 150).to({scaleX : 4, scaleY : 4, alpha : 0}, 300).call(()=>{
            view._maskBmp.alpha = 0;
            view._midBtn.setScale(1);
            egret.Tween.get(view.viewBg,{onChange : ()=>{
                view.viewBg.x = (GameConfig.stageWidth - view.viewBg.width * view.viewBg.scaleX)/2, 
                view.viewBg.y = (GameConfig.stageHeigth - view.viewBg.height * view.viewBg.scaleY)/2
            }, onChangeObj : view}).to({scaleX : 1.7, scaleY : 1.7}, 1000);

            egret.Tween.get(view._guard1).to({alpha : 0, scaleX : -1.7, scaleY : 1.7},1000);
            egret.Tween.get(view._guard2).to({alpha : 0,scaleX : 1.7, scaleY : 1.7},1000);
            
            egret.Tween.get(view._maskBmp).to({alpha : 1}, 1200).call(()=>{
                let type = view.api.type;
                if(type == 2){
                    ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARSIGNPOPVIEW);
                }
                else if(type > 2){
                    ViewController.getInstance().openView(ViewConst.COMMON.EMPERORWARVSVIEW);
                }
            },view).wait(1000).call(()=>{
                view._stopClick = false;
                view._maskBmp.alpha = 0;
                view.viewBg.setScale(1);
                view._guard1.scaleX = -1;
                view._guard1.scaleY = 1;
                view._guard2.setScale(1);
                view._guard1.alpha = view._guard2.alpha = 1;
                view.setLayoutPosition(LayoutConst.lefttop, view.viewBg, view);
                view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._midBtn, view);
                view._midBtn.alpha = 1;
                view._midBtn.x = (GameConfig.stageWidth - view._midBtn.width * view._midBtn.scaleX)/2, 
                view._midBtn.y = (GameConfig.stageHeigth - view._midBtn.height * view._midBtn.scaleY)/2
            },view);
        },view);
    }

    //奖励弹窗
    private rewardClick():void{
        let view = this;
        if(view._stopClick){
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREWARDVIEW);
        
        // ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARREPLAYPOPUPVIEW);
    }
    // //报名册弹窗
    // private bmcClick():void{
    //     let view = this;
    //     ViewController.getInstance().openView(ViewConst.POPUP.EMPERORWARBMCEVIEW);
    // }

    private receiveBmlist(evt : egret.Event):void{
        let view = this;
        let data = evt.data;
        let cmd = data.data.cmd;
        if(cmd == NetRequestConst.REQUEST_EMPEROR_BMLIST){
            if (data.data.data.bmlist)
            {
                view.api.setBmListData(data.data.data.bmlist);
            }
        }
    }

    public dispose():void{
        let view = this;
        view._timeDesc = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_GETMODEL),this.getModelCallback,this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_EMPEROR_BMLIST),this.receiveBmlist,this);
        egret.Tween.removeTweens(view._midBtn);
        egret.Tween.removeTweens(view.viewBg);
        egret.Tween.removeTweens(view._maskBmp);
        egret.Tween.removeTweens(view._guard1);
        egret.Tween.removeTweens(view._guard2);
        BaseLoadBitmap.release(view._bg);
        view._bg = null;
        if(App.CommonUtil.check_dragon()){
            view._guard1.stop();
            view._guard2.stop();
        }
        else{
            BaseLoadBitmap.release(view._guard1);
            BaseLoadBitmap.release(view._guard2);
        }
        view._guard1 = null;
        view._guard2 = null;
        view._midBtn = null;
        view._timeDesc = null;
        view._empbottom = null;
        super.dispose();
    }
}