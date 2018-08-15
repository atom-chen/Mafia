local config =
{
    z1 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_1'},
        redis={host = '127.0.0.1', port = 15101},
        scheduleJob={host = '127.0.0.1', port = 11300},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '127.0.0.1', port = 15001},
    },
    z2 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_2'},
        redis={host = '127.0.0.1', port = 15102},
        scheduleJob={host = '127.0.0.1', port = 11302},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '127.0.0.1', port = 15002},
    },
    z3 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_3'},
        redis={host = '127.0.0.1', port = 15103},
        scheduleJob={host = '127.0.0.1', port = 11303},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '127.0.0.1', port = 15003},
    },
    z4 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_4'},
        redis={host = '127.0.0.1', port = 15104},
        scheduleJob={host = '127.0.0.1', port = 11304},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '127.0.0.1', port = 15004},
    },
    z5 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_5'},
        redis={host = '127.0.0.1', port = 15101},
        scheduleJob={host = '127.0.0.1', port = 11300},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '192.168.8.84', port = 15001},
    },
    z6 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_6'},
        redis={host = '127.0.0.1', port = 15102},
        scheduleJob={host = '127.0.0.1', port = 11302},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '192.168.8.84', port = 15002},
    },
    z7 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_7'},
        redis={host = '127.0.0.1', port = 15103},
        scheduleJob={host = '127.0.0.1', port = 11303},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '192.168.8.84', port = 15003},
    },
    z8 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_8'},
        redis={host = '127.0.0.1', port = 15104},
        scheduleJob={host = '127.0.0.1', port = 11304},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3002&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '192.168.8.84', port = 15004},
    },
    z1000 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_1000'},
        redis={host = '127.0.0.1', port = 15105},
        scheduleJob={host = '127.0.0.1', port = 11309},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3005&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '127.0.0.1', port = 15005},
    },
    z2000 = {
        mysql={user = 'root', password = '', host = '127.0.0.1', port = 3307,db='gt_2000'},
        redis={host = '127.0.0.1', port = 15109},
        scheduleJob={host = '127.0.0.1', port = 11309},
        logpath = '/opt/tankserver/service/tank-gameserver/log/',
        kafkapath = '10.135.160.178:9092',
        chatUrl = 'http://127.0.0.1/tank-server/public/index.php/api/im/wssend?port=3005&',
        tankglobalUrl = 'http://192.168.8.82/tank-global/index.php/',
        giftCenterUrl = 'http://192.168.8.82/tank-global/index.php/',
        server={host = '127.0.0.1', port = 15009},
    }
}
return config