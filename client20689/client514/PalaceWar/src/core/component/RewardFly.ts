/**
 * 奖励物品icon、文字飘动动画
 * author dmj
 * date 2017/9/27
 * @class RewardFly
 */
class RewardFly extends BaseDisplayObjectContainer
{
	private _tw:egret.Tween;
	private _temScale:number = 0.6;
	public constructor() 
	{
		super();
	}

	public init(icon:string,message:string,itemtype:number=0):void
	{	
		SoundManager.playEffect(SoundConst.EFFECT_SHOWTIP);
		let container:BaseDisplayObjectContainer = new BaseDisplayObjectContainer();
		this.addChild(container);
		let temX:number = 0;
		let temY:number = 0;
		let iconBt:BaseBitmap=null;

		let bgPic = "public_itemtipbg2";
		if(icon){
			bgPic = "public_itemtipbg";
		}
		let numBg = BaseBitmap.create(bgPic);
		// numBg.width = 300;
		// numBg.setScale(this._temScale);
		container.addChild(numBg);
		// temX = numBg.width * this._temScale;
		// temY = numBg.height * this._temScale/2;

		
		
		if(icon)
		{	
			let iconBg = BaseBitmap.create("public_tipiconbg");
			// iconBg.setScale(this._temScale);
			container.addChild(iconBg);

			let rect:egret.Rectangle=egret.Rectangle.create();
			rect.setTo(0,0,100,100);
			iconBt = BaseLoadBitmap.create(icon,rect);
			iconBt.setScale(this._temScale);
			if(itemtype==10||itemtype==8)
			{
				iconBt.scaleX =iconBt.scaleY =0.5;
			}
			container.addChild(iconBt);
			
			// temX = iconBt.width * this._temScale;
			// temY = iconBt.height * this._temScale/2;
			// iconBt.setScale(0.7);
			numBg.x = 40;
			numBg.y = iconBt.y + iconBt.height*0.7/2 - numBg.height/2 - 5;

			
 		}
		let msgTF:BaseBitmapText = ComponentManager.getBitmapText(message,TextFieldConst.FONTNAME_ITEMTIP);
		if(iconBt)
		{
			
			temX = iconBt.width * iconBt.scaleX;
			temY = iconBt.height * iconBt.scaleY/2;
		}
		msgTF.x = temX;
		msgTF.y = temY - msgTF.height/2;

		numBg.width = msgTF.width + 50;


		msgTF.x = temX;
		if(iconBt)
		{
			msgTF.y = iconBt.y + iconBt.height*0.7/2 - msgTF.height/2;
			msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
		}
		else
		{
			msgTF.x=numBg.x+(numBg.width-msgTF.width)/2;
			msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
		}

		container.addChild(msgTF);
		// if(message)
		// {
		// 	let msgTF:BaseTextField = ComponentManager.getTextField(message,30);
		// 	if(iconBt)
		// 	{
				
		// 		temX = iconBt.width * iconBt.scaleX;
		// 		temY = iconBt.height * iconBt.scaleY/2;
		// 	}
		// 	msgTF.x = temX;
		// 	if(iconBt)
		// 	{
		// 		msgTF.y = iconBt.y + iconBt.height*0.7/2 - msgTF.height/2;
		// 	}
		// 	else
		// 	{
		// 		msgTF.x=numBg.x+(numBg.width-msgTF.width)/2;
		// 		msgTF.y = numBg.y + numBg.height/2 - msgTF.height/2;
		// 	}
		// 	container.addChild(msgTF);
		// 	if(msgTF.width+30>numBg.width)
		// 	{
		// 		numBg.width = msgTF.width + 30;
		// 	}
		// }
		container.x = -container.width/2;
		this._tw = egret.Tween.get(container);
		this._tw.to({y:-80},1500).call(this.onComplete,this);
	}

	private onComplete():void
	{
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		this.dispose();
	}

	public dispose():void
	{
		if(this._tw)
		{
			egret.Tween.removeTweens(this._tw);
			this._tw = null;
		}
		this._temScale = 0.6;
		super.dispose();
	}
}