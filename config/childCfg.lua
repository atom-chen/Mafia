﻿--子嗣配置
local childCfg={
      --quality  子嗣品质  1：笨拙 2：平庸 3：聪慧 4：睿智 5：神童
      --lv  子嗣可升级的最大等级
      --needExp  每级所需经验  第一个值是1升2所需经验
    
    ["1"]={       ----笨拙
        ["quality"]=1,["lv"]=10,["needExp"]={20,20,20,20,20,20,20,20,20},
    },
    ["2"]={       ----平庸
        ["quality"]=2,["lv"]=20,["needExp"]={20,20,20,20,20,20,20,20,20,30,30,30,30,30,40,40,40,40,40},
    },
    ["3"]={       ----聪慧
        ["quality"]=3,["lv"]=30,["needExp"]={20,20,20,20,20,20,20,20,20,30,30,30,30,30,40,40,40,40,40,50,50,50,50,50,60,60,60,60,60},
    },
    ["4"]={       ----睿智
        ["quality"]=4,["lv"]=40,["needExp"]={20,20,20,20,20,20,20,20,20,30,30,30,30,30,40,40,40,40,40,50,50,50,50,50,60,60,60,60,60,70,70,70,70,70,80,80,80,80,80},
    },
    ["5"]={       ----神童
        ["quality"]=5,["lv"]=50,["needExp"]={20,20,20,20,20,20,20,20,20,30,30,30,30,30,40,40,40,40,40,50,50,50,50,50,60,60,60,60,60,70,70,70,70,70,80,80,80,80,80,90,90,90,90,90,100,100,100,100,100},
    },
}
return childCfg
