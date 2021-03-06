/**
 * 战斗中 玩家 或 npc 信息小板
 * author shaoliang
 * date 2017/9/21
 * @class BattleInfo
 */

class BattleInfo extends BaseDisplayObjectContainer
 {

	private _progressBar:ProgressBar;
	private _totalNum:number;
	private _curNum:number;
	private _force:BaseTextField;
	private _name:BaseTextField;
	private _sorce:string = "";
	/**
	 * 是不是玩家
	 */
	private _isHero:boolean;
	private _npcHead:BaseLoadBitmap;
	private _decreeAddTxt:BaseTextField;
	public constructor() {
		super();
	}

	public setSurce(sorce:string)
	{
		this._sorce = sorce;
	}
	/**
	 * 初始化
	 * 总的兵力
	 * @param params 信息 自己不传，npc传。
	 */
	public init(totalNum:number, params?:any , info?:any):void
	{
		this._totalNum = totalNum;
		if (!params) {
			this._isHero = false;
		}
		else {
			this._isHero = true;
		}

		let scale9Bg:BaseBitmap = BaseBitmap.create("battle_info_bg");
		this.addChild(scale9Bg);

		let forceNum:number;
		let progressBarPic:string;
		let nameStr:string;
		let officerTitleStr:string;
		
		let show:number;
		
		
		if (this._isHero ) {
			forceNum=Api.playerVoApi.getAtk();
			progressBarPic="battle_hero_bar";
			nameStr=Api.playerVoApi.getPlayerName();
			officerTitleStr=Api.playerVoApi.getPlayerOffice();
		}
		else {
			if (info) {
				show = info.show;
				forceNum=Math.ceil(this._totalNum/10);
				officerTitleStr=LanguageManager.getlocal("dailybossNameType1",[String(info.cid)]);
				nameStr=LanguageManager.getlocal("BossName"+show);
			}
			else {
				let challengeConfig:any = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
				show = challengeConfig.show;
				forceNum=challengeConfig.atk;
				officerTitleStr=LanguageManager.getlocal("nothing");
				nameStr=LanguageManager.getlocal("npcName"+show);
			}
			
			progressBarPic="battle_npc_bar";
			
		}


		let headContainer:BaseDisplayObjectContainer ;
		let preX:number = 0;
		if (this._isHero ) {
			headContainer = Api.playerVoApi.getPlayerCircleHead(Api.playerVoApi.getPlayePicId());
			preX = 98;
			headContainer.setPosition(0, 0);
			scale9Bg.scaleX = -1;
			scale9Bg.setPosition(headContainer.width/2+scale9Bg.width, (headContainer.height - scale9Bg.height)/2 -3);
		}
		else {
			headContainer = new BaseDisplayObjectContainer();

			let myBody:BaseBitmap = BaseBitmap.create("head_circle_bg");
			headContainer.addChild(myBody);

			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,120,120);
			this._npcHead = BaseLoadBitmap.create("prison_icon"+show,rect);
			this._npcHead.scaleX = 100/this._npcHead.width;
			this._npcHead.scaleY = 100/this._npcHead.height;
			this._npcHead.x = -5;
			this._npcHead.y =  1;
			headContainer.addChild(this._npcHead);			

			preX= 14;
			scale9Bg.setPosition(0, (headContainer.height - scale9Bg.height)/2 -3);
			headContainer.setPosition(scale9Bg.width -headContainer.width/2 , 0);
		}
		this.addChild(headContainer);

 
		let soldierText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("soldier"),TextFieldConst.FONTSIZE_CONTENT_COMMON);
		soldierText.x = preX;
		soldierText.y =62+2;
		this.addChild(soldierText);


		this._progressBar = ComponentManager.getProgressBar(progressBarPic,"exp_progress_bg",(262 - (soldierText.width - 44)));
		this._progressBar.x = preX + soldierText.width +5;
		this._progressBar.y = soldierText.y;
		this._progressBar.setTextSize(18);
		this.addChild(this._progressBar);

		this._name =  ComponentManager.getTextField(nameStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		this._name.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
		this._name.x = preX;
		this._name.y = 9+2;
		
		this.addChild(this._name);

		this._force = ComponentManager.getTextField(LanguageManager.getlocal("force") + ":  " + forceNum,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		// force.textColor = TextFieldConst.COLOR_YELLOW;
		this._force.x = preX;
		this._force.y = 35+2;

		this.addChild(this._force);
		
		let officerTitle:BaseTextField = ComponentManager.getTextField(officerTitleStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		officerTitle.textColor = TextFieldConst.COLOR_WARN_GREEN;
		officerTitle.x = preX + 310  - officerTitle.width;
		officerTitle.y = this._name.y;
		this.addChild(officerTitle);
		if (this._isHero) {
			this.refreshDecreeAttr();
		}
	}

	public set curNumber(v:number)
	{
		this._curNum = v;

		this._progressBar.setText(this._curNum.toString());
		this._progressBar.setPercentage( v / this._totalNum );
	}

	protected refreshDecreeAttr()
	{
		let addInfo = Api.challengeVoApi.getDecreePolicyAddAttrInfo();
		if(this._sorce == "conquest")
		{
			addInfo = Api.conquestVoApi.getDecreePolicyAddAttrInfo();
		}
		let addV = 0;
		if(addInfo){
			if(!this._decreeAddTxt){
				this._decreeAddTxt = ComponentManager.getTextField("",this._force.size,TextFieldConst.COLOR_WARN_YELLOW2);
				this._decreeAddTxt.setPosition(this._force.x + this._force.width+10 ,this._force.y );
				this.addChild( this._decreeAddTxt);
			}
			if (addInfo.lastTimes > 0)
			{
				addV =  Math.floor(Api.playerVoApi.getAtk() * addInfo.addExtent);
				if(this._sorce == "conquest")
				{
					addInfo = Api.conquestVoApi.getDecreePolicyAddAttrInfo();
					this._decreeAddTxt.text = "(" + addInfo.strKey2 +  "+"+ addV.toFixed(0) + ")";
					// LanguageManager.getlocal(addInfo.strKey,[addInfo.strKey2,addV.toFixed(0)]) + ")";
				}else{
					this._decreeAddTxt.text = "(" + LanguageManager.getlocal(addInfo.strKey,[addInfo.strKey2,addV.toFixed(0)]) + ")";
				}
				  // operation by shaoliang
			    // this._decreeAddTxt.visible = false;
			}else{
				this._decreeAddTxt.text = "";
			}
			// let forceNum= Api.playerVoApi.getAtk();
			// this._force.text = LanguageManager.getlocal("force") + ":  " + (forceNum+addV).toFixed(0);
		}
	}

	public resetInfo(v:number):void
	{	

		this._totalNum = v;
		if (this._isHero) {
			this.refreshDecreeAttr();
		}
		else {

			let challengeConfig:any = ChallengeCfg.getChallengeCfgById(Api.challengeVoApi.getCurChannelId());
			let nameStr:string = LanguageManager.getlocal("npcName"+challengeConfig.show);
			this._name.text = nameStr;
			let	forceNum:number = challengeConfig.atk;
			this._force.text = LanguageManager.getlocal("force") + ":  " + forceNum;

			this._npcHead.setload("prison_icon"+challengeConfig.show);
		}

		
	}

	public dispose():void
	{	
		this._totalNum = null;
		this._curNum = null;
		this._progressBar = null;
		this._force = null;
		this._name = null;
		this._npcHead = null;
		this._decreeAddTxt = null;
		this._sorce = "";
		
		super.dispose();		
	}


}