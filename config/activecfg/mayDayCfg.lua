﻿--五一活动配置
local mayDayCfg={
    [1]={    --版本一：五一活动（投关羽、柳如是皮肤、头像框）
        --单抽消耗：X元宝
        cost=200,
        
        --单抽获得道具：单抽必给  十连抽 = 单抽必给 * 10
        getReward="6_1001_1",
        
        --十连抽折扣
        discount=0.9,
        
        --抽奖的奖池
        lotteryPool={
            {"6_1150_1",3},
            {"6_1161_1",17},
            {"6_1301_1",10},
            {"6_1302_1",10},
            {"6_1303_1",10},
            {"6_1551_1",16},
            {"6_1020_1",17},
            {"6_1030_1",17},
        },
        
        --活动期间，抽奖次数的进度奖励
        --needNum：所需抽奖次数
        --getReward：奖励
        lotteryNum={
            [1]={
                ["needNum"]=10,["getReward"]="6_1216_1|6_1201_1|6_1206_1",
            },
            [2]={
                ["needNum"]=20,["getReward"]="6_1216_1|6_1701_1|6_1702_1|6_1703_1",
            },
            [3]={
                ["needNum"]=30,["getReward"]="6_1150_1|6_1216_1|6_1202_2|6_1203_2",
            },
            [4]={
                ["needNum"]=50,["getReward"]="11_4005_1|6_1150_1|6_1216_2|6_1201_5",
            },
        },
        
        --活动期间排行榜上榜限制：抽奖达到X次，可上榜
        rankNeedNum=100,
        
        --活动期间，抽奖的排行榜奖励
        --rank：排行榜上下限  例：{5,10} 第五名至第十名
        --getReward：奖励
        rankReward={
            [1]={
                ["rank"]={1,1},["getReward"]="8_2014_1|6_1301_5|6_1302_5|6_1303_5|6_1201_10|6_1701_9|6_1702_9|6_1703_9",
            },
            [2]={
                ["rank"]={2,2},["getReward"]="8_2014_1|6_1301_4|6_1302_4|6_1303_4|6_1201_8|6_1701_8|6_1702_8|6_1703_8",
            },
            [3]={
                ["rank"]={3,3},["getReward"]="8_2014_1|6_1301_3|6_1302_3|6_1303_3|6_1201_6|6_1701_7|6_1702_7|6_1703_7",
            },
            [4]={
                ["rank"]={4,5},["getReward"]="6_1301_3|6_1302_3|6_1303_3|6_1201_5|6_1206_5|6_1701_6|6_1702_6|6_1703_6",
            },
            [5]={
                ["rank"]={6,10},["getReward"]="6_1301_2|6_1302_2|6_1303_2|6_1201_4|6_1206_4|6_1701_5|6_1702_5|6_1703_5",
            },
            [6]={
                ["rank"]={11,20},["getReward"]="6_1301_1|6_1302_1|6_1303_1|6_1201_3|6_1206_3|6_1701_4|6_1702_4|6_1703_4",
            },
            [7]={
                ["rank"]={21,50},["getReward"]="6_1201_2|6_1701_3|6_1702_3|6_1703_3",
            },
        },
        
        --活动期间的累计充值奖励
        --needGem：所需额度：单位（元宝）
        --getReward：奖励
        recharge={
            [1]={
                ["needGem"]=60,["getReward"]="6_1004_1|6_1005_1|6_1006_1",
            },
            [2]={
                ["needGem"]=300,["getReward"]="6_1004_1|6_1202_2|6_1203_2",
            },
            [3]={
                ["needGem"]=1000,["getReward"]="6_1216_1|6_1201_5|6_1004_1",
            },
            [4]={
                ["needGem"]=2000,["getReward"]="6_1150_1|6_1216_1|6_1552_1|6_1004_2",
            },
            [5]={
                ["needGem"]=5000,["getReward"]="6_1150_1|6_1216_2|6_1090_1|6_1004_2",
            },
            [6]={
                ["needGem"]=10000,["getReward"]="16_2021_1|6_1150_1|6_1010_1|6_1216_2|6_1090_1|6_1361_1|6_1362_1|6_1004_2",
            },
            [7]={
                ["needGem"]=20000,["getReward"]="6_1150_2|6_1010_2|6_1216_3|6_1090_1|6_1552_1|6_1361_2|6_1362_2|6_1004_3",
            },
            [8]={
                ["needGem"]=50000,["getReward"]="6_1150_3|6_1010_3|6_1216_5|6_1090_2|6_1552_2|6_1361_3|6_1362_3|6_1004_5",
            },
        },
        
        --活动期间的活跃任务   注：每日不重置
        --openType：跳转
        --questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
        --value：进度
        --getReward：奖励
        task={
            [1]={
                ["questType"]=1,["value"]=1,["getReward"]="6_1201_1|6_1206_1|6_1211_1",
            },
            [2]={
                ["questType"]=1,["value"]=2,["getReward"]="6_1202_1|6_1207_1|6_1212_1",
            },
            [3]={
                ["questType"]=1,["value"]=3,["getReward"]="6_1203_1|6_1208_1|6_1213_1",
            },
            [4]={
                ["questType"]=2,["value"]=1000,["getReward"]="6_1302_1|6_1701_1",
            },
            [5]={
                ["questType"]=2,["value"]=3000,["getReward"]="6_1301_1|6_1702_1",
            },
            [6]={
                ["questType"]=2,["value"]=5000,["getReward"]="6_1303_1|6_1703_1",
            },
            [7]={
                ["openType"]="wife",["questType"]=301,["value"]=20,["getReward"]="6_1351_1|6_1001_1",
            },
            [8]={
                ["openType"]="wife",["questType"]=301,["value"]=40,["getReward"]="6_1353_1|6_1003_1",
            },
            [9]={
                ["openType"]="wife",["questType"]=301,["value"]=60,["getReward"]="6_1351_1|6_1353_1",
            },
            [10]={
                ["openType"]="child",["questType"]=402,["value"]=20,["getReward"]="6_1030_1|6_1001_1",
            },
            [11]={
                ["openType"]="child",["questType"]=402,["value"]=40,["getReward"]="6_1020_1|6_1003_1",
            },
            [12]={
                ["openType"]="child",["questType"]=402,["value"]=60,["getReward"]="6_1020_1|6_1030_1",
            },
            [13]={
                ["openType"]="search",["questType"]=303,["value"]=20,["getReward"]="6_1212_1|6_1001_1",
            },
            [14]={
                ["openType"]="search",["questType"]=303,["value"]=40,["getReward"]="6_1213_1|6_1003_1",
            },
            [15]={
                ["openType"]="search",["questType"]=303,["value"]=60,["getReward"]="6_1212_1|6_1213_1",
            },
            [16]={
                ["openType"]="atkrace",["questType"]=601,["value"]=5,["getReward"]="6_1029_1|6_1211_1",
            },
            [17]={
                ["openType"]="atkrace",["questType"]=601,["value"]=10,["getReward"]="6_1021_1|6_1211_1",
            },
            [18]={
                ["openType"]="atkrace",["questType"]=601,["value"]=15,["getReward"]="6_1021_1|6_1029_1",
            },
            [19]={
                ["openType"]="dinner",["questType"]=119,["value"]=3,["getReward"]="6_1352_1|6_1354_1",
            },
            [20]={
                ["openType"]="dinner",["questType"]=119,["value"]=6,["getReward"]="6_1352_1|6_1354_1",
            },
            [21]={
                ["openType"]="dinner",["questType"]=119,["value"]=9,["getReward"]="6_1352_2|6_1354_2",
            },
        },
        
    },
    [2]={    --版本二：常规版（无皮肤、无门客、无头像框）  主要用于新服
        --单抽消耗：X元宝
        cost=100,
        
        --单抽获得道具：单抽必给  十连抽 = 单抽必给 * 10
        getReward="6_1001_1",
        
        --十连抽折扣
        discount=0.9,
        
        --抽奖的奖池
        lotteryPool={
            {"6_1150_1",1},
            {"6_1206_1",15},
            {"6_1161_1",8},
            {"6_1211_1",22},
            {"6_1020_1",15},
            {"6_1030_1",15},
            {"6_1201_1",7},
            {"6_1003_2",17},
        },
        
        --活动期间，抽奖次数的进度奖励
        --needNum：所需抽奖次数
        --getReward：奖励
        lotteryNum={
            [1]={
                ["needNum"]=10,["getReward"]="6_1201_1|6_1207_1|6_1208_1",
            },
            [2]={
                ["needNum"]=20,["getReward"]="6_1201_1|6_1202_1|6_1203_1",
            },
            [3]={
                ["needNum"]=30,["getReward"]="6_1216_1|6_1202_1|6_1203_1",
            },
            [4]={
                ["needNum"]=50,["getReward"]="6_1150_1|6_1216_1|6_1201_2|6_1206_3",
            },
        },
        
        --活动期间排行榜上榜限制：抽奖达到X次，可上榜
        rankNeedNum=50,
        
        --活动期间，抽奖的排行榜奖励
        --rank：排行榜上下限  例：{5,10} 第五名至第十名
        --getReward：奖励
        rankReward={
            [1]={
                ["rank"]={1,1},["getReward"]="6_1150_2|6_1301_3|6_1302_3|6_1303_3|6_1201_8|6_1701_9|6_1702_9|6_1703_9",
            },
            [2]={
                ["rank"]={2,2},["getReward"]="6_1150_1|6_1301_2|6_1302_2|6_1303_2|6_1201_6|6_1701_8|6_1702_8|6_1703_8",
            },
            [3]={
                ["rank"]={3,3},["getReward"]="6_1150_1|6_1301_1|6_1302_1|6_1303_1|6_1201_5|6_1701_7|6_1702_7|6_1703_7",
            },
            [4]={
                ["rank"]={4,5},["getReward"]="6_1201_4|6_1701_6|6_1702_6|6_1703_6",
            },
            [5]={
                ["rank"]={6,10},["getReward"]="6_1201_3|6_1701_5|6_1702_5|6_1703_5",
            },
            [6]={
                ["rank"]={11,20},["getReward"]="6_1201_2|6_1701_4|6_1702_4|6_1703_4",
            },
            [7]={
                ["rank"]={21,50},["getReward"]="6_1201_1|6_1701_3|6_1702_3|6_1703_3",
            },
        },
        
        --活动期间的累计充值奖励
        --needGem：所需额度：单位（元宝）
        --getReward：奖励
        recharge={
            [1]={
                ["needGem"]=60,["getReward"]="6_1004_1|6_1005_1|6_1006_1",
            },
            [2]={
                ["needGem"]=300,["getReward"]="6_1004_1|6_1202_2|6_1203_2",
            },
            [3]={
                ["needGem"]=1000,["getReward"]="6_1216_1|6_1201_5|6_1004_1",
            },
            [4]={
                ["needGem"]=2000,["getReward"]="6_1150_1|6_1216_1|6_1552_1|6_1004_2",
            },
            [5]={
                ["needGem"]=5000,["getReward"]="6_1150_1|6_1216_2|6_1090_1|6_1004_2",
            },
            [6]={
                ["needGem"]=10000,["getReward"]="6_1150_1|6_1010_1|6_1216_2|6_1090_1|6_1552_1|6_1361_1|6_1362_1|6_1004_2",
            },
            [7]={
                ["needGem"]=20000,["getReward"]="6_1150_2|6_1010_2|6_1216_3|6_1090_1|6_1552_1|6_1361_2|6_1362_2|6_1004_3",
            },
            [8]={
                ["needGem"]=50000,["getReward"]="6_1150_3|6_1010_3|6_1216_5|6_1090_2|6_1552_2|6_1361_3|6_1362_3|6_1004_5",
            },
        },
        
        --活动期间的活跃任务   注：每日不重置
        --openType：跳转
        --questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
        --value：进度
        --getReward：奖励
        task={
            [1]={
                ["questType"]=1,["value"]=1,["getReward"]="6_1201_1|6_1206_1|6_1211_1",
            },
            [2]={
                ["questType"]=1,["value"]=2,["getReward"]="6_1202_1|6_1207_1|6_1212_1",
            },
            [3]={
                ["questType"]=1,["value"]=3,["getReward"]="6_1203_1|6_1208_1|6_1213_1",
            },
            [4]={
                ["questType"]=2,["value"]=1000,["getReward"]="6_1302_1|6_1701_1",
            },
            [5]={
                ["questType"]=2,["value"]=3000,["getReward"]="6_1301_1|6_1702_1",
            },
            [6]={
                ["questType"]=2,["value"]=5000,["getReward"]="6_1303_1|6_1703_1",
            },
            [7]={
                ["openType"]="wife",["questType"]=301,["value"]=20,["getReward"]="6_1351_1|6_1001_1",
            },
            [8]={
                ["openType"]="wife",["questType"]=301,["value"]=40,["getReward"]="6_1353_1|6_1003_1",
            },
            [9]={
                ["openType"]="wife",["questType"]=301,["value"]=60,["getReward"]="6_1351_1|6_1353_1",
            },
            [10]={
                ["openType"]="child",["questType"]=402,["value"]=20,["getReward"]="6_1030_1|6_1001_1",
            },
            [11]={
                ["openType"]="child",["questType"]=402,["value"]=40,["getReward"]="6_1020_1|6_1003_1",
            },
            [12]={
                ["openType"]="child",["questType"]=402,["value"]=60,["getReward"]="6_1020_1|6_1030_1",
            },
            [13]={
                ["openType"]="search",["questType"]=303,["value"]=20,["getReward"]="6_1212_1|6_1001_1",
            },
            [14]={
                ["openType"]="search",["questType"]=303,["value"]=40,["getReward"]="6_1213_1|6_1003_1",
            },
            [15]={
                ["openType"]="search",["questType"]=303,["value"]=60,["getReward"]="6_1212_1|6_1213_1",
            },
            [16]={
                ["openType"]="atkrace",["questType"]=601,["value"]=5,["getReward"]="6_1029_1|6_1211_1",
            },
            [17]={
                ["openType"]="atkrace",["questType"]=601,["value"]=10,["getReward"]="6_1021_1|6_1211_1",
            },
            [18]={
                ["openType"]="atkrace",["questType"]=601,["value"]=15,["getReward"]="6_1021_1|6_1029_1",
            },
            [19]={
                ["openType"]="dinner",["questType"]=119,["value"]=2,["getReward"]="6_1352_1|6_1354_1",
            },
            [20]={
                ["openType"]="dinner",["questType"]=119,["value"]=4,["getReward"]="6_1352_1|6_1354_1",
            },
            [21]={
                ["openType"]="dinner",["questType"]=119,["value"]=6,["getReward"]="6_1352_2|6_1354_2",
            },
        },
        
    },
    [3]={    --版本三：关羽活动（投关羽，无皮肤，无头像框）
        --单抽消耗：X元宝
        cost=200,
        
        --单抽获得道具：单抽必给  十连抽 = 单抽必给 * 10
        getReward="6_1001_1",
        
        --十连抽折扣
        discount=0.9,
        
        --抽奖的奖池
        lotteryPool={
            {"6_1150_1",3},
            {"6_1161_1",17},
            {"6_1301_1",10},
            {"6_1302_1",10},
            {"6_1303_1",10},
            {"6_1551_1",16},
            {"6_1020_1",17},
            {"6_1030_1",17},
        },
        
        --活动期间，抽奖次数的进度奖励
        --needNum：所需抽奖次数
        --getReward：奖励
        lotteryNum={
            [1]={
                ["needNum"]=10,["getReward"]="6_1216_1|6_1201_1|6_1206_1",
            },
            [2]={
                ["needNum"]=20,["getReward"]="6_1216_1|6_1701_1|6_1702_1|6_1703_1",
            },
            [3]={
                ["needNum"]=30,["getReward"]="6_1150_1|6_1216_1|6_1202_2|6_1203_2",
            },
            [4]={
                ["needNum"]=50,["getReward"]="6_1150_3|6_1216_2|6_1202_3|6_1203_3",
            },
        },
        
        --活动期间排行榜上榜限制：抽奖达到X次，可上榜
        rankNeedNum=100,
        
        --活动期间，抽奖的排行榜奖励
        --rank：排行榜上下限  例：{5,10} 第五名至第十名
        --getReward：奖励
        rankReward={
            [1]={
                ["rank"]={1,1},["getReward"]="8_2014_1|6_1301_5|6_1302_5|6_1303_5|6_1201_10|6_1701_9|6_1702_9|6_1703_9",
            },
            [2]={
                ["rank"]={2,2},["getReward"]="8_2014_1|6_1301_4|6_1302_4|6_1303_4|6_1201_8|6_1701_8|6_1702_8|6_1703_8",
            },
            [3]={
                ["rank"]={3,3},["getReward"]="8_2014_1|6_1301_3|6_1302_3|6_1303_3|6_1201_6|6_1701_7|6_1702_7|6_1703_7",
            },
            [4]={
                ["rank"]={4,5},["getReward"]="6_1301_3|6_1302_3|6_1303_3|6_1201_5|6_1206_5|6_1701_6|6_1702_6|6_1703_6",
            },
            [5]={
                ["rank"]={6,10},["getReward"]="6_1301_2|6_1302_2|6_1303_2|6_1201_4|6_1206_4|6_1701_5|6_1702_5|6_1703_5",
            },
            [6]={
                ["rank"]={11,20},["getReward"]="6_1301_1|6_1302_1|6_1303_1|6_1201_3|6_1206_3|6_1701_4|6_1702_4|6_1703_4",
            },
            [7]={
                ["rank"]={21,50},["getReward"]="6_1201_2|6_1701_3|6_1702_3|6_1703_3",
            },
        },
        
        --活动期间的累计充值奖励
        --needGem：所需额度：单位（元宝）
        --getReward：奖励
        recharge={
            [1]={
                ["needGem"]=60,["getReward"]="6_1004_1|6_1005_1|6_1006_1",
            },
            [2]={
                ["needGem"]=300,["getReward"]="6_1004_1|6_1202_2|6_1203_2",
            },
            [3]={
                ["needGem"]=1000,["getReward"]="6_1216_1|6_1201_5|6_1004_1",
            },
            [4]={
                ["needGem"]=2000,["getReward"]="6_1150_1|6_1216_1|6_1552_1|6_1004_2",
            },
            [5]={
                ["needGem"]=5000,["getReward"]="6_1150_1|6_1216_2|6_1090_1|6_1004_2",
            },
            [6]={
                ["needGem"]=10000,["getReward"]="6_1553_1|6_1150_1|6_1010_1|6_1216_2|6_1090_1|6_1361_1|6_1362_1|6_1004_2",
            },
            [7]={
                ["needGem"]=20000,["getReward"]="6_1150_2|6_1010_2|6_1216_3|6_1090_1|6_1552_1|6_1361_2|6_1362_2|6_1004_3",
            },
            [8]={
                ["needGem"]=50000,["getReward"]="6_1150_3|6_1010_3|6_1216_5|6_1090_2|6_1552_2|6_1361_3|6_1362_3|6_1004_5",
            },
        },
        
        --活动期间的活跃任务   注：每日不重置
        --openType：跳转
        --questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
        --value：进度
        --getReward：奖励
        task={
            [1]={
                ["questType"]=1,["value"]=1,["getReward"]="6_1201_1|6_1206_1|6_1211_1",
            },
            [2]={
                ["questType"]=1,["value"]=2,["getReward"]="6_1202_1|6_1207_1|6_1212_1",
            },
            [3]={
                ["questType"]=1,["value"]=3,["getReward"]="6_1203_1|6_1208_1|6_1213_1",
            },
            [4]={
                ["questType"]=2,["value"]=1000,["getReward"]="6_1302_1|6_1701_1",
            },
            [5]={
                ["questType"]=2,["value"]=3000,["getReward"]="6_1301_1|6_1702_1",
            },
            [6]={
                ["questType"]=2,["value"]=5000,["getReward"]="6_1303_1|6_1703_1",
            },
            [7]={
                ["openType"]="wife",["questType"]=301,["value"]=20,["getReward"]="6_1351_1|6_1001_1",
            },
            [8]={
                ["openType"]="wife",["questType"]=301,["value"]=40,["getReward"]="6_1353_1|6_1003_1",
            },
            [9]={
                ["openType"]="wife",["questType"]=301,["value"]=60,["getReward"]="6_1351_1|6_1353_1",
            },
            [10]={
                ["openType"]="child",["questType"]=402,["value"]=20,["getReward"]="6_1030_1|6_1001_1",
            },
            [11]={
                ["openType"]="child",["questType"]=402,["value"]=40,["getReward"]="6_1020_1|6_1003_1",
            },
            [12]={
                ["openType"]="child",["questType"]=402,["value"]=60,["getReward"]="6_1020_1|6_1030_1",
            },
            [13]={
                ["openType"]="search",["questType"]=303,["value"]=20,["getReward"]="6_1212_1|6_1001_1",
            },
            [14]={
                ["openType"]="search",["questType"]=303,["value"]=40,["getReward"]="6_1213_1|6_1003_1",
            },
            [15]={
                ["openType"]="search",["questType"]=303,["value"]=60,["getReward"]="6_1212_1|6_1213_1",
            },
            [16]={
                ["openType"]="atkrace",["questType"]=601,["value"]=5,["getReward"]="6_1029_1|6_1211_1",
            },
            [17]={
                ["openType"]="atkrace",["questType"]=601,["value"]=10,["getReward"]="6_1021_1|6_1211_1",
            },
            [18]={
                ["openType"]="atkrace",["questType"]=601,["value"]=15,["getReward"]="6_1021_1|6_1029_1",
            },
            [19]={
                ["openType"]="dinner",["questType"]=119,["value"]=3,["getReward"]="6_1352_1|6_1354_1",
            },
            [20]={
                ["openType"]="dinner",["questType"]=119,["value"]=6,["getReward"]="6_1352_1|6_1354_1",
            },
            [21]={
                ["openType"]="dinner",["questType"]=119,["value"]=9,["getReward"]="6_1352_2|6_1354_2",
            },
        },
        
    },
    [4]={    --活动四：长坂坡活动（投张飞）
        --单抽消耗：X元宝
        cost=200,
        
        --单抽获得道具：单抽必给   十连抽：单抽必给*10
        getReward="6_1001_1",
        
        --十连抽折扣
        discount=0.9,
        
        --抽奖的奖池
        lotteryPool={
            {"6_1150_1",2},
            {"6_1352_1",15},
            {"6_1301_1",12},
            {"6_1302_1",12},
            {"6_1303_1",12},
            {"6_1354_1",15},
            {"6_1101_1",10},
            {"6_1102_1",22},
        },
        
        --活动期间，抽奖次数的进度奖励
        --needNum：所需抽奖次数
        --getReward：奖励
        lotteryNum={
            [1]={
                ["needNum"]=10,["getReward"]="6_1216_1|6_1201_1|6_1206_1",
            },
            [2]={
                ["needNum"]=20,["getReward"]="6_1216_1|6_1701_1|6_1702_1|6_1703_1",
            },
            [3]={
                ["needNum"]=30,["getReward"]="6_1150_1|6_1701_2|6_1702_2|6_1703_2",
            },
            [4]={
                ["needNum"]=50,["getReward"]="6_1150_3|6_1701_3|6_1702_3|6_1703_3",
            },
        },
        
        --活动期间排行榜上榜限制：抽奖达到X次，可上榜
        rankNeedNum=100,
        
        --活动期间，抽奖的排行榜奖励
        --rank：排行榜上下限  例：{5,10} 第五名至第十名
        --getReward：奖励
        rankReward={
            [1]={
                ["rank"]={1,1},["getReward"]="8_2015_1|6_1202_10|6_1203_10|6_1204_10|6_1205_10|6_1301_5|6_1302_5|6_1303_5",
            },
            [2]={
                ["rank"]={2,2},["getReward"]="8_2015_1|6_1202_8|6_1203_8|6_1204_8|6_1205_8|6_1301_4|6_1302_4|6_1303_4",
            },
            [3]={
                ["rank"]={3,3},["getReward"]="8_2015_1|6_1202_6|6_1203_6|6_1204_6|6_1205_6|6_1301_3|6_1302_3|6_1303_3",
            },
            [4]={
                ["rank"]={4,5},["getReward"]="6_1202_5|6_1203_5|6_1204_5|6_1205_5|6_1301_3|6_1302_3|6_1303_3",
            },
            [5]={
                ["rank"]={6,10},["getReward"]="6_1202_4|6_1203_4|6_1204_4|6_1205_4|6_1301_2|6_1302_2|6_1303_2",
            },
            [6]={
                ["rank"]={11,20},["getReward"]="6_1202_3|6_1203_3|6_1204_3|6_1205_3|6_1301_1|6_1302_1|6_1303_1",
            },
            [7]={
                ["rank"]={21,50},["getReward"]="6_1201_3|6_1301_1|6_1302_1|6_1303_1",
            },
        },
        
        --活动期间的累计充值奖励
        --needGem：所需额度：单位（元宝）
        --getReward：奖励
        recharge={
            [1]={
                ["needGem"]=60,["getReward"]="6_1004_1|6_1005_1|6_1006_1",
            },
            [2]={
                ["needGem"]=300,["getReward"]="6_1004_1|6_1202_2|6_1203_2",
            },
            [3]={
                ["needGem"]=1000,["getReward"]="6_1216_1|6_1201_5|6_1004_1",
            },
            [4]={
                ["needGem"]=2000,["getReward"]="6_1150_1|6_1216_1|6_1552_1|6_1004_2",
            },
            [5]={
                ["needGem"]=5000,["getReward"]="6_1150_1|6_1216_2|6_1090_1|6_1004_2",
            },
            [6]={
                ["needGem"]=10000,["getReward"]="6_1553_1|6_1150_1|6_1010_1|6_1216_2|6_1090_1|6_1361_1|6_1362_1|6_1004_2",
            },
            [7]={
                ["needGem"]=20000,["getReward"]="6_1150_2|6_1010_2|6_1216_3|6_1090_1|6_1552_1|6_1361_2|6_1362_2|6_1004_3",
            },
            [8]={
                ["needGem"]=50000,["getReward"]="6_1150_3|6_1010_3|6_1216_5|6_1090_2|6_1552_2|6_1361_3|6_1362_3|6_1004_5",
            },
        },
        
        --活动期间的活跃任务   注：每日不重置
        --openType：跳转
        --questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
        --value：进度
        --getReward：奖励
        task={
            [1]={
                ["questType"]=1,["value"]=1,["getReward"]="6_1201_1|6_1206_1|6_1211_1",
            },
            [2]={
                ["questType"]=1,["value"]=2,["getReward"]="6_1202_1|6_1207_1|6_1212_1",
            },
            [3]={
                ["questType"]=1,["value"]=3,["getReward"]="6_1203_1|6_1208_1|6_1213_1",
            },
            [4]={
                ["questType"]=2,["value"]=1000,["getReward"]="6_1302_1|6_1701_1",
            },
            [5]={
                ["questType"]=2,["value"]=3000,["getReward"]="6_1301_1|6_1702_1",
            },
            [6]={
                ["questType"]=2,["value"]=5000,["getReward"]="6_1303_1|6_1703_1",
            },
            [7]={
                ["openType"]="wife",["questType"]=301,["value"]=20,["getReward"]="6_1351_1|6_1001_1",
            },
            [8]={
                ["openType"]="wife",["questType"]=301,["value"]=40,["getReward"]="6_1353_1|6_1003_1",
            },
            [9]={
                ["openType"]="wife",["questType"]=301,["value"]=60,["getReward"]="6_1351_1|6_1353_1",
            },
            [10]={
                ["openType"]="child",["questType"]=402,["value"]=20,["getReward"]="6_1030_1|6_1001_1",
            },
            [11]={
                ["openType"]="child",["questType"]=402,["value"]=40,["getReward"]="6_1020_1|6_1003_1",
            },
            [12]={
                ["openType"]="child",["questType"]=402,["value"]=60,["getReward"]="6_1020_1|6_1030_1",
            },
            [13]={
                ["openType"]="search",["questType"]=303,["value"]=20,["getReward"]="6_1212_1|6_1001_1",
            },
            [14]={
                ["openType"]="search",["questType"]=303,["value"]=40,["getReward"]="6_1213_1|6_1003_1",
            },
            [15]={
                ["openType"]="search",["questType"]=303,["value"]=60,["getReward"]="6_1212_1|6_1213_1",
            },
            [16]={
                ["openType"]="affair",["questType"]=104,["value"]=20,["getReward"]="6_1029_1|6_1211_1",
            },
            [17]={
                ["openType"]="affair",["questType"]=104,["value"]=40,["getReward"]="6_1021_1|6_1211_1",
            },
            [18]={
                ["openType"]="affair",["questType"]=104,["value"]=60,["getReward"]="6_1021_1|6_1029_1",
            },
            [19]={
                ["openType"]="dinner",["questType"]=119,["value"]=3,["getReward"]="6_1352_1|6_1354_1",
            },
            [20]={
                ["openType"]="dinner",["questType"]=119,["value"]=6,["getReward"]="6_1352_1|6_1354_1",
            },
            [21]={
                ["openType"]="dinner",["questType"]=119,["value"]=9,["getReward"]="6_1352_2|6_1354_2",
            },
        },
        
    },
}
return mayDayCfg
