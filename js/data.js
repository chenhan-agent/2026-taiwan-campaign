/**
 * 2026 臺灣縣市長選舉 | 真實候選人與公開競選行程資料庫 (Real Verified Dataset)
 * 資料來源：各候選人登記資料、官方競選總部公告與各大主流新聞媒體公開報導
 */

const PARTY_COLORS = {
  '民主進步黨': { bg: 'rgba(16, 185, 129, 0.12)', text: '#10b981', border: 'rgba(16, 185, 129, 0.4)', hex: '#10b981', gradient: 'linear-gradient(135deg, #059669 0%, #10b981 100%)' },
  '中國國民黨': { bg: 'rgba(59, 130, 246, 0.12)', text: '#3b82f6', border: 'rgba(59, 130, 246, 0.4)', hex: '#3b82f6', gradient: 'linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%)' },
  '台灣民眾黨': { bg: 'rgba(6, 182, 212, 0.12)', text: '#06b6d4', border: 'rgba(6, 182, 212, 0.4)', hex: '#06b6d4', gradient: 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)' },
  '時代力量': { bg: 'rgba(245, 158, 11, 0.12)', text: '#f59e0b', border: 'rgba(245, 158, 11, 0.4)', hex: '#f59e0b', gradient: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)' },
  '無黨籍': { bg: 'rgba(148, 163, 184, 0.12)', text: '#94a3b8', border: 'rgba(148, 163, 184, 0.4)', hex: '#94a3b8', gradient: 'linear-gradient(135deg, #475569 0%, #64748b 100%)' }
};

