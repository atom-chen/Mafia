﻿--疯狂游乐场发送礼包配置
local giftbyFkylcCfg={
      --mail  邮件编号
      --rewards  使用效果
    ["1001"]={    ----进阶礼包
        ["rewards"]="1_1_200|6_1001_1|6_1003_1",
        ["mail"]={
            ["0"]={title="进阶礼包",content="恭喜您获得进阶礼包：元宝*200，银票*1，兵符*1，祝您游戏愉快。"},
        },
    },
    ["1002"]={    ----官人晋升礼包
        ["rewards"]="1_1_200|6_1201_5|6_1020_20",
        ["mail"]={
            ["0"]={title="官人晋升礼包",content="恭喜您获得官人晋升礼包：元宝*200，属性丹*5，书籍经验包*20，祝您游戏愉快！"},
        },
    },
    ["1003"]={    ----官人高升礼包
        ["rewards"]="1_1_600|6_1201_15|6_1020_60",
        ["mail"]={
            ["0"]={title="官人高升礼包",content="恭喜您获得官人高升礼包：元宝*600，属性丹*15，书籍经验包*60，祝您游戏愉快！"},
        },
    },
    ["1004"]={    ----官人飙升礼包
        ["rewards"]="1_1_1000|6_1201_25|6_1020_100",
        ["mail"]={
            ["0"]={title="官人飙升礼包",content="恭喜您获得官人飙升礼包：元宝*1000，属性丹*25，书籍经验包*100，祝您游戏愉快！"},
        },
    },
}
return giftbyFkylcCfg