/**
 * 跨服亲密排行榜
 */

class AcCrossServerIntimacyRankListView extends PopupView
{	
	private _scrollList:ScrollList;
	private _scrollList2:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private atkracedes5:any =null;
	private isShowTextBoo:boolean =false;
	private _curTabIdx : number = 0;
	private _nickName : BaseTextField = null;
	private _nickNameTxt : BaseTextField = null;
	private _serverTxt : BaseTextField = null;
	private _playerName : BaseTextField = null;
	private _playerServer : BaseTextField = null;
	private _playerRank : BaseTextField = null;
	private _playerScore : BaseTextField = null;
	private _atkracedes5 : BaseTextField = null;

    public constructor() 
	{
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rankinglist_line",
			"rankinglist_rankbg",
			"rankinglist_rank1",
			"rankinglist_rank2",
			"rankinglist_rank3",
			
        ]);
	}

	private get cfg() : Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
    }

    private get vo() : AcCrossServerIntimacyVo{
        return <AcCrossServerIntimacyVo>Api.acVoApi.getActivityVoByAidAndCode(AcCrossServerIntimacyView.AID, AcCrossServerIntimacyView.CODE);
	}
	
	private get api() : CrossImacyVoApi{
        return Api.crossImacyVoApi;
	}

    public initView():void
	{
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.fresh_view, this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK), this.fresh_view, this);
		let tabName = ["crossServerImacyRankListViewTab1", "crossServerImacyRankListViewTab2"];

        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,this.tabBtnClickHandler,this);
        tabbarGroup.x = 40;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);


		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 526;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(rankBg);


		let titleBg:BaseBitmap = BaseBitmap.create("public_9_bg41");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);

		let bottomBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 516;
		bottomBg.height = 84;
		bottomBg.setPosition(this.viewBg.width/2  - bottomBg.width/2, rankBg.y + rankBg.height+8);
		this.addChildToContainer(bottomBg);

		let rankText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText.setPosition(65 , titleBg.y+titleBg.height/2 - rankText.height/2);
		this.addChildToContainer(rankText);

		//玩家昵称
		let nameText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		nameText.setPosition(160 , rankText.y);
		this.addChildToContainer(nameText); 
		this._nickNameTxt = nameText;
		this._nickNameTxt.visible = false;

		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(((516 - quText.textWidth) / 2) , rankText.y);
		this.addChildToContainer(quText); 
		this._serverTxt = quText;
		
		//亲密涨幅
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal(`croessImacyScore-${this.vo.code}`),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(407 , rankText.y);
		this.addChildToContainer(scoreText);

		//描述
		let atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes5.x = rankBg.x + (rankBg.width - atkracedes5.textWidth) / 2;
		atkracedes5.y = titleBg.y + titleBg.height + 150;
		this.addChildToContainer(atkracedes5);
		this._atkracedes5 = atkracedes5;
		

		//玩家名字
		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nickName.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 -5 -nickName.height);
		this.addChildToContainer(nickName);
		this._nickName = nickName;
		this._nickName.visible = false;
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);
		this._playerName = name;
		this._playerName.visible = false;
		
		//排行
		let rankStr:string;
		let rankOrder = 0;
		let rankPoint = 0;
		for(let i in this.api.zonerankinfos){
			let unit = this.api.zonerankinfos[i];
			if(Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())){
				rankOrder = Number(i) + 1;
				rankPoint = Number(unit.point);
				break;
			}
		}
		if(rankOrder)
		{
			if (rankOrder > 300) {
			rankStr = "10000+";
			}
			else {
				rankStr = rankOrder.toString();
			}
		}
		else
		{	//未上榜
			rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
		}
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		rankText2.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 +5);
		this.addChildToContainer(rankText2);
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);
		this._playerRank = rank;

		//亲密涨幅
		let str:string ="";
		if(rankPoint)
		{
			str	= rankPoint.toString();
		}else
		{
			str = "0";
		}
		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		socre.setPosition(bottomBg.x + bottomBg.width - 20 -  socre.width, rankText2.y);
		this.addChildToContainer(socre);
		this._playerScore = socre;
		
		let socreText:BaseTextField = ComponentManager.getTextField((LanguageManager.getlocal(`croessImacyScore-${this.vo.code}`)+': '), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		socreText.setPosition(socre.x - 20 - 99, rankText2.y);
		this.addChildToContainer(socreText);

		//玩家区服
		let serveText:BaseTextField = ComponentManager.getTextField('',TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		serveText.setPosition(this._nickName.x, name.y); 
		let currZid:any = Api.mergeServerVoApi.getTrueZid(); 
		let servaername = Api.mergeServerVoApi.getAfterMergeSeverName();
		serveText.text = LanguageManager.getlocal("crossranserver",[servaername]);
		this.addChildToContainer(serveText);
		this._playerServer = serveText;

		this._infoList = [];
		for(let i in this.api.zonerankinfos){
			let unit = this.api.zonerankinfos[i];
			this._infoList.push({
				zid : unit.zid,
				point : unit.point,
				type : 'rank',
				acid : this.vo.aid
			});
		}
		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList = ComponentManager.getScrollList(AcCorssImacyServerItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

		
		this._scrollList2 = ComponentManager.getScrollList(AcCorssImacyPRankItem,[],this._scroRect);
		this._scrollList2.x = titleBg.x;
		this._scrollList2.y = titleBg.y + titleBg.height;
		this._scrollList2.visible = false;
		this.addChildToContainer(this._scrollList2);

		this._atkracedes5.visible = this._infoList.length == 0;
    }

	private tabBtnClickHandler(params : any) : void{
		this._curTabIdx = params.index;
		NetManager.request(this._curTabIdx == 0 ? NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK : NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK, {});
	}

	private fresh_view(event: egret.Event):void{
		this._scrollList.visible = this._curTabIdx == 0;
		this._scrollList2.visible = this._nickNameTxt.visible = this._playerName.visible = this._nickName.visible = !this._scrollList.visible;
		let rankStr:string;
		let score:any = 0;
		this._infoList = [];
		if(this._curTabIdx == 0){
			let rankOrder = 0;
			this.api.setZoneRankInfo(event.data.data.data);
			for(let i in this.api.zonerankinfos){
				let unit = this.api.zonerankinfos[i];
				// unit.type = 'rank';
				// this._infoList.push(unit);
				this._infoList.push({
					zid : unit.zid,
					point : unit.point,
					type : 'rank',
					acid : this.vo.aid
				});
				if(Api.mergeServerVoApi.judgeIsSameServer(unit.zid, Api.mergeServerVoApi.getTrueZid())){
					rankOrder = Number(i) + 1;
					score = Number(unit.point).toString();
				}
			}
			this._scrollList.refreshData(this._infoList);
			if(rankOrder)
			{
				if (rankOrder > 300) {
				rankStr = "10000+";
				}
				else {
					rankStr = rankOrder.toString();
				}
			}
			else
			{	//未上榜
				rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
			}
		}
		else{
			this.api.setPRankInfo(event.data.data.data);
			for(let i in this.api.prankinfos){
				let unit = this.api.prankinfos[i];
				unit.type = 'rank';
				unit.imacy = true;
				this._infoList.push(unit);
			}
			this._scrollList2.refreshData(this._infoList);
			let meRank = this.api.merank;
			score = this.api.mepoint || '0';
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
				rankStr =LanguageManager.getlocal(this.vo.getIsCanJoin() ? "atkracedes4" : `crossImacyNoAccess`);// this._merank.toString();
			}
		}
		this._atkracedes5.visible = this._infoList.length == 0;
		this._playerRank.text = rankStr;
		this._playerScore.text = Number(score).toString();
		this._serverTxt.x = this._curTabIdx == 0 ? ((516 - this._serverTxt.textWidth) / 2) : 300;
		this._playerServer.x = this._curTabIdx == 0 ? this._nickName.x : (this._playerScore.x - 20 - 94);
	}

    public dispose():void
	{	
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_PRANK), this.fresh_view, this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_CROSSIMACY_ZRANK), this.fresh_view, this);
		this._scrollList = null;
		this._scrollList2 = null;
		this. _scroRect = null;
		this._nickName = null;
		this._nickNameTxt = null;
	 	this._serverTxt = null;
		this._playerName = null;
		this._playerServer = null;
		this._playerRank = null;
		this._playerScore = null;
		this._atkracedes5  = null;
		this._infoList = null;
		super.dispose();
	}
}