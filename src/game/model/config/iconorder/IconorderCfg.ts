namespace Config 
{
	/**
	 * 主界面icon图标配置
	 * author 陈可
	 * date 2018/4/18
	 * @class IconOrderCfg
	 */
	export namespace IconorderCfg 
	{
		let aidIconDic:Object={};
		let iconOrderList: Object = {};
		export function formatData(data: any): void {
			for (var key in data) {
				let acName:string=data[key]?data[key].activeName:"";
				if(acName)
				{
					let iconOrderItem: IconOrderItemCfg;
					if (!iconOrderList.hasOwnProperty(acName)) {
						iconOrderList[acName] = new IconOrderItemCfg();
					}
					iconOrderItem = iconOrderList[acName];
					iconOrderItem.initData(data[key]);
				}
			}
		}

		function getIconSortIdByName(name:string):number
		{
			if(iconOrderList[name])
			{
				return Number(iconOrderList[name].sortId);
			}
			return 99999;
		}

		export function getIconSortIdByCfgName(cfgName:string):number
		{
			if(iconOrderList[cfgName])
			{
				return getIconSortIdByName(cfgName);
			}
			else
			{
				for(let key in iconOrderList)
				{
					if(iconOrderList[key]&&iconOrderList[key].icon==cfgName)
					{
						return getIconSortIdByName(key);
					}
				}
			}
			return 99999;
		}

		export function getIconNameByName(name:string):string
		{
			if(iconOrderList[name])
			{
				return iconOrderList[name].icon;
			}
		}

		export function checkHasChildCfgNameByName(name:string):boolean
		{
			for(let key in iconOrderList)
			{
				let item:IconOrderItemCfg=iconOrderList[key];
				if(key&&key.indexOf(".")>-1 && item.aid==name)
				{
					return true;
				}
			}
			return false;
		}

		export function getisFlickByName(cfgName:string,type?:string|number):boolean
		{
			if(iconOrderList[cfgName]&&!type)
			{
				return iconOrderList[cfgName].isFlick;
			}
			else
			{
				if(type)
				{
					if(iconOrderList[cfgName+"."+type])
					{
						return iconOrderList[cfgName+"."+type].isFlick;
					}
				}
				else
				{
					for(let key in iconOrderList)
					{
						if(iconOrderList[key]&&iconOrderList[key].icon==cfgName)
						{
							return iconOrderList[key].isFlick;
						}
					}
				}
			}
			return false;
		}

		export function getAidListByCfgName(cfgName:string):string[]
		{
			if(aidIconDic[cfgName])
			{
				return aidIconDic[cfgName];
			}
			let idArr:string[]=[];
			if(!cfgName)
			{
				return idArr;
			}
			if(iconOrderList)
			{
				for(let key in iconOrderList)
				{
					if(iconOrderList[key]&&iconOrderList[key].icon==cfgName)
					{
						if(idArr.indexOf(key)<0)
						{
							idArr.push(key);
						}
					}
				}
			}
			aidIconDic[cfgName]=idArr;
			return idArr;
		}

		export function getIconCfgByAidAndType(aid:string,type?:string|number):IconOrderItemCfg
		{
			aid=type?aid+"."+type:aid;
			if(iconOrderList[aid])
			{
				return iconOrderList[aid];
			}
			return null;
		}

		export function getIconBgByAidAndType(aid:string,type?:string|number):number
		{
			let cfg=getIconCfgByAidAndType(aid,type);
			if(cfg)
			{
				return cfg.iconBg;
			}
		}
	}
	export class IconOrderItemCfg extends BaseItemCfg 
	{
		/**
		 * 活动名称
		 */
		public activeName:string;

		/**
		 * 排序id
		 */
		public sortId:string;

		/**
		 * 活动的底框  0：默认框  1：当前冲榜的特殊框
		 */
		public iconBg:number=0;

		/**
		 * icon的炫光特效  0：无特效  1：有特效
		 */
		public isFlick:number=0;

		/**
		 * 使用的icon的key，注意不是icon的全名，需要匹配的
		 */
		public icon:string;
		
		public get aid():string
		{
			if(this.activeName)
			{
				return this.activeName.split(".")[0];
			}
			return null;
		}
	}
}