/**
 * 设置
 * author dky
 * date 201711/10
 * @class SettingPopopView
 */
class SettingPopopView  extends PopupView
{   
    private _type:string = "";

	private _soundBB:BaseBitmap;
	private _soundState:BaseTextField;
	private _soundText:BaseTextField;
	private _serviceType:number = 0;

	public constructor() 
	{
		super();
	}

	protected initView():void
	{

		
		// itemInfo.ic
		let bg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 520;
		bg.height = 230;
		bg.x = this.viewBg.x + this.viewBg.width/2 - bg.width/2;
		bg.y = 25;
		this.addChildToContainer(bg);
		
		let descText = ComponentManager.getTextField(LanguageManager.getlocal("settingAcountInfo"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		descText.x = 50;
		descText.y = bg.y + 20;
		this.addChildToContainer(descText);

		let nameTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		nameTitleText.x = descText.x;
		nameTitleText.y = descText.y + nameTitleText.height + 15;
		this.addChildToContainer(nameTitleText);

		let nameText = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		nameText.x = nameTitleText.x + nameTitleText.width;
		nameText.y = nameTitleText.y ;
		this.addChildToContainer(nameText);


		if(PlatformManager.checkIs3KSubSp()&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let guidTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingUserGUID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
			guidTitleText.textFlow=new Array<egret.ITextElement>({text:LanguageManager.getlocal("settingUserGUID"),style:{underline:true}});
			guidTitleText.x = 300;
			guidTitleText.y = nameTitleText.y ;
			guidTitleText.addTouchTap(this.idTouchHandler,this,null);
			this.addChildToContainer(guidTitleText);

			// let guidText = ComponentManager.getTextField(PlatformManager.client3k.getGUID(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			// guidText.x = guidTitleText.x + guidTitleText.width;
			// guidText.y = guidTitleText.y ;
			// this.addChildToContainer(guidText);
			// guidText.addTouchTap(this.idTouchHandler,this,null);
		}
		

		let idTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingID"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		idTitleText.x = descText.x;
		idTitleText.y = nameTitleText.y + idTitleText.height + 15;
		this.addChildToContainer(idTitleText);

		let idText = ComponentManager.getTextField(Api.playerVoApi.getPlayerID().toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		idText.x = idTitleText.x + idTitleText.width;
		idText.y = idTitleText.y ;
		this.addChildToContainer(idText);

		let zoneTitleText = ComponentManager.getTextField(LanguageManager.getlocal("settingZone"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		zoneTitleText.x = descText.x;
		zoneTitleText.y = idText.y + zoneTitleText.height + 15;
		this.addChildToContainer(zoneTitleText);

		let zoneText = ComponentManager.getTextField(GameData.curZoneID.toString(), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
		zoneText.x = zoneTitleText.x + zoneTitleText.width;
		zoneText.y = zoneTitleText.y ;
		this.addChildToContainer(zoneText);


		this._soundText = ComponentManager.getTextField(LanguageManager.getlocal("settingSound"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundText.x = descText.x;
		this._soundText.y = zoneText.y + this._soundText.height + 30;
		this.addChildToContainer(this._soundText);


		this._soundBB = BaseBitmap.create("btn_swicth");
		this._soundBB.x = this._soundText.x + this._soundText.width + 10;
		this._soundBB.y = this._soundText.y + this._soundText.height/2 - this._soundBB.height/2;
		this.addChildToContainer(this._soundBB);
		this._soundBB.addTouchTap(this.sonndHander,this);
		// this._soundBB.addTouch(this.sonndHander,this,null);	


		this._soundState = ComponentManager.getTextField("ON", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		this._soundState.x = this._soundBB.x + 15;
		this._soundState.y = this._soundBB.y + this._soundBB.height/2 - this._soundState.height/2;
		this.addChildToContainer(this._soundState);

		this._type = LocalStorageManager.get(LocalStorageConst.LOCAL_SOUND_SWITCH);
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(this._type == ""){
			this._type = "ON";
		}
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = 0xb1b1b1;
		}else{
			
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
		
		let btnIndex:number=0;
		let btnX:number=bg.x+5;
		let btnY:number=bg.y + bg.height + 15;
		let setBtnPos=function(btn:BaseButton)
		{
			btn.x = btnX+(btnIndex%3)*(btn.width + 30);
			btn.y = btnY+Math.floor(btnIndex/3)*70;
			btnIndex++;
		};
		// if(PlatformManager.checkIsLocal())
		// {
			let changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingChangeAchount",this.changeHandler,this);
			setBtnPos(changeBtn);
			changeBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(changeBtn);
			// btnX=changeBtn.x + changeBtn.width + 30;
		// }

 
		if(Api.switchVoApi.checkOpenShenhe()==false&& Api.switchVoApi.checkTWShenhe()==false)
		{	
			let cdkBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingCDK",this.cdkHander,this);
			setBtnPos(cdkBtn);
			cdkBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(cdkBtn);
		}
	
	
		let contact:string[]=PlatformManager.getContact();
		this._serviceType = PlatformManager.getCustomerServiceType();
		console.log("QAZ fkcw getCustomerServiceType "+this._serviceType);
		if( this._serviceType>0 || ((contact&&contact.length>0) || PlatformManager.checkIsTWBSp() || PlatformManager.checkIs3KSubSp())&&Api.switchVoApi.checkOpenShenhe()==false)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingContact",this.contackHander,this);
			setBtnPos(contactBtn);
			contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
		}

		if(PlatformManager.checkIsTWBSp()==true && PlatformManager.checkIsWeiduan()==true)
		{
			let contactBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"settingUserCenter",this.openUserCenter,this);
			setBtnPos(contactBtn);
			contactBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(contactBtn);
		}

		let chatblockBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"chatblockViewTitle",this.blockHander,this);
		setBtnPos(chatblockBtn);
		chatblockBtn.setColor(TextFieldConst.COLOR_BLACK);
		this.addChildToContainer(chatblockBtn);
		if(PlatformManager.checkIsTWBSp())
		{
			let urlBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpFacebook,this);
			urlBtn.setText("FB粉絲頁",false);
			setBtnPos(urlBtn);
			urlBtn.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn);
		}

		if(PlatformManager.checkIsKRSp())
		{
			let urlBtn1 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpKR1,this);
			urlBtn1.setText("고객센터",false);
			setBtnPos(urlBtn1);
			urlBtn1.setColor(TextFieldConst.COLOR_BLACK);
			this.addChildToContainer(urlBtn1);

			if(App.DeviceUtil.isIOS()&& Api.switchVoApi.checkOpenShenhe())
			{

			}
			else{
				let urlBtn2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW,"",this.jumpKR2,this);
				urlBtn2.setText("역천 카페",false);
				setBtnPos(urlBtn2);
				urlBtn2.setColor(TextFieldConst.COLOR_BLACK);
				this.addChildToContainer(urlBtn2);
			}
			
		}

		
	}

	private jumpFacebook():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://www.facebook.com/com.heyyogame.gd/");
		}
	}

