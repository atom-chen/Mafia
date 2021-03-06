var App;
(function (App) {
    var LoginResLoader;
    (function (LoginResLoader) {
        LoginResLoader.isLoginBgLoaded = false;
        LoginResLoader.isLoginViewResLoaded = false;
        LoginResLoader.isLoginResLoaded = false;
        LoginResLoader.isNeedLoadGuideRes = false;
        LoginResLoader.isDefaultResLoaded = false;
        function checkAndShowLoginView() {
            if (LoginResLoader.isLoginBgLoaded && LoginResLoader.isLoginViewResLoaded) {
                LoginLoading.showBg();
                ViewController.getInstance().openView(ViewConst.BASE.LOGINVIEW);
            }
        }
        LoginResLoader.checkAndShowLoginView = checkAndShowLoginView;
        function loadLoginBgItem() {
            initPlatCfg();
        }
        /**
         * 加载第一步，加载进度条
         */
        function loadLoginBgRes() {
            App.LogUtil.log("startload loginBg");
            StatisticsHelper.reportLoadData(3);
            ResourceManager.loadGroup("loginBg", function () {
                //加载loading背景图完成
                StatisticsHelper.reportLoadData(4);
                App.LogUtil.log("loadcomplete loginBg");
                LoginLoading.show();
                if (PlatformManager.checkIsUseSDK() == false) {
                    loadLoginBgItem();
                }
                StatisticsHelper.reportLoadData(5);
                loadLoginViewRes();
            }, function (event) {
                //加载loading背景进度
            }, LoginResLoader);
        }
        LoginResLoader.loadLoginBgRes = loadLoginBgRes;
        function loadLoginViewRes() {
            App.LogUtil.log("startload loginRes");
            var cnName;
            var languageResKey = PlatformManager.getSpid();
            if (PlatformManager.checkIsLocal()) {
                if (!App.DeviceUtil.isWyw()) {
                    var tmpcnName = App.CommonUtil.getOption("language");
                    if (tmpcnName && RES.hasRes(tmpcnName)) {
                        languageResKey = tmpcnName;
                    }
                }
            }
            if (RES.hasRes(languageResKey)) {
                cnName = languageResKey;
            }
            else {
                cnName = "cn";
            }
            var loadArray = ["loginRes", cnName];
            if (PlatformManager.checkIsKRSp()) {
                var isShow = LocalStorageManager.get("isShowKRAgreement");
                if (!isShow) {
                    loadArray.push("kragreement");
                }
            }
            ResourceManager.loadResources(loadArray, [], function () {
                App.LogUtil.log("loadcomplete loginRes");
                LanguageManager.setData(ResourceManager.getRes(cnName));
                loadLoginViewSoundRes();
            }, function (event) {
                //加载loginview资源进度
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loadLoginViewRes();
            });
        }
        function loadLoginViewSoundRes() {
            ResourceManager.loadGroup("loginSound", function () {
                loginViewResLoadComplete();
            }, function (event) {
                //加载loginview资源进度
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loginViewResLoadComplete();
            });
        }
        function loginViewResLoadComplete() {
            StatisticsHelper.reportLoadData(6);
            if (!LoginResLoader.isLoginViewResLoaded) {
                LoginResLoader.isLoginViewResLoaded = true;
                checkAndShowLoginView();
            }
            //加载loginview资源完成
            GameConfig.loadConfig();
            // loadPublicRes();
        }
        function loadPublicRes() {
            if (LoginResLoader.isLoginResLoaded == true) {
                return;
            }
            StatisticsHelper.reportLoadData(11);
            var resArr = ["preload", "homeRes"];
            ResourceManager.loadResources(resArr, [], function () {
                loadhHomeSoundRes();
            }, function (event) {
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loadPublicRes();
            });
        }
        LoginResLoader.loadPublicRes = loadPublicRes;
        function loadhHomeSoundRes() {
            ResourceManager.loadGroup("homeSound", function () {
                loadExtraPreloadRes();
            }, function (event) {
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginResLoader, function (e) {
                loadExtraPreloadRes();
            });
        }
        function loadExtraPreloadRes() {
            StatisticsHelper.reportLoadData(12);
            if (PlatformManager.checkIsTWBSp()) {
                StatisticsHelper.reportLoadData(13);
                ResourceManager.loadResources(["preload_tw"], [], function () {
                    StatisticsHelper.reportLoadData(14);
                    homeResLoadComplete();
                }, function (event) {
                    var per = event.itemsLoaded / event.itemsTotal;
                    var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                    LoginLoading.setPercentage(per, progressStr);
                }, LoginResLoader, function (e) {
                    loadExtraPreloadRes();
                });
            }
            else {
                homeResLoadComplete();
            }
        }
        function homeResLoadComplete() {
            LoginResLoader.isLoginResLoaded = true;
            if (LoginResLoader.isNeedLoadGuideRes) {
                loadGuideRes();
            }
            else {
                if (LoginManager.isLoginSuccess) {
                    StatisticsHelper.reportLoadData(15);
                    LoginManager.checkAndCreateScene();
                }
                else {
                    LoginManager.waitToCheckLoadGuide = true;
                }
            }
        }
        function loadGuideRes() {
            PlatformManager.analyticsNewGuide(1);
            ResourceManager.loadGroup("rookieRes", function () {
                //加载loginview资源完成
                LoginResLoader.isLoginResLoaded = true;
                LoginManager.checkAndCreateScene();
            }, function (event) {
                //加载loginview资源进度
                var per = event.itemsLoaded / event.itemsTotal;
                var progressStr = event.itemsLoaded + "/" + event.itemsTotal;
                LoginLoading.setPercentage(per, progressStr);
            }, LoginManager);
        }
        function setNeedLoadGuideRes() {
            LoginResLoader.isNeedLoadGuideRes = true;
            if (LoginManager.waitToCheckLoadGuide) {
                LoginManager.waitToCheckLoadGuide = false;
                loadGuideRes();
            }
        }
        LoginResLoader.setNeedLoadGuideRes = setNeedLoadGuideRes;
        function initPlatCfg() {
            PlatCfg.initCfg(function () {
                var loadRes = [];
                if (PlatCfg.loginBg) {
                    loadRes.push(PlatCfg.loginBg);
                }
                if (PlatCfg.loginLogo) {
                    loadRes.push(PlatCfg.loginLogo);
                }
                ResourceManager.loadResources(loadRes, [], function () {
                    if (!App.LoginResLoader.isLoginBgLoaded) {
                        App.LoginResLoader.isLoginBgLoaded = true;
                        App.LoginResLoader.checkAndShowLoginView();
                    }
                }, null, LoginResLoader, function () {
                });
            }, LoginResLoader);
        }
        LoginResLoader.initPlatCfg = initPlatCfg;
        function dispose() {
            LoginResLoader.isNeedLoadGuideRes = false;
        }
        LoginResLoader.dispose = dispose;
        var autoResCfg = [
            "wifeview_namebg", "wifeview_charmicon",
            "wifeview_vigoricon", "wifeview_unlockmask", "wife_listbg",
            "arena_bottom", "wifehalfbg", "wifelookbtn_down", "wifelookbtn",
            "servant_mask", "wifeview_itembg", "wifeview_lockbg", "wifeview_itembg2",
            "wifeview_optbg", "wifeview_bottombg2",
            "wifeview_childicon", "wifeview_vexpicon",
            "wifeview_mask", "wife_btnbg", "wife_give", "wife_love", "wife_skill",
            "wifeview_btnbg", "wifeview_skin", "wifeview_skinmask", "wifeview_skingray",
            "wifeview_skinstar",
            //经营
            "guide_hand",
            "manage_foodname", "manage_goldname", "manage_namebg", "manage_soldiername", "btn_manage_normal_down", "manage_boomtext", "btn_manage_normal", "btn_manage_red", "btn_manage_red_down",
            "arena_bottom",
            "guide_hand", "manage_recoverytxt", "manage_managetxt", "manage_waittime",
            "managebg",
            //门客
            "servant_namebg", "servant_dropBtn", "servant_dropBtn_down", "servant_dropIcon", "servant_namebg",
            "servant_star",
            "servant_cardbg_selected", "servant_topnumbg",
            "servant_lvbg", "servant_starbg",
            //门客详情
            "servant_topresbg", "servant_probigbg", "servant_detailBtn",
            "servant_bottombg", "progress3", "progress3_bg",
            "servant_namebg", "servant_infobg",
            "servant_infoPro1", "servant_infoPro2", "servant_infoPro3", "servant_infoPro4",
            "servant_upgrade_frame", "levelup_lizi", "levelup_lizi_json",
            "servant_mask",
            "servant_alv_namebg", "guide_hand",
            "servant_downbg",
            "servant_attribute1",
            "servant_attribute2",
            "servant_attribute3",
            "servant_attribute4",
            "servant_attributemap",
            "servant_levebg",
            "servant_speciality1",
            "servant_speciality2",
            "servant_speciality3",
            "servant_speciality4",
            "servant_speciality5",
            "servant_speciality6",
            "hold_dinner_box",
            "cityscene",
            "citynpcalliance",
            "citynpcatkrace",
            "citynpcbookroom",
            "citynpcchallenge",
            "citynpcconquest",
            "citynpcdailyboss",
            "citynpcdinner",
            "citynpcpalace",
            "citynpcprison",
            "citynpcrank",
            "citynpcsearch",
            "citynpcstudyatk",
            "citynpctrade",
            "challenge_pass",
            "progress4", "progress7_bg",
            "promotion_officerbg1",
            "channel_bg",
            "channel_light",
            "channel_knife",
            "battle_boss",
            "challenge_icon_force",
            "challenge_arrow",
            "challenge_icon_power",
            "office_fnt",
            "challenge_story_bg",
            "challenge_top_bg",
            "btn_challenge_auto",
            "mainui_fg", "challenge_bg1",
            "hero_anim_1",
            "npc_anim_1",
            "battlebg",
            ButtonConst.BATTLE_START_BTN_1,
            "exp_progress_bg",
            "battle_dot_none",
            "battle_dot_full",
            "battle_hero_bar",
            "battle_info_bg",
            "battle_npc_bar",
            "battle_luanz",
            "promotion_officerbg1",
            "atkrace_skip",
            "rechargetitlebg",
            "recharge_fnt",
            "rechargeview_greenarrow",
            "rechargevie_topbar",
            "common_left_bg",
            "common_9_bg",
            "rechargevie_close",
            "rechargevie_down",
            "rechargevie_open",
            "achievement_state3",
            "servant_topresbg",
            "progress7",
            "progress7_bg",
            "itemeffect",
            "rechargevie_btn",
            "rechargevie_btn_down",
            "rechargevie_receivebtn_down",
            "rechargevie_receivebtn",
            "rechargevie_received",
            "rechargevie_receiveImg",
            "rechargevie_effects",
            "recharge_discount_left",
            "recharge_discount_right",
            "btn_small_orange_down",
            "btn_small_orange",
            "recharge2big",
            "recharge4",
            "rechargelistimg",
            "recharges2mall",
            "rechargetitlenewbg",
            "recharge2_fnt",
            "rechargetitlle",
            "gov_icon", "gov_img1", "promotion_officerbg1",
            "progress3", "progress3_bg",
            "affairview_bg",
            "affairview_mark",
            "affairview_zibg",
            "affairview_zibg2",
            "affairview_zhuozi",
            "firstrecharge_bottom", "firstrecharge2_bg", "firstrecharge_font", "firstrechargemask_bg",
            "common_9_bg", "common_left_bg", "welfare_line",
            "signin_had_get", "welfare_hasbuy", "itemeffect", "monthcard_bigicon", "yearcard_bigicon",
            "godbless_bookRoom", "godbless_child", "godbless_manage", "godbless_rank", "godbless_servantLv", "godbless_wife",
            "signin2_bg", "signin3_bg", "rechargebox_bg1", "rechargebox_bg2", "rechargebox_bg", "dinner_gems_1", "unlock_challenge_skip",
            "itemeffect", "funtionbottom",
            "progress6_bg", "dinner_rankbg", "dinnerrankpopupview", "dinner_rank_titlebg", "achievement_state3",
            "common_titlebg", "signin_had_get",
            "dailytask_topbg", "dailytask_icon1", "dailytask_topbg", "progress4", "progress4_bg",
            "dailytask_liveness", "dailytask_box1_1", "dailytask_box1_2", "dailytask_box1_3", "dailytask_liveness_numbg",
            "dailytask_arrow", "dailytask_box2_1", "dailytask_box2_2", "dailytask_box2_3",
            "progress6_bg",
            "progress5", "progress3_bg", "progress6", "progress6_bg",
            "achievement_state1", "achievement_state2", "achievement_state3",
            "shopview_bg", "shopview_corner", "shopview_line",
            "servant_bottombg", "common_titlebg", "vipLimit_img",
            "palace_bg", "palace_arrow_left", "palace_arrow_right", "palace_titlebg", "palace_role_shadow",
            "palace_role_empty", "palace_historyBtn", "palace_historyBtn_down", "wifeview_bottombg",
            "user_title_3000", "user_title_3000_2",
            "user_title_3001", "user_title_3001_2",
            "user_title_3002", "user_title_3002_2",
            "user_title_3003", "user_title_3003_2",
            "user_title_3004", "user_title_3004_2",
            "user_title_3005", "user_title_3005_2",
            "palace_rewardbg", "servant_attributemap",
            "palace_editBtn_down", "palace_editBtn",
            "playerview_bg2", "player_frame",
            "playerview_wipbg", "playerview_name_bg", "playerview_powerbg", "playerview_probg",
            "playerview_pro1", "playerview_pro2", "playerview_pro3", "playerview_pro4", "playerview_pro5", "playerview_pro6",
            "playerview_pro_inmg2", "playerview_infobg", "playerview_arrow", "playerview_pro7",
            "progress3", "progress3_bg", "playerview_lvupBtn", "playerview_lvupBtn_down", "playerview_power_img",
            "office_fnt", "playerview_lvup_word", "servant_mask",
            "childview_bg", "childview_girlicon",
            "childview_boyicon", "childview_mask", "childview_pic_1", "childview_powar", "childview_power2",
            "progress3", "progress3_bg", "servant_probigbg", "childview_expup", "childview_levelup",
            "servant_upgrade_frame", "levelup_lizi", "levelup_lizi_json",
            "childview_addicon", "childview_bg1", "childview_bg2", "childview_bg3", "childview_itembg", "childview_namebg1", "childview_namebg2",
            "childview_newbg", "servant_attributemap", "servant_downbg", "servant_levebg",
            "servant_attribute1",
            "servant_attribute2",
            "servant_attribute3",
            "servant_attribute4",
            "servant_attributemap",
            "bookroom_batch", "bookroom_bg", "bookroom_cdbg", "bookroom_desk",
            "bookroom_tipbg", "bookroom_visitIcon", "forpeople_bottom", "bookroom_visitIcon_down",
            "dailybossview", "dailybossbg",
            "promotion_officerbg1", "progress8", "progress7_bg",
            "boss_start_war",
            "boss_start_war_down",
            "dailyboss_kaopao",
            "dailybossbattle_more", "dailybossbattle_more_down",
            "rank_1", "rank_2", "rank_3", "rank_display_namebg", "rank_line",
            "rank_select_mask", "servant_bottombg", "wifeview_bottombg", "rank_visited",
            "prisonview_bg",
            "prisonview_progress",
            "progress3_bg",
            "prisonview_font",
            "prisonview_redx",
            "prisonview_itembg",
            "prisonview_small_bg",
            "searchbinfowifebg",
            "prisonview_namebg",
            "prison_head1",
            "prison_head2",
            "prison_body",
            "prison_bottom",
            "tokenAnimation",
            "punish_ani1", "punish_ani2", "punish_ani3", "punish_ani4", "punish_light",
            "prisonview_bg_2",
            "prison_head1_2",
            "prison_head2_2",
            "forpeople_top",
            "prisonview_font_2",
            "searchbg1",
            "progress3",
            "common_buttombigbg",
            "rankinglist_rankbg",
            "rankinglist_line",
            "arena_bg", "forpeople_bottom", "arena_bottom", "atkrace_morale",
            "arena_arrow", "arena_bottom_bg", "arena_more_down", "arena_more", "arena_rank", "arena_rank_text", "arena_visit", "arena_visit_text",
            "servant_mask",
            "dinner_bg",
            "dinner_black_circle",
            "dinner_desk1",
            "dinner_desk2",
            "dinner_drum",
            "dinner_exchange",
            "dinner_message",
            "dinner_name_bg1",
            "dinner_name_bg2",
            "dinner_rank",
            "dinner_tip",
            "dinner_waitress",
            "dinner_roof",
            "wifeview_bottombg",
            "dinner_rank_titlebg",
            "dinner_line",
            "alliance_bg1", "alliance_attbg", "alliance_level", "alliance_noticebg", "recharge_fnt",
            "alliance_notice", "arena_bottom",
            "arena_arrow", "arena_bottom_bg", "arena_more_down", "arena_more",
            "alliance_manageicon", "alliance_manage", "alliance_buildicon",
            "alliance_build", "alliance_memicon", "alliance_mem", "alliance_exicon",
            "alliance_ex", "alliance_bossicon", "alliance_boss", "allianc_rankicon", "alliance_rank",
            "alliance_iconbg", "dinner_rank_titlebg", "dinner_line", "progress9", "progress9_bg",
            "rankinglist_line", "rankinglist_rankbg", "story_npc_8",
            "studyatk_table", "studyatk_bg1", "wifeview_bottombg", "studyatk_book",
            "forpeople_bottom", "studyatk_master_bg", "studyatk_master", "studyatk_pkBtn", "studyatk_pkBtn_down",
            "studyatk_table_npc", "studyatk_book_name",
            "atkrace_battle_info", "arena_bg", "battle_attack_anim",
            ProgressBarConst.IMAGE_PROGRESS_EXP, ProgressBarConst.IMAGE_PROGRESS_EXP_Bg,
            "conquest_cellbg",
            "promotion_officerbg1",
            "channel_bg",
            "channel_light",
            "channel_knife",
            "challenge_icon_force",
            "challenge_top_bg",
            "mainui_topresbg",
            "progress4", "progress7_bg",
            "mainui_fg",
            "npc_anim_1",
            "conquest_fightbg",
            ButtonConst.BATTLE_START_BTN_1,
            "exp_progress_bg",
            "battle_hero_bar",
            "battle_info_bg",
            "battle_npc_bar",
            "battle_luanz",
            "promotion_officerbg1",
            "trade_bg", "forpeople_bottom", "trade_tanlBtn", "trade_tanlBtn_down", "studyatk_master_bg",
            "trade_ship1", "trade_ship2", "trade_ship3", "trade_pb_bottombg",
            "trade_port1", "trade_port2", "trade_port3", "trade_port4", "trade_port5", "servant_infoPro2",
            "trade_arrow", "trade_bottombg", "trade_bottomnumbg", "trade_namebg_gray", "trade_namebg_red",
            "trade_bg2",
        ];
        var loadItemIndex = -1;
        var maxResNum = autoResCfg.length;
        /**
         * 单线程静默加载文件
         */
        function autoLoadNextResItem() {
            loadItemIndex++;
            if (loadItemIndex < maxResNum) {
                if (autoResCfg[loadItemIndex]) {
                    var resKey = autoResCfg[loadItemIndex];
                    ResourceManager.loadItem(resKey, autoLoadNextResItem, this);
                }
                else {
                    App.LogUtil.log("缺少" + autoResCfg[loadItemIndex]);
                    autoLoadNextResItem();
                }
            }
        }
        LoginResLoader.autoLoadNextResItem = autoLoadNextResItem;
    })(LoginResLoader = App.LoginResLoader || (App.LoginResLoader = {}));
})(App || (App = {}));