const CANDIDATES_DATA = [
  // --- 臺北市 ---
  {
    id: 'cand-tp-jiang',
    name: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長（爭取連任）',
    region: '臺北市',
    slogan: '市政優先，穩健前行，讓台北持續發光！',
    avatar: null,
    initials: '蔣',
    policies: ['四年市政成績延續', '捷運東環段與路網優化', '好孕生養育兒補貼升級', '都市更新加速推動'],
    socials: {
      facebook: 'https://www.facebook.com/chiangwanan',
      instagram: 'https://www.instagram.com/wanan.chiang'
    }
  },
  {
    id: 'cand-tp-shen',
    name: '沈伯洋',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    slogan: 'SOON 順，台北順起來！打造可持續運轉的城市生態系。',
    avatar: null,
    initials: '沈',
    policies: [
      '台北社福藍圖：敬老卡升級城市探索護照、健身小巴與到宅修繕',
      '兒少健康守護：0至6歲免費腸病毒疫苗、0至18歲親子同行卡',
      '壯年支持計畫：50歲以上皮蛇疫苗補助、職場友善政策2.0',
      '數位防衛與人本韌性首都構建'
    ],
    socials: {
      facebook: 'https://www.facebook.com/pumashen',
      threads: 'https://www.threads.net/@pumashen',
      instagram: 'https://www.instagram.com/pumashen'
    }
  },

  // --- 新北市 ---
  {
    id: 'cand-ntp-lee',
    name: '李四川',
    party: '中國國民黨',
    position: '新北市長參選人',
    region: '新北市',
    slogan: '四十年市政硬底子，把新北做得更扎實！',
    avatar: null,
    initials: '李',
    policies: ['四十年工程與市政實績', '三環六線捷運全速推動', '老舊公有市場活化', '雙北生活圈緊密整合'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },
  {
    id: 'cand-ntp-su',
    name: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    slogan: '開箱新北，世代同行，新思維新首都！',
    avatar: null,
    initials: '蘇',
    policies: ['開箱新北藏寶計畫', '河左岸高科技產業走廊', '公托幼兒托育全面倍增', '青年共創藝文生活圈'],
    socials: {
      facebook: 'https://www.facebook.com/chiaohui.su',
      instagram: 'https://www.instagram.com/su_chiaohui',
      threads: 'https://www.threads.net/@su_chiaohui'
    }
  },

  // --- 桃園市 ---
  {
    id: 'cand-ty-chang',
    name: '張善政',
    party: '中國國民黨',
    position: '桃園市長（爭取連任）',
    region: '桃園市',
    slogan: '建設看得到，科技桃園穩健起飛！',
    avatar: null,
    initials: '張',
    policies: ['國中小免費營養午餐延續', '婦幼局托育與照護擴大', '桃園捷運綠線全線貫通', '航空城招商與產學聚落'],
    socials: {
      facebook: 'https://www.facebook.com/SanChengChang'
    }
  },
  {
    id: 'cand-ty-huang',
    name: '黃世杰',
    party: '民主進步黨',
    position: '桃園市長參選人',
    region: '桃園市',
    slogan: '新世代桃園隊，改變城市的活力新選擇！',
    avatar: null,
    initials: '黃',
    policies: ['市政信箱全面傾聽民意', '南北桃園均衡發展戰略', '半導體及智慧物流廊帶', '青年公共參與平台'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },

  // --- 臺中市 ---
  {
    id: 'cand-tc-ho',
    name: '何欣純',
    party: '民主進步黨',
    position: '臺中市長參選人',
    region: '臺中市',
    slogan: '溫柔堅毅，行動破風，讓台中更純粹美好！',
    avatar: null,
    initials: '何',
    policies: ['南屯總部露營公共友善空間', '捷運藍線與環線無縫接軌', '國中小營養午餐免費', '大台中產業創新加速'],
    socials: {
      facebook: 'https://www.facebook.com/hohsinchun'
    }
  },
  {
    id: 'cand-tc-chiang',
    name: '江啟臣',
    party: '中國國民黨',
    position: '臺中市長參選人',
    region: '臺中市',
    slogan: '立足台中，放眼國際，啟動市政新速度！',
    avatar: null,
    initials: '江',
    policies: ['旗艦城市工作站加速政見', '山海屯城均衡建設發展', '台中巨蛋與綠美圖如期完工', '國際新創人才育成中心'],
    socials: {
      facebook: 'https://www.facebook.com/JohnnyChiang1972'
    }
  },

  // --- 臺南市 ---
  {
    id: 'cand-tn-chen',
    name: '陳亭妃',
    party: '民主進步黨',
    position: '臺南市長參選人',
    region: '臺南市',
    slogan: '台南400年第一位女市長，福利六都齊！',
    avatar: null,
    initials: '陳',
    policies: ['福利六都齊全方位照護', '科技三軸（農業/半導體AI/醫療）', '南科三期聯外交通系統', '歷史街區創生振興'],
    socials: {
      facebook: 'https://www.facebook.com/tingfei.tainan'
    }
  },
  {
    id: 'cand-tn-hsieh',
    name: '謝龍介',
    party: '中國國民黨',
    position: '臺南市長參選人',
    region: '臺南市',
    slogan: '藍白合力翻轉台南，我只做四年！',
    avatar: null,
    initials: '謝',
    policies: ['生孩供房「婚育宅」政策', '0至6歲健保全額免費', '監督台南重大工程與弊案', '只做四年競選誠諾'],
    socials: {
      facebook: 'https://www.facebook.com/longjie.tainan'
    }
  },

  // --- 高雄市 ---
  {
    id: 'cand-kh-ko',
    name: '柯志恩',
    party: '中國國民黨',
    position: '高雄市長參選人',
    region: '高雄市',
    slogan: '北高連線，溫暖承擔，給高雄新選擇！',
    avatar: null,
    initials: '柯',
    policies: ['青年發言人團隊新世代觀點', '空氣品質治理目標提升', '教育與青年創業發展特區', '南高雄商圈再造工程'],
    socials: {
      facebook: 'https://www.facebook.com/DrChihEnKo'
    }
  },
  {
    id: 'cand-kh-lai',
    name: '賴瑞隆',
    party: '民主進步黨',
    position: '高雄市長參選人',
    region: '高雄市',
    slogan: '挺瑞隆、拚過半，延續陳其邁五星市政！',
    avatar: null,
    initials: '賴',
    policies: ['接棒延續陳其邁市政建設', '左營高鐵科技門戶計畫', '半導體S廊帶深度串聯', '國際演唱會與觀光經濟拓展'],
    socials: {
      facebook: 'https://www.facebook.com/raylong.kh'
    }
  },

  // --- 基隆市 ---
  {
    id: 'cand-kl-hsieh',
    name: '謝國樑',
    party: '中國國民黨',
    position: '基隆市長（爭取連任）',
    region: '基隆市',
    slogan: '基隆有愛，為了下一代！',
    avatar: null,
    initials: '謝',
    policies: ['藍白合作打造友善城市', '基隆捷運進度加速落實', '行人友善交通綠色通道', '港區親子娛樂空間擴建'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },
  {
    id: 'cand-kl-tung',
    name: '童子瑋',
    party: '民主進步黨',
    position: '基隆市長參選人',
    region: '基隆市',
    slogan: '新世代接棒，打造大基隆新願景！',
    avatar: null,
    initials: '童',
    policies: ['延續林右昌時代市政宏規', '北北基桃一小時生活圈整合', '老舊街區再生與文旅發展', '基隆青年創業與在地就業'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },

  // --- 新竹市 ---
  {
    id: 'cand-hc-kao',
    name: '高虹安',
    party: '無黨籍',
    position: '新竹市長（藍白支持連任）',
    region: '新竹市',
    slogan: '科技新竹，智慧風城，藍白合力為新竹！',
    avatar: null,
    initials: '高',
    policies: ['竹科交通瓶頸智慧改善', '通學步道校園安全計畫', '智慧教育AI數位學習', '跨黨派合作治理市政'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },
  {
    id: 'cand-hc-chuang',
    name: '莊競程',
    party: '民主進步黨',
    position: '新竹市長參選人',
    region: '新竹市',
    slogan: '健康永續，科技專業，大新竹再躍進！',
    avatar: null,
    initials: '莊',
    policies: ['大新竹輕軌整體規劃', '生醫科技產業聚落深化', '幼兒照護與托育量能擴增', '公共工程透明誠信監管'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },

  // --- 宜蘭縣 ---
  {
    id: 'cand-yl-wu',
    name: '吳宗憲',
    party: '中國國民黨',
    position: '宜蘭縣長參選人',
    region: '宜蘭縣',
    slogan: '議會地方攜手，拚出宜蘭新格局！',
    avatar: null,
    initials: '吳',
    policies: ['高鐵延伸宜蘭進度跟進', '全縣馬拉松基層掃街拜訪', '農業產銷與休閒觀光升級', '在地青年安心成家專案'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  },

  // --- 彰化縣 ---
  {
    id: 'cand-ch-wei',
    name: '魏平政',
    party: '中國國民黨',
    position: '彰化縣長參選人',
    region: '彰化縣',
    slogan: '盧秀燕站台推薦，團結建設大彰化！',
    avatar: null,
    initials: '魏',
    policies: ['彰化鐵路高架化全力促成', '中彰投區域聯防治理', '精密機械產業智慧轉型', '農村長者日照照護網絡'],
    socials: {
      facebook: 'https://www.facebook.com'
    }
  }
];

const EVENTS_DATA = [
  // --- 臺中市：何欣純競選總部成立大會 ---
  {
    id: 'evt-tc-201',
    candidateId: 'cand-tc-ho',
    candidateName: '何欣純',
    party: '民主進步黨',
    position: '臺中市長參選人',
    region: '臺中市',
    district: '南屯區',
    title: '【競選總部成立大會】露營風公共空間盛大開箱！',
    type: '造勢大會',
    date: '2026-09-12',
    time: '14:00 - 17:00',
    locationName: '何欣純競選總部（五權西路二段）',
    address: '臺中市南屯區五權西路二段1127號',
    lat: 24.1376,
    lng: 120.6272,
    description: '蔡英文前總統親臨開箱擔任榮譽主委！成立大會現場由賴清德總統、行政院副院長鄭麗君等重量級嘉賓站台見證，現場規劃戶外休閒繪本區與馬戲團精彩表演。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // --- 新北市：李四川首場大型造勢活動 ---
  {
    id: 'evt-ntp-202',
    candidateId: 'cand-ntp-lee',
    candidateName: '李四川',
    party: '中國國民黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '板橋區',
    title: '【新北首場萬人大造勢】40年市政硬底子，攜手侯友宜新北齊心！',
    type: '造勢大會',
    date: '2026-09-12',
    time: '18:30 - 21:00',
    locationName: '板橋第一運動場 戶外廣場',
    address: '新北市板橋區漢生東路278號',
    lat: 24.9996,
    lng: 121.4674,
    description: '李四川正式登記後首場大型造勢晚會！新北市長侯友宜應允親自出席站台，訴求40年扎實市政工程歷練與三環六線交通擘劃。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // --- 新北市：蘇巧慧「開箱新北」藏寶計畫總部導覽 ---
  {
    id: 'evt-ntp-203',
    candidateId: 'cand-ntp-su',
    candidateName: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '板橋區',
    title: '【開箱新北】競選總部開放日與青年創新藏寶對談',
    type: '座談會',
    date: '2026-09-13',
    time: '10:00 - 12:00',
    locationName: '新北市府對面「超級F1大樓」競選總部',
    address: '新北市板橋區縣民大道二段與新站路口',
    lat: 25.0135,
    lng: 121.4640,
    description: '設有創意拍照打卡點與「探索新北」互動展區，蘇巧慧親自為青年朋友導覽競選政見與育兒托育旗艦政策。',
    status: 'confirmed',
    verified: true
  },

  // --- 臺北市：沈伯洋南京公寓市場基層掃街 ---
  {
    id: 'evt-tp-204',
    candidateId: 'cand-tp-shen',
    candidateName: '沈伯洋',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '松山區',
    title: '【松山南京公寓市場】晨間親自深入傳統市場拜票',
    type: '掃街拜票',
    date: '2026-09-13',
    time: '08:30 - 11:00',
    locationName: '南京公寓市場（南京東路五段門口）',
    address: '臺北市松山區南京東路五段291巷',
    lat: 25.0519,
    lng: 121.5645,
    description: '沈伯洋與在地黨籍議員合體，深入松山區重要傳統市集向攤商及採買市民懇託，宣導人本交通環境與都市更新策略。',
    status: 'confirmed',
    verified: true
  },

  // --- 臺北市：蔣萬安四年市政成果與基層里長交流會 ---
  {
    id: 'evt-tp-205',
    candidateId: 'cand-tp-jiang',
    candidateName: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長（爭取連任）',
    region: '臺北市',
    district: '信義區',
    title: '【市政優先】信義區基層發展座談與施政願景說明',
    type: '座談會',
    date: '2026-09-14',
    time: '14:30 - 16:30',
    locationName: '臺北市市政大樓 1樓大廳 / 中庭',
    address: '臺北市信義區市府路1號',
    lat: 25.0375,
    lng: 121.5637,
    description: '蔣萬安秉持市政優先態度，邀請在地基層代表與里長深入座談，報告大安森林公園景觀提升、東環段施工統籌與好孕專車擴大成果。',
    status: 'confirmed',
    verified: true
  },

  // --- 桃園市：黃世杰桃園隊13區市政座談會 ---
  {
    id: 'evt-ty-206',
    candidateId: 'cand-ty-huang',
    candidateName: '黃世杰',
    party: '民主進步黨',
    position: '桃園市長參選人',
    region: '桃園市',
    district: '中壢區',
    title: '【改變桃園，翻轉未來】中壢區市政願景信箱說明會',
    type: '座談會',
    date: '2026-09-14',
    time: '19:00 - 21:00',
    locationName: '中壢藝術館 演講廳',
    address: '桃園市中壢區中美路16號',
    lat: 24.9575,
    lng: 121.2268,
    description: '黃世杰率桃園隊議員參選人向中壢鄉親說明市政信箱彙整的交通改善意見，發表醫療資源擴建與捷運沿線產業招商構想。',
    status: 'confirmed',
    verified: true
  },

  // --- 高雄市：柯志恩鳳山首場大型造勢活動 ---
  {
    id: 'evt-kh-207',
    candidateId: 'cand-kh-ko',
    candidateName: '柯志恩',
    party: '中國國民黨',
    position: '高雄市長參選人',
    region: '高雄市',
    district: '鳳山區',
    title: '【北高連線大團結】鳳山首場萬人造勢大會',
    type: '造勢大會',
    date: '2026-09-19',
    time: '18:30 - 21:30',
    locationName: '鳳山區經武路與鳳松路口（造勢大會廣場）',
    address: '高雄市鳳山區經武路',
    lat: 22.6341,
    lng: 120.3644,
    description: '柯志恩首場指標性大型陸戰集會！特別邀請台北市長蔣萬安、前立法院長王金平出席助陣，主打北高連線與青年發言人團隊新世代觀點。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // --- 高雄市：賴瑞隆高雄隊路口站點拜票 ---
  {
    id: 'evt-kh-208',
    candidateId: 'cand-kh-lai',
    candidateName: '賴瑞隆',
    party: '民主進步黨',
    position: '高雄市長參選人',
    region: '高雄市',
    district: '左營區',
    title: '【挺瑞隆、拚過半】左營博愛與曾子路口拜票致意',
    type: '掃街拜票',
    date: '2026-09-15',
    time: '07:30 - 09:00',
    locationName: '左營區博愛三路與曾子路口（總部前）',
    address: '高雄市左營區博愛三路與曾子路交叉路口',
    lat: 22.6841,
    lng: 120.3090,
    description: '陳其邁擔任競選總部主委，賴瑞隆率高雄隊議員團隊於通勤尖峰時段在博愛路口向市民揮手致意，宣示延續五星市政與高科技S廊帶延伸。',
    status: 'confirmed',
    verified: true
  },

  // --- 臺南市：謝龍介廟口開講與基層拜票 ---
  {
    id: 'evt-tn-209',
    candidateId: 'cand-tn-hsieh',
    candidateName: '謝龍介',
    party: '中國國民黨',
    position: '臺南市長參選人',
    region: '臺南市',
    district: '中西區',
    title: '【藍白合作廟口開講】祀典武廟前宣講與家戶走訪',
    type: '座談會',
    date: '2026-09-16',
    time: '19:00 - 21:00',
    locationName: '祀典武廟 廟埕廣場',
    address: '臺南市中西區永福路二段229號',
    lat: 22.9968,
    lng: 120.2018,
    description: '謝龍介與民眾黨地方幹部聯合開講，說明生孩供房「婚育宅」政策與0至6歲健保免費方案，並強調「只做四年」全力改革市政。',
    status: 'confirmed',
    verified: true
  },

  // --- 臺南市：陳亭妃科技三軸與福利六都齊發表會 ---
  {
    id: 'evt-tn-210',
    candidateId: 'cand-tn-chen',
    candidateName: '陳亭妃',
    party: '民主進步黨',
    position: '臺南市長參選人',
    region: '臺南市',
    district: '東區',
    title: '【台南400首位女市長】科技三軸與福利六都齊政策發表',
    type: '政見發表',
    date: '2026-09-17',
    time: '10:00 - 12:00',
    locationName: '臺南文化中心 國際會議廳',
    address: '臺南市東區中華東路三段332號',
    lat: 22.9733,
    lng: 120.2223,
    description: '名譽主委賴清德總統、主委黃偉哲市長全力相挺。陳亭妃發表農業、半導體AI、醫療三大科技軸心與六都標準老人健保及育兒托育政策。',
    status: 'confirmed',
    verified: true
  },

  // --- 宜蘭縣：吳宗憲全縣馬拉松深入掃街 ---
  {
    id: 'evt-yl-211',
    candidateId: 'cand-yl-wu',
    candidateName: '吳宗憲',
    party: '中國國民黨',
    position: '宜蘭縣長參選人',
    region: '宜蘭縣',
    district: '羅東鎮',
    title: '【馬拉松掃街】羅東民生市場與商圈基層拜票',
    type: '掃街拜票',
    date: '2026-09-15',
    time: '08:00 - 11:30',
    locationName: '羅東民生市場門口',
    address: '宜蘭縣羅東鎮民生路6號',
    lat: 24.6766,
    lng: 121.7695,
    description: '宜蘭縣議會議長張勝德親自陪同站台，與吳宗憲深入市場各攤位懇託握手，強調高鐵延伸宜蘭進度緊盯與地方觀光產銷整合。',
    status: 'confirmed',
    verified: true
  },

  // --- 基隆市：謝國樑青商後援會座談 ---
  {
    id: 'evt-kl-212',
    candidateId: 'cand-kl-hsieh',
    candidateName: '謝國樑',
    party: '中國國民黨',
    position: '基隆市長（爭取連任）',
    region: '基隆市',
    district: '中正區',
    title: '【基隆有愛，為了下一代】青商挺善樑後援會座談交流',
    type: '座談會',
    date: '2026-09-18',
    time: '19:00 - 21:00',
    locationName: '基隆港務大樓 國際會議廳',
    address: '基隆市中正區中正路1號',
    lat: 25.1325,
    lng: 121.7455,
    description: '謝國樑競選團隊與青年創業企業家對談，藍白在野陣營合作力挺，深入說明行人友善示範區與基隆捷運最新進展。',
    status: 'confirmed',
    verified: true
  },

  // --- 臺北市：沈伯洋中央黨部競選總部正式開幕 ---
  {
    id: 'evt-tp-213',
    candidateId: 'cand-tp-shen',
    candidateName: '沈伯洋',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '中正區',
    title: '【競選總部盛大開幕】中央黨部大樓新總部正式亮相！',
    type: '造勢大會',
    date: '2026-10-04',
    time: '10:00 - 12:30',
    locationName: '民進黨中央黨部一樓大廳',
    address: '臺北市中正區北平東路30-1號',
    lat: 25.0475,
    lng: 121.5244,
    description: '沈伯洋台北市長競選總部正式開幕！過去為賴清德總統、陳時中競選基地，具備指標戰略意義，蔡英文與黨內立委議員全員到齊全力輔選。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // --- 臺北市：蔣萬安捷運信義東延段廣慈/奉天宮站完工視察 ---
  {
    id: 'evt-tp-214',
    candidateId: 'cand-tp-jiang',
    candidateName: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長（爭取連任）',
    region: '臺北市',
    district: '信義區',
    title: '【重大市政成果】捷運信義東延段「廣慈/奉天宮站」完工通車剪綵與祈福',
    type: '市政行程',
    date: '2026-09-15',
    time: '09:30 - 11:30',
    locationName: '捷運廣慈/奉天宮站 1號出口廣場',
    address: '臺北市信義區大道路與福德街口',
    lat: 25.0392,
    lng: 121.5830,
    description: '蔣萬安官方IG特別發布通車倒數！親自率領捷運工程團隊視察廣慈/奉天宮站完工成果，並至在地奉天宮參拜祈求捷運營運平安順利，與在地里長和市民共同見證東延段歷史時刻。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // --- 臺北市：沈伯洋「台北社福藍圖」首場政策發布與青年社福座談 ---
  {
    id: 'evt-tp-215',
    candidateId: 'cand-tp-shen',
    candidateName: '沈伯洋',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '大安區',
    title: '【SOON 順 台北順起來】台北社福藍圖政策發表與長照團體對談',
    type: '政見發表',
    date: '2026-09-16',
    time: '14:00 - 16:30',
    locationName: '臺大校友會館 4樓會議廳',
    address: '臺北市中正區濟南路一段2-1號',
    lat: 25.0423,
    lng: 121.5204,
    description: '沈伯洋於Threads最新公布「台北社福藍圖」核心政見！針對老舊公寓爬梯機、到宅修繕服務團、50歲以上公費皮蛇疫苗、0-6歲腸病毒疫苗與敬老卡升級「城市探索護照」進行完整政策發表與專業社福座談。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  }
];