	private jumpKR1():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://yccs.mayngames.co.kr/support");
		}
	}
	private jumpKR2():void
	{
		if(App.DeviceUtil.IsHtml5())
		{
			window.open("https://cafe.naver.com/yeokcheon");
		}
	}

	protected idTouchHandler() {
		PlatformManager.client.getGUID();
	}

	protected openUserCenter() {
		PlatformManager.openUserCenter();
	}

    private changeHandler(param:any):void
	{
		LoginManager.changeServer();
	}
	private contackHander():void
	{
		// if(PlatformManager.checkIs3KSubSp())
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else if (PlatformManager.checkIsTWBSp()) 
		// {
		// 	PlatformManager.client.openServiceCenter();
		// }
		// else
		// {
		// 	ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {});
		// }

		if (this._serviceType == 0)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:0});
		}
		else if (this._serviceType == 1)
		{
			PlatformManager.client.openServiceCenter();
		}
		else {
			RSDKHelper.getCustomerService((data:any)=>{
				console.log("QAZ fkcw getCustomerService 结果"+data);
				if (data) {
					ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:2,info:data});
				} 
			});
		}

	}
	private blockHander():void
	{
		ViewController.getInstance().openView(ViewConst.COMMON.CHATBLOCKVIEW, {});
	}
	private cdkHander():void
	{
		ViewController.getInstance().openView(ViewConst.POPUP.SettingCDKPopupView, {});
	}
	private sonndHander(param:any):void
	{
		
		let color = TextFieldConst.COLOR_WARN_GREEN;
		if(this._type == "" || this._type == "ON" ){
			this._type = "OFF";
		}
		else{
			this._type = "ON";
		}
		LocalStorageManager.set(LocalStorageConst.LOCAL_SOUND_SWITCH,this._type);
		if(this._type != "ON"){
			this._soundBB.skewY = 180;
			this._soundBB.x = this._soundBB.x + this._soundBB.width;
			this._soundState.x = this._soundBB.x - 50;
			color = 0xb1b1b1;
			SoundManager.pauseBg()
		}else{
			this._soundBB.skewY = 0;
			this._soundBB.x = this._soundText.x + this._soundText.width + 10;
			this._soundState.x = this._soundBB.x + 15;
			SoundManager.resumeBg();
		}
		this._soundState.text = this._type;
		this._soundState.textColor = color;
	}
	

	
    // protected getTitleStr(){
    //     //  this._type = this.param.data.type 
    //     return "adultChooseTypeViewTitle";
    // }


	public dispose():void
	{
		this._type = null;

		this._soundBB = null;
		this._soundState = null;
		this._type = "";
		// this.removeTouchTap();
		this._serviceType = 0;

		super.dispose();
	}
}