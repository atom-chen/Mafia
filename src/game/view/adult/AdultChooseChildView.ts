/**
 * 选择孩子列表
 * author dky
 * date 2017/10/31
 * @class AdultChooseChildView
 */
class AdultChooseChildView extends CommonView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _timeTF:BaseTextField;

	private _selectChildData:any;
	private _selectChildId:any;

	private _childInfo:any;

	private _sortBtn:BaseButton;

	private _sortType:number = 1;//"adultChooseSort1":"属性降序", "adultChooseSort2":"默认排序",

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY,this.doMarry,this);

		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;
		this._childInfo = this.param.data.childInfo;
		// this.request(NetRequestConst.REQUEST_RADULT_GETPROPOSEE,null);

		let topBg = BaseBitmap.create("public_bg6");
		topBg.y = -21;
		this.addChildToContainer(topBg);

		let motherText = ComponentManager.getTextField(this._childInfo.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
		motherText.x = 20;
		motherText.y = 5;
		this.addChildToContainer(motherText);

		let myName = LanguageManager.getlocal("adultMarryFather") + this._childInfo.fatherName;
		let fatherText = ComponentManager.getTextField(myName, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// this._motherText.text = Api.playerVoApi.getPlayerGold().toString();
		fatherText.x = 130;
		fatherText.y = 5;
		this.addChildToContainer(fatherText);

		let qualityStr = LanguageManager.getlocal("adult_quality") + LanguageManager.getlocal("adult_quality" + this._childInfo.aquality);
		let qualityText = ComponentManager.getTextField(qualityStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		// this._intimacyText.text = Api.playerVoApi.getPlayerGold().toString();
		qualityText.x = 330;
		qualityText.y = 5;
		this.addChildToContainer(qualityText);


		let attrStr = LanguageManager.getlocal("servant_infoAttr") + this._childInfo.total;

		let attTF = ComponentManager.getTextField(attrStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		attTF.x = 500;
		attTF.y = 5;
		this.addChildToContainer(attTF);

		let marryObjectTF = ComponentManager.getTextField(LanguageManager.getlocal("adultselectlianyin"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
		this.container.setLayoutPosition(LayoutConst.horizontalCentertop, marryObjectTF, this.container, [0,60], true);
		this.addChildToContainer(marryObjectTF);

		let bottomBg = BaseBitmap.create("public_9_bg23");
		bottomBg.width = GameConfig.stageWidth-10;
		bottomBg.height = GameConfig.stageHeigth - 300;
		bottomBg.x = 5;
		bottomBg.y = 95;
		this.addChildToContainer(bottomBg);

		let childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);
		let arr = [];
		for(let i in childList){
			let unit = childList[i];
			arr.push({
				'id' : unit.id,
				'name' : unit.name,
				'level' : unit.level,
				'attrVo' : unit.attrVo,
				'sex' : unit.sex,
				'quality' : unit.quality,
				'aquality' : unit.aquality,
				'uid' : this._childInfo.uid,
				'visit' : unit.visit,
				'info' : this.param.data.childInfo
			});
		}
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth - 14,GameConfig.stageHeigth - 310);
		this._scrollList = ComponentManager.getScrollList(AdultChooseChildScrollItem,arr,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x ,bottomBg.y + 10);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip3"));

		let arena_bottom = BaseBitmap.create("arena_bottom");
		this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this.viewBg);
		this.addChild(arena_bottom);
		// let childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);

		// let rect = egret.Rectangle.create();
		// rect.setTo(0,0,508,bottomBg.height - 20);
		// this._scrollList = ComponentManager.getScrollList(AdultChooseChildScrollItem,childList,rect);
		// this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(bottomBg.x + 7 ,bottomBg.y + 10);

		// this._scrollList.setEmptyTip(LanguageManager.getlocal("adultEmptyTip3"))
		
		//排序
		this._sortBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"adultChooseSort1",this.refreshHandler,this);
		this.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._sortBtn, arena_bottom);
		// this._sortBtn.
		this.addChild(this._sortBtn);
		this._sortBtn.setColor(TextFieldConst.COLOR_BLACK);



	}


	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {
		
		if (data.data.cmd == NetRequestConst.REQUEST_RADULT_AGREEPROPOSE) {
			this.request(NetRequestConst.REQUEST_SADUN_GETINFO,null);
			if(data.data.data.proflag == 2){
				App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip4") );
				if(this.param.data.confirmCallback){
					this.param.data.confirmCallback.apply(this.param.data.handler,[]);
				}
				this.hide();
				return;
			}
			// this._scrollList.refreshData(data.data.data.minfo)
			let childId = data.data.data.adultId;
			ViewController.getInstance().openView(ViewConst.BASE.ADULTMARRYSUCCESSVIEW, { childId: childId,confirmCallback: null, handler: this });
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_REFRESHCHILDMARRY,null);
			this.hide();
		}
		else if (data.data.cmd == NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE) {
			
		}
	}
	private refreshHandler()
	{
		let childInfoList;
		if(this._sortType == 1){
			this._sortType = 2;
			childInfoList = Api.adultVoApi.getAdultVoListByIdByAttr(this._childInfo.aquality,this._childInfo.sex);
			this._sortBtn.setText("adultChooseSort2");
		}else{
			this._sortType = 1;
			childInfoList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);
			this._sortBtn.setText("adultChooseSort1");
		}
		let arr = [];
		for(let i in childInfoList){
			let unit = childInfoList[i];
			arr.push({
				'id' : unit.id,
				'name' : unit.name,
				'level' : unit.level,
				'attrVo' : unit.attrVo,
				'sex' : unit.sex,
				'quality' : unit.quality,
				'aquality' : unit.aquality,
				'uid' : this._childInfo.uid,
				'visit' : unit.visit,
				'info' : this.param.data.childInfo
			});
		}
		this._scrollList.refreshData(arr);
	}

	//选择联姻
	private doMarry(event:egret.Event)
	{
		
		let visitid = this._childInfo.visit;//0 无访问 1拜访过 2来访问过 3互访过
		let level = Api.adultVoApi.getVisitLevel({visit : this._childInfo.visit, uid : this._childInfo.uid});
		let childList = Api.adultVoApi.getAdultVoListById(this._childInfo.aquality,this._childInfo.sex);
		let arr = [];
		let needTip = false;
		let laifang = false;
		if(this._childInfo.visit == Api.playerVoApi.getPlayerID()){
			laifang = true;
		}

		for(let i in childList){
			let unit = childList[i];
			let baifang = false;
			let hufang = false;
			if(unit.visit == this._childInfo.uid){
				baifang = true;
			}
			if(laifang && baifang){
				hufang = true;
			}
			if(hufang && unit.id != event.data.childId ){
				needTip = true;
			}
			if(hufang && unit.id == event.data.childId){
				needTip = false;
				break;
			}
		}
		
		if(needTip){
			let msg = LanguageManager.getlocal("adultchoosetip2")
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:msg,
				callback:()=>{
					this._selectChildId = event.data.childId;
					ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId,confirmCallback: this.selectMarryHander, handler: this });
				},
				handler:this,
				needCancel:true,
			});
		}
		else if(laifang && Api.adultVoApi.getAdultInfoVoById(event.data.childId).visit != this._childInfo.uid){
			let msg = LanguageManager.getlocal("adultchoosetip1",[this._childInfo.fatherName])
			ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
				title:"itemUseConstPopupViewTitle",
				msg:msg,
				callback:()=>{
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_ADULT_CLOSECHOOSE);
					this.hide();
				},
				handler:this,
				needCancel:true,
				cancelcallback:()=>{
					this._selectChildId = event.data.childId;
					ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId,confirmCallback: this.selectMarryHander, handler: this });
				},
			});
		}
		else{
			this._selectChildId = event.data.childId;
			ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { childId: event.data.childId,confirmCallback: this.selectMarryHander, handler: this });
		}
		
		
		// this.request(NetRequestConst.REQUEST_RADULT_REFUSEPROPOSE, { aid: event.data.id,isBatch:0 });
	}

	//选好了道具
	private selectMarryHander(type:number)
	{
		this.request(NetRequestConst.REQUEST_RADULT_AGREEPROPOSE, { aid: this._childInfo.id ,childId: this._selectChildId ,protype:type});
	}




	private marryOneHandler()
	{
		
		// ViewController.getInstance().openView(ViewConst.POPUP.ADULTCHOOSETYPEVIEW, { type: 2, childId: this._adultInfoVo.id,confirmCallback: this.chooseOneCallBack, handler: this });
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSE, { childId: this._adultInfoVo.id });
	}
	private chooseAllCallBack(type:number)
	{
		// this.request(NetRequestConst.REQUEST_RADULT_PROPOSEALL, { childId: this._adultInfoVo.id ,protype:type});
		
	}
	private chooseOneCallBack(type:number)
	{
		App.LogUtil.log(type);
		
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

		// 未婚滑动列表
		this._scrollList = null;


		this._confirmCallback = null;
		this._handler = null;

		this._timeTF = null;

		this._selectChildData = null;
		this._selectChildId = null;

		this._childInfo = null;

		this._sortBtn = null;

		this._sortType = 1;

		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_ADULT_CHILDMARRY,this.doMarry,this);
		super.dispose();
	}
}