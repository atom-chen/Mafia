class ItemViewTab1 extends CommonViewTab
{
	// 当前选中的索引
	private _selectedIndex:number = null;
	// 当前选中的itemvo
	private _selectedItemInfoVo:ItemInfoVo = null;
	// 道具选中框
	private _selectedBg:BaseBitmap = null;
	// 当前选中道具名称文本
	private _selectedNameTextF:BaseTextField = null;
	// 数量文本
	private _selectedNumTextF:BaseTextField = null;
	// 道具icon
	private _selectedIcon:BaseLoadBitmap = null;
	// 道具iconbg
	private _selectedIconBg:BaseBitmap = null;
	// 描述文本
	private _selectedDescTextF:BaseTextField = null;
	// 掉落文本
	private _selectedDropTextF:BaseTextField = null;
	// 使用按钮
	private _useBtn:BaseButton = null;
	private _itemInfoVoList:Array<ItemInfoVo> = null;
	private _scrollList:ScrollList;
	// 当前选中的item
	private _curItemScrollItem:ItemScrollItem;
	private _errorTF:BaseTextField = null;
	private _bottomBg:BaseBitmap;
	private _buttomContainer:BaseDisplayObjectContainer;
	private _lastUseNum:number=0;
	public constructor() 
	{
		super();
		this.initView();
	}

	protected getListType():number
	{
		return 1;
	}

	protected getNetRequestConst():string
	{
		return NetRequestConst.REQUEST_USE_ITEM;
	}

	protected initView():void
	{	
	
		App.MessageHelper.addEventListener(NetManager.getMessageName(this.getNetRequestConst()),this.useCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGENAME),this.useCallback,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGEPIC),this.useCallback,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND,this.refreshItemsAfterCompound,this);

		this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(this.getListType());
		if(this._itemInfoVoList.length > 0 &&this._itemInfoVoList[0])
		{
			this._selectedIndex = 0;
			this._selectedItemInfoVo = this._itemInfoVoList[0];
		}
		else
		{
			this._selectedIndex = -1;
		}
		

		let bg1:BaseBitmap = BaseBitmap.create("public_9_bg23");
		// bg1.y = 5;
		bg1.width = GameConfig.stageWidth-20;
		bg1.x = 10;
		bg1.height = GameConfig.stageHeigth - 445;
		bg1.name="bg1";
		this.addChild(bg1);

	 
		let rect = egret.Rectangle.create();
		rect.setTo(0,0,640 - 30,bg1.height - 30);
		this._scrollList = ComponentManager.getScrollList(ItemScrollItem,this._itemInfoVoList,rect);
		this.addChild(this._scrollList);
		this._scrollList.setPosition(20,bg1.y + 10);
		this._scrollList.addTouchTap(this.clickItemHandler,this);
	 

		this._errorTF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
		this._errorTF.x = bg1.x + bg1.width/2 - this._errorTF.width/2;
		this._errorTF.y = bg1.y + bg1.height/2 - this._errorTF.height/2;
		this.addChild(this._errorTF);

		if(this._selectedItemInfoVo)
		{
			this.initButtomContainer(bg1);
		}
		else
		{
			this.noItemTip();
		}
	}

	private initButtomContainer(bg1:BaseBitmap):void
	{
		this._buttomContainer = new BaseDisplayObjectContainer();
		this._buttomContainer.y = bg1.y + bg1.height + 8;
		this.addChild(this._buttomContainer);


		this._bottomBg = BaseBitmap.create("public_9_bg22");
	
		this._bottomBg.height = GameConfig.stageHeigth - bg1.height - 160;
		this._bottomBg.y = 0;
		this._buttomContainer.addChild(this._bottomBg);

		// this._bg4 = BaseBitmap.create("public_small_titlebg1");
		// this._bg4.y = 0;
		// this._buttomContainer.addChild(this._bg4);
		let line1 = BaseBitmap.create("public_line3");
		line1.width = 480;
		line1.x = GameConfig.stageWidth/2 - line1.width/2;
		line1.y = this._bottomBg.y + 35;

		this._buttomContainer.addChild(line1);

		this._selectedNameTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_BLACK);
		
		this._buttomContainer.addChild(this._selectedNameTextF);

		if(this._selectedItemInfoVo.iconBg&&this._selectedItemInfoVo.icon)
		{
			this._selectedIconBg = BaseBitmap.create(this._selectedItemInfoVo.iconBg);
			this._selectedIconBg.x = 45;
			this._selectedIconBg.y = this._bottomBg.y + 75;
			this._buttomContainer.addChild(this._selectedIconBg);

			this._selectedIcon = BaseLoadBitmap.create(this._selectedItemInfoVo.icon);
			this._selectedIcon.x = 50;
			this._selectedIcon.y = this._bottomBg.y + 78;
			this._buttomContainer.addChild(this._selectedIcon);
			this._selectedIcon.visible = false;
		}
		
		

		let bg5:BaseBitmap = BaseBitmap.create("public_9_bg21");
		bg5.y = this._bottomBg.y + 70;
		bg5.x = 180;
		bg5.width = 430;
		bg5.height = 123;
		this._buttomContainer.addChild(bg5);

		this._selectedNumTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._buttomContainer.addChild(this._selectedNumTextF);

		this._selectedDescTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._selectedDescTextF.x = bg5.x + 10;
		// this._selectedDescTextF.stroke = 2;
		this._selectedDescTextF.width = bg5.width - 40;
		this._selectedDescTextF.y = bg5.y + 10;
		this._buttomContainer.addChild(this._selectedDescTextF);

		this._selectedDropTextF = ComponentManager.getTextField("",TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
		this._selectedDropTextF.x = bg5.x + 10;
		// this._selectedDropTextF.stroke = 2;
		this._selectedDropTextF.width = bg5.width - 40;
		this._selectedDropTextF.y = bg5.y + 70;
		this._buttomContainer.addChild(this._selectedDropTextF);

		this._useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW,"useBtn",this.clickUseBtnHandler,this);
		this._useBtn.x = GameConfig.stageWidth/2 - this._useBtn.width/2;
		this._useBtn.y = GameConfig.stageHeigth - this._useBtn.height - 175;
		this._useBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChild(this._useBtn);
		this._useBtn.visible = false;

		this.updateItem(this._selectedIndex);
	}

	private clickItemHandler(event:egret.TouchEvent):void
	{
		let index:number = Number(event.data);
		this.updateItem(index);
		
	}

	// 刷新数据
	/**
	 * 
	 * @param index 
	 * @param ifRefresh 是否需要强制刷新 true，强制刷新
	 */
	private updateItem(index:number,ifRefresh:boolean=false):void
	{
		if(this._selectedIndex == -1)
		{
			this._buttomContainer.visible = false;
			this.noItemTip();
			this._selectedNameTextF.text = "";
			this._selectedNumTextF.text = "";
			this._selectedDescTextF.text = "";
			this._selectedDropTextF.text = "";
			this._useBtn.visible = false;
			this._selectedIcon.visible = false;
			this._selectedIconBg.visible = false;
			return;
		}
		this._buttomContainer.visible = true;
		if(this._selectedIndex && this._selectedIndex == index && this._selectedItemInfoVo && ifRefresh == false)
		{
			if(this._selectedBg)
			{
				if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg))
				{
					this._curItemScrollItem.addChild(this._selectedBg);
				}
			}
			this._selectedNumTextF.text = LanguageManager.getlocal("numTitle") + String(this._selectedItemInfoVo.num);
			/**
			 * 蛮王
			 */
			if(this._selectedItemInfoVo.id == 1950 )
			{
				if (Api.servantVoApi.isOwnServantDailyBoss())
				{
					this._useBtn.visible = false;
				}else{
					this._useBtn.visible = true;
				}
			}
			return;
		}
		if(this._selectedBg == null)
		{
			this._selectedBg = BaseBitmap.create("itembg_selected");
			this._selectedBg.x = 4;
			this._selectedBg.y = 4;
		}
		else
		{
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
		}
		
		this._selectedIndex = index;
		this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
		this._curItemScrollItem = <ItemScrollItem>this._scrollList.getItemByIndex(this._selectedIndex);
		if(this._curItemScrollItem && !this._curItemScrollItem.contains(this._selectedBg))
		{
			this._curItemScrollItem.addChild(this._selectedBg);
		}
		
		if(this._selectedItemInfoVo&&this._selectedItemInfoVo.name)
		{
			this._selectedNameTextF.text = this._selectedItemInfoVo.name;
			this._selectedNumTextF.text = LanguageManager.getlocal("numTitle") + String(this._selectedItemInfoVo.num);
			this._selectedDescTextF.text = LanguageManager.getlocal("effectTitle") + this._selectedItemInfoVo.desc;
			this._selectedDropTextF.text = LanguageManager.getlocal("dropTitle") + this._selectedItemInfoVo.dropDesc;
			this._useBtn.visible = this._selectedItemInfoVo.isShowUseBtn;
		}
	
		/**
		 * 蛮王
		 */
		if(this._selectedItemInfoVo.id == 1950 )
		{
			if (Api.servantVoApi.isOwnServantDailyBoss())
			{
				this._useBtn.visible = false;
			}else{
				this._useBtn.visible = true;
			}
		}
		this._selectedIconBg.visible = true;
		if(this._selectedItemInfoVo&&this._selectedItemInfoVo.iconBg)
		{
			this._selectedIconBg.texture = ResourceManager.getRes(this._selectedItemInfoVo.iconBg);
			this._selectedIcon.visible = true;
			// this._selectedIcon.texture = BaseLoadBitmap.create(this._selectedItemInfoVo.icon).texture;
			this._selectedIcon.setload(this._selectedItemInfoVo.icon);
		}
		this._selectedNumTextF.x =  100/2 ;
		// this._selectedNumTextF.x = this._selectedIcon.x + 20;
		this._selectedNumTextF.y = 100 + 90;
		this._selectedNameTextF.x = this._bottomBg.width/2 - this._selectedNameTextF.width/2;
		this._selectedNameTextF.y = this._bottomBg.y + 30;

	}

	// 点击使用按钮
	private clickUseBtnHandler(param:any):void
	{
		let num:number = 1;
		if(this._selectedItemInfoVo)
		{
			let data;
			let itemId = this._selectedItemInfoVo.id; 
		
			/**
			 * 特殊道具 
			 */
			if(itemId == 1021 || itemId == 1029 || itemId == 1361 || itemId == 1362 ||itemId==2103 ||itemId==2104||itemId==2105||itemId==2106)
			{
				if( (itemId == 1361 || itemId == 1362) && Api.wifeVoApi.getWifeNum() == 0 )
				{
					App.CommonUtil.showTip(LanguageManager.getlocal("itemUse_noWifeTip"));
					return;
				}
				//春季送礼活动特殊道具
				if(itemId==2103||itemId==2104||itemId==2105||itemId==2106)
				{  
					//过期 
				 	if(Api.itemVoApi.isEnd(itemId)==true)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("acspringTouchdes2"));
						return;
					}

					if(Api.itemVoApi.isStart(itemId)==false)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("acspringTouchdes"));
						return;
					}
				} 

				if(this._selectedItemInfoVo.num >= ItemView.MAX_NUM)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
				}
				else
				{
					this.sendRequest(num,this._selectedItemInfoVo.id);
				}
				return ;
			}

			if((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.target == 2)
			{
				ViewController.getInstance().openView(ViewConst.POPUP.SERVANTSELECTEDPOPUPVIEW,{type:ServantSelectedPopupView.TYPE_USE_ITEM,"itemId":this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
				// todo 使用门客道具
				// let servantId:number = 
				// data = {"itemId":this._selectedItemInfoVo.id,"itemNum":num,"servantId":servantId};
			}else if(this._selectedItemInfoVo.id == 1902){
				//改形象
				 ViewController.getInstance().openView(ViewConst.COMMON.GUIDECREATEUSERVIEW,{changeImg:true,callBack:this.sendRequest,obj:this});
			}
			else if((this._selectedItemInfoVo instanceof ItemInfoVo) && this._selectedItemInfoVo.id == 1901)
			{
				//改名卡
				ViewController.getInstance().openView(ViewConst.POPUP.USERNAMEPOPUPVIEW)
			}
			else
			{
				if(this._selectedItemInfoVo.num >= ItemView.MAX_NUM && this._selectedItemInfoVo.id != 1950)
				{
					ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:this._selectedItemInfoVo.id,callback:this.sendRequest,handler:this});
				}
				else
				{
					this.sendRequest(num,this._selectedItemInfoVo.id);
				}
			}
		}
	}
	protected changeImgNotify()
	{
		this.updateItem(this._selectedIndex,true);
		if(this._selectedItemInfoVo.num > 0)
		{
			if(this._curItemScrollItem)
			{
				this._curItemScrollItem.update();
			}
		}
	}

	//合成后刷新
	private refreshItemsAfterCompound():void
	{	
		let ifRefresh:boolean = false;
		
		if(this._selectedItemInfoVo.num > 0 )
		{
			if(this._curItemScrollItem)
			{
				this._curItemScrollItem.update();
			}
			this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
			this._scrollList.refreshData(this._itemInfoVoList);
			ifRefresh = true;
		}
		else
		{
			ifRefresh = true;
			this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
			this._scrollList.refreshData(this._itemInfoVoList);
			if(this._itemInfoVoList.length > this._selectedIndex)
			{
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else if(this._selectedIndex > 0 )
			{
				this._selectedIndex -= 1;
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else
			{
				this._selectedIndex = -1;
				this._selectedItemInfoVo = null;
			}
		}

		this.updateItem(this._selectedIndex,ifRefresh);
}


	// 数据请求
	protected sendRequest(itemNum:number,itemId:number,servantId?:number):void
	{
		this._lastUseNum = itemNum;
		let data = {"itemNum":itemNum,"itemId":itemId};
		if(servantId)
		{
			data["servantId"] = servantId;
		}
		NetManager.request(this.getNetRequestConst(),data);
	}


	// 刷新道具数量
	private useCallback(event:egret.Event):void
	{
		let rdata = event.data.data.data;
		let ifRefresh:boolean = false;
		let isGetItem:boolean = false;
		if(rdata && rdata.rewards)
		{
			let rewardList = GameData.formatRewardItem(rdata.rewards);
			// let list = [];
			for(let i = 0;i < rewardList.length;i++)
			{
				let rewardItemVo:RewardItemVo = rewardList[i];
				if (rewardItemVo.type == 6) {
					isGetItem = true;
					break;
				}
			}
			App.CommonUtil.playRewardFlyAction(rewardList);
		}
		let itemId = this._selectedItemInfoVo.id;
		/**
		 * 特殊道具
		 */
		if(rdata && rdata.servantArr && (itemId == 1021 || itemId == 1029 || ( itemId>= 1851 && itemId <= 1857) ))
		{
			ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.servantArr,this._lastUseNum,this._selectedItemInfoVo])
		}
		if(rdata && rdata.wifeArr && (itemId == 1361 || itemId == 1362))
		{
			ViewController.getInstance().openView(ViewConst.BASE.ITEMUSESUCCESSVIEW,[rdata.wifeArr,this._lastUseNum,this._selectedItemInfoVo])
		}
		
		if(this._selectedItemInfoVo.num > 0 && isGetItem==false)
		{
			if(this._curItemScrollItem)
			{
				this._curItemScrollItem.update();
			}
		}
		else
		{
			ifRefresh = true;
			this._itemInfoVoList = Api.itemVoApi.getItemVoListByType(1);
			if(this._curItemScrollItem && this._curItemScrollItem.contains(this._selectedBg))
			{
				this._curItemScrollItem.removeChild(this._selectedBg);
			}
			this._scrollList.refreshData(this._itemInfoVoList);
			if(this._itemInfoVoList.length > this._selectedIndex)
			{
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else if(this._selectedIndex > 0 )
			{
				this._selectedIndex -= 1;
				this._selectedItemInfoVo = this._itemInfoVoList[this._selectedIndex];
			}
			else
			{
				this._selectedIndex = -1;
				this._selectedItemInfoVo = null;
			}
		}

		this.updateItem(this._selectedIndex,ifRefresh);
	}

	// 暂无道具
	private noItemTip():void
	{
		if(this._itemInfoVoList.length <= 0)
		{
			this._errorTF.text = LanguageManager.getlocal("itemNotHasDesc");
			this._errorTF.x = GameConfig.stageWidth/2 - this._errorTF.width/2;
			this._errorTF.y =GameConfig.stageHeigth -610;
			if(this.getChildByName("bg1"))
			{
				this.getChildByName("bg1").height=GameConfig.stageHeigth - 170;
			}
		}
		else
		{
			this._errorTF.text = "";
		}
	}

	public dispose():void
	{
		App.MessageHelper.removeEventListener(NetManager.getMessageName(this.getNetRequestConst()),this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGENAME),this.useCallback,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USER_CHANGEPIC),this.useCallback,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGE_IMG,this.changeImgNotify,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICR_ITEM_COMPOUND,this.refreshItemsAfterCompound,this);

		this._selectedIndex = null;
		if(this._selectedItemInfoVo)
		{
			this._selectedItemInfoVo = null;
		}
		if(this._selectedBg)
		{
			if(this._selectedBg.parent && this._selectedBg.parent.contains(this._selectedBg))
			{
				this._selectedBg.parent.removeChild(this._selectedBg);
			}
			BaseBitmap.release(this._selectedBg);
			this._selectedBg = null;
		}
		if(this._selectedNameTextF)
		{
			this._buttomContainer.removeChild(this._selectedNameTextF);
			this._selectedNameTextF.dispose();
			this._selectedNameTextF = null;
		}
		if(this._selectedNumTextF)
		{
			this._buttomContainer.removeChild(this._selectedNumTextF);			
			this._selectedNumTextF.dispose();
			this._selectedNumTextF = null;
		}
		if(this._selectedIcon)
		{
			this._buttomContainer.removeChild(this._selectedIcon);
			BaseBitmap.release(this._selectedIcon);
			this._selectedIcon = null;
		}
		if(this._selectedIconBg)
		{
			this._buttomContainer.removeChild(this._selectedIconBg);
			BaseBitmap.release(this._selectedIconBg);
			this._selectedIconBg = null;
		}
		if(this._selectedDescTextF)
		{
			this._buttomContainer.removeChild(this._selectedDescTextF);
			this._selectedDescTextF.dispose();
			this._selectedDescTextF = null;
		}
		if(this._selectedDropTextF)
		{
			this._buttomContainer.removeChild(this._selectedDropTextF);
			this._selectedDropTextF.dispose();
			this._selectedDropTextF = null;
		}
		if(this._useBtn)
		{
			this.removeChild(this._useBtn);
			this._useBtn.dispose();
			this._useBtn = null;
		}
		if(this._curItemScrollItem)
		{
			this._curItemScrollItem = null;
		}
		if(this._scrollList)
		{
			this.removeChild(this._scrollList);
			this._scrollList.dispose();
			this._scrollList = null;
		}
		if(this._errorTF)
		{
			this.removeChild(this._errorTF);
			this._errorTF.dispose();
			this._errorTF = null;
		}
		// if(this._bg4)
		// {
		// 	this._buttomContainer.removeChild(this._bg4);
		// 	this._bg4.dispose();
		// 	this._bg4 = null;
		// }
		if(this._buttomContainer)
		{
			this.removeChild(this._buttomContainer);
			this._buttomContainer.dispose();
			this._buttomContainer = null;
		}
		this._itemInfoVoList = null;
		this._lastUseNum = 0;
		super.dispose();
	}
}