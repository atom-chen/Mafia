class WelfareViewGodBless extends WelfareViewTab
{

	private _scrollList:ScrollList = null;
	private _vipLevel:number = 0;

	public constructor() {
		super();
	}

	protected init():void
	{
		super.init();

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		
		this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
		let info = Config.DailyluckCfg.getLuckIdList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,492,GameConfig.stageHeigth - 304);
		this._scrollList = ComponentManager.getScrollList(WelfareViewGoldblessScrollItem,info,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(0,195);
		
		let lookVipBtn:BaseButton = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW,"lookVIP",this.lookVip,this);
		lookVipBtn.setPosition(383,136);
		lookVipBtn.setScale(0.8);
		this.addChild(lookVipBtn);


	}

	private refresh():void
	{	
		if (this._vipLevel != Api.playerVoApi.getPlayerVipLevel())
		{	
			this._vipLevel = Api.playerVoApi.getPlayerVipLevel();
			let info = Config.DailyluckCfg.getLuckIdList();
			this._scrollList.refreshData(info);
		}
	}

	private lookVip():void
	{	
		ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEWTAB2);
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"godbless_bookRoom","godbless_child","godbless_manage","godbless_rank","godbless_servantLv","godbless_wife",

			]);
	}
	public dispose():void
	{
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_USERINFO,this.refresh,this);
		this._scrollList = null;
		this._vipLevel = 0;
		super.dispose();
	}
}