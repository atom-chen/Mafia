/**
 * 赏赐
 * author dky
 * date 2017/11/18
 * @class WifeGivePopupView
 */
class WifeGivePopupView extends PopupView
{
	// 未婚滑动列表
	private _scrollList: ScrollList;


	private _confirmCallback:Function;
	private _handler:any;

	private _wifeInfoVo: WifeInfoVo;

	private _text1:BaseTextField;
	private _text2:BaseTextField;

	private _index:number = 0;

	public constructor() 
	{
		super();
	}
	public initView():void
	{		

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,this.doGive,this);

		this._handler = this.param.data.handler;
		this._confirmCallback = this.param.data.confirmCallback;

		let id = this.param.data.id
		this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
		//亲密度
		let icon1Bg = BaseBitmap.create("public_9_resbg");
		icon1Bg.x = 100;
		icon1Bg.y = 15;
		this.addChildToContainer(icon1Bg);

		let icon1 = BaseBitmap.create("wifeview_vigoricon");
		icon1.x = icon1Bg.x ;
		icon1.y = icon1Bg.y + icon1Bg.height/2 - icon1.height/2;
		this.addChildToContainer(icon1);


		this._text1 = ComponentManager.getTextField(this._wifeInfoVo.intimacy.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._text1.x = icon1Bg.x + icon1Bg.width/2 - icon1.width/2;
		this._text1.y = icon1.y + icon1.height/2 - this._text1.height/2;
		this.addChildToContainer(this._text1);

		//魅力
		let icon2Bg = BaseBitmap.create("public_9_resbg");
		icon2Bg.x = 310;
		icon2Bg.y = 15;
		this.addChildToContainer(icon2Bg);

		let icon2 = BaseBitmap.create("wifeview_charmicon");
		icon2.x = icon2Bg.x ;
		icon2.y = icon2Bg.y + icon2Bg.height/2 - icon2.height/2;
		this.addChildToContainer(icon2);


		this._text2 = ComponentManager.getTextField(this._wifeInfoVo.glamour.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		this._text2.x = icon2Bg.x + icon2Bg.width/2 - icon2.width/2;
		this._text2.y = icon2.y + icon2.height/2 - this._text2.height/2;
		this.addChildToContainer(this._text2);



		let bottomBg = BaseBitmap.create("public_9_probiginnerbg");
		bottomBg.width = 535;
		bottomBg.height = 535;
		bottomBg.x = this.viewBg.x + this.viewBg.width/2 - bottomBg.width/2;

		bottomBg.y = 75;
		this.addChildToContainer(bottomBg);

		let list1: Array<number> = new Array();

		for (var index = 0; index < 4; index++) {
			list1.push(index)
			
		}

		let list = Config.WifebaseCfg.wifeGift;
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,525,535);
		this._scrollList = ComponentManager.getScrollList(WifeGiveScrollItem,list1,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(bottomBg.x + 5 ,bottomBg.y + 8);

	}

	private doGive(event:egret.Event){
		let data  = event.data;
		this._index = data.index;
		let num = data.num
		this.request(NetRequestConst.REQUEST_WIFE_AWARD, { wifeId: this.param.data.id.toString(),key:data.key,rnum:num});
	}

	//请求回调
	protected receiveData(data: { ret: boolean, data: any }): void {

		
		if (data.data.cmd == NetRequestConst.REQUEST_WIFE_AWARD) {
			if(data.data.data && data.data.data.rewards)
			{
				let rewards= GameData.formatRewardItem(data.data.data.rewards);
				if(rewards&&rewards.length>0)
				{
					App.CommonUtil.playRewardFlyAction(rewards);
				}
			}
			let index = this._index;
			let wideItem = <WifeGiveScrollItem>this._scrollList.getItemByIndex(index);
		
			wideItem.refreshData(index);

			let id = this.param.data.id
			this._wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(id);
			this._text1.text = this._wifeInfoVo.intimacy.toString();
			this._text2.text = this._wifeInfoVo.glamour.toString();
		}

		
	}
	private refreshHandler()
	{

	}


	public hide():void
	{
		super.hide();
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
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_WIFE_GIVE,this.doGive,this);

		this._confirmCallback = null;
		this._handler = null;
		this._wifeInfoVo = null;
		this._text1 = null;
		this._text2 = null;
		this._index = null;

		super.dispose();
	}
}