﻿--门客基础配置
local servantBaseCfg={
    -- 门客升级所需银两 第一个值是1升2所需银两
    upgradeNeed={100,159,228,310,408,525,664,828,1020,1243,1500,1794,2128,2505,2928,3400,3924,4503,5140,5838,6600,7429,8328,9300,10348,11475,12684,13978,15360,16833,18400,20064,21828,23695,25668,27750,29944,32253,34680,37228,39900,42699,45628,48690,51888,55225,58704,62328,66100,70023,74100,78334,82728,87285,92008,96900,101964,107203,112620,118218,124000,129969,136128,142480,149028,155775,162724,169878,177240,184813,192600,200604,208828,217275,225948,234850,243984,253353,262960,272808,282900,293239,303828,314670,325768,337125,348744,360628,372780,385203,397900,410874,424128,437665,451488,465600,480004,494703,509700,524998,540600,556509,572728,589260,606108,623275,640764,658578,676720,695193,714000,733144,752628,772455,792628,813150,834024,855253,876840,898788,921100,943779,966828,990250,1014048,1038225,1062784,1087728,1113060,1138783,1164900,1191414,1218328,1245645,1273368,1301500,1330044,1359003,1388380,1418178,1448400,1479049,1510128,1541640,1573588,1605975,1638804,1672078,1705800,1739973,1774600,1809684,1845228,1881235,1917708,1954650,1992064,2029953,2068320,2107168,2146500,2186319,2226628,2267430,2308728,2350525,2392824,2435628,2478940,2522763,2567100,2611954,2657328,2703225,2749648,2796600,2844084,2892103,2940660,2989758,3039400,3089589,3140328,3191620,3243468,3295875,3348844,3402378,3456480,3511153,3566400,3622224,3678628,3735615,3793188,3851350,3910104,3969453,4029400,4294445,4566210,4844788,5130274,5422763,5722350,6029130,6343198,6664649,6993578,7330080,7674250,8026183,8385974,8753718,9129510,9513445,9905618,10306124,10715058,11132515,11558590,11993378,12436974,12889473,13350970,13821560,14301338,14790399,15288838,15796750,16314230,16841373,17378274,17925028,18481730,19048475,19625358,20212474,20809918,21417785,22036170,22665168,23304874,23955383,24616790,25289190,25972678,26667349,27373298,28090620,28819410,29559763,30311774,31075538,31851150,32638705,33438298,34250024,35073978,35910255,36758950,37620158,38493974,39380493,40279810,41192020,42117218,43055499,44006958,44971690,45949790,46941353,47946474,48965248,49997770,51044135,52104438,53178774,54267238,55369925,56486930,57618348,58764274,59924803,61100030,62290050,63494958,64714849,65949818,67199960,68465370,69746143,71042374,72354158,73681590,75024765,76383778,77758724,79149698,80556795,81980110,83419738,84875774,86348313,87837450,89343280,90865898,92405399,93961878,95535430,97126150,98734133,100359474,102002268,103662610,105340595,107036318,108749874,110481358,112230865,113998490,115784328,117588474,119411023,121252070,123111710,124990038,126887149,128803138,130738100,132692130,134665323,136657774,138669578,140700830,142751625,144822058,146912224,149022218,151152135,153302070,155472118,157662374,159872933,162103890,164355340,166627378,168920099,171233598,183567970,196133215,209139333,222796324,237314188,252902925,269772535,288133018,308194374,330166603,354259705,380683680,409648528,441364249,476040843,513888310,555116650,599935863,648555949,701186908,758038740,819321445,885245023,956019474,1031854798,1112960995,1199548065,1291826008,1390004824,1494294513,1604905075,1722046510,1845928818,1976761999,2114756053,2260120980,2413066780,2573803453,2742540999,2919489418,3104858710,3298858875,3501699913,3713591824,3934744608,4165368265,4405672795,4655868198,4916164474,5186771623,5467899645},
    
    -- 门客技能升级所需经验 第一个值是1升2所需经验
    skillUpgradeExp={2,3,4,6,7,8,10,11,13,14,16,18,19,21,23,25,27,29,31,34,36,38,41,43,46,48,51,53,56,59,62,65,68,71,74,77,80,83,87,90,94,97,101,104,108,112,116,120,124,128,132,136,140,144,148,153,157,162,166,171,175,180,185,190,195,200,205,210,215,220,225,231,236,241,247,253,258,264,270,275,281,287,292,298,304,310,316,322,328,334,341,348,355,361,368,375,381,388,395,402,404,411,418,425,433,440,447,455,462,470,477,485,493,500,508,517,526,535,544,554,564,574,584,594,604,614,624,634,644,655,666,677,688,699,710,721,732,743,754,766,778,790,802,814,826,838,850,862,874,887,901,915,929,943,957,971,985,999,1013,1028,1043,1058,1073,1088,1103,1118,1133,1148,1163,1179,1195,1211,1227,1243,1259,1275,1291,1307,1323,1340,1357,1374,1391,1408,1425,1442,1459,1476,1493,1511,1529,1547,1565,1583,1601,1619,1637,1655,1673,1692},
    
    --使用道具，提升门客等级
    --upLv:提升等级上限至X级   门客等级上限
    --needItem:等级提升所需道具
    --reward:等级上限提升，奖励书籍经验
    --abilityLv:资质等级上限
    servantLvList={
        ["0"]={
            ["upLv"]=100,["abilityLv"]=50
        },
        ["1"]={
            ["upLv"]=150,["needItem"]={["1701"]=1,["1702"]=1,["1703"]=1},["reward"]=200,["abilityLv"]=100
        },
        ["2"]={
            ["upLv"]=200,["needItem"]={["1704"]=1,["1705"]=1,["1706"]=1},["reward"]=400,["abilityLv"]=150
        },
        ["3"]={
            ["upLv"]=250,["needItem"]={["1707"]=1,["1708"]=1,["1709"]=1},["reward"]=600,["abilityLv"]=200
        },
        ["4"]={
            ["upLv"]=300,["needItem"]={["1710"]=1,["1711"]=1,["1712"]=1},["reward"]=800,["abilityLv"]=250
        },
        ["5"]={
            ["upLv"]=350,["needItem"]={["1713"]=1,["1714"]=1,["1715"]=1},["reward"]=1000,["abilityLv"]=300
        },
        ["6"]={
            ["upLv"]=400,["needItem"]={["1716"]=1,["1717"]=1,["1718"]=1},["reward"]=1200,["abilityLv"]=350
        },
    },
    
    --门客技能一：增加暴击概率
    skillValue1=0.0035,
    
    --门客技能二：增加暴击伤害
    skillValue2=0.03,
    
    --门客技能等级上限
    skillLvLimit=200,
    
    --属性道具ID
    attItem={"1216","1217","1218","1219","1220","1201","1202","1203","1204","1205","1206","1207","1208","1209","1210","1211","1212","1213","1214","1215"},
    
}
return servantBaseCfg
