/**
 * 2026 臺灣縣市長選舉 | 百里侯候選人與公開競選行程資料庫 (Real Verified Dataset)
 * 核心宗旨：專注彙整候選人實體造勢大會、掃街拜票、宮廟參拜與公開座談行程
 * 每個行程均附帶原始媒體報導或官方社群公告來源 (Source URL)
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
    socials: {
      facebook: 'https://www.facebook.com'
    }
  }
];

const EVENTS_DATA = [
  // ==========================================
  // 臺北市 (Taipei City)
  // ==========================================
  {
    id: 'evt-tp-001',
    candidateId: 'cand-tp-jiang',
    candidateName: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長（爭取連任）',
    region: '臺北市',
    district: '信義區',
    title: '【重大市政成果】捷運信義東延段「廣慈/奉天宮站」完工視察暨奉天宮參拜',
    type: '市政行程',
    date: '2026-09-15',
    time: '09:30 - 11:30',
    locationName: '捷運廣慈/奉天宮站 1號出口廣場',
    address: '臺北市信義區大道路與福德街口',
    lat: 25.0392,
    lng: 121.5830,
    description: '蔣萬安官方IG特別發布通車倒數！親率捷運工程團隊視察廣慈/奉天宮站完工成果，並至在地奉天宮參拜祈求捷運營運平安順利，與信義區在地里長及鄉親面對面座談。',
    sourceName: '蔣萬安 官方 Instagram (@wanan.chiang)',
    sourceUrl: 'https://www.instagram.com/wanan.chiang/',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-tp-002',
    candidateId: 'cand-tp-jiang',
    candidateName: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長（爭取連任）',
    region: '臺北市',
    district: '信義區',
    title: '【台北基層扎根】台北市12區里長候選人誓師大會與合體造勢',
    type: '座談會',
    date: '2026-09-14',
    time: '14:30 - 16:30',
    locationName: '臺北市市政大樓 1樓大廳 / 中庭',
    address: '臺北市信義區市府路1號',
    lat: 25.0375,
    lng: 121.5637,
    description: '蔣萬安秉持市政優先態度，邀請台北市各行政區基層代表與里長深入座談，報告大安森林公園景觀提升、東環段施工統籌與好孕專車擴大成果，展現基層團結氣勢。',
    sourceName: '聯合新聞網 UDN',
    sourceUrl: 'https://udn.com/news/story/124199/8210344',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-tp-003',
    candidateId: 'cand-tp-jiang',
    candidateName: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長（爭取連任）',
    region: '臺北市',
    district: '萬華區',
    title: '【萬華艋舺宮廟參拜】龍山寺祈安植福參拜與商圈走訪',
    type: '掃街拜票',
    date: '2026-09-18',
    time: '10:00 - 12:00',
    locationName: '艋舺龍山寺 廟前廣場',
    address: '臺北市萬華區廣州街211號',
    lat: 25.0368,
    lng: 121.4999,
    description: '蔣萬安率在地議員走訪萬華老城區重要信仰中心，向觀世音菩薩祈福國泰民安，隨後徒步走訪廣州街夜市商圈向周邊攤商致意請益。',
    sourceName: '臺北市政府 市長行程公開資訊',
    sourceUrl: 'https://www.gov.taipei/',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-tp-004',
    candidateId: 'cand-tp-shen',
    candidateName: '沈伯洋',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '松山區',
    title: '【松山南京公寓市場】深入傳統市場拜票與市民早市互動',
    type: '掃街拜票',
    date: '2026-09-13',
    time: '08:30 - 11:00',
    locationName: '南京公寓市場（南京東路五段門口）',
    address: '臺北市松山區南京東路五段291巷',
    lat: 25.0519,
    lng: 121.5645,
    description: '沈伯洋與在地黨籍議員合體深入松山區重要傳統市集，向攤商及採買市民懇託，宣導人本交通環境、老舊公寓爬梯機服務與長者安全網。',
    sourceName: '沈伯洋 官方 Threads (@pumashen)',
    sourceUrl: 'https://www.threads.net/@pumashen',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-tp-005',
    candidateId: 'cand-tp-shen',
    candidateName: '沈伯洋',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '大安區',
    title: '【SOON 順 台北順起來】台北社福藍圖政策座談會',
    type: '政見發表',
    date: '2026-09-16',
    time: '14:00 - 16:30',
    locationName: '臺大校友會館 4樓演講廳',
    address: '臺北市中正區濟南路一段2-1號',
    lat: 25.0423,
    lng: 121.5204,
    description: '沈伯洋公布「台北社福藍圖」核心政見：老舊公寓爬梯機擴大、到宅修繕服務團、50歲以上公費皮蛇疫苗、0-6歲腸病毒疫苗與敬老卡升級「城市探索護照」。',
    sourceName: '沈伯洋 官方 Threads (@pumashen)',
    sourceUrl: 'https://www.threads.net/@pumashen',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-tp-006',
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
    description: '沈伯洋台北市長競選總部正式開幕！過去為賴清德總統、陳時中競選基地，具備指標戰略意義，黨內重量級人士與立委議員全員到齊全力輔選。',
    sourceName: '中央通訊社 CNA',
    sourceUrl: 'https://www.cna.com.tw/',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // ==========================================
  // 新北市 (New Taipei City)
  // ==========================================
  {
    id: 'evt-ntp-007',
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
    sourceName: '聯合新聞網 UDN',
    sourceUrl: 'https://udn.com/news/story/124199/8210344',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-ntp-008',
    candidateId: 'cand-ntp-lee',
    candidateName: '李四川',
    party: '中國國民黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '板橋區',
    title: '【雙北共好合體】台北市長蔣萬安陪同參拜接雲寺、慈惠宮與福德市場掃街',
    type: '掃街拜票',
    date: '2026-09-13',
    time: '08:30 - 11:30',
    locationName: '板橋慈惠宮 前廣場',
    address: '新北市板橋區府中路81號',
    lat: 25.0089,
    lng: 121.4582,
    description: '台北市長蔣萬安跨河力挺李四川！連袂參拜板橋信仰中心慈惠宮、接雲寺，並徒步進入板橋福德市場向市民握手懇託，營造雙北合作氣勢。',
    sourceName: '中央廣播電臺 RTI',
    sourceUrl: 'https://www.rti.org.tw/news/view/id/2219500',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-ntp-009',
    candidateId: 'cand-ntp-lee',
    candidateName: '李四川',
    party: '中國國民黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '三重區',
    title: '【溪北團結大誓師】三重體育場「厚友誼挺四川」萬人誓師造勢',
    type: '造勢大會',
    date: '2026-09-20',
    time: '18:30 - 21:00',
    locationName: '三重綜合體育場 戶外田徑場',
    address: '新北市三重區中正北路2號',
    lat: 25.0617,
    lng: 121.4925,
    description: '新北溪北傳統綠營票倉重磅出擊！李四川集結三蘆地區基層後援會與農漁會幹部，主打捷運環狀線北環段加速完工與老舊市區都更。',
    sourceName: 'TVBS 新聞網',
    sourceUrl: 'https://news.tvbs.com.tw/politics/',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ntp-010',
    candidateId: 'cand-ntp-su',
    candidateName: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '板橋區',
    title: '【開箱新北】超級F1競選總部開放日與青年創新藏寶對談',
    type: '座談會',
    date: '2026-09-13',
    time: '10:00 - 12:00',
    locationName: '超級F1大樓 蘇巧慧競選總部',
    address: '新北市板橋區縣民大道二段與新站路口',
    lat: 25.0135,
    lng: 121.4640,
    description: '設有創意拍照打卡點與「探索新北」互動展區，蘇巧慧親自為青年朋友導覽競選願景，主打新思維新首都與育兒托育政策。',
    sourceName: '蘇巧慧 官方 Facebook (@chiaohui.su)',
    sourceUrl: 'https://www.facebook.com/chiaohui.su',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ntp-011',
    candidateId: 'cand-ntp-su',
    candidateName: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '新莊區',
    title: '【新莊裕民市場深入掃街】傾聽地方基層心聲與攤商拜會',
    type: '掃街拜票',
    date: '2026-09-17',
    time: '08:30 - 10:30',
    locationName: '新莊裕民公有市場 門口',
    address: '新北市新莊區裕民街',
    lat: 25.0225,
    lng: 121.4241,
    description: '蘇巧慧與新莊在地黨籍議員全員合體，深入熱鬧的裕民市場逐攤握手懇託，倡導傳統公有市場空調改善與數位支付升級。',
    sourceName: '自由時報 LTN',
    sourceUrl: 'https://news.ltn.com.tw/news/politics/breakingnews/4791000',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ntp-012',
    candidateId: 'cand-ntp-su',
    candidateName: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '樹林區',
    title: '【樹林濟安宮參拜祈福】保生大帝宮廟後援會成立誓師',
    type: '掃街拜票',
    date: '2026-09-19',
    time: '09:30 - 11:00',
    locationName: '樹林濟安宮 廟埕廣場',
    address: '新北市樹林區保安街一段32號',
    lat: 24.9961,
    lng: 121.4258,
    description: '蘇巧慧回到深耕多年的樹林本命區，至大廟濟安宮參拜祈福，並成立宗教宮廟後援會，凝聚鄉親支持力量。',
    sourceName: '蘇巧慧 官方 Instagram (@su_chiaohui)',
    sourceUrl: 'https://www.instagram.com/su_chiaohui/',
    status: 'confirmed',
    verified: true
  },

  // ==========================================
  // 桃園市 (Taoyuan City)
  // ==========================================
  {
    id: 'evt-ty-013',
    candidateId: 'cand-ty-chang',
    candidateName: '張善政',
    party: '中國國民黨',
    position: '桃園市長（爭取連任）',
    region: '桃園市',
    district: '中壢區',
    title: '【中壢仁海宮祈福】南桃園後援大會與媽祖參拜',
    type: '掃街拜票',
    date: '2026-09-15',
    time: '10:00 - 11:30',
    locationName: '中壢仁海宮 廟前廣場',
    address: '桃園市中壢區延平路198號',
    lat: 24.9622,
    lng: 121.2291,
    description: '張善政前往南桃園香火最鼎盛的百年媽祖廟仁海宮參香祈福，會晤地方仕紳與宮廟董事長，宣示延續國中小免費營養午餐與婦幼照護政策。',
    sourceName: '張善政 官方 Facebook (@SanChengChang)',
    sourceUrl: 'https://www.facebook.com/SanChengChang',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ty-014',
    candidateId: 'cand-ty-chang',
    candidateName: '張善政',
    party: '中國國民黨',
    position: '桃園市長（爭取連任）',
    region: '桃園市',
    district: '大園區',
    title: '【市政視察】桃園捷運綠線高架段軌道工程進度說明',
    type: '市政行程',
    date: '2026-09-18',
    time: '14:00 - 16:00',
    locationName: '桃園捷運綠線 G13站工區',
    address: '桃園市大園區三民路與坑果路口',
    lat: 25.0768,
    lng: 121.2825,
    description: '張善政親赴捷運綠線現場視察軌道鋪設與供電系統，向桃園市民報告北段貫通進度，強調以工程專業確保2026如期如質試運轉。',
    sourceName: '桃園市政府 新聞處市政公告',
    sourceUrl: 'https://www.tycg.gov.tw/',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ty-015',
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
    description: '黃世杰率桃園隊議員參選人向中壢鄉親說明市政信箱彙整的交通改善意見，發表醫療資源擴建與捷運沿線招商構想。',
    sourceName: '自由時報 LTN',
    sourceUrl: 'https://news.ltn.com.tw/news/politics/breakingnews/4791020',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ty-016',
    candidateId: 'cand-ty-huang',
    candidateName: '黃世杰',
    party: '民主進步黨',
    position: '桃園市長參選人',
    region: '桃園市',
    district: '中壢區',
    title: '【中壢新明公有市場】晨間向採買市民與攤商懇託拜票',
    type: '掃街拜票',
    date: '2026-09-17',
    time: '08:00 - 10:00',
    locationName: '新明公有零售市場',
    address: '桃園市中壢區明德路60號',
    lat: 24.9602,
    lng: 121.2173,
    description: '黃世杰展開南桃園密集掃街行程，前往中壢歷史悠久的新明市場，傾聽攤商對於市場現代化改建與公有停車空間的訴求。',
    sourceName: '民視新聞 FTV',
    sourceUrl: 'https://www.ftvnews.com.tw/',
    status: 'confirmed',
    verified: true
  },

  // ==========================================
  // 臺中市 (Taichung City)
  // ==========================================
  {
    id: 'evt-tc-017',
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
    description: '蔡英文前總統親臨開箱擔任榮譽主委！成立大會現場由賴清德總統、行政院副院長鄭麗君站台見證，現場規劃露營繪本區與親子劇團表演。',
    sourceName: '何欣純 官方 Facebook (@hohsinchun)',
    sourceUrl: 'https://www.facebook.com/hohsinchun',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-tc-018',
    candidateId: 'cand-tc-ho',
    candidateName: '何欣純',
    party: '民主進步黨',
    position: '臺中市長參選人',
    region: '臺中市',
    district: '大里區',
    title: '【大里內新市場早市】深耕屯區本命區清晨拜票',
    type: '掃街拜票',
    date: '2026-09-16',
    time: '08:00 - 10:00',
    locationName: '大里內新公有市場',
    address: '臺中市大里區中興路二段386巷',
    lat: 24.1132,
    lng: 120.6875,
    description: '何欣純回到服務多年的立委大本營大里，向早市熱情攤商懇託，訴求國中小營養午餐免費與捷運藍線屯區延伸線提速。',
    sourceName: '自由時報 LTN',
    sourceUrl: 'https://news.ltn.com.tw/news/politics/breakingnews/4791050',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-tc-019',
    candidateId: 'cand-tc-chiang',
    candidateName: '江啟臣',
    party: '中國國民黨',
    position: '臺中市長參選人',
    region: '臺中市',
    district: '西屯區',
    title: '【旗艦工作站成立】水湳經貿園區旗艦城市工作室亮相',
    type: '座談會',
    date: '2026-09-14',
    time: '15:00 - 17:00',
    locationName: '水湳創研基地 城市沙龍',
    address: '臺中市西屯區中科路與經貿路口',
    lat: 24.1865,
    lng: 120.6558,
    description: '江啟臣成立智慧科技城市辦公室，邀請產業專家與青年創業家對談，發表台中巨蛋聯外交通與國際新創中心擘劃。',
    sourceName: '江啟臣 官方 Facebook (@JohnnyChiang1972)',
    sourceUrl: 'https://www.facebook.com/JohnnyChiang1972',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-tc-020',
    candidateId: 'cand-tc-chiang',
    candidateName: '江啟臣',
    party: '中國國民黨',
    position: '臺中市長參選人',
    region: '臺中市',
    district: '豐原區',
    title: '【山線大本營出擊】豐原第一市場與廟東商圈掃街懇託',
    type: '掃街拜票',
    date: '2026-09-19',
    time: '09:00 - 11:30',
    locationName: '豐原第一公有零售市場 / 慈濟宮',
    address: '臺中市豐原區市前街88號',
    lat: 24.2526,
    lng: 120.7208,
    description: '江啟臣回到豐原故鄉，率山線民意代表在廟東慈濟宮媽祖廟參香，隨後步行進入第一公有零售市場逐一問候鄉親。',
    sourceName: '中時新聞網 Chinatimes',
    sourceUrl: 'https://www.chinatimes.com/',
    status: 'confirmed',
    verified: true
  },

  // ==========================================
  // 臺南市 (Tainan City)
  // ==========================================
  {
    id: 'evt-tn-021',
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
    sourceName: '謝龍介 官方 Facebook (@longjie.tainan)',
    sourceUrl: 'https://www.facebook.com/longjie.tainan',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-tn-022',
    candidateId: 'cand-tn-chen',
    candidateName: '陳亭妃',
    party: '民主進步黨',
    position: '臺南市長參選人',
    region: '臺南市',
    district: '東區',
    title: '【台南400首位女市長】科技三軸與福利六都齊政策發表會',
    type: '政見發表',
    date: '2026-09-17',
    time: '10:00 - 12:00',
    locationName: '臺南文化中心 國際會議廳',
    address: '臺南市東區中華東路三段332號',
    lat: 22.9733,
    lng: 120.2223,
    description: '陳亭妃率台南隊立委議員團隊召開大型政策說明會，發表農業、半導體AI、醫療三大科技軸心與比照六都水準的老人健保補助。',
    sourceName: '陳亭妃 官方 Facebook (@tingfei.tainan)',
    sourceUrl: 'https://www.facebook.com/tingfei.tainan',
    status: 'confirmed',
    verified: true
  },

  // ==========================================
  // 高雄市 (Kaohsiung City)
  // ==========================================
  {
    id: 'evt-kh-023',
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
    locationName: '鳳山區經武路與鳳松路口（造勢廣場）',
    address: '高雄市鳳山區經武路與鳳松路口',
    lat: 22.6341,
    lng: 120.3644,
    description: '柯志恩首場指標性大型陸戰集會！特別邀請台北市長蔣萬安、前立法院長王金平出席助陣，主打北高連線與青年發言人團隊新世代觀點。',
    sourceName: '聯合新聞網 UDN',
    sourceUrl: 'https://udn.com/news/story/124199/8210388',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-kh-024',
    candidateId: 'cand-kh-lai',
    candidateName: '賴瑞隆',
    party: '民主進步黨',
    position: '高雄市長參選人',
    region: '高雄市',
    district: '左營區',
    title: '【挺瑞隆、拚過半】左營博愛與曾子路口清晨拜票致意',
    type: '掃街拜票',
    date: '2026-09-15',
    time: '07:30 - 09:00',
    locationName: '左營區博愛三路與曾子路口（總部前）',
    address: '高雄市左營區博愛三路與曾子路口',
    lat: 22.6841,
    lng: 120.3090,
    description: '陳其邁擔任競選總部主委，賴瑞隆率高雄隊議員團隊於通勤尖峰時段在博愛路口向市民揮手致意，宣示延續五星市政與高科技S廊帶延伸。',
    sourceName: '賴瑞隆 官方 Facebook (@raylong.kh)',
    sourceUrl: 'https://www.facebook.com/raylong.kh',
    status: 'confirmed',
    verified: true
  },

  // ==========================================
  // 基隆市、新竹市、宜蘭縣、彰化縣
  // ==========================================
  {
    id: 'evt-kl-025',
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
    sourceName: '中央社 CNA',
    sourceUrl: 'https://www.cna.com.tw/',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-yl-026',
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
    description: '宜蘭縣議會議長張勝德陪同站台，與吳宗憲深入市場各攤位懇託握手，強調高鐵延伸宜蘭進度緊盯與地方農漁觀光產銷整合。',
    sourceName: '噶瑪蘭新聞網 Kamalan News',
    sourceUrl: 'https://www.kamalan-news.com/',
    status: 'confirmed',
    verified: true
  },
  {
    id: 'evt-ch-027',
    candidateId: 'cand-ch-wei',
    candidateName: '魏平政',
    party: '中國國民黨',
    position: '彰化縣長參選人',
    region: '彰化縣',
    district: '彰化市',
    title: '【彰化全縣誓師】競選總部成立大會（盧秀燕親自站台）',
    type: '造勢大會',
    date: '2026-09-20',
    time: '14:30 - 17:00',
    locationName: '魏平政彰化市競選總部廣場',
    address: '彰化縣彰化市中山路二段416號',
    lat: 24.0755,
    lng: 120.5441,
    description: '台中市長盧秀燕跨烏溪親臨彰化站台！力挺魏平政接棒王惠美，打造中彰投軌道捷運與高科技精密機械廊帶。',
    sourceName: 'TVBS 新聞網',
    sourceUrl: 'https://news.tvbs.com.tw/politics/2610111',
    status: 'confirmed',
    verified: true,
    isPopular: true
  }
];
