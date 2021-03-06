/**
 * 跨服擂台排行榜
 */

class AtkraceCrossRankListView extends PopupView
{	
	private _scrollList:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;
	private _mepoint:number =0;
	private atkracedes5:any =null;
	private isShowTextBoo:boolean =false;

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
    public initView():void
	{
	
		let tabName = ["atkraceRank"];

        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_TAB,tabName,null,null);
        tabbarGroup.x = 40;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);


		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 526;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(rankBg);


		let titleBg:BaseBitmap = BaseBitmap.create("dinner_rank_titlebg");
		titleBg.width = rankBg.width;
		titleBg.height = 36;
		titleBg.setPosition(rankBg.x , rankBg.y);
		this.addChildToContainer(titleBg);


		this._scroRect = new egret.Rectangle(titleBg.x, titleBg.y + titleBg.height, titleBg.width,rankBg.height -titleBg.height - 8);
		this._scrollList  = ComponentManager.getScrollList(AtkraceCorssRankItem,this._infoList,this._scroRect);
		this._scrollList.x = titleBg.x;
		this._scrollList.y = titleBg.y + titleBg.height;
		this.addChildToContainer(this._scrollList);

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

		//标题区服
		let quText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankServer"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		quText.setPosition(300 , rankText.y);
		this.addChildToContainer(quText); 


		//擂台分数
		let scoreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore"),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		scoreText.setPosition(407 , rankText.y);
		this.addChildToContainer(scoreText);

		let nickName:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranknickName")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		nickName.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 -5 -nickName.height);
		this.addChildToContainer(nickName);
		
		//排名
		let rankText2:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("rankorder")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		rankText2.setPosition(rankText.x , bottomBg.y+bottomBg.height/2 +5);
		this.addChildToContainer(rankText2);

		//玩家名字
		let name:BaseTextField = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
		name.setPosition(nickName.x + nickName.width +12 , nickName.y);
		this.addChildToContainer(name);

		//描述
		let atkracedes5 = ComponentManager.getTextField(LanguageManager.getlocal("atkracedes5"), 20);
		atkracedes5.x =250;
		atkracedes5.y =GameConfig.stageHeigth -530;
		this.addChild(atkracedes5);
		atkracedes5.visible =this.isShowTextBoo;

		let rankStr:string;
		if(this._merank)
		{
			if (this._merank>300) {
			rankStr = "10000+";
			}
			else {
				rankStr = this._merank.toString();
			}
		}
		else
		{	//未上榜
			rankStr =LanguageManager.getlocal("atkracedes4");// this._merank.toString();
		}
		
		let rank:BaseTextField = ComponentManager.getTextField(rankStr,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		rank.setPosition(rankText2.x + rankText2.width + 12 , rankText2.y);
		this.addChildToContainer(rank);

		//擂台分数
		let str:string ="";
		if(this._mepoint)
		{
			str	=this._mepoint+"";
		}else
		{
			str ="0";
		}
		let socre:BaseTextField = ComponentManager.getTextField(str,TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_QUALITY_GREEN);
		socre.setPosition(bottomBg.x + bottomBg.width - 20 -  socre.width, rankText2.y);
		this.addChildToContainer(socre);
		
		let socreText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("atkraceScore")+":",TextFieldConst.FONTSIZE_CONTENT_COMMON);
		socreText.setPosition(socre.x - 20 -  socreText.width, rankText2.y);
		this.addChildToContainer(socreText);


		//玩家区服
		let serveText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("ranserver"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serveText.setPosition(socreText.x,name.y); 
		let currZid:any =ServerCfg.selectServer.zid; 
		serveText.text = LanguageManager.getlocal("ranserver",[currZid+""]);
		this.addChildToContainer(serveText);

    }
	
	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_ATKRACECROSS_RANK,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		if(data.ret==true&&data.data&&data.data.data.atkrank)	
		{
			 
			this._infoList = data.data.data.atkrank;
			this._merank = data.data.data.merank;
			this._mepoint = data.data.data.mepoint;
			this.isShowTextBoo =false;
		}
		else
		{	
			this.isShowTextBoo =true;		
		}
	}
 
    public dispose():void
	{	
		this. _scrollList =null;
		this._infoList =null;
		this._merank  =0;
		super.dispose();
	}
}