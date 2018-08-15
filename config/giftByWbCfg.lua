﻿--玩吧礼包配置
local giftByWbCfg={
      --limit  限制类型  1：只可领1次  2：每日重置   3：每周重置
      --isSpecial  积分礼包标记  1：积分礼包
      --needDay  所需流失天数  大于needDay
      --reward  礼包内容
    
    ["101"]={       ----新手礼包----1次
        ["limit"]=1,["reward"]="1_1_200|6_1001_1|6_1003_1",
    },
    ["201"]={       ----周一礼包----每周
        ["limit"]=3,["reward"]="6_1206_1|6_1001_1|6_1003_1",
    },
    ["202"]={       ----周二礼包----每周
        ["limit"]=3,["reward"]="6_1207_1|6_1001_1|6_1003_1",
    },
    ["203"]={       ----周三礼包----每周
        ["limit"]=3,["reward"]="6_1208_1|6_1001_1|6_1003_1",
    },
    ["204"]={       ----周四礼包----每周
        ["limit"]=3,["reward"]="6_1209_1|6_1001_1|6_1003_1",
    },
    ["205"]={       ----周五礼包----每周
        ["limit"]=3,["reward"]="6_1210_1|6_1001_1|6_1003_1",
    },
    ["206"]={       ----周六礼包----每周
        ["limit"]=3,["reward"]="6_1201_1|6_1001_2|6_1002_2",
    },
    ["207"]={       ----周日礼包----每周
        ["limit"]=3,["reward"]="6_1201_1|6_1002_2|6_1003_2",
    },
    ["301"]={       ----QQ空间专属礼包----1次
        ["limit"]=1,["reward"]="1_1_300|6_1353_1|6_1351_1",
    },
    ["401"]={       ----VIP1礼包----每日
        ["limit"]=2,["reward"]="6_1020_1|6_1212_1|6_1213_1",
    },
    ["402"]={       ----VIP2礼包----每日
        ["limit"]=2,["reward"]="6_1020_1|6_1212_2|6_1213_2",
    },
    ["403"]={       ----VIP3礼包----每日
        ["limit"]=2,["reward"]="6_1020_1|6_1212_3|6_1213_3",
    },
    ["404"]={       ----VIP4礼包----每日
        ["limit"]=2,["reward"]="6_1020_1|6_1206_1|6_1212_3|6_1213_3",
    },
    ["405"]={       ----VIP5礼包----每日
        ["limit"]=2,["reward"]="6_1020_1|6_1206_1|6_1212_4|6_1213_4",
    },
    ["406"]={       ----VIP6礼包----每日
        ["limit"]=2,["reward"]="6_1020_1|6_1206_1|6_1207_1|6_1208_1",
    },
    ["501"]={       ----积分礼包--100----每日
        ["limit"]=2,["isSpecial"]=1,["reward"]="6_1004_1|6_1353_5|6_1351_5",
    },
    ["502"]={       ----积分礼包--200----每日
        ["limit"]=2,["isSpecial"]=1,["reward"]="6_1004_2|6_1354_5|6_1352_5",
    },
    ["601"]={       ----元旦礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["602"]={       ----春节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["603"]={       ----元宵礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["604"]={       ----情人节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["605"]={       ----妇女节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["606"]={       ----青年节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["607"]={       ----清明礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["608"]={       ----劳动节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["609"]={       ----端午节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["610"]={       ----儿童节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["611"]={       ----中秋节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["612"]={       ----重阳节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["613"]={       ----七夕礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["614"]={       ----国庆节礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1005_1|6_1006_1",
    },
    ["888"]={       ----流失召回礼包-超过7天未上线的用户，每个用户仅可领取1次----1次
        ["limit"]=1,["needDay"]=7,["reward"]="1_1_300|6_1201_10|6_1001_10|6_1003_10",
    },
    ["2999"]={       ----新春官人礼包-活动期间，每个用户每日可领取1次----1次
        ["limit"]=1,["reward"]="1_1_100|6_1301_1|6_1302_1|6_1303_1",
    },
    ["990"]={       ----小游戏节日礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1021_1",
    },
    ["1999"]={       ----小游戏星级礼包----1次
        ["limit"]=1,["reward"]="1_1_100|6_1201_1|6_1029_1",
    },
}
return giftByWbCfg
