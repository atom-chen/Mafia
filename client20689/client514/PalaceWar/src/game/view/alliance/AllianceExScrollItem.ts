/**
 *兑换
 * author dky
 * date 2017/12/7
 * @class AllianceExScrollItem
 */
class AllianceExScrollItem extends ScrollListItem
{

	// 数量
	private _numTF:BaseTextField;
	private _itemIndex:number;

	private _key :string;
	private _itemData:any;

	private _exchangeBtn:BaseButton;
	
	public constructor() 
	{
		super();
	}

	public initItem(index:number,data:any):void
	{
		this.width = 172 + this.getSpaceX();
		this.height = 229 + this.getSpaceY();;
		
		let key = (index+1).toString();
		this._key = key;
		this._itemIndex = index;
		this._itemData = data;
		
		let bgContainer:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();

		let itemBg:BaseBitmap = BaseBitmap.create("public_9_bg4");
		itemBg.width = 170;
		itemBg.height = 228;
		bgContainer.addChild(itemBg);

		let itemBg2:BaseBitmap = BaseBitmap.create("public_9_cell_title");
		itemBg2.width = 170 - 6;
		itemBg2.x = 3;
		itemBg2.y = 3;
		// itemBg2.height = 218;
		bgContainer.addChild(itemBg2);

		let shopId:string = data.sell;
		let itemCfg = data;

		let iconModel:RewardItemVo = GameData.formatRewardItem(itemCfg.content)[0];

		let itemName:BaseTextField = ComponentManager.getTextField(iconModel.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		itemName.setPosition(itemBg.width/2 - itemName.width/2, 7);
		bgContainer.addChild(itemName);

		let itemIcon:BaseDisplayObjectContainer = GameData.getItemIcon(iconModel,true);
		itemIcon.setPosition(itemBg.width/2 - itemIcon.width/2, 35);
		itemIcon.name = "icon";
		bgContainer.addChild(itemIcon);
		itemIcon.getChildByName("numLb").visible = false;

		let myAcVo = Api.allianceVoApi.getMyAllianceVo();
		let acVo = Api.allianceVoApi.getAllianceVo();
		
		let maxNum = acVo.level - data.needAllianceLv + 1;
		if(maxNum < 1){
			maxNum = 1;
		}
		let num = 0;
		if(myAcVo.shop&&myAcVo.shop[(index + 1).toString()]){
			num = myAcVo.shop[(index + 1).toString()];
		}
		let leftNum = maxNum -num;
		let color = TextFieldConst.COLOR_QUALITY_GREEN;
		if(leftNum <= 0){
			color = TextFieldConst.COLOR_WARN_RED;
		}
		
		let numStr = LanguageManager.getlocal("todayBuyNum",[color.toString(),leftNum.toString()]);

		// this._numTF = ComponentManager.getTextField(leftNum.toString(),TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		// // this._numTF.setPosition(itemName.x + itemName.width + 5,itemName.y);
		// this._numTF.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
		// bgContainer.addChild(this._numTF);
		// redSp.setPosition(itemIcon.x + itemIcon.width - 8 - this._numTF.width, itemIcon.y + itemIcon.height - 8 - this._numTF.height );
		this._numTF = ComponentManager.getTextField(numStr,TextFieldConst.FONTSIZE_CONTENT_SMALL);
		this._numTF.setPosition(itemBg.width/2 - this._numTF.width/2, itemIcon.y + itemIcon.height +3);
		bgContainer.addChild(this._numTF);

		this._exchangeBtn = ComponentManager.getButton( ButtonConst.BTN_SMALL_YELLOW, "exchange", this.chooseBtnClick, this);
		this._exchangeBtn.setText(data.needContribution + LanguageManager.getlocal("allianceBuildScore2"),false);
		this._exchangeBtn.setPosition(itemBg.width/2 - this._exchangeBtn.width/2, itemBg.height-this._exchangeBtn.height - 8);
		this._exchangeBtn.setColor(TextFieldConst.COLOR_BLACK);
		bgContainer.addChild(this._exchangeBtn);

		if(acVo.level - data.needAllianceLv < 0)
		{
			let maskBg:BaseBitmap = BaseBitmap.create("public_itemmask");
			// maskBg.x = this.width/2 - maskBg.width/2-5;
			maskBg.width = 170;
			maskBg.height = 228;
			
			// maskBg.y = 80;
			bgContainer.addChild(maskBg);
			

			let intimacyBg:BaseBitmap = BaseBitmap.create("public_numbg");
			intimacyBg.x = this.width/2 - intimacyBg.width/2-5;
			intimacyBg.height = 50;
			intimacyBg.y = 80;
			bgContainer.addChild(intimacyBg);

			let lockText:BaseTextField = ComponentManager.getTextField(LanguageManager.getlocal("allianceExchangeLock",[data.needAllianceLv]),TextFieldConst.FONTSIZE_CONTENT_SMALL);
			lockText.width = 80;
			lockText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
			lockText.textAlign =  egret.HorizontalAlign.CENTER
			lockText.setPosition(itemBg.width/2 - lockText.width/2, intimacyBg.y + 5);
			bgContainer.addChild(lockText);

		}

		if(leftNum <= 0){
			this._exchangeBtn.setEnable(false);
		}

		// if ( Api.dinnerVoApi.getBuyInfo()[key+1] == 1) {
		// 	App.DisplayUtil.changeToGray(itemIcon);
		// 	App.DisplayUtil.changeToGray(this._exchangeBtn);
		// }
		this.addChild(bgContainer);
	}


	 private chooseBtnClick()
    {
		let myVo = Api.allianceVoApi.getMyAllianceVo();
		let acVo = Api.allianceVoApi.getAllianceVo();

		if(acVo.level - this._itemData.needAllianceLv < 0)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceExchangeLock",[this._itemData.needAllianceLv]));
			return;
		}
		
		let maxNum = acVo.level - this._itemData.needAllianceLv + 1;
		if(maxNum < 1){
			maxNum = 1;
		}

		let num = 0;
		if(myVo.shop[(this._itemIndex + 1).toString()]){
			num = myVo.shop[(this._itemIndex + 1).toString()];
		}
		let leftNum = maxNum -num;
		if(leftNum <= 0){
			App.CommonUtil.showTip(LanguageManager.getlocal("acPunishShopTip1"));
			return ;
		}

		if(this._itemData.needContribution > myVo.ctv){
			App.CommonUtil.showTip(LanguageManager.getlocal("allianceNoCon"));
			return ;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_PUNISH_EXITEM,{"key":this._key,"index":this._itemIndex});
    }

	public refreshData(index:number)
	{	
		let myVo = Api.allianceVoApi.getMyAllianceVo();
		let acVo = Api.allianceVoApi.getAllianceVo();
		
		let maxNum = acVo.level - this._itemData.needAllianceLv + 1;

		let num = 0;
		if(myVo.shop[(index + 1).toString()]){
			num = myVo.shop[(index + 1).toString()];
		}
		let leftNum = maxNum -num;
		let color = TextFieldConst.COLOR_QUALITY_GREEN;
		if(leftNum <= 0){
			color = TextFieldConst.COLOR_WARN_RED;
		}

		let numStr = LanguageManager.getlocal("todayBuyNum",[color.toString(),leftNum.toString()]);
		
		// let numStr = LanguageManager.getlocal("acPunishBuyItemLimit",[leftNum.toString()]);

		this._numTF.text = numStr;
		if(leftNum <= 0){
			this._exchangeBtn.setEnable(false);
		}
	}
	public getSpaceY():number
	{
		return 5;
	}
	public getSpaceX():number
	{
		return 5;
	}

	public dispose():void
	{

		this._numTF = null;
		this._key = null;
		this._itemData = null;
		this._itemIndex = null;
		this._exchangeBtn = null;

		super.dispose();
	}
}