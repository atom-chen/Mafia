/**
 * 充值活动，累积充值列表节点
 * author yanyuling
 * date 2017/11/08
 * @class AcTotalRechargeScrollItem
 */
class AcTotalRechargeScrollItem  extends ScrollListItem
{
    private _uiData = undefined;
    private _progress:ProgressBar;
    private _collectFlag:BaseBitmap;
    private _rechargeItem = null;
    private _collectBtn:BaseButton;
    private _chargeBtn:BaseButton;
    private _curIdx:number=0;
    private _lastReqIdx:number = null;
   
    public constructor()
    {
        super();
    }

    protected initItem(index:number,data:any)
    {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshBtnStatus,this);

        this._uiData = data;
        this._curIdx = index;
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode("totalRecharge",totalVo.code);
        let rechargeItem = cfgObj.getRechargeItemById(data);
        // let tmpVo = <AcTotalRechargeVo>Api.acVoApi.getActivityVoByAidAndCode("totalRecharge","1");
        this._rechargeItem = rechargeItem;

        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 598;
        bg.height = 158;
        this.addChild(bg);

        let charge_redBg = BaseBitmap.create("activity_charge_red");
        charge_redBg.y = 5;
        this.addChild(charge_redBg);

        let Txt1 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        Txt1.text = LanguageManager.getlocal("acTotal_recharge_txt1",[String(rechargeItem.needGem)])
        Txt1.x = charge_redBg.x+20;
        Txt1.y = charge_redBg.y + 10;
        this.addChild(Txt1);

        let Txt2 = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
        Txt2.text = LanguageManager.getlocal("acrecharge_return");
        Txt2.x = charge_redBg.x+20;
        Txt2.y = 65;
        this.addChild(Txt2);

        let itemicon1 = BaseLoadBitmap.create("itemicon1");
        itemicon1.setScale(0.45);
        itemicon1.x = 130;
        itemicon1.y = Txt2.y -12;
        this.addChild(itemicon1);
        
        let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(rechargeItem.getGem + "", "recharge_fnt");
		numLb.x = 175;
		numLb.y = Txt2.y+Txt2.height/2 - numLb.height/2;
        this.addChild(numLb);
		

        // getGem

        let progress = ComponentManager.getProgressBar("progress5","progress3_bg",386);
        progress.x = 20;
        progress.y = 100;
        this._progress = progress;
        this.addChild(progress);
       
        this.refreshBtnStatus();
    }
    protected refreshBtnStatus()
    {
        let tmpVo = <AcTotalRechargeVo>Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        if(tmpVo == null || tmpVo.v == null)
        {
            return;
        }
        this._progress.setText(LanguageManager.getlocal("acrecharge_yuan",[String(tmpVo.v),this._rechargeItem.needGem]));
        this._progress.setPercentage(tmpVo.v / this._rechargeItem.needGem);
        if (this._collectFlag)
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        if (this._collectBtn)
            this.removeChild(this._collectBtn);
            this._collectBtn = null;
        if (this._chargeBtn)
            this.removeChild(this._chargeBtn);
            this._chargeBtn = null;

        if (tmpVo.flags[this._uiData])
        {
            this.createCollectFlag();
        }
        else
        {
            if (tmpVo.v >= this._rechargeItem.needGem)
            {
                let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"ac_recharge_Btntxt2",this.eventCollectHandler ,this);        
                collectBtn.x = this._progress.x + this._progress.width + 20;
                collectBtn.y = this._progress.y + this._progress.height/2 -collectBtn.height/2 ;
                collectBtn.name = "collectBtn"
                this.addChild(collectBtn);
                this._collectBtn = collectBtn;
            }else
            {
                let chargeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED,"ac_recharge_Btntxt1",this.goRechargeHandler ,this);        
                chargeBtn.x = this._progress.x + this._progress.width + 20;
                chargeBtn.y =  this._progress.y + this._progress.height/2 -chargeBtn.height/2 ;
                chargeBtn.name = "chargeBtn";
                this.addChild(chargeBtn);
                this._chargeBtn = chargeBtn;
            }
        }
    }

    protected refreshUI()
    {
        if(this.getChildByName("collectBtn"))
        {
             this.getChildByName("collectBtn").visible = false;
        }
         if (this._collectFlag)
            this.removeChild(this._collectFlag);
            this._collectFlag = null;
        /**
         * 展示已领取
         */
        this.createCollectFlag();
        this._collectFlag.visible = false;
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},300);
    }

    protected createCollectFlag()
    {
        this._collectFlag = BaseBitmap.create("collectflag")
        this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
        this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
        this._collectFlag.setScale(0.7);
        this._collectFlag.x = this._progress.x + this._progress.width + 100;
        this._collectFlag.y = this._progress.y + this._progress.height/2-10;
        this.addChild(this._collectFlag);
    }

    protected eventCollectHandlerCallBack(event:egret.Event)
    {
        this.removeUIListener();
        let rData = event.data.data.data;
        let ret = event.data.data.ret
        if (ret != 0 || this._lastReqIdx != this._curIdx)
        {
            return;
        }
        this._lastReqIdx = null;
        this.refreshUI();
        let  rewards = rData.rewards
        let rewardList =  GameData.formatRewardItem(rewards);
        let pos = this._progress.localToGlobal(this._progress.width + 50,20);
        App.CommonUtil.playRewardFlyAction(rewardList,pos);
    }

    protected eventCollectHandler(event:egret.TouchEvent)
    {
        this.addUIListener();
        this._lastReqIdx = this._curIdx;
        let totalVo = Api.acVoApi.getActivityVoByAidAndCode("totalRecharge");
        NetManager.request(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD,{activeId:"totalRecharge-"+totalVo.code,rkey:this._uiData})
    }
    
    protected goRechargeHandler(event:egret.Event)
    {
        ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
    }
    public getSpaceX():number
	{
		return 10;
	}
	/**
	 * 不同格子Y间距
	 */
	public getSpaceY():number
	{
		return 5;
	}
     public addUIListener()
    {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD),this.eventCollectHandlerCallBack,this);
    }
    public removeUIListener()
    {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_RECHARGE_GETTOTALREWARD),this.eventCollectHandlerCallBack,this);
    }
    public dispose():void
    {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshBtnStatus,this);
        this.removeUIListener();
        this._uiData = null;
        this._collectFlag = null;
        this._progress = null;
        this._collectBtn = null;
        this._chargeBtn = null;
        this._curIdx = 0;
        this._rechargeItem = null;
        this._lastReqIdx = null;

        super.dispose();
    }
}
