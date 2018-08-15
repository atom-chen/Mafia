﻿--活动：红颜裁缝配置
local tailorCfg={
    [1]={   --配置一：红颜裁缝
        
        --展示列表
        showList={
            {"1011",10},
            {"1021",10},
            {"1031",10},
            {"3021",10},
            {"3031",10},
            {"3041",10},
            {"3051",10},
            {"3101",10},
        },
        
        --单抽消耗：X元宝
        cost=100,
        
        --单抽获得道具：银票*1  十连抽获得道具 = getReward * 10
        getReward="6_1001_1",
        
        --十连抽元宝打折：十连抽所需元宝 = cost * 10 * discount 
        discount=0.9,
        
        --抽奖奖池  {奖励，权重}
        tailorPool={
            {"6_2101_1",5},
            {"6_1150_1",10},
            {"6_1020_1",85},
            {"6_1301_1",20},
            {"6_1302_1",20},
            {"6_1303_1",20},
            {"6_1202_1",20},
            {"6_1203_1",20},
            {"6_1204_1",20},
            {"6_1205_1",20},
            {"6_1207_1",70},
            {"6_1208_1",70},
            {"6_1209_1",70},
            {"6_1210_1",70},
            {"6_1212_1",120},
            {"6_1213_1",120},
            {"6_1214_1",120},
            {"6_1215_1",120},
        },
        
        --[皮肤ID]=兑换皮肤所需绸缎数量
        shop={
            ["1011"]=10,
            ["1021"]=10,
            ["1031"]=10,
            ["3021"]=10,
            ["3031"]=10,
            ["3041"]=10,
            ["3051"]=10,
            ["3101"]=10,
        },
    },
}
return tailorCfg