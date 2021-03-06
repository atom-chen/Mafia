/**
 * 皇宫
 * author yanyuling
 * date 2017/11/01
 * @class PalaceView
 */

class PalaceHouseView  extends CommonView
{
    private _nodeContainer:BaseDisplayObjectContainer;
    private _titleImgBg:BaseBitmap
    private _curRoleImg:PalaceRoleInfoItem;
    private _editBtn:BaseButton;
    private _palace_rewardbg:BaseBitmap;
    private _collectBtn:BaseButton;
    private _curTitleId:string;
    private _kingsList = {};
    private _kingsSign = "";
    private _kingsInfo = undefined;
    private isGotoKingsHouse:boolean = false;
    public constructor() {
        super();
	}

	// 标题背景名称
	protected getTitleStr():string
	{
		return "palace_buildingName"+this.param.data.buildingId;
	}
	public initView():void
	{
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectBtnClickHandlerCallback,this);

        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        this._curTitleId = this.param.data.titleId;

        let bgPath = "palace_bg";
        let imgH = 1096;
        if(Config.TitleCfg.isTheKingTitleId(this._curTitleId))
        {
            bgPath = "palace_bg4";
            imgH = 1136;
        }
        let palace_bg = BaseLoadBitmap.create(bgPath)
        palace_bg.width = 640;
        palace_bg.height = imgH; 
        
        palace_bg.y = GameConfig.stageHeigth - this.container.y - palace_bg.height;
        this._nodeContainer.addChild(palace_bg);

        this._curRoleImg =  new PalaceRoleInfoItem();
        this._curRoleImg.y =  50;
        this._curRoleImg.x = GameConfig.stageWidth/2 - this._curRoleImg.width/2;
        this._curRoleImg.visible = false;

        /**
         * 考虑层级问题
         */
        this._nodeContainer.addChild(this._curRoleImg);
       
        let bseH = GameConfig.stageHeigth - 110 - this.container.y;
	    if(!Api.switchVoApi.checkOpenShenhe())
		{
            let hisBtn = ComponentManager.getButton(this.getHisBtnPath(),"",this.hisBtnClickHandler,this);
            hisBtn.x = -5;
            hisBtn.y = bseH - 30;
            this._nodeContainer.addChild(hisBtn);
            bseH -= hisBtn.height;
            
        }

        if( Config.TitleCfg.isTheKingTitleId(this._curTitleId) && this._kingsInfo.uid != "" )
        {
            let kingsBtn = ComponentManager.getButton("palace_kingslogBtn","",this.kingsBtnClickHandler,this);
            kingsBtn.x = 10;
            kingsBtn.y = bseH;
            this._nodeContainer.addChild(kingsBtn);
        }

        
		
        let palace_rewardbg = BaseBitmap.create("palace_rewardbg");
        palace_rewardbg.width = 300;
        if(PlatformManager.checkIsTextHorizontal())
        {
            palace_rewardbg.setPosition(GameConfig.stageWidth/2 - palace_rewardbg.width / 2,2 * GameConfig.stageHeigth / 3 + 120);
        }
        else{
            palace_rewardbg.x = GameConfig.stageWidth/2 - palace_rewardbg.width/2;
            palace_rewardbg.y =  bseH;
        }

        this._nodeContainer.addChild(palace_rewardbg);
        this._palace_rewardbg = palace_rewardbg;

        let palace_rewardTxt = ComponentManager.getTextField("",22,TextFieldConst.COLOR_LIGHT_YELLOW);
        let gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        palace_rewardTxt.text = LanguageManager.getlocal("palace_reward",[String(gem)]);
        if(PlatformManager.checkIsTextHorizontal())
        {
            palace_rewardTxt.setPosition(GameConfig.stageWidth/2 - palace_rewardTxt.width / 2,palace_rewardbg.y + palace_rewardbg.height / 2 -palace_rewardTxt.height / 2)
        }
        else
        {
            palace_rewardTxt.x = GameConfig.stageWidth/2 - palace_rewardTxt.width/2;
            palace_rewardTxt.y = palace_rewardbg.y + palace_rewardbg.height/2 - palace_rewardTxt.height/2 ;
        }

