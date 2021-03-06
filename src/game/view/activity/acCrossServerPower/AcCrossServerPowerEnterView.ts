/**
 * author:qianjun
 * desc:进入跨服权势活动
*/
class AcCrossServerPowerEnterView extends CommonView
{
	private _scrollList:ScrollList=null;
	private _scoreTextTab:(BaseBitmapText|BaseTextField)[] = [];
	private _countDownText:BaseTextField = null;
	private _serverList:ScrollList=null;
	private _atkracedes1:BaseTextField = null;
	private _atkracedes2:BaseTextField = null;
	private _chatTxt :BaseTextField = null;

	private _isCanJoin:boolean = false;
	private _cdType : number = 0;

	public constructor() 
	{
		super();
	}

	private get api() : CrossPowerVoApi{
        return Api.crossPowerVoApi;
    }
	
	private get cfg() : Config.AcCfg.CrossServerPowerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerPowerView.AID, AcCrossServerPowerView.CODE);
    }

    private get vo() : AcCrossServerPowerVo{
        return <AcCrossServerPowerVo>Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerPowerView.AID, AcCrossServerPowerView.CODE);
    }


	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
		"crossserverintienterbg-1","atkracecross_award_text","atkracecross_award","atkracecross_top",
		"rankinglist_rankbg",,"forpeople_bottom","atkracecross_rankbg","atkracecross_rank","atkracecross_explain",
		,"arena_rank","arena_rank_text","crosspowerdetailbg",
		"public_9_downbg", "dinner_line", "rankinglist_rank1", "rankinglist_rank2", "rankinglist_rank3", "public_9_wordbg2","crosspowerbg"
		]);
	}

	protected getBgName():string
	{
		return "crosspowerbg";
	}


	protected getTitleStr():string
	{
		return `crossPowerTitle-${AcCrossServerPowerView.CODE}`;
	}

	// 初始化背景
	protected initBg():void
	{
		let bgName:string=this.getBgName();
		if(bgName)
		{
			this.viewBg = BaseLoadBitmap.create(bgName);
			this.viewBg.y = (GameConfig.stageHeigth - 1136);
			this.addChild(this.viewBg); 
		}
	}


	protected getRequestData():{requestType:string,requestData:any}
	{	
		let view = this;
		return {requestType:NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		let view = this;
		view.api.setZoneRankInfo(data.data.data);
	}

	public initView():void
	{	
		// App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
		let view = this;
		let vo = view.vo;
		//当前时间段
		view._cdType = vo.judgeTimeProcess();
		//顶部
		let zrankinfo = view.api.zonerankinfos;
		let arr = [];
		for(let i in zrankinfo){
			arr.push(zrankinfo[i]);
		}
		if(arr.length){//arr.length
			if(zrankinfo.length > 2){
				view.init_top2();
			}
			else{
				view.init_top1();
			}
		}
		else{
			view.init_top2();
		}
		//中间
		view.init_middle();
		//底部个人排行榜
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, {});
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
		let ruleBtn:BaseButton = ComponentManager.getButton("atkracecross_explain","",this.clickDetailBtnHandler,this);
		ruleBtn.x = 12;
		ruleBtn.y = 22;
		this.addChild(ruleBtn);
		if(LocalStorageManager.get(LocalStorageConst.LOCAL_POWER_RULE) == ''){
			view.clickDetailBtnHandler(1);
			LocalStorageManager.set(LocalStorageConst.LOCAL_POWER_RULE, '1');
		}
	}

	//两区对战
	private init_top1():void{
		let view = this;
		let api = view.api;

		let topBg = BaseLoadBitmap.create("atkracecross_top");
		topBg.x = 0;
		topBg.y = 89;
		this.addChild(topBg);

		let zonerankinfos:any = api.zonerankinfos;
		let myServerInfo:any;
		let otherSerInfo:any;
		if(zonerankinfos.length){

			
			if(Api.mergeServerVoApi.judgeIsSameServer(zonerankinfos[0].zid, Api.mergeServerVoApi.getTrueZid()))
			{
				myServerInfo = zonerankinfos[0];
				otherSerInfo = zonerankinfos[1];
			}
			else 
			{
				myServerInfo = zonerankinfos[1];
				otherSerInfo = zonerankinfos[0];
			}
			let serverName1 = Api.mergeServerVoApi.getAfterMergeSeverName(myServerInfo.zid);
			let serverId1:BaseTextField = ComponentManager.getTextField(serverName1,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			serverId1.setPosition(56 - serverId1.width / 2, topBg.y + 46);
			this.addChild(serverId1);

			let serverName2 = Api.mergeServerVoApi.getAfterMergeSeverName(otherSerInfo.zid);
			let serverId2:BaseTextField = ComponentManager.getTextField(serverName2,TextFieldConst.FONTSIZE_CONTENT_COMMON);
			serverId2.setPosition(GameConfig.stageWidth - 56 - serverId2.width / 2, serverId1.y);
			this.addChild(serverId2);
	
			this._scoreTextTab.length = 0;
	
			let serverScore1:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(myServerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
			serverScore1.setPosition(114, topBg.y + 67);
			this.addChild(serverScore1);
			this._scoreTextTab.push(serverScore1);
	
			let serverScore2:BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(String(otherSerInfo.point),TextFieldConst.FONTNAME_ITEMTIP);
			serverScore2.setPosition(GameConfig.stageWidth - 110 - serverScore2.width, serverScore1.y);
			this.addChild(serverScore2);
			this._scoreTextTab.push(serverScore2);
		}
	}

	//区服排行
	private init_top2():void{
		let view = this;
		let api = view.api;
		let zonerankinfos:any = api.zonerankinfos;

		let topBg = BaseBitmap.create("atkracecross_rankbg");
		topBg.y = 89;
		topBg.height = 224;
		this.addChild(topBg);

		
		let serverText:BaseBitmap = BaseBitmap.create("atkracecross_rank");
		serverText.setPosition(GameConfig.stageWidth/2-serverText.width/2,topBg.y+8);
		this.addChild(serverText);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(GameConfig.stageWidth/2 - 155 - rankText.width/2, topBg.y + 50);
		this.addChild(rankText);

		let qufuText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		qufuText.setPosition(GameConfig.stageWidth/2 - qufuText.width/2, rankText.y);
		this.addChild(qufuText);

		let pointText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessPowerScore-${this.vo.code}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		pointText.setPosition(GameConfig.stageWidth/2 + 155 - pointText.width/2, rankText.y);
		this.addChild(pointText);

		let rect = egret.Rectangle.create();
		rect.setTo(0, 0, 640, 144);
		
		let arr = [];
		for(let unit of zonerankinfos){
			arr.push({
				zid : unit.zid,
				point : unit.point,
				type : 'enterIn'
			});
		}
		this._serverList = ComponentManager.getScrollList(AcCorssImacyServerItem, arr, rect);
		this.addChild(this._serverList);
		this._serverList.y = topBg.y + 80;

		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._serverList.y + 50;
		this.addChild(atkracedes);
		this._atkracedes1 = atkracedes;
		this._atkracedes1.visible = arr.length == 0;
	}

	private init_middle():void{
		let view = this;
		let api = this.api;
		let vo = this.vo;
		let wordsBg = BaseBitmap.create("public_9_wordbg2");
		wordsBg.height = 125;
		wordsBg.x = (GameConfig.stageWidth - wordsBg.width) / 2
		wordsBg.y = GameConfig.stageHeigth / 2 - 125 / 2;
		this.addChild(wordsBg);

		let countDownTime = view.api.getCountDownTime();
		let str = LanguageManager.getlocal(vo.getIsCanJoin() ? `croessPowerJoin-${AcCrossServerPowerView.CODE}` : `croessPowerNotJoin-${AcCrossServerPowerView.CODE}`, [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
		let wordsText:BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON);
		wordsText.lineSpacing = 6;
		wordsText.setPosition(wordsBg.x + wordsBg.width / 2 - wordsText.textWidth / 2, wordsBg.y + (125 - 78) / 2 + 7);
		wordsText.textAlign = egret.HorizontalAlign.CENTER;
		this._countDownText = wordsText;
		this.addChild(wordsText);
	}

	public tick():void
	{	
		let view = this;
		let vo = view.vo;
		if(this._chatTxt){
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				showStr=LanguageManager.getlocal('acCrossServeDes', [showStr.zoneid.toString()]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
			}
			this._chatTxt.text = showStr;
		}
		if (view._countDownText) {
			let countDownTime = view.api.getCountDownTime();
			if(countDownTime <= 0){
				view._cdType = view.vo.judgeTimeProcess();
				if(view._cdType == 4){
					view.hide();
					App.CommonUtil.showTip(LanguageManager.getlocal("crossIntimacyCDTime4"));
					return;
				}
			}
			view._countDownText.text = LanguageManager.getlocal(vo.getIsCanJoin() ? `croessPowerJoin-${AcCrossServerPowerView.CODE}` : `croessPowerNotJoin-${AcCrossServerPowerView.CODE}`, [LanguageManager.getlocal(`crossIntimacyCDTime${view._cdType}`) + vo.getCountTimeStr(countDownTime)]);
		}
	}

	private refreshEnterBtn():void
	{
		
	}

	//底部
	private initBottom():void
	{	
		let bottomBg : BaseBitmap = BaseBitmap.create("public_9_downbg");
		bottomBg.height = 200; 
		bottomBg.width = GameConfig.stageWidth;
		bottomBg.y = GameConfig.stageHeigth - 200;
		this.addChild(bottomBg);
		
		//个人排行榜
		let rankListText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankListText.setPosition(40 , bottomBg.y + 20);
		this.addChild(rankListText);
		
		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(rankListText.x + rankListText.textWidth + 100, rankListText.y);
		this.addChild(nameText); 
		
		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(nameText.x + nameText.textWidth + 100 , rankListText.y);
		this.addChild(quText); 
		
		//亲密涨幅
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessPowerScore-${AcCrossServerPowerView.CODE}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(quText.x + quText.textWidth + 100, rankListText.y);
		this.addChild(scoreText);
		
		//列表数据
		let scroRect = new egret.Rectangle(bottomBg.x, rankListText.y + rankListText.textHeight, bottomBg.width, 100);
		let arr = [];
		for(let i in this.api.prankinfos){
			let unit = this.api.prankinfos[i];
			unit.type = 'enterIn';
			unit.crosspower = true;
			arr.push(unit);
		}
		this._scrollList = ComponentManager.getScrollList(AcCorssImacyPRankItem, arr, scroRect);
		this._scrollList.x = bottomBg.x;
		this._scrollList.y = rankListText.y + rankListText.textHeight + 10;
		this.addChild(this._scrollList);
		//描述
		let atkracedes = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes.x = (GameConfig.stageWidth - atkracedes.textWidth) / 2;
		atkracedes.y = this._scrollList.y + 50;
		this.addChild(atkracedes);
		this._atkracedes2 = atkracedes;
		this._atkracedes2.visible = arr.length == 0;

		//分割线
		let lineImg = BaseBitmap.create("dinner_line");
        lineImg.x = (bottomBg.width - lineImg.width) / 2;
        lineImg.y = this._scrollList.y + scroRect.height + 7;
		this.addChild(lineImg);
		
		//自己排名
		let rankStr:string;
		let meRank = this.api.merank;
		if(meRank)
		{
			if (meRank > 300) {
				rankStr = "10000+";
			}
			else {
				rankStr = meRank.toString();
			}
		}
		else
		{	//未上榜
			rankStr = LanguageManager.getlocal(this.vo.getIsCanJoin() ? "atkracedes4" : `crossImacyNoAccess`);// this._merank.toString();
		}
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankListText.x + (rankListText.textWidth - rank.textWidth) / 2, lineImg.y + lineImg.height + 10);
		this.addChild(rank);

		//自己名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		name.setPosition(nameText.x + (nameText.textWidth - name.textWidth) / 2, rank.y);
		this.addChild(name);

		//自己区服
		//let currZid:any = Api.mergeServerVoApi.getTrueZid();//ServerCfg.selectServer.zid;
		let servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
		let serveText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranserver2",[servaername]),TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		serveText.setPosition(quText.x + (quText.textWidth - serveText.textWidth) / 2, name.y); 
		this.addChild(serveText);

		//自己分数
		let str:string = "";
		let mePoint = this.api.mepoint;
		if(mePoint)
		{
			str	= mePoint.toString();
		}else
		{
			str = "0";
		}
		let qinmiText:BaseTextField = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_GREEN);
		qinmiText.setPosition(scoreText.x + (scoreText.textWidth - qinmiText.textWidth) / 2, serveText.y);
		this.addChild(qinmiText);

		let chatbg = null;
		if(1){
			//跨服聊天消息
			chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
			chatbg.width = GameConfig.stageWidth;
			chatbg.height = 35;
			chatbg.x = 0;
			chatbg.y = bottomBg.y - 10 - chatbg.height - 3;
			this.addChild(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);

			let chatIcon = BaseBitmap.create(ResourceManager.getRes("mainui_chatIcon"));
			chatIcon.anchorOffsetX = chatIcon.width/2;
			chatIcon.anchorOffsetY = chatIcon.height/2;
			chatIcon.x =  chatIcon.width/2+10;
			chatIcon.y = chatbg.y + chatbg.height/2;
			this.addChild(chatIcon);
			egret.Tween.get(chatIcon, {
				loop: true,//设置循环播放
			}).to({scaleX:0.8,scaleY:0.8},1000).to({scaleX:1,scaleY:1.0},1000);//设置2000毫秒内 rotation 属性变为360
			
			let showStr:any=Api.chatVoApi.getLastAcCrossMessage();
			if(!showStr)
			{
				showStr="";
			}
			else{
				showStr=LanguageManager.getlocal('acCrossServeDes', [showStr.zoneid.toString()]) + showStr.sendername + ":" + (showStr.content.message.length > 15 ? (showStr.content.message.substring(0,16) + "...") : showStr.content.message);
			}
			this._chatTxt = ComponentManager.getTextField(showStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
			this._chatTxt.width = 480;
			this._chatTxt.height = 20;
			this.setLayoutPosition(LayoutConst.leftverticalCenter, this._chatTxt, chatbg, [chatIcon.x + chatIcon.width + 5, 0]);
			this.addChild(this._chatTxt);
		}
		//活动奖励按钮
		let awardBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rewardHandle,this,null,0);
		awardBg.setPosition(0,bottomBg.y - 10 - awardBg.height - (chatbg ? chatbg.height : 0));
		this.addChild(awardBg);

		let awardIcon:BaseBitmap = BaseBitmap.create("atkracecross_award");
		awardIcon.setPosition(awardBg.width/2-awardIcon.width/2,awardBg.height/2-awardIcon.height/2-5);
		awardBg.addChild(awardIcon);

		let awardText:BaseBitmap = BaseBitmap.create("atkracecross_award_text");
		awardText.setPosition(awardBg.width/2-awardText.width/2,awardIcon.y + awardIcon.height -30);
		awardBg.addChild(awardText);
		//排行榜按钮
		let rankBg:BaseButton = ComponentManager.getButton("forpeople_bottom",null,this.rankHandle,this,null,0);
		rankBg.setPosition(GameConfig.stageWidth - rankBg.width - 5, awardBg.y);
		this.addChild(rankBg);

		let rankIcon:BaseBitmap = BaseBitmap.create("arena_rank");
		rankIcon.setPosition(rankBg.width/2-rankIcon.width/2,rankBg.height/2-rankIcon.height/2-5);
		rankBg.addChild(rankIcon);

		let rankText:BaseBitmap = BaseBitmap.create("arena_rank_text");
		rankText.setPosition(rankBg.width/2-rankText.width/2,rankIcon.y + rankIcon.height -30);
		rankBg.addChild(rankText);
	}

	private chatBgClickHandler():void{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATACTIVITYCROSSVIEW, {activeID : this.vo.aidAndCode});
	}
	 
	public useCallback(event: egret.Event): void  
	{
		Api.crossPowerVoApi.setPRankInfo(event.data.data.data);
		if(!this._scrollList){
			this.initBottom();
		}
	}

	private rankHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERRANKLISTVIEW);
	}

	private rewardHandle():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSSERVERPOWERREWARDVIEW);
	}

	private refreshServant():void
	{	
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK, {});
		NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_ZRANK, {});
	}


	private clickDetailBtnHandler(param:any):void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ACCROSSPOWERDETAILPOPUPVIEW);
	}

	public hide():void{
		super.hide();
		ViewController.getInstance().hideAllView();
	}

	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_REFRESH), this.refreshServant, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_PRANK), this.useCallback, this);
		this._scrollList = null;
		this._scoreTextTab = [];
		this._scoreTextTab.length = 0;
		this._countDownText = null;
		this._serverList = null;
		this._isCanJoin = false;
		this._atkracedes1 = null;
		this._atkracedes2 = null;
		this._chatTxt = null;
		super.dispose();
	}
}