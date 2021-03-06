class MainUINewTop extends BaseLoadDisplayObjectContiner
{
	private headImg:BaseLoadBitmap;
	private headBg:BaseBitmap;
	private _headContiner:BaseDisplayObjectContainer;
	private _nickNameText:BaseTextField;
	private _powerValueText:BaseTextField;
	private _officerText:BaseBitmapText|BaseTextField;
	private _soldierValueText:BaseTextField;
    private _foodValueText:BaseTextField;
    private _goldValueText:BaseTextField;
	private _gemValueText:BaseTextField;
	private _isShowName:boolean;
	private _upgradeClip:CustomMovieClip;
	public constructor(data:{showName:boolean})
	{
		super();
		this._isShowName=data?data.showName:false;
		egret.callLater(this.show,this);
	}

	protected getResourceList():string[]
	{
		return [
			"mainui_newheadbg",
			PlatformManager.hasSpcialCloseBtn()?"mainui_newtopbg_wxgame":"mainui_newtopbg",
			"office_fnt",
		];
	}

	protected getParent():egret.DisplayObjectContainer
	{
		return null;
	}

	// protected preInit():void
	// {
	// 	this.init();
	// }

	public show(data?:any):void
	{
		super.show(data);
	}

	protected init():void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR,this.changeImgNotify,this);
		// App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PRESTIGE,this.checkPrestigeRedDot,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkPracticeRed,this);


		let curButtomY:number=0;
		let topinfobg:BaseBitmap = BaseBitmap.create(PlatformManager.hasSpcialCloseBtn()?"mainui_newtopbg_wxgame":"mainui_newtopbg");
		topinfobg.touchEnabled=true;
		topinfobg.y = curButtomY;
		this.addChildAt(topinfobg,0);
		curButtomY=topinfobg.y+topinfobg.height;

		let headImg = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
		headImg.width = 112;
		headImg.height = 135;
		headImg.name = "headImg";
		headImg.setPosition(2,5);
		this.addChild(headImg);
		headImg.addTouchTap(this.roleHeadClickHandler,this);
		this._headContiner = headImg;
		this.headImg = <BaseLoadBitmap>headImg.getChildByName("myHead");
		this.headBg = <BaseBitmap>headImg.getChildByName("myBody");
		let fontsize = 22;
		let fontcolor = TextFieldConst.COLOR_LIGHT_YELLOW;
		// this.checkPrestigeRedDot();

		this._nickNameText =  ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),fontsize,fontcolor);
		this._nickNameText.anchorOffsetX = this._nickNameText.width/2
		this._nickNameText.setPosition(190,16);
		this.addChild(this._nickNameText);

		//官职
		this._officerText = ComponentManager.getBitmapText(Api.playerVoApi.getPlayerOffice(), "office_fnt",0xfff000);
		this._officerText.anchorOffsetX = this._officerText.width/2;
		this._officerText.setScale(0.8);
		this._officerText.x =  45;
		this._officerText.y = 73;
		this.addChild(this._officerText);

		//势力 
		this._powerValueText = ComponentManager.getTextField(Api.playerVoApi.getPlayerPowerStr(),fontsize,fontcolor);
		this._powerValueText.setPosition(PlatformManager.hasSpcialCloseBtn()?510:340,this._nickNameText.y);
		this.addChild(this._powerValueText);
		//金币，
		this._gemValueText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGemStr(),fontsize,fontcolor);
		this._gemValueText.setPosition(PlatformManager.hasSpcialCloseBtn()?340:510,this._nickNameText.y);
		this.addChild(this._gemValueText);
		//银币，
		this._goldValueText = ComponentManager.getTextField(Api.playerVoApi.getPlayerGoldStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdf2e8);
		this._goldValueText.setPosition(160,68);
		this.addChild(this._goldValueText);
		//粮食，
		this._foodValueText = ComponentManager.getTextField(Api.playerVoApi.getFoodStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdf2e8);
		this._foodValueText.setPosition(PlatformManager.hasSpcialCloseBtn()?this._gemValueText.x:this._powerValueText.x,this._goldValueText.y);
		this.addChild(this._foodValueText);
		//兵力
		this._soldierValueText = ComponentManager.getTextField(Api.playerVoApi.getSoldierStr(),TextFieldConst.FONTSIZE_CONTENT_COMMON,0xfdf2e8);
		this._soldierValueText.setPosition(PlatformManager.hasSpcialCloseBtn()?this._powerValueText.x:this._gemValueText.x,this._goldValueText.y);
		this.addChild(this._soldierValueText);

		//购买金币按钮
		// btn1
		let addGoldBtn = ComponentManager.getButton("mainui_btn1","",this.addGoldBtnClickHandler,this);
		addGoldBtn.y = 7;
		addGoldBtn.x = PlatformManager.hasSpcialCloseBtn()?420:(GameConfig.stageWidth - addGoldBtn.width - addGoldBtn.y);
		this.addChild(addGoldBtn);
		let addBtnBg:BaseBitmap=BaseBitmap.create("public_alphabg");
		addBtnBg.width=addGoldBtn.width*2;
		addBtnBg.height=addGoldBtn.height*2;
		addBtnBg.setPosition(-addGoldBtn.width,0);
		addGoldBtn.addChild(addBtnBg);
		if(Api.switchVoApi.checkClosePay())
		{
			addGoldBtn.visible=false;
		}
		this.refreshUpgradeClip();
	}

	protected refreshUpgradeClip()
	{
		let curLv = Api.playerVoApi.getPlayerLevel()
		let nextLvCfg =  Config.LevelCfg.getCfgByLevel((curLv+1).toString());
		
		if (nextLvCfg && Api.playerVoApi.getPlayerExp() >=  nextLvCfg.exp || Api.practiceVoApi.isShowRedForPBottom() || Api.prestigeVoApi.isShowRedForPBottom())
		 {
			 if (!this._upgradeClip)
			 {
				this._upgradeClip = ComponentManager.getCustomMovieClip("mainui_fg",10,100);
				this._upgradeClip.anchorOffsetX = this._upgradeClip.width/2;
				this._upgradeClip.anchorOffsetY = this._upgradeClip.height;
				this._upgradeClip.x = -17;
				this._upgradeClip.y = -13;
				// this._upgradeClip.x = -17;
				// if (this._isShowName)
				// {
				// 	this._upgradeClip.y = -12;
				// }else{
				// 	this._upgradeClip.y = -13;
				// }
				let tmpIdx = this.getChildIndex(this.getChildByName("headImg"));
				this.addChildAt(this._upgradeClip,tmpIdx+2);
				this._upgradeClip.playWithTime(0); 
			 }
		 }else
		 {
			 if (this._upgradeClip)
			 {
				 this._upgradeClip.stop();
				 this.removeChild(this._upgradeClip);
				 this._upgradeClip = null;
			 }
		 }
	}

	private addGoldBtnClickHandler():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
		//test code
		// ViewController.getInstance().openView(ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW);
	}

	private roleHeadClickHandler():void
	{
		PlayerBottomUI.getInstance().show();
		// ViewController.getInstance().openView(ViewConst.COMMON.PLAYERVIEW);
	}

	public refresh():void
	{
		this._gemValueText.text = Api.playerVoApi.getPlayerGemStr();
		this._soldierValueText.text = Api.playerVoApi.getSoldierStr();
		this._foodValueText.text = Api.playerVoApi.getFoodStr();
		this._goldValueText.text = Api.playerVoApi.getPlayerGoldStr();
		this._officerText.text = Api.playerVoApi.getPlayerOffice();
		this._powerValueText.text = Api.playerVoApi.getPlayerPowerStr();
		if(this._isShowName)
		{
			this._nickNameText.text = Api.playerVoApi.getPlayerName();
			this._nickNameText.anchorOffsetX = this._nickNameText.width/2;
		}
		this.refreshUpgradeClip();
	}
	protected changeImgNotify()
	{
		let res = "user_head" + Api.playerVoApi.getPlayePicId();
		this.headImg.setload(res);
		let headBg = Api.playerVoApi.getVipHeadBg() ;
		if(headBg){
			this.headBg.texture = ResourceManager.getRes(headBg);	
		}
	}

	private checkPrestigeRedDot()
	{
		if (Api.switchVoApi.checkOpenPrestige())
		{
			if (Api.prestigeVoApi.isShowRedDot)
			{
				App.CommonUtil.addIconToBDOC(this._headContiner);
			}
			else {
				App.CommonUtil.removeIconFromBDOC(this._headContiner);
			}
		}
	}
	public checkPracticeRed()
	{
		this.refreshUpgradeClip();
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_SPECIAL_AVATAR,this.changeImgNotify,this);
		// App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PRESTIGE,this.checkPrestigeRedDot,this);
		/**
		 * 检测修身相关红点
		 */
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_REFRESH_PRACTICE_RED,this.checkPracticeRed,this);

		this.headImg=null;
		this._nickNameText=null;
		this._powerValueText=null;
		this._officerText=null;
		this._soldierValueText=null;
		this._foodValueText=null;
		this._goldValueText=null;
		this._gemValueText=null;
		this._isShowName=false;
		this._upgradeClip=null;
		this.headBg = null;
		this._headContiner = null;
		super.dispose();
	}
}