        this._nodeContainer.addChild(palace_rewardTxt);
        
        if (Api.otherInfoVoApi.getPalaceFlag() == 0)
        {
            let collectBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.collectBtnClickHandler,this);
            if(PlatformManager.checkIsTextHorizontal())
            {
                collectBtn.setPosition(GameConfig.stageWidth/2 - collectBtn.width / 2,palace_rewardbg.y - 70);
            }
            else
            {
                collectBtn.x = GameConfig.stageWidth/2 - collectBtn.width/2;
                collectBtn.y = palace_rewardbg.y - collectBtn.height/2 - 40;
            }

            this._nodeContainer.addChild(collectBtn);
            this._collectBtn = collectBtn;
        }else
        {
            let collectFlag = BaseBitmap.create("palace_collectflag");
            collectFlag.setScale(0.7);
            collectFlag.anchorOffsetX = collectFlag.width/2;
            if(PlatformManager.checkIsTextHorizontal())
            {
                collectFlag.setPosition(GameConfig.stageWidth/2,palace_rewardbg.y - 87);
            }
            else{
             collectFlag.x = GameConfig.stageWidth/2;
             collectFlag.y = palace_rewardbg.y - collectFlag.height/2 -30;
            }

            this._nodeContainer.addChild(collectFlag);
        }

        this._editBtn = ComponentManager.getButton("palace_editBtn","",this.editBtnClickHandler,this);
        this._editBtn.x = GameConfig.stageWidth - this._editBtn.width - 20;
        this._editBtn.y =  bseH - 15;//- this._editBtn.height;
        this._editBtn.visible = false;
        this._nodeContainer.addChild(this._editBtn);
        this.palaceInfoHandlerCallback();
    }

    private getHisBtnPath()
    {
        let titleId = Number(this._curTitleId);
        let titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        if(Config.TitleCfg.isTheKingTitleId(this._curTitleId))
        {
            return "palace_hisBtn1";
        }else{
            if(titlecfg.isCross == 1)
            {
                return "palace_historyBtn"
            }else
            {
                return "palace_hisBtn2"
            }
        }
    }

    protected kingsBtnClickHandler()
    {
        Api.emperorwarVoApi.openEmpView();
        this.hide();
    }
    protected palaceInfoHandlerCallback()
    {
        let myPkey =  this._curTitleId;
        
        let roleinfo = undefined;
        if( Config.TitleCfg.isTheKingTitleId(myPkey))
        {
            this._kingsInfo.titleId = myPkey;
            roleinfo = this._kingsInfo;
        }else{
            roleinfo = Api.palaceVoApi.getRoleInfoByTitleId(myPkey);
        }
        this._curRoleImg.refreshUIWithData(roleinfo);
        this._curRoleImg.visible = true;
        let btnKey = "palace_collect";
        let puid = roleinfo.uid;
        let isOnly = Config.TitleCfg.getTitleCfgById(myPkey).isOnly
        
        if(isOnly == 1 && puid == Api.playerVoApi.getPlayerID())
        {
            this._editBtn.visible = true;
            btnKey = "palace_collect2";
        }
        else
        {
            this._editBtn.visible = false;
        }
         
        if(this._collectBtn)
        {
            this._collectBtn.setText(btnKey);
        }
    }

    protected editBtnClickHandler()
    {
        let name = Api.palaceVoApi.getRoleInfoByTitleId(this._curTitleId).name
        // ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW,name);
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEEDITSIGNPOPUPVIEW,this._curTitleId);
    }

    protected collectBtnClickHandlerCallback(event:egret.Event)
    {
        this._collectBtn.visible = false;
        let rData = event.data.data.data;
        let collectFlag = BaseBitmap.create("palace_collectflag");
        collectFlag.setScale(0.7);
        collectFlag.anchorOffsetX = collectFlag.width/2;
        collectFlag.x =GameConfig.stageWidth/2
        collectFlag.y = this._palace_rewardbg.y - collectFlag.height/2  -30 ;
        collectFlag.setScale(1.3);
        collectFlag.visible = true;
        this._nodeContainer.addChild(collectFlag);
        egret.Tween.get(collectFlag,{loop:false}).to({scaleX:0.7,scaleY:0.7},300);
        
        let gem = Config.LevelCfg.getCfgByLevel(String(Api.playerVoApi.getPlayerLevel())).gem;
        let rewardStr = "1_0_"+String(gem);
        let rList = GameData.formatRewardItem(rewardStr);
        let pos = collectFlag.localToGlobal(30,-50);
        pos.x = GameConfig.stageWidth/2;
        App.CommonUtil.playRewardFlyAction(rList,pos);
        
    }
    protected collectBtnClickHandler()
    {
        NetManager.request(NetRequestConst.REQUEST_PALACE_GETSALARY,{});
    }
    // protected hisBtnClickHandler()
    // {
    //     ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW,{titleId:this._curTitleId});
    // }


    protected hisBtnClickHandler()
    {
        ViewController.getInstance().openView(ViewConst.POPUP.PALACEHISTORYPOPUPVIEW,{titleId:this._curTitleId,dataList:this._kingsList});
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "palace_titlebg","palace_role_shadow",
            "palace_role_empty","palace_historyBtn", "palace_historyBtn_down" ,"wifeview_bottombg",

            "palace_kingslogBtn","palace_kingslogBtn_down",

            "palace_rewardbg","servant_attributemap",
            "palace_editBtn_down","palace_editBtn","palace_collectflag","palace_hisBtn1","palace_hisBtn2",
        ]);
    }
    
    protected receiveData(data: { ret: boolean, data: any }): void
    {
        let rData = data.data;
        if(rData.ret == 0)
        {
            this._kingsList = rData.data.kinglist;
            this._kingsSign = rData.data.sign;
            this._kingsInfo = rData.data.info;
        }
    }

    protected tick()
    {
        let titleId =  this.param.data.titleId;
        if(!this.isGotoKingsHouse && titleId && Config.TitleCfg.isTheKingTitleId(titleId) && Api.promoteVoApi.isKing())
        {
            this.isGotoKingsHouse = true;
            let msg = LanguageManager.getlocal("decree_tobeNewKingTip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
                title:"itemUseConstPopupViewTitle",
                msg:msg,
                callback:this.gotoHKingsHouse,
                handler:this,
                needCancel:false
            });
        }
        return true;
    }
    protected gotoHKingsHouse()
    {
        Api.palaceVoApi.enterKingsHouse();
        this.hide();
    }
    protected getRequestData():{requestType:string,requestData:any}
	{ 
       let titleId =  this.param.data.titleId;
       if(titleId && Config.TitleCfg.isTheKingTitleId(titleId))
       {
            return {requestType:NetRequestConst.REQUEST_POLICY_INDEX,requestData:{}};
       }
        return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    }

    protected getRuleInfo():string
	{
        let titleId =  this.param.data.titleId;
        if(titleId && Config.TitleCfg.isTheKingTitleId(titleId))
        {
                return "palaceKingshouse_roleinfo";
        }
        return null;
	}
	public dispose():void
	{
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETSALARY),this.collectBtnClickHandlerCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PALACE_GETPALACEINFO),this.palaceInfoHandlerCallback,this);
        
        this._nodeContainer = null;
        this._curRoleImg = null;
        this._editBtn = null;
        this._palace_rewardbg = null;
        this._collectBtn = null;
        this._curTitleId = null;
        this._kingsList = null;
        this._kingsSign = null;
        this._kingsInfo = null;
        this.isGotoKingsHouse = false;

		super.dispose();
	}
}