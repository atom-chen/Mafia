/**
 * author 陈可
 * date 2017/9/12
 * @class LoginView
 */
class LoginView extends BaseView
{
	/**选服背景 */
	private _serverBg:BaseBitmap;

	private _serverContainer:BaseDisplayObjectContainer;
	private _loginButton:BaseButton;
	private _noticeButton:BaseButton;
	private _switchAccountBtn:BaseButton;
	/**用户名 */
	private _username:string = "";
	/**邀请者uid */
	private _inviteUid:string = "";
	/**密码 */
	private _password:string = "123456";
	private _isnotice:boolean =false;
	public constructor()
	{
		super();
		if(PlatformManager.checkIsLocal())
		{
			this._password="";
		}
	}

	private getCfg(successCallback:Function,callbackThisObj:any,isRetry?:boolean):void
	{
		if(!isRetry)
		{
			StatisticsHelper.reportLoadData(8);
		}
		NetLoading.show();
		let ths=this;
		let reqData:any={t:"getlastserver",pid:LoginManager.getLocalUserName()};
		
		if(ServerCfg.checkServerDebug())
		{
			reqData.debug=1;
		}

		let version =PlatformManager.getAppVersion();
		let channel =PlatformManager.getAppid();
		if(version)
		{
			reqData.version=version;
		}
		if(channel)
		{
			reqData.channel =channel; 
		}
		if(PlatformManager.checkIsIOSShenheSp())
		{
			reqData.isShenhe="1";
		}
		reqData.isnew =true;
		console.log("start getcfg");
		NetManager.http.get(ServerCfg.svrCfgUrl,reqData,(newdata:any)=>{
			StatisticsHelper.reportLoadData(9);
			let data = newdata.server;
			let isnewuser:boolean=newdata.isnewuser;
			LoginManager.isNewUser=Boolean(isnewuser);
			NetLoading.hide();
			ServerCfg.lastServer=data;
			if(data.state)
			{
				ths.showLoginNotice(data.state,data.msg);
			}
			if(newdata&&newdata.notice&&newdata.notice.length>0&&(!isnewuser))
			{
				this._isnotice =true;
				this._noticeButton.visible =true;
				var noticeData:any={};
				noticeData.name ="login";
				noticeData.notice = newdata.notice;
		    	ViewController.getInstance().openView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW,noticeData);	
			}else
			{	
				this._isnotice =false;
				if(this._noticeButton)
				{
					this._noticeButton.visible = false;
				} 
			}


			if(data&&data.zid)
			{
				ServerCfg.setServerData(data);
			}
			console.log("getcfg success");
			if(successCallback)
			{
				successCallback.call(callbackThisObj);
			}
			if(isnewuser)
			{
				ths.loginBtnHandler();
			}
		},()=>{
			NetLoading.hide();
			console.log("get serverlist error");
			ths.getCfg(successCallback,callbackThisObj,true);
		},this);
	}
	
	protected initView():void
	{
		App.CommonUtil.formatSeaScreen(this);
		StatisticsHelper.reportLoadData(7);

		App.LogUtil.log("iniview loginView");
		App.LogUtil.log("ready play login music");
		this.playBgMusic();
		App.LogUtil.log("play login music end");
		// 播放背景音乐
		GameConfig.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.playBgMusic,this);
		// 背景
		if(ResourceManager.getRes(PlatCfg.loginBg))
		{
			let bg=BaseBitmap.create(PlatCfg.loginBg);
			this.addChild(bg);
		}
		this.showLogoAndLoginBtn();
	}
	
	private playBgMusic():void
	{
		try
		{
			SoundManager.playBg(SoundConst.MUSIC_LOGIN);
		}
		catch(e)
		{
			App.LogUtil.log("login播放背景音效报错"+e);
		}
		GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playBgMusic,this);
	}

	private showLogoAndLoginBtn():void
	{
		if(App.MessageHelper.hasEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST))
		{
			return;
		}
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,this.refresh,this);


		if(this._serverContainer)
		{
			this._serverContainer.visible=true;
			if(this._serverContainer)
			{
				this._serverContainer.visible = true;
			}
			if(this._serverBg)
			{
				this._serverBg.visible = true;
			}
			if(this._switchAccountBtn)
			{
				this._switchAccountBtn.visible = true;
			}
			if(this._noticeButton)
			{
				this._noticeButton.visible = true;
			}
			return;
		}

		// logo
		if (PlatformManager.checkIsTWBSp() != true && PlatCfg.loginLogo) {
			let logo:BaseBitmap;
			logo = BaseBitmap.create(PlatCfg.loginLogo);
			logo.x = GameConfig.stageWidth/2 - logo.width/2;
			logo.y = 5;
			this.addChild(logo);
			if((PlatformManager.checkIsIOSShenheSp()||PlatformManager.checkIs3KSp())&&PlatCfg.loginLogo=="loginres_logo")
			{
				logo.visible=false;
			}
		}
		this._serverContainer = new BaseDisplayObjectContainer();
		this.addChild(this._serverContainer);

		this._serverBg = BaseBitmap.create("loginres_9_serverbg");
		this._serverBg.width=452;
		this._serverContainer.addChild(this._serverBg);
		this._serverContainer.addTouch(this.clickSelectedHandler,this);

		this._serverContainer.setPosition(GameConfig.stageWidth/2 - this._serverBg.width/2,GameConfig.stageHeigth-290);

		let textColor = TextFieldConst.COLOR_WARN_RED3;
		 let stateStr = LanguageManager.getlocal("serverListOld");
        if(ServerCfg.selectServer&&ServerCfg.selectServer.flag == 1)
        {
            stateStr = LanguageManager.getlocal("serverListNew");
			textColor = TextFieldConst.COLOR_WARN_GREEN;
        }
		let serverStateTF = ComponentManager.getTextField( stateStr,TextFieldConst.FONTSIZE_CONTENT_COMMON);
		serverStateTF.textColor = textColor;
		serverStateTF.x = 30;
		serverStateTF.y = this._serverContainer.height/2 - serverStateTF.height/2;
		serverStateTF.name="serverStateTxt";
		this._serverContainer.addChild(serverStateTF);

		let serverNameTxt:BaseTextField=ComponentManager.getTextField("1",TextFieldConst.FONTSIZE_TITLE_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
		serverNameTxt.width=200;
		serverNameTxt.textAlign=egret.HorizontalAlign.CENTER;
		serverNameTxt.x = this._serverContainer.width/2 - serverNameTxt.width/2;
		serverNameTxt.y = this._serverContainer.height/2 - serverNameTxt.height/2;
		serverNameTxt.text=(ServerCfg.selectServer&&ServerCfg.selectServer.sname)?ServerCfg.selectServer.sname:"";
		serverNameTxt.name="serverNameTxt";
		this._serverContainer.addChild(serverNameTxt);

		let selecteBtn:BaseBitmap = BaseBitmap.create("loginres_txt1");
		selecteBtn.x = this._serverContainer.width - selecteBtn.width - 20;
		selecteBtn.y = this._serverContainer.height/2 - selecteBtn.height/2;
		this._serverContainer.addChild(selecteBtn);

	
		this._noticeButton = ComponentManager.getButton("loginres_logo_notice","",this.showNotice,this);
		this._noticeButton.x =10;
		this._noticeButton.y =10; 
		this.addChild(this._noticeButton); 
		this._noticeButton.visible = false;
		
		if(this._isnotice)
		{
			this._noticeButton.visible =true;
		}
		else
		{
			this._noticeButton.visible =false;
		}
		
 
		// 切换账号、联系客服

		this._switchAccountBtn = ComponentManager.getButton("loginres_btn2","",this.switchAccountHandler,this);
		this._switchAccountBtn.setPosition(PlatformManager.hasSpcialCloseBtn()?10:(GameConfig.stageWidth-this._switchAccountBtn.width-10),10);
		this.addChild(this._switchAccountBtn);
		let isLogin:boolean=PlatformManager.checkIsLoginPlat();
		if(PlatformManager.checkHideSwitchAccountBtn())
		{
			this._switchAccountBtn.visible=false;
		}
		else
		{
			this._switchAccountBtn.visible=isLogin;
		}
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS,this.sdkLoginSuccess,this);

		// 登陆游戏
		this._loginButton = ComponentManager.getButton("loginres_btn3","",this.loginBtnHandler,this);
		this._loginButton.x = GameConfig.stageWidth/2 - this._loginButton.width/2;
		this._loginButton.y = this._serverContainer.y+this._serverContainer.height+20;
		this.addChild(this._loginButton);

		let txt1:BaseTextField=ComponentManager.getTextField("背景故事纯属虚构，并非真实历史故事",14,TextFieldConst.COLOR_QUALITY_GRAY);

		let platStr:string=PlatformManager.getStatement();
		if (PlatformManager.checkIsShowWarning()) {
			if(!platStr)
			{
				let warnBg:BaseBitmap=BaseBitmap.create("public_9_black");
				warnBg.width=640;
				warnBg.height=88;
				warnBg.setPosition(0,GameConfig.stageHeigth-warnBg.height);
				this.addChild(warnBg);

				this.addChild(txt1);

				let warnTxt:BaseTextField=ComponentManager.getTextField("抵制不良游戏  拒绝盗版游戏  注意自我保护  谨防上当受骗\n适度游戏益脑  沉迷游戏伤身  合理安排时间  享受健康生活",TextFieldConst.FONTSIZE_CONTENT_COMMON,TextFieldConst.COLOR_WHITE);
				warnTxt.lineSpacing=5;
				warnTxt.setPosition((GameConfig.stageWidth-warnTxt.width)/2,GameConfig.stageHeigth-warnTxt.height-20);
				this.addChild(warnTxt);
				txt1.setPosition(GameConfig.stageWidth-txt1.width-5,warnBg.y-txt1.height-5);
			}
			else
			{
				let warnBg:BaseBitmap=BaseBitmap.create("public_9_black");
				warnBg.width=640;
				warnBg.height=70;
				warnBg.setPosition(0,GameConfig.stageHeigth-warnBg.height);
				this.addChild(warnBg);

				let gradualBg:BaseBitmap=BaseBitmap.create("loginres_9_gradual");
				gradualBg.width=640;
				gradualBg.setPosition(0,warnBg.y-gradualBg.height);
				this.addChild(gradualBg);

				this.addChild(txt1);

				let warnTxt:BaseTextField=ComponentManager.getTextField("抵制不良游戏  拒绝盗版游戏  注意自我保护  谨防上当受骗\n适度游戏益脑  沉迷游戏伤身  合理安排时间  享受健康生活",TextFieldConst.FONTSIZE_CONTENT_SMALL);
				warnTxt.lineSpacing=5;
				warnTxt.setPosition((GameConfig.stageWidth-warnTxt.width)/2,GameConfig.stageHeigth-warnBg.height-warnTxt.height-20);
				this.addChild(warnTxt);

				let platTxt:BaseTextField=ComponentManager.getTextField(platStr,16);
				if(platTxt.width<GameConfig.stageWidth-20)
				{
					platTxt.textAlign=egret.HorizontalAlign.CENTER;
				}
				platTxt.lineSpacing=5;
				platTxt.width=GameConfig.stageWidth-20;
				platTxt.setPosition(10,GameConfig.stageHeigth-warnBg.height+(warnBg.height-platTxt.height)/2);
				this.addChild(platTxt);

				txt1.setPosition(GameConfig.stageWidth-txt1.width-5,warnBg.y-txt1.height-3);
			}
		}
		else {
			txt1.setPosition(GameConfig.stageWidth-txt1.width-5,GameConfig.stageHeigth-txt1.height-5);
		}
		
		


		// if(this.checkNotLogin())
		// {
		// 	return;
		// }
		if(PlatformManager.checkIsUseSDK())
		{
			if(PlatformManager.isLogin==false)
			{
				if(RSDKHelper.isInit)
				{

					//加载韩国条约
					if(PlatformManager.checkIsKRSp())
					{
						let isShow = LocalStorageManager.get("isShowKRAgreement")
						if(!isShow || isShow == "")
						{
							ViewController.getInstance().openView(ViewConst.BASE.KRAGREEMENTVIEW,{confirmCallback: this.doLogin, handler: this});
						}else{
							this.doLogin();
						}
					}
					else{
						this.doLogin();
					}

					
				}
				else
				{
					// App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS,PlatformManager.login,PlatformManager);
				}
			}
			else
			{
				if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
				{

				}
				else
				{
					this.getCfg(this.refresh,this);
				}
			}
		}
		else
		{
			if(GameData.isLocal()||GameData.isTest())
			{
				PlatformManager.userId = LoginManager.getLocalUserName();
				GameData.tmpUserPassword = LoginManager.getUserPassword();
				if(!PlatformManager.userId)
				{
					this.showAccountPanel();
				}
				else
				{
					if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
					{
					}
					else
					{
						this.getCfg(this.refresh,this);
					}
				}
			}
		}
	}

	private doLogin()
	{	
		PlatformManager.client.checkWeiduanUpgrade();
		PlatformManager.login();
	}
	private showNotice():void
	{
		var noticeData:any={};
		noticeData.name ="login";
		ViewController.getInstance().openView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW,noticeData);
	}


	private showLoginNotice(state:string|number,msg:string):void
	{
		if(state&&msg)
		{
			if(Number(state)==1)
			{
				let continer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
				let mask:BaseShape=new BaseShape();
				mask.graphics.beginFill(0,0.4);
				mask.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
				mask.graphics.endFill();
				continer.addChild(mask);
				mask.touchEnabled=true;
				let shape:BaseShape=new BaseShape();
				shape.graphics.beginFill(0,0.7);
				shape.graphics.drawRoundRect(0,0,540,300,15,15);
				shape.graphics.endFill();
				shape.setPosition((continer.width-shape.width)/2,(continer.height-shape.height)/2);
				continer.addChild(shape);

				let txt:BaseTextField=ComponentManager.getTextField(msg,TextFieldConst.FONTSIZE_BUTTON_COMMON,TextFieldConst.COLOR_LIGHT_YELLOW);
				txt.textAlign=egret.HorizontalAlign.CENTER;
				txt.lineSpacing=5;
				txt.width=shape.width-60;
				txt.setPosition(shape.x+(shape.width-txt.width)/2,shape.y+(shape.height-txt.height)/2);
				continer.addChild(txt);
				this.addChild(continer);
				this.hideLoginBtn();
			}
		}
	}

	private sdkLoginSuccess():void
	{
		if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
		{
		}
		else
		{
			this.getCfg(this.refresh,this);
		}
		if(PlatformManager.checkHideSwitchAccountBtn())
		{
			return;
		}
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.visible=true;
		}
	}

	public refresh():void
	{
		if(this._serverContainer)
		{
			let txt1:BaseTextField = <BaseTextField>this._serverContainer.getChildByName("serverStateTxt");
			if(txt1)
			{
				// txt1.text=ServerCfg.selectServer.sname;
				let textColor = TextFieldConst.COLOR_WARN_RED;
				let stateStr = LanguageManager.getlocal("serverListOld");
				if(ServerCfg.selectServer&&ServerCfg.selectServer.flag == 1)
				{
					stateStr = LanguageManager.getlocal("serverListNew");
					textColor = TextFieldConst.COLOR_WARN_GREEN;
				}
				
				txt1.textColor = textColor;
				txt1.text = stateStr;
			}

			let txt:BaseTextField = <BaseTextField>this._serverContainer.getChildByName("serverNameTxt");
			if(txt)
			{
				txt.text=ServerCfg.selectServer.sname;
			}
		}
	}

	// 调起sdk
	private loginBtnHandler():void
	{	

		if(PlatformManager.checkIsUseSDK()&&PlatformManager.isLogin==false)
		{
			PlatformManager.login();
			return;
		}

		if (PlatformManager.checkIsUseSDK()&&(PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true || PlatformManager.getBigAppid() == "17004000")) 
		{	
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_TWLOGIN,this.doLoginHandler,this);
			PlatformManager.client.checkServerState(ServerCfg.selectServer.zid);
		}
		else {
			this.doLoginHandler();
		}

	}

	private doLoginHandler():void
	{
		StatisticsHelper.reportLoadData(10);
		App.LogUtil.log("gotoSdk");
		// 添加loading动画
		LoginManager.login();
		// this.hideLoginBtn();

	}


	private _accountPanel:BaseDisplayObjectContainer;
	private _maskSp:egret.Shape;
	/**打开输入测试账号面板 */
	private showAccountPanel():void
	{
		this._maskSp = new egret.Shape();
		this._maskSp.graphics.beginFill(TextFieldConst.COLOR_BLACK,0.5);
		this._maskSp.graphics.drawRect(0,0,GameConfig.stageWidth,GameConfig.stageHeigth);
		this._maskSp.graphics.endFill();
		this._maskSp.touchEnabled = true;
		this.addChild(this._maskSp);
		this._accountPanel = new BaseDisplayObjectContainer();
		this.addChild(this._accountPanel);

		var bg:egret.Shape=new egret.Shape();
		bg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		bg.graphics.drawRect(0,0,400,300);
		bg.graphics.endFill();
		this._accountPanel.addChild(bg);
		this._accountPanel.x = GameConfig.stageWidth/2  - bg.width/2;
		this._accountPanel.y = GameConfig.stageHeigth/2 - bg.height/2;
		var usernameTF:BaseTextField = new BaseTextField();
		usernameTF.x = 20;
		usernameTF.y = 50;
		usernameTF.text = "账号：";
		this._accountPanel.addChild(usernameTF);

		var usernameBg:egret.Shape=new egret.Shape();
		usernameBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		usernameBg.graphics.drawRect(0,0,250,50);
		usernameBg.graphics.endFill();

		usernameBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		usernameBg.graphics.drawRect(1,1,248,48);
		usernameBg.graphics.endFill();
		usernameBg.x = 110;
		usernameBg.y = usernameTF.y + usernameTF.height/2 - usernameBg.height/2;
		this._accountPanel.addChild(usernameBg);

		
		var usernameInput:BaseTextField = new BaseTextField();
		usernameInput.type = egret.TextFieldType.INPUT;
		usernameInput.width = 250;
		usernameInput.height = usernameTF.height;
		usernameInput.x = 120;
		usernameInput.y = 50;


		var inviteUidTF:BaseTextField = new BaseTextField();
		inviteUidTF.x = 20;
		inviteUidTF.y = 150;
		inviteUidTF.text = "邀请者uid：";
		this._accountPanel.addChild(inviteUidTF);

		var inviteUidBg:egret.Shape=new egret.Shape();
		inviteUidBg.graphics.beginFill(TextFieldConst.COLOR_LIGHT_RED,1);
		inviteUidBg.graphics.drawRect(0,0,210,50);
		inviteUidBg.graphics.endFill();

		inviteUidBg.graphics.beginFill(TextFieldConst.COLOR_BLACK,1);
		inviteUidBg.graphics.drawRect(1,1,208,48);
		inviteUidBg.graphics.endFill();
		inviteUidBg.x = 150;
		inviteUidBg.y = inviteUidTF.y + inviteUidTF.height/2 - inviteUidBg.height/2;
		this._accountPanel.addChild(inviteUidBg);

		
		var inviteUidInput:BaseTextField = new BaseTextField();
		inviteUidInput.type = egret.TextFieldType.INPUT;
		inviteUidInput.width = 210;
		inviteUidInput.height = inviteUidTF.height;
		inviteUidInput.x = 160;
		inviteUidInput.y = 150;

		if(GameData.isTest())
		{
		}
		else
		{
			usernameInput.maxChars = 100;
			// usernameInput.restrict="A-Z a-z 0-9 \u4e00-\u9fa5"
		}
		usernameInput.text=PlatformManager.userId;
		this._username=usernameInput.text;
		this._accountPanel.addChild(usernameInput);
		usernameInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInput, this, false, 2);


		this._accountPanel.addChild(inviteUidInput);
		inviteUidInput.addEventListener(egret.TextEvent.CHANGE, this.callbackInviteUidInput, this, false, 2);
		var confirmBtn:BaseButton = ComponentManager.getButton("loginres_btn3","",this.confirmHandler,this);
		confirmBtn.x = this._accountPanel.width/2 - confirmBtn.width/2;
		confirmBtn.y = this._accountPanel.height - 70;
		this._accountPanel.addChild(confirmBtn);

	}

	private callbackInput(event:egret.TextEvent)
	{
		this._username = event.target.text;
		App.LogUtil.log("event.target.text:" + event.target.text);
	}
	private callbackInviteUidInput(event:egret.TextEvent)
	{
		this._inviteUid = event.target.text;
		App.LogUtil.log("event.target.text:" + event.target.text);
	}

	public static setLoginByPID(pid:string,psw:string):void
	{
		let ths:LoginView=<LoginView>ViewController.getInstance().getView(ViewConst.BASE.LOGINVIEW);
		if(ths)
		{
			ths.setLoginByPID(pid,psw);
		}
	}

	private setLoginByPID(pid:string,psw:string):void
	{
		if(this._accountPanel)
		{
			this._accountPanel.dispose();
			this._accountPanel = null;
		}
		PlatformManager.userId = pid;
		GameData.tmpUserPassword = psw;
		this.loginBtnHandler();
	}

	private confirmHandler():void
	{
		if(this._username.length > 100)
		{
			App.CommonUtil.showTip("账号不能超过100位字符");
			return;
		}
		else if(this._username.length < 3)
		{
			App.CommonUtil.showTip("账号最少三个字符");
			return;
		}
		if(this._accountPanel)
		{
			this._accountPanel.dispose();
			this._accountPanel = null;
		}
		if(this._maskSp && this.contains(this._maskSp))
		{
			this.removeChild(this._maskSp);
			this._maskSp = null;
		}
		PlatformManager.userId = this._username;
		PlatformManager.inviter_uid = this._inviteUid;
		GameData.tmpUserPassword = this._password;
		if(ServerCfg.selectServer&&ServerCfg.selectServer.zid)
		{
		}
		else
		{
			this.getCfg(this.refresh,this);
		}
	}

	public hideLoginBtn():void
	{
		if(this._serverContainer)
		{
			this._serverContainer.visible = false;
		}
		if(this._serverBg)
		{
			this._serverBg.visible = false;
		}
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.visible = false;
		}
		if(this._loginButton)
		{
			this._loginButton.visible = false;
		}
		if(this._noticeButton)
		{
			this._noticeButton.visible = false;
		}
	}
	
	private switchAccountHandler(param:any):void
	{
		App.LogUtil.log("switchAccountHandler");
		if(PlatformManager.checkIsUseSDK())
		{
			App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_LOGOUT,this.hideSwitchBtn,this);
			let result:boolean = PlatformManager.logout();
			if(result)
			{
				this.hideSwitchBtn();
			}
		}
		else
		{
			this.showAccountPanel();
		}
	}

	protected getTitleStr():string
	{
		return null;
	}
	

	private hideSwitchBtn():void
	{
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.visible=false;
		}
		if(PlatformManager.checkIsKRSp())
		{
			PlatformManager.login();
		}
	}

	private clickSelectedHandler(event:egret.TouchEvent):void
	{
		var target = this._serverContainer;
		let lastScaleX:number=target.scaleX;
		let lastScaleY:number=target.scaleY;
		switch(event.type)
		{
			case egret.TouchEvent.TOUCH_BEGIN:
				target.setScale(0.95);
				break;
			case egret.TouchEvent.TOUCH_END:
				target.setScale(1);
				// todo 打开选服界面
				ViewController.getInstance().openView(ViewConst.POPUP.SERVERLISTPOPUPVIEW);
				break;	
			case egret.TouchEvent.TOUCH_CANCEL:
				target.setScale(1);
				break;	
		}
		target.x+=(target.width*lastScaleX-target.width*target.scaleX)/2;
		target.y+=(target.height*lastScaleY-target.height*target.scaleY)/2;
	}

	public dispose():void
	{
		// LoginView.isShowed=false;
		// App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS,PlatformManager.login,PlatformManager);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RSDK_INIT_SUCCESS,this.preInit,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_LOGOUT,this.hideSwitchBtn,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_PLAT_LOGIN_SUCCESS,this.sdkLoginSuccess,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST,this.refresh,this);
		GameConfig.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.playBgMusic,this);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_TWLOGIN,this.doLoginHandler,this);
		
		this._serverContainer=null;
		if(this._switchAccountBtn)
		{
			this._switchAccountBtn.dispose();
			this._switchAccountBtn = null;
		}
		super.dispose();
	}
}