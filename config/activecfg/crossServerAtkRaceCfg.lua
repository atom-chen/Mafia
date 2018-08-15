﻿--跨服擂台配置
local crossServerAtkRaceCfg={
    [1]={
        --每日武馆次数
        dailyNum=4,
        
        --每次间隔时间 单位（秒）
        intervalTime=3600,
        
        --出使消耗道具
        fightAdd="1551",
        
        --复仇消耗道具
        revenge="1552",
        
        --挑战消耗道具
        challenge="1552",
        
        --追杀消耗道具
        hunt="1553",
        
        --额外出使次数： 大于等于60级门客数量 / parameter1  向下取整
        parameter1=5,
        
        --击杀对方门客数量大于等于 parameter2 ，会被记入仇人列表
        parameter2=5,
        
        --击杀大于等于20名门客，可上榜
        parameter3=20,
        
        --每击杀3个门客，获得一个翻牌奖励
        rewardTurn=3,
        
        --每次获胜奖励  score衙门积分  abilityExp书籍经验  ponit士气数量
        victory={
            ["score"]=2,["abilityExp"]=2,["point"]=1,
        },
        
        --每次失败  衙门分数-1
        fail=-1,
        
        --追杀时，战胜敌方，敌方分数-2
        huntScore=-2,
        
        --翻牌奖励  在翻牌时，随机1个奖励  其余5张牌，1张和随机出的奖励一样  其余4张再随4个不重复的（和已获得的也不重复）
        rewardPool={
            {"6_1551_1",6},
            {"14_1_4",23},
            {"14_1_8",15},
            {"14_1_12",9},
            {"15_1_4",23},
            {"15_1_8",15},
            {"15_1_12",9},
        },
        
        --获胜区奖励
        winServer="6_2001_1|6_2002_1|6_1751_1|6_1403_1|6_1151_1|6_1152_1|6_1153_1|6_1154_1|6_1707_1|6_1708_1|6_1709_1",
        
        --战败区奖励
        loseServer="6_1150_1|6_2000_1|6_1501_1|6_1502_1",
        
        --排名奖励
        rankList={
            ["1"]={
                rank={1,1},
                reward="11_3000_1|6_1950_1|6_1751_3|6_1403_3|6_2002_10|6_1151_10|6_1152_10|6_1153_10|6_1154_10|6_1217_12|6_1218_12|6_1219_12|6_1220_12|6_1701_108|6_1702_108|6_1703_108",
            },
            ["2"]={
                rank={2,2},
                reward="6_2002_7|6_1151_8|6_1152_8|6_1153_8|6_1154_8|6_1217_10|6_1218_10|6_1219_10|6_1220_10|6_1701_90|6_1702_90|6_1703_90",
            },
            ["3"]={
                rank={3,3},
                reward="6_2002_5|6_1151_6|6_1152_6|6_1153_6|6_1154_6|6_1217_8|6_1218_8|6_1219_8|6_1220_8|6_1701_72|6_1702_72|6_1703_72",
            },
            ["4"]={
                rank={4,5},
                reward="6_2002_4|6_1151_5|6_1152_5|6_1153_5|6_1154_5|6_1217_6|6_1218_6|6_1219_6|6_1220_6|6_1701_54|6_1702_54|6_1703_54",
            },
            ["5"]={
                rank={6,10},
                reward="6_2002_3|6_1151_4|6_1152_4|6_1153_4|6_1154_4|6_1217_4|6_1218_4|6_1219_4|6_1220_4|6_1701_36|6_1702_36|6_1703_36",
            },
            ["6"]={
                rank={11,20},
                reward="6_2002_2|6_1151_3|6_1152_3|6_1153_3|6_1154_3|6_1217_3|6_1218_3|6_1219_3|6_1220_3|6_1701_27|6_1702_27|6_1703_27",
            },
            ["7"]={
                rank={21,50},
                reward="6_2002_1|6_1151_2|6_1152_2|6_1153_2|6_1154_2|6_1217_2|6_1218_2|6_1219_2|6_1220_2|6_1701_18|6_1702_18|6_1703_18",
            },
            ["8"]={
                rank={51,100},
                reward="6_2002_1|6_1151_1|6_1152_1|6_1153_1|6_1154_1|6_1217_1|6_1218_1|6_1219_1|6_1220_1|6_1701_9|6_1702_9|6_1703_9",
            },
        },
        
          --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
          --effect  加成值
          --costPoint  消耗士气点数
          --costGem  消耗元宝
        iniAtt={
            ["1"]={       ----攻击加成 50%
                ["att"]=1,["effect"]=0.5,["costPoint"]=3,
            },
            ["2"]={       ----攻击加成 100%
                ["att"]=1,["effect"]=1,["costGem"]=50,
            },
            ["3"]={       ----攻击加成 200%
                ["att"]=1,["effect"]=2,["costGem"]=100,
            },
        },
        
          --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
          --effect  加成值
          --costPoint  消耗士气点数
          --weight  权重
        juniorAtt={
            ["1"]={       ----攻击加成
                ["att"]=1,["effect"]=0.05,["costPoint"]=1,["weight"]=10,
            },
            ["2"]={       ----攻击加成
                ["att"]=1,["effect"]=0.06,["costPoint"]=1,["weight"]=10,
            },
            ["3"]={       ----攻击加成
                ["att"]=1,["effect"]=0.07,["costPoint"]=1,["weight"]=10,
            },
            ["4"]={       ----攻击加成
                ["att"]=1,["effect"]=0.08,["costPoint"]=1,["weight"]=10,
            },
            ["5"]={       ----攻击加成
                ["att"]=1,["effect"]=0.09,["costPoint"]=1,["weight"]=10,
            },
            ["6"]={       ----技能加成
                ["att"]=2,["effect"]=0.07,["costPoint"]=1,["weight"]=10,
            },
            ["7"]={       ----技能加成
                ["att"]=2,["effect"]=0.08,["costPoint"]=1,["weight"]=10,
            },
            ["8"]={       ----技能加成
                ["att"]=2,["effect"]=0.09,["costPoint"]=1,["weight"]=10,
            },
            ["9"]={       ----技能加成
                ["att"]=2,["effect"]=0.1,["costPoint"]=1,["weight"]=10,
            },
            ["10"]={       ----技能加成
                ["att"]=2,["effect"]=0.11,["costPoint"]=1,["weight"]=10,
            },
            ["11"]={       ----技能加成
                ["att"]=2,["effect"]=0.12,["costPoint"]=1,["weight"]=10,
            },
            ["12"]={       ----血量恢复
                ["att"]=3,["effect"]=0.03,["costPoint"]=1,["weight"]=10,
            },
            ["13"]={       ----血量恢复
                ["att"]=3,["effect"]=0.04,["costPoint"]=1,["weight"]=10,
            },
            ["14"]={       ----血量恢复
                ["att"]=3,["effect"]=0.05,["costPoint"]=1,["weight"]=10,
            },
            ["15"]={       ----血量恢复
                ["att"]=3,["effect"]=0.06,["costPoint"]=1,["weight"]=10,
            },
        },
        
          --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
          --effect  加成值
          --costPoint  消耗士气点数
          --weight  权重
        mediumAtt={
            ["1"]={       ----攻击加成
                ["att"]=1,["effect"]=0.1,["costPoint"]=2,["weight"]=10,
            },
            ["2"]={       ----攻击加成
                ["att"]=1,["effect"]=0.11,["costPoint"]=2,["weight"]=10,
            },
            ["3"]={       ----攻击加成
                ["att"]=1,["effect"]=0.12,["costPoint"]=2,["weight"]=10,
            },
            ["4"]={       ----攻击加成
                ["att"]=1,["effect"]=0.13,["costPoint"]=2,["weight"]=10,
            },
            ["5"]={       ----攻击加成
                ["att"]=1,["effect"]=0.14,["costPoint"]=2,["weight"]=10,
            },
            ["6"]={       ----技能加成
                ["att"]=2,["effect"]=0.13,["costPoint"]=2,["weight"]=10,
            },
            ["7"]={       ----技能加成
                ["att"]=2,["effect"]=0.14,["costPoint"]=2,["weight"]=10,
            },
            ["8"]={       ----技能加成
                ["att"]=2,["effect"]=0.15,["costPoint"]=2,["weight"]=10,
            },
            ["9"]={       ----技能加成
                ["att"]=2,["effect"]=0.16,["costPoint"]=2,["weight"]=10,
            },
            ["10"]={       ----技能加成
                ["att"]=2,["effect"]=0.17,["costPoint"]=2,["weight"]=10,
            },
            ["11"]={       ----血量恢复
                ["att"]=3,["effect"]=0.07,["costPoint"]=2,["weight"]=10,
            },
            ["12"]={       ----血量恢复
                ["att"]=3,["effect"]=0.08,["costPoint"]=2,["weight"]=10,
            },
            ["13"]={       ----血量恢复
                ["att"]=3,["effect"]=0.09,["costPoint"]=2,["weight"]=10,
            },
            ["14"]={       ----血量恢复
                ["att"]=3,["effect"]=0.1,["costPoint"]=2,["weight"]=10,
            },
        },
        
          --att  加成属性  1：临时攻击  2：临时技能伤害  3：临时血量加成
          --effect  加成值
          --costGem  消耗元宝
          --weight  权重
        seniorAtt={
            ["1"]={       ----攻击加成
                ["att"]=1,["effect"]=0.15,["costGem"]=20,["weight"]=10,
            },
            ["2"]={       ----攻击加成
                ["att"]=1,["effect"]=0.16,["costGem"]=20,["weight"]=10,
            },
            ["3"]={       ----攻击加成
                ["att"]=1,["effect"]=0.17,["costGem"]=20,["weight"]=10,
            },
            ["4"]={       ----攻击加成
                ["att"]=1,["effect"]=0.18,["costGem"]=20,["weight"]=10,
            },
            ["5"]={       ----攻击加成
                ["att"]=1,["effect"]=0.19,["costGem"]=20,["weight"]=10,
            },
            ["6"]={       ----攻击加成
                ["att"]=1,["effect"]=0.2,["costGem"]=20,["weight"]=10,
            },
            ["7"]={       ----技能加成
                ["att"]=2,["effect"]=0.18,["costGem"]=20,["weight"]=10,
            },
            ["8"]={       ----技能加成
                ["att"]=2,["effect"]=0.19,["costGem"]=20,["weight"]=10,
            },
            ["9"]={       ----技能加成
                ["att"]=2,["effect"]=0.2,["costGem"]=20,["weight"]=10,
            },
            ["10"]={       ----技能加成
                ["att"]=2,["effect"]=0.21,["costGem"]=20,["weight"]=10,
            },
            ["11"]={       ----技能加成
                ["att"]=2,["effect"]=0.22,["costGem"]=20,["weight"]=10,
            },
            ["12"]={       ----技能加成
                ["att"]=2,["effect"]=0.23,["costGem"]=20,["weight"]=10,
            },
            ["13"]={       ----技能加成
                ["att"]=2,["effect"]=0.24,["costGem"]=20,["weight"]=10,
            },
            ["14"]={       ----技能加成
                ["att"]=2,["effect"]=0.25,["costGem"]=20,["weight"]=10,
            },
            ["15"]={       ----血量恢复
                ["att"]=3,["effect"]=0.11,["costGem"]=20,["weight"]=10,
            },
            ["16"]={       ----血量恢复
                ["att"]=3,["effect"]=0.12,["costGem"]=20,["weight"]=10,
            },
            ["17"]={       ----血量恢复
                ["att"]=3,["effect"]=0.13,["costGem"]=20,["weight"]=10,
            },
            ["18"]={       ----血量恢复
                ["att"]=3,["effect"]=0.14,["costGem"]=20,["weight"]=10,
            },
            ["19"]={       ----血量恢复
                ["att"]=3,["effect"]=0.15,["costGem"]=20,["weight"]=10,
            },
        },
    },
}
return crossServerAtkRaceCfg
