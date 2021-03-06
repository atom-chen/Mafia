class InviteViewTab2 extends CommonViewTab
{
	private _scrollList:ScrollList;
	private friendPowerList:string[];
	public constructor() 
	{
		super();
		this.initView();
	}

	protected initView():void
	{
		this.friendPowerList = Api.inviteVoApi.getFriendPowerList();
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,GameConfig.stageWidth,GameConfig.stageHeigth - 350 - 80);
		this._scrollList = ComponentManager.getScrollList(InviteViewTab2ScrollItem,this.friendPowerList,rect);
		this.addChild(this._scrollList);
		this._scrollList.y = 80;
	}

	public dispose():void
	{
		super.dispose();
	}
}