class AtkracecrossDetailPopupView extends PopupView
{

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"atkracecross_explain_bg","atkracecross_explain_pic"
		]);
	}

	protected getTitleStr():string
	{
		return "atkracecrossDetailTitle";
	}

	protected initView():void
	{

		let typeBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		typeBg.width = 524;
		typeBg.height = 664;
		typeBg.setPosition(this.viewBg.width/2-typeBg.width/2, 12);
		this.addChildToContainer(typeBg);

		let topPic:BaseBitmap = BaseBitmap.create("atkracecross_explain_pic");
		topPic.setPosition(this.viewBg.width/2-topPic.width/2, typeBg.y+4);
		this.addChildToContainer(topPic);

		//区服排名
		let serverRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossActivityRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		serverRank.setPosition(topPic.x+5,topPic.y+topPic.height+8);
		this.addChildToContainer(serverRank);

		let rankBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		rankBg.width = 518;
		rankBg.height = 90;
		rankBg.setPosition(this.viewBg.width/2-rankBg.width/2, serverRank.y+serverRank.height+8);
		this.addChildToContainer(rankBg);

		let rankDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossDetailDesc1"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		rankDesc.setPosition(rankBg.x+20, rankBg.y+8);
		rankDesc.width = rankBg.width-40;
		rankDesc.lineSpacing = 6;
		this.addChildToContainer(rankDesc);

		//个人排名
		let persionRank:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("acPunishRankRewardTab1"), TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BROWN);
		persionRank.setPosition(serverRank.x, rankBg.y+rankBg.height+12);
		this.addChildToContainer(persionRank);

		let persionBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		persionBg.width = 518;
		persionBg.height = 40;
		persionBg.setPosition(this.viewBg.width/2-persionBg.width/2, persionRank.y+persionRank.height+8);
		this.addChildToContainer(persionBg);

		let persionDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossDetailDesc2"), 19);
		persionDesc.setPosition(persionBg.x+20, persionBg.y+12);
		persionDesc.width = rankBg.width-40;
		persionDesc.lineSpacing = 6;
		this.addChildToContainer(persionDesc);

		//活动日期
		let dateBg:BaseBitmap = BaseBitmap.create("atkracecross_explain_bg");
		dateBg.width = 518;
		dateBg.height = 66;
		dateBg.setPosition(this.viewBg.width/2-dateBg.width/2, persionBg.y+persionBg.height+12);
		this.addChildToContainer(dateBg);

		let crossVo = <AcCrossServerAtkRaceVo>Api.acVoApi.getActivityVoByAidAndCode("crossServerAtkRace");
		let timeDesc:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkracecrossTime",[crossVo.acTimeAndHour]), TextFieldConst.FONTSIZE_CONTENT_SMALL);
		timeDesc.x =persionDesc.x;
		timeDesc.y =dateBg.y+10;
		this.addChildToContainer(timeDesc);

		let dateDesc:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
		dateDesc.setPosition(timeDesc.x, timeDesc.y+timeDesc.height+10);
		this.addChildToContainer(dateDesc);

		let timeNumber2:number = 3600*24;
		if (crossVo.et - GameData.serverTime <= timeNumber2)
		{
			dateDesc.text = LanguageManager.getlocal("atkracecrossCDTime3");
		}
		else 
		{
			dateDesc.text = LanguageManager.getlocal("atkracecrossDetailDesc3");
		}

		//底部描述
		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_bg41");
		bottomBg.width = 492;
		bottomBg.height = 136;
		bottomBg.setPosition(this.viewBg.width/2-bottomBg.width/2, dateBg.y+dateBg.height+12);
		this.addChildToContainer(bottomBg);

		let bottomDesc:BaseTextField = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WARN_RED);
		bottomDesc.setPosition(bottomBg.x+20, bottomBg.y+12);
		bottomDesc.width = bottomBg.width-40;
		bottomDesc.height = bottomBg.height-24;
		bottomDesc.lineSpacing = 6;
		bottomDesc.textAlign = egret.HorizontalAlign.CENTER;
		bottomDesc.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.addChildToContainer(bottomDesc);

		if (crossVo.info && crossVo.info.iscanjoin == 1)
		{
			bottomDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc2");
		}
		else 
		{
			bottomDesc.text = LanguageManager.getlocal("atkraceCrossOpenDesc3");
		}


		let closeButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"sysConfirm",this.hide,this);
       	closeButton.setPosition(this.viewBg.width/2-closeButton.width/2, typeBg.y+typeBg.height+20);
		this.addChildToContainer(closeButton);

	}

	protected getBgExtraHeight():number
	{
		return 20;
	}

}