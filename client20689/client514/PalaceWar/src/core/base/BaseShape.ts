/**
 * author 陈可
 * date 2017/12/17
 * @class BaseShape
 */
class BaseShape extends egret.Shape
{
	public bindData: any = null;
    private _touchTapHelper: TouchHelper.Tap = null;
	private _touchHelper:TouchHelper.Touch=null;
	public constructor() 
	{
		super();
	}

	/**
     * 添加触摸回调
     */ 
    public addTouchTap(touchHandler:(event: egret.TouchEvent, ...args: any[]) => void,touchHandlerThisObj:any,touchHandlerParams?:any[])
    {
        if(this._touchTapHelper==null)
        {
            this._touchTapHelper = TouchHelper.addTouchTap(this, touchHandler,touchHandlerThisObj,touchHandlerParams);
        }
    }
    /**
     * 移除触摸
     */ 
    public removeTouchTap()
    {
        if(this._touchTapHelper)
        {
            this._touchTapHelper.removeTouchTap();
            this._touchTapHelper = null;
        }
    }

    public addTouch(touchHandler:(event:egret.TouchEvent,...args)=>void,touchHandlerThisObj:any,touchHandlerParams?:any[],isMoveCancel?:boolean):void
	{
		if(!this._touchHelper)
		{
			this._touchHelper = TouchHelper.addTouch(this,touchHandler,touchHandlerThisObj,touchHandlerParams,isMoveCancel);
		}
	}

	public removeTouch():void
	{
		if(this._touchHelper)
		{
			this._touchHelper.removeTouch();
			this._touchHelper=null;
		}
	}
	/**
     * 设置坐标
     */ 
    public setPosition(posX:number,posY:number)
    {
        this.x = posX;
        this.y = posY;
    }

	public stopAllActions() 
    {
        egret.Tween.removeTweens(this);
    }

	public setVisible(visible:boolean)
	{
		this.visible=visible;
	}

    public setScale(scale:number):void
    {
        this.scaleX=this.scaleY=scale;
    }

	/**
     * 销毁对象
     */ 
    public dispose()
    {
        this.stopAllActions();
        this.removeTouchTap();
		this.removeTouch();
        this.bindData=null;
    }
}