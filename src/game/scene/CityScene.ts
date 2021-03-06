class CityScene extends BaseScene
{
	private _iconList=[];
	private _decree_policy:BaseDisplayObjectContainer;
	private _decree_paper:BaseDisplayObjectContainer;
	private _decreeNode:BaseDisplayObjectContainer;
	private _kingsCDTxt:BaseTextField;
	private _crosschatGroup:BaseDisplayObjectContainer;
	private _crossnameTxt:BaseTextField;
	private _crossmsgTxt:BaseTextField;


	public constructor()
	{
		super();
	}

	protected setLayerPosition():void
	{
		super.setLayerPosition();
		this._mapLayer.setPosition(0,0);
		// this.dealDecreeIcons();
	}

	private create_crossGroup():void{
		if(Api.switchVoApi.openCrossChat()){
			if(this._crosschatGroup){
				return;
			}
			//跨服聊天消息刷新
			let crosschatGroup = new BaseDisplayObjectContainer();
			crosschatGroup.width = 450;
			crosschatGroup.height = 70;
			this.setLayoutPosition(LayoutConst.lefttop, crosschatGroup, this, [0,125]);
			this.addChild(crosschatGroup);
			this._crosschatGroup = crosschatGroup;
			crosschatGroup.visible = false;

			let chatbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
			chatbg.width = 450;
			chatbg.height = 70;
			// chatbg.x=0;
			// chatbg.y= bottomBg.y-chatbg.height-3;
			// this._bottomContiner.addChild(chatbg);
			chatbg.touchEnabled = true;
			chatbg.addTouchTap(this.chatBgClickHandler,this);
			crosschatGroup.setLayoutPosition(LayoutConst.leftverticalCenter, chatbg, crosschatGroup, [0,0], true);
			crosschatGroup.addChild(chatbg);

			let kuafutitle = BaseBitmap.create(ResourceManager.getRes("chatcrosstitle"));
			crosschatGroup.setLayoutPosition(LayoutConst.leftverticalCenter, kuafutitle, chatbg);
			crosschatGroup.addChild(kuafutitle);

			let desc = (crosschatGroup.height - 20 - 18) / 3;
			let name = ComponentManager.getTextField('', 20);
			crosschatGroup.setLayoutPosition(LayoutConst.lefttop, name, chatbg, [kuafutitle.x + kuafutitle.width + 5, 5]);
			crosschatGroup.addChild(name);
			this._crossnameTxt = name;

			let msg = ComponentManager.getTextField('', 18);
			msg.width = 400;
			crosschatGroup.setLayoutPosition(LayoutConst.lefttop, msg, name, [0,20 + 3]);
			crosschatGroup.addChild(msg);
			this._crossmsgTxt = msg;	
			this.fresh_crossMsg();
		}
	}

	protected refreshAfterShow()
	{	
		super.refreshAfterShow();
		this.create_crossGroup();
		if(!Api.switchVoApi.checkEmperorOpen())
		{
			return;
		}
		if(this._decreeNode)
		{
			return ;
		}
		//国策btn
		this._decreeNode = new BaseDisplayObjectContainer();
		this.addChild(this._decreeNode);

		let startX = GameConfig.stageWidth - 50;
		let gdid = Api.promoteVoApi.getGdinfo().gdid;
		let policyId = Api.promoteVoApi.getSpid();
		let commonbg = BaseBitmap.create("decree_citybg");
		commonbg.setScale(1.1);
		commonbg.x = GameConfig.stageWidth - commonbg.width - 20;
		commonbg.y = 110;
		this._decreeNode.addChild(commonbg);
		this._decreeNode.visible = false;
		commonbg.addTouchTap(this.openEmpriorUI,this);

		let deltaS = 0.7;
		this._decree_policy = new BaseDisplayObjectContainer();
		this._decree_policy.x = commonbg.x + 27;
		this._decree_policy.y = 128;
		this._decree_policy.setScale(deltaS);
		this._decreeNode.addChild(this._decree_policy);
		let decree_policy_iconbg = BaseBitmap.create("decree_bookbg");
		decree_policy_iconbg.alpha = 0.7;
		this._decree_policy.addChild(decree_policy_iconbg);
		decree_policy_iconbg.addTouchTap(this.openDecreeDisplay,this,[1]);
		
		let policyIcon = BaseLoadBitmap.create("decree_policy_icon"+policyId  );
		policyIcon.name = "policyIcon";
		policyIcon.x = decree_policy_iconbg.x + decree_policy_iconbg.width/2*deltaS - 50*deltaS;
		policyIcon.y = decree_policy_iconbg.y + decree_policy_iconbg.height/2*deltaS - 50*deltaS;
		this._decree_policy.addChild(policyIcon);

		this._decree_paper = new BaseDisplayObjectContainer();
		this._decree_paper.x = commonbg.x + 98;
		this._decree_paper.y = this._decree_policy.y;
		this._decree_paper.setScale(deltaS);

		this._decreeNode.addChild(this._decree_paper);
		let decree_paper_iconbg = BaseBitmap.create("decree_bookbg");
		decree_paper_iconbg.alpha = 0.7;
		this._decree_paper.addChild(decree_paper_iconbg);
		decree_paper_iconbg.addTouchTap(this.openDecreeDisplay,this,[2]);

		let papericon_str = "decree_paper_icon0";
		if(Number(gdid) > 0)
		{
			papericon_str = "decree_book";
		}
		let paperIcon = BaseLoadBitmap.create(papericon_str );
		paperIcon.name = "paperIcon";
		paperIcon.x = decree_paper_iconbg.x + decree_paper_iconbg.width/2*deltaS - 50*deltaS;
		paperIcon.y = decree_paper_iconbg.y + decree_paper_iconbg.height/2*deltaS - 50*deltaS;
		this._decree_paper.addChild(paperIcon);
		
		this._kingsCDTxt = ComponentManager.getTextField("",18,TextFieldConst.COLOR_WARN_RED);
		this._kingsCDTxt.multiline = true;
		this._kingsCDTxt.lineSpacing = 1;
		this._kingsCDTxt.textAlign = egret.HorizontalAlign.CENTER;
		this._kingsCDTxt.width = 100;
		this._kingsCDTxt.x = commonbg.x + 45;
		this._kingsCDTxt.y = commonbg.y + 21;
		this._decreeNode.addChild(this._kingsCDTxt);
		this.tick();
	}

	private fresh_crossMsg():void{
		let view = this;
		if(view._crosschatGroup){
			let api = Api.chatVoApi;
			let obj = api.getLastCrossMessage();
			if(obj && !api.getIsReadCross()){
				this._crosschatGroup.visible = true;
				this._crossnameTxt.text = LanguageManager.getlocal('accrosschattitle', [obj.sendername, obj.zoneid]);
				this._crossmsgTxt.text = obj.content.message;//obj.content.message.length > 15 ? (obj.content.message.substring(0, 15) + '...') : (obj.content.message);
			}
			else{
				this._crosschatGroup.visible = false;
			}
			//let mainui = SceneController.getInstance().get
		}
	}

	private chatBgClickHandler():void{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATVIEWTAB3);
	}

	protected openDecreeDisplay(obj:any,params:any)
	{
		if( (params == 1 && Api.promoteVoApi.isShowRedForPolicyRead()) ||  (params == 2 && Api.promoteVoApi.isShowRedForDecreeRead()) )
		{
			NetManager.request(NetRequestConst.REQUEST_POLICY_SETREAD,{dtype:params});
		}
		ViewController.getInstance().openView(ViewConst.POPUP.DECREERESCRIPTDISPLAYPOPUPVIEW);
	}
	/**
	 * 打开夺帝界面
	 */
	protected openEmpriorUI()
	{
		if(this._decree_paper.visible )
		{
			return ;
		}
		Api.emperorwarVoApi.openEmpView();
	}
	protected tick():void
	{
		super.tick();
		this.fresh_crossMsg();
		if(!Api.switchVoApi.checkEmperorOpen())
		{
			return;
		}
		if(this._decreeNode)
		{
			this._decreeNode.visible = true;
		}
		let cdStr = Api.emperorwarVoApi.getEmperorEndCD();
		if(cdStr)
		{
			
			this._kingsCDTxt.text = LanguageManager.getlocal("decreeKings_cdTxt",[cdStr]);
			this._decree_policy.visible = false;
			this._decree_paper.visible = false;
			return;
		}
			
		this._kingsCDTxt.text = "";
		let gdid = Api.promoteVoApi.getGdinfo().gdid;
		let policyId = Api.promoteVoApi.getSpid();
		let policyIcon =  <BaseLoadBitmap>this._decree_policy.getChildByName("policyIcon");
		policyIcon.setload("decree_policy_icon"+policyId );

		let paperIcon =  <BaseLoadBitmap>this._decree_paper.getChildByName("paperIcon");
		if(Number(gdid) > 0)
		{
			paperIcon.setload("decree_book" );
		}else{
			paperIcon.setload("decree_paper_icon0" );
		}

		this._decree_policy.visible = true;
		this._decree_paper.visible = true;
		
		//国策红点
		if(Api.promoteVoApi.isShowRedForPolicyRead())
		{
			App.CommonUtil.addIconToBDOC(this._decree_policy);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._decree_policy);
		}
		//政令红点
		
		if(Api.promoteVoApi.isShowRedForDecreeRead())
		{
			App.CommonUtil.addIconToBDOC(this._decree_paper);
		}else{
			App.CommonUtil.removeIconFromBDOC(this._decree_paper);
		}
		//this.fresh_crossMsg();

	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"decree_paperBtn","decree_paperBtn_down","decree_citybg",
			"decree_policy_iconbg","decree_bookbg","chatlaba","chatcrosstitle"
		]);
	}
	private checkDinnerClose():string
	{
		return Api.playerVoApi.getPlayerLevel() < Config.DinnerCfg.getNeedLv()?LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.DinnerCfg.getNeedLv())]):null;
	}
	public dispose():void
	{
		this._decree_policy = null;
		this._decree_paper = null;
		this._decreeNode = null;
		this._kingsCDTxt = null;
		this._crossmsgTxt = null;
		this._crossnameTxt = null;
		if(this._crosschatGroup){
			this._crosschatGroup.dispose();
			this._crosschatGroup = null;
		}
		super.dispose();
	}
}