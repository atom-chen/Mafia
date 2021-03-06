class WelfareViewMonthCard extends WelfareViewTab
{
	private _goToRechargeBtn:BaseButton;
	private _scrollContiner:BaseDisplayObjectContainer=undefined;

	private _offsetY:number = 0;

	public constructor() 
	{
		super();
	}

	protected init():void
	{
		super.init();
		this._offsetY = this.bottomBg.y+20;
		this._scrollContiner = new BaseDisplayObjectContainer();
		let rect:egret.Rectangle = egret.Rectangle.create();
		rect.setTo(0,this.bottomBg.y+20,this.bottomBg.width, this.bottomBg.height - 40);

		let scrollView:ScrollView = ComponentManager.getScrollView(this._scrollContiner,rect);
		this.addChild(scrollView);
		
		let line1 = BaseBitmap.create("public_line3");
		line1.width = this.bottomBg.width - 100;
		line1.x = this.bottomBg.width/2 - line1.width/2;
		line1.y = this.bottomBg.y+ 45 - this._offsetY;
		this._scrollContiner.addChild(line1);
		
		let cardNameTF:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("monthCard"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_BROWN);
		cardNameTF.x = line1.x + line1.width/2 - cardNameTF.width/2;
		cardNameTF.y = line1.y + line1.height/2 - cardNameTF.height/2;
		this._scrollContiner.addChild(cardNameTF);

		let iconSp = BaseBitmap.create("monthcard_bigicon");
		iconSp.x = this.bottomBg.width/2 - iconSp.width/2;
		iconSp.y = this.bottomBg.y+ 90  - this._offsetY;
		this._scrollContiner.addChild(iconSp);


		//描述
		let carddescriptiondeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("carddescription"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
		carddescriptiondeTxt.x = iconSp.x -34;  //10  315
		carddescriptiondeTxt.y = iconSp.y-109 + this._offsetY;
		this.addChild(carddescriptiondeTxt);

		let descSp = BaseBitmap.create("monthcard_desc");
		descSp.x = this.bottomBg.width/2 - descSp.width/2;
		descSp.y = iconSp.y + iconSp.height + 10;
		this._scrollContiner.addChild(descSp);

		if (Api.switchVoApi.checkJumpBattle()) 
		{	
			descSp.y = iconSp.y + iconSp.height;
			let jumpSp = BaseBitmap.create("unlock_challenge_skip");
			jumpSp.x = this.bottomBg.width/2 - jumpSp.width/2;
			jumpSp.y = descSp.y + descSp.height;
			this._scrollContiner.addChild(jumpSp);	
		}

		//修身显示
		if(Api.practiceVoApi.isPracticeOPen())
		{
			let practice = BaseBitmap.create("unlock_practice");
			practice.x = this.bottomBg.width/2 - practice.width/2;
			practice.y = descSp.y + descSp.height+30;
			this._scrollContiner.addChild(practice);	
		}


		let isBuy = Api.shopVoApi.ifBuyMonthCard();
		if(isBuy == true)
		{
			let hasGetSp = BaseBitmap.create("welfare_hasbuy");
			hasGetSp.x = this.bottomBg.width/2 - hasGetSp.width/2;
			hasGetSp.y = descSp.y + descSp.height + 45 - hasGetSp.height/2;
			this._scrollContiner.addChild(hasGetSp);
			if(Api.practiceVoApi.isPracticeOPen())
			{
				hasGetSp.y = descSp.y + descSp.height + 75 - hasGetSp.height/2;
			}
		
			this.showText();
		}
		else
		{

			let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g7");
			if(rechargeItemCfg)
			{
				App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
				let goToRechargeBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"anyMoney",this.goToRechargeHandler,this);
				goToRechargeBtn.x = this.bottomBg.width/2 - goToRechargeBtn.width/2;
				goToRechargeBtn.y = descSp.y + descSp.height + 45 - goToRechargeBtn.height/2 ;
				if (Api.switchVoApi.checkJumpBattle()) 
				{	
					goToRechargeBtn.y = descSp.y + descSp.height + 65 - goToRechargeBtn.height/2 ;
				}
				if(Api.practiceVoApi.isPracticeOPen())
				{
					goToRechargeBtn.y = descSp.y + descSp.height + 95 - goToRechargeBtn.height/2 
				}
				goToRechargeBtn.setText(App.CommonUtil.getMoneyString(rechargeItemCfg.cost),false);
				this._scrollContiner.addChild(goToRechargeBtn);
				this._goToRechargeBtn = goToRechargeBtn;
			}
		}

		if (PlatformManager.checkIsTWMCSp() == true)
		{
			let buyCardExplain:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("twBuyCardExplain"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
			buyCardExplain.width = 360;
			buyCardExplain.height = 250;
			buyCardExplain.x = this.bottomBg.width/2 - buyCardExplain.width/2;
			buyCardExplain.y = descSp.y+220;
			buyCardExplain.lineSpacing = 5;
			this._scrollContiner.addChild(buyCardExplain);

		}
	}
	public showText():void
	{
		//月卡有效期
		let str =App.DateUtil.getFormatBySecond(Api.shopVoApi.getMonthcardet(),6);
		let cardTimedeTxt:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("cardTimedes",[str]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BLACK);
		cardTimedeTxt.x = 240;
		cardTimedeTxt.y = 960-130 - this._offsetY;
		this._scrollContiner.addChild(cardTimedeTxt);
	}

	private useCallback(event:egret.Event=null):void
	{
		
		let isBuy = Api.shopVoApi.ifBuyMonthCard();
		if(isBuy)
		{
			 this.showText();
			this._goToRechargeBtn.visible = false;
			let hasGetSp = BaseBitmap.create("welfare_hasbuy");
			hasGetSp.x = this._goToRechargeBtn.x + this._goToRechargeBtn.width/2 - hasGetSp.width/2;
			hasGetSp.y = this._goToRechargeBtn.y + this._goToRechargeBtn.height/2 - hasGetSp.height/2;
			this._scrollContiner.addChild(hasGetSp);

			App.CommonUtil.showTip(LanguageManager.getlocal("sysBuySuccessDesc",[LanguageManager.getlocal("monthCard")]));
			App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		}
	}

	private goToRechargeHandler():void
	{
		PlatformManager.pay("g7");
		// ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIEW);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT,this.useCallback,this);
		this._goToRechargeBtn = null;
		this._scrollContiner = undefined;
		this._offsetY = 0;

		super.dispose();
	}
}