/**
 * 结婚列表
 * author dky
 * date 2017/10/28
 * @class AdultMarryView
 */
class AdultMarryView extends CommonView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;
	// 列表
	private _adultInfoVoList: Array<AdultInfoVo>;

	private _inputTextField:BaseTextField;


	private _adultInfoVo:AdultInfoVo;
	private _confirmCallback:Function;
	private _confirmCallback2:Function;
	private _handler:any;

	private _timeTF:BaseTextField;
	//下次刷新时间
	private _nextRefreshTime:number;

	private _selectChildData:any;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,this.doChooseType,this);

		this._adultInfoVo = Api.adultVoApi.getAdultInfoVoById(this.param.data.childId)
		this._handler = this.param.data.handler;
		//刷新1条
		this._confirmCallback = this.param.data.confirmCallback;
		//刷新所有
		this._confirmCallback2 = this.param.data.confirmCallback2;

		this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id});

		let topBg = BaseBitmap.create("public_bg6");
		topBg.y = -21;
		this.addChildToContainer(topBg);

		


		let motherText = ComponentManager.getTextField(this._adultInfoVo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
		motherText.x = 20;
		motherText.y = 5;
		this.addChildToContainer(motherText);

		let myName = LanguageManager.getlocal("adultMarryFather") + Api.playerVoApi.getPlayerName();
		let fatherText = ComponentManager.getTextField(myName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
		fatherText.x = 130;
		fatherText.y = 5;
		this.addChildToContainer(fatherText);

		let qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this._adultInfoVo.aquality);
		let qualityText = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
		qualityText.x = 330;
		qualityText.y = 5;
		this.addChildToContainer(qualityText);


		let attrStr = LanguageManager.getlocal("servant_infoAttr") + this._adultInfoVo.attrVo.attTotal;

		let attTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		attTF.x = 500;
		attTF.y = 5;
		this.addChildToContainer(attTF);

		//招亲对象
		let marryObjectTF = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryObject"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		marryObjectTF.x = 20;
		marryObjectTF.y = 70;
		this.addChildToContainer(marryObjectTF);

		//刷新时间
		let timeBg:BaseBitmap = BaseBitmap.create("public_chatinputbg");
		timeBg.width = 240;
		timeBg.height = 40;
		timeBg.x =  250;
		timeBg.y = marryObjectTF.y + marryObjectTF.height/2 - timeBg.height/2;
		this.addChildToContainer(timeBg);
		
		let timeStr = LanguageManager.getlocal("adultMarryRefreshTime",["00:00:00"])
		this._timeTF = ComponentManager.getTextField(timeStr, TextFieldConst.FONTSIZE_CONTENT_COMMON);

		this._timeTF.x = timeBg.x + 10;
		this._timeTF.y = marryObjectTF.y + marryObjectTF.height/2 - this._timeTF.height/2;
		this.addChildToContainer(this._timeTF);

		let refreshBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "adultMarryRefresh", this.refreshHandler, this);
		refreshBtn.x = timeBg.x + timeBg.width + 10;
		refreshBtn.y = marryObjectTF.y + marryObjectTF.height/2 - refreshBtn.height/2;
		refreshBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(refreshBtn);


		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth-10;
		bottomBg.height = GameConfig.stageHeigth - 300;
		bottomBg.x = 5;
		bottomBg.y = 115;
		this.addChildToContainer(bottomBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 245);
		this._scrollList = ComponentManager.getScrollList(AdultMarryScrollItem,null,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x ,bottomBg.y + 10);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip1"))

		//全服提亲
		let allMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultMarryAll",this.marryAllHandler,this);
		allMarryBtn.x = 35;
		allMarryBtn.y = bottomBg.y + bottomBg.height + 12;
		// allMarryBtn.
		this.addChildToContainer(allMarryBtn);
		allMarryBtn.setColor(TextFieldConst.COLOR_BLACK);

		//招亲NO
		let marryNumTF = ComponentManager.getTextField(LanguageManager.getlocal("adultMarryNumber"), TextFieldConst.FONTSIZE_TITLE_SMALL);
		marryNumTF.x = 200;
		marryNumTF.y = allMarryBtn.y + allMarryBtn.height/2 - marryNumTF.height/2;
		this.addChildToContainer(marryNumTF);

		 //输入框
        
		let inputTF = ComponentManager.getInputTextField(TextFieldConst.COLOR_WHITE,TextFieldConst.FONTSIZE_TITLE_SMALL,140,48,"public_chatinputbg",LanguageManager.getlocal("adultMarryInputHolder"),0xa4917f);

		inputTF.x = marryNumTF.x + marryNumTF.width + 10;
		inputTF.y = allMarryBtn.y + allMarryBtn.height/2 - inputTF.height/2;
		this.addChildToContainer(inputTF);

		this._inputTextField = <BaseTextField>inputTF.getChildByName("textField");
		this._inputTextField.restrict="0-9";

		//指定提亲
		let oneMarryBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultMarryOne",this.marryOneHandler,this);
		oneMarryBtn.x = GameConfig.stageWidth - oneMarryBtn.width - 35;
		oneMarryBtn.y = allMarryBtn.y;
		this.addChildToContainer(oneMarryBtn);
		oneMarryBtn.setColor(TextFieldConst.COLOR_BLACK);

	}


	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_RADULT_GETALLPROPOSE) {
			this._scrollList.refreshData(data.data.data.pinfo.d);
			this._nextRefreshTime = data.data.data.pinfo.ft;
			this.tick();
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_PROPOSEALL) {
			if(this.param.data.confirmCallback){
				this.param.data.confirmCallback.apply(this.param.data.handler,[]);
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip1") );
			this.hide();
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_PROPOSE) {
			if(data.data.data.proflag){
				App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip2") );
				return;
			}
			App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip1") );
			if(this.param.data.confirmCallback){
				this.param.data.confirmCallback.apply(this.param.data.handler,[]);
			}
			this.hide();
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_AGREEPROPOSE) {
			if(data.data.data.proflag == 2){
				App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip4") );
				this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id});
				return;
			}
			if(this.param.data.confirmCallback2){
				this.param.data.confirmCallback2.apply(this.param.data.handler,[]);
			}
			let childId = data.data.data.adultId;
			ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId,confirmCallback: null, handler: this });
			// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHADULTVIEW,null);
			this.hide();

		}
	}


	public tick(): void {

		let lastTime = this._nextRefreshTime - GameData.serverTime;

		if(lastTime > 0){
			let timeStr = LanguageManager.getlocal("adultMarryRefreshTime",[App.DateUtil.getFormatBySecond(lastTime, 1)]);
			this._timeTF.text = timeStr;
			
		}else{
			this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id});
		}
		

	}
	private refreshHandler()
	{
		let gem = Api.playerVoApi.getPlayerGem();
		let needGem = Config.AdultCfg.freshGem;
		let message:string = LanguageManager.getlocal("adultRefreshGem",[App.StringUtil.toString(needGem)]);
		ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW,{confirmCallback:this.refreshList,handler:this,icon:"itemicon1",iconBg: "itembg_1",num:gem,msg:message,id: 1,useNum:needGem});
	}

	private refreshList()
	{
		this.request(NetRequestConst.REQUEST_RADULT_GETALLPROPOSE, { childId: this._adultInfoVo.id,freshFlag:true});
	}

	//点击某个联姻
	private doChooseType(event:egret.Event)
	{
		this._selectChildData = event.data;
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.selectMarryHander, handler: this });
	}

	//选好了道具
	private selectMarryHander(type:number)
	{
		this.request(NetRequestConst.REQUEST_RADULT_AGREEPROPOSE, { aid: this._selectChildData.id ,childId: this._adultInfoVo.id ,protype:type});
	}


	private marryAllHandler()
	{
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.chooseAllCallBack, handler: this });
	}


	private marryOneHandler()
	{
		if(this._inputTextField.text.length <= 0 || this._inputTextField.text == LanguageManager.getlocal("adultMarryInputHolder"))
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryEmptyTip"));
			return;
		}
		if(Number(this._inputTextField.text) == Api.playerVoApi.getPlayerID())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip3") );
			return;
		}
		ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.chooseOneCallBack, handler: this });
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
	}
	private chooseAllCallBack(type:number)
	{
		this.request(NetRequestConst.REQUEST_RADULT_PROPOSEALL, { childId: this._adultInfoVo.id ,protype:type});
		
	}
	private chooseOneCallBack(type:number)
	{
		// App.LogUtil.log(type);
		this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id ,fuid:this._inputTextField.text,protype:type});
		
	}



	// protected getTabbarTextArr():Array<string>
	// {
	// 	return ["wifeViewTab1Title",
	// 			"wifeViewTab2Title"
	// 	];
	// }

	// protected getRuleInfo():string
	// {
	// 	return "wife_description";
	// }

	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CLICKMARRY,this.doChooseType,this);


		this._scrollList = null;
	// 列表
		this._adultInfoVoList = null;

		this._inputTextField = null;


		this._adultInfoVo = null;
		this._confirmCallback = null;
		this._confirmCallback2 = null;
		this._handler = null;

		this._timeTF = null;
		//下次刷新时间
		this._nextRefreshTime = null;

		this._selectChildData = null;

		super.dispose();
	}
}