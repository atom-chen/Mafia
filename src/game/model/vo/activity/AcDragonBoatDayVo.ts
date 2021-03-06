class AcDragonBoatDayVo extends AcBaseVo
{

	private ainfo : any = null;
	private binfo : any = null;
	private cinfo : any = null;
	private shop : any = null;
	private riceNumber : number = 0;
	 
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key] = data[key];
		}
		 
		if(data.ainfo)
		{
			this.ainfo = data.ainfo;
		}

		if(data.binfo)
		{
			this.binfo = data.binfo;
		}

		if(data.cinfo)
		{
			this.cinfo = data.cinfo;
		}

		if(data.shop)
		{
			this.shop = data.shop;
		}  
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DBDAY_FRESH_ITEM);
  
	}

	public setRiceNumber(num : number):void{
		this.riceNumber = num;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DBDAY_FRESH_ITEM);
	}

	//获取自己粽子数
	public getZongzi():number
	{
		return this.v;
	}

	//获取前进米数
	public getTotalRiceNum():number
	{
		return Math.round(this.riceNumber);
	}
	//获取前进米数对应的奖励数据
	public gerCurRiceAward(curJindu):Array<ItemInfoVo>{
		if(curJindu == 0){
			curJindu = 1;
		}
		let item = this.cfg.teamReward[curJindu - 1].getReward;
		let arr:Array<ItemInfoVo> = new Array();
		let str_arr = item.split('|');
		for(let i in str_arr){
			let unit = str_arr[i].split('_');
			let type = unit[0];
			let id = unit[1];
			let num = unit[2];
			let itemInfoVo : ItemInfoVo = new ItemInfoVo();
			itemInfoVo.initData({id:Number(id),num:num});
			arr.push(itemInfoVo);
		}
		return arr;
	}

	//获取前进米数对应的进度id
	public getCurJindu():number
	{
		let curJindu = 0;
		let curRice = this.getTotalRiceNum();
		for(let i in this.cfg.teamReward){
			if(curRice < this.cfg.teamReward[i].needMeter){
				curJindu =  Number(i);
				break;
			}
			else{
				if(Number(i) == (this.getArr('teamReward').length - 1)){
					curJindu = this.getArr('teamReward').length;
					break;
				}
			}
		}
		return curJindu;
	}

	//获取累积充值数目
	public getChargeNum():number{
		return Number(this.binfo.v);
	}

	//获取任务完成次数
	public getTask(type:number):number
	{
		if(this.cinfo.task[type])
		{
			return this.cinfo.task[type];
		}
		return 0;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(key:number):boolean
	{
		if(this.cinfo.flags[key] && this.cinfo.flags[key] == 1)
		{
			return true;
		}
		return false;
	} 

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.binfo&&this.binfo.flags)
		{
			for(let key in this.binfo.flags)
			{
				if(this.binfo.flags[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}

	private get cfg() : Config.AcCfg.DragonBoatDayCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getpublicRedhot1():boolean
	{
		//奖励进度宝箱
		for(let i in this.cfg.teamReward){
			let unit = this.cfg.teamReward[i];
			let jindu = Number(i) + 1;
			if(this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)){
				return true;
			}
		}
		return false;
	}

	public isCanLqAwardJindu(curjindu,flag = false):boolean{
		//奖励进度宝箱
		for(let i in this.cfg.teamReward){
			let unit = this.cfg.teamReward[i];
			let jindu = Number(i) + 1;
			let condition = flag ? (jindu >= curjindu) : (jindu <= curjindu);
			if(condition){
				if(this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)){
					return true;
				}
			}
		}
		return false;
	}

	public getpublicRedhot2():boolean
	{	
		//充值
		let cfg = this.cfg;
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false){
				return true;
			}
		}
		return false;
	}

	public getpublicRedhot3():boolean
	{	
		//任务
		let cfg = this.cfg;
		for(let i in cfg.task){
			let unit = cfg.task[i];
			let taskNum = this.getTask(unit.questType);
			let taskBoo = this.isGetTaskReward(Number(i) + 1);
			if(taskNum >= unit.value && taskBoo == false)
			{
				return true;
			} 
		}
		return false; 
	}

	public get isShowRedDot(): boolean 
	{	
		for(let i = 1; i < 4; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	}

	public getteamRewardDataById(id):any{
		return this.cfg.teamReward[id - 1];
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.DragonBoatDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return [];
		}
		let list = cfg;  

		for(var i in list)
		{
			if(i == key)
			{	
				for(var key2 in list[i])
				{	
					if(list[i][key2])
					{
						var currObj =  list[i][key2]
						if(currObj.needMeter|| currObj.rank ||currObj.needGem||currObj.questType||currObj.limit)
						{
							list[i][key2].key = Number(key2)+1;
							if(list[i][key2].key)
							{
								arr.push(list[i][key2]); 
							}
						} 
					} 
				} 
			}
		}
		return arr;  
	}

	//获取限购物品次数
	public getBuyLimitnum(id):number{
		let info : any = this.shop;
		let buyNum = 0;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	//
	public isGetJinduAward(id):boolean{
		let info : any = this.ainfo;
		if(info && info.flags[id]){
			return true;
		}
		return false;
	}

	public getEndMeter():number{
		let arr = this.getArr('teamReward');
		return arr[arr.length - 1].needMeter;
	}
	 
	public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.shop = null;
	}
}