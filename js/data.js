/**
 * 2026 臺灣縣市長選舉 | 候選人與競選行程資料集 (Mayors & County Magistrates Dataset)
 */

const PARTY_COLORS = {
  '民主進步黨': { bg: '#e8f5e9', text: '#1b5e20', border: '#4caf50', hex: '#278542' },
  '中國國民黨': { bg: '#e3f2fd', text: '#0d47a1', border: '#2196f3', hex: '#000099' },
  '台灣民眾黨': { bg: '#e0f7fa', text: '#006064', border: '#00bcd4', hex: '#28C8C8' },
  '時代力量': { bg: '#fff8e1', text: '#f57f17', border: '#ffb300', hex: '#F58220' },
  '無黨籍': { bg: '#f5f5f5', text: '#424242', border: '#9e9e9e', hex: '#666666' }
};

const CANDIDATES_DATA = [
  // --- 臺北市 ---
  {
    id: 'cand-taipei-01',
    name: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長參選人',
    region: '臺北市',
    slogan: '永續台北，首都新篇章！',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    initials: '蔣',
    policies: ['捷運東環段加速統籌', '青年首購成家補貼', '生養好孕全額補助', '智慧防災示範區'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', youtube: 'https://youtube.com', threads: 'https://threads.net' }
  },
  {
    id: 'cand-taipei-02',
    name: '林佳龍',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    slogan: '首都大升級，國際新台北！',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    initials: '林',
    policies: ['首都圈大眾運輸綠能月票', '都市更新加速中心', '數位雙生智慧城市', '國際新創園區'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', youtube: 'https://youtube.com' }
  },
  {
    id: 'cand-taipei-03',
    name: '黃珊珊',
    party: '台灣民眾黨',
    position: '臺北市長參選人',
    region: '臺北市',
    slogan: '擺脫藍綠，勤政愛民新台北！',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    initials: '黃',
    policies: ['社會住宅萬戶永續續建', '智慧醫療長照網', '公民參與式預算升級', '微型企業創業基金'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', threads: 'https://threads.net' }
  },

  // --- 新北市 ---
  {
    id: 'cand-ntpc-01',
    name: '侯友宜',
    party: '中國國民黨',
    position: '新北市長參選人',
    region: '新北市',
    slogan: '好好做做事，新北共好！',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    initials: '侯',
    policies: ['三環六線全面通車', '五股夏綠地環保永續區', '日照中心大翻倍', '銀髮俱樂部3.0'],
    socials: { facebook: 'https://facebook.com', youtube: 'https://youtube.com' }
  },
  {
    id: 'cand-ntpc-02',
    name: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    slogan: '新北新思維，世代同行！',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    initials: '蘇',
    policies: ['親子藝文河濱公園群', '河左岸產業走廊', '幼托公托加倍供給', '國際雙語實驗學校'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', threads: 'https://threads.net' }
  },

  // --- 桃園市 ---
  {
    id: 'cand-taoyuan-01',
    name: '張善政',
    party: '中國國民黨',
    position: '桃園市長參選人',
    region: '桃園市',
    slogan: '科技桃園，新創之都！',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200',
    initials: '張',
    policies: ['桃園航空城智慧物流', '婦幼專權升級與托育金', '捷運綠線全速推進', '客家文化科技行銷'],
    socials: { facebook: 'https://facebook.com', youtube: 'https://youtube.com' }
  },
  {
    id: 'cand-taoyuan-02',
    name: '鄭運鵬',
    party: '民主進步黨',
    position: '桃園市長參選人',
    region: '桃園市',
    slogan: '運轉桃園，大智大勇！',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    initials: '鄭',
    policies: ['動漫文創與次文化特區', '半導體產業聚落擴大', '青年租屋加碼補貼', '大溪老街觀光廊帶'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' }
  },

  // --- 臺中市 ---
  {
    id: 'cand-taichung-01',
    name: '盧秀燕',
    party: '中國國民黨',
    position: '臺中市長參選人',
    region: '臺中市',
    slogan: '媽媽市長，溫暖守護台中！',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    initials: '盧',
    policies: ['台中巨蛋與綠美圖建設', '中捷藍線統籌動工', '空氣換新改善專案', '幸福宜居包租代管'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' }
  },
  {
    id: 'cand-taichung-02',
    name: '蔡其昌',
    party: '民主進步黨',
    position: '臺中市長參選人',
    region: '臺中市',
    slogan: '行動派台中，贏在未來！',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    initials: '蔡',
    policies: ['國中小營養午餐免費', '環中路高架化舒緩交通', '大台中棒球運動產業園區', '老舊市場更新加碼'],
    socials: { facebook: 'https://facebook.com', youtube: 'https://youtube.com' }
  },

  // --- 臺南市 ---
  {
    id: 'cand-tainan-01',
    name: '黃偉哲',
    party: '民主進步黨',
    position: '臺南市長參選人',
    region: '臺南市',
    slogan: '文化古都，智慧升級！',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
    initials: '黃',
    policies: ['南科三期擴建加速', '沙崙智慧綠能科學城', '古蹟歷史街區微整形', '農產品國際冷鏈中心'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' }
  },

  // --- 高雄市 ---
  {
    id: 'cand-kaohsiung-01',
    name: '陳其邁',
    party: '民主進步黨',
    position: '高雄市長參選人',
    region: '高雄市',
    slogan: '抓緊時間，高雄永續前進！',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200',
    initials: '陳',
    policies: ['台積電高科技S廊帶延伸', '輕軌成圓與捷運延伸', '亞灣2.0 5G AIoT基地', '亞灣國際演唱會經濟'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com', youtube: 'https://youtube.com' }
  },
  {
    id: 'cand-kaohsiung-02',
    name: '柯志恩',
    party: '中國國民黨',
    position: '高雄市長參選人',
    region: '高雄市',
    slogan: '換個好市長，高雄真幸福！',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200',
    initials: '柯',
    policies: ['教育發展與青年創業特區', '空氣品質改善目標升級', '觀光商圈全面再造', '水資源智慧管理'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' }
  },

  // --- 新竹市 ---
  {
    id: 'cand-hsinchu-city-01',
    name: '高虹安',
    party: '台灣民眾黨',
    position: '新竹市長參選人',
    region: '新竹市',
    slogan: '科技新竹，智慧風城！',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    initials: '高',
    policies: ['竹科周邊交通智慧紓解', '學區通學步道安全改造', '青年創業陪伴計劃', '數位透明府內管理'],
    socials: { facebook: 'https://facebook.com', instagram: 'https://instagram.com' }
  },

  // --- 基隆市 ---
  {
    id: 'cand-keelung-01',
    name: '謝國樑',
    party: '中國國民黨',
    position: '基隆市長參選人',
    region: '基隆市',
    slogan: '有愛城市，活力基隆！',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    initials: '謝',
    policies: ['基隆捷運加速推動', '青年電動機車方案', '港區親水樂園', '早療兒童照顧園地'],
    socials: { facebook: 'https://facebook.com' }
  },

  // --- 宜蘭縣 ---
  {
    id: 'cand-yilan-01',
    name: '林姿妙',
    party: '中國國民黨',
    position: '宜蘭縣長參選人',
    region: '宜蘭縣',
    slogan: '拼出宜蘭好生活！',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    initials: '林',
    policies: ['高鐵延伸宜蘭統籌建置', '宜蘭國中小免費營養午餐', '觀光溫泉季節行銷', '地方創生陪伴團'],
    socials: { facebook: 'https://facebook.com' }
  }
];

const EVENTS_DATA = [
  // --- 臺北市造勢行程 ---
  {
    id: 'evt-tp-101',
    candidateId: 'cand-taipei-01',
    candidateName: '蔣萬安',
    party: '中國國民黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '大安區',
    title: '【大安區團結大造勢】齊心守護台北露天音樂會',
    type: '造勢大會',
    date: '2026-09-12',
    time: '18:30 - 21:00',
    locationName: '大安森林公園 露天音樂台',
    address: '臺北市大安區新生南路二段1號',
    lat: 25.0305,
    lng: 121.5356,
    description: '匯集台北市歷任要角與各區參選人，特別邀請在地樂團開場表演。現場發放限量吉祥物貼紙與加油棒！',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-tp-102',
    candidateId: 'cand-taipei-02',
    candidateName: '林佳龍',
    party: '民主進步黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '信義區',
    title: '【首都客廳會】智慧交通與新創台北願景論壇',
    type: '座談會',
    date: '2026-09-13',
    time: '14:00 - 16:30',
    locationName: '松山文創園區 2號倉庫',
    address: '臺北市信義區光復南路133號',
    lat: 25.0438,
    lng: 121.5606,
    description: '邀請國立大學交通政策學者與新創企業代表現場對談，公開闡述首都圈月票升級與智慧交通細節。',
    status: 'confirmed',
    verified: true,
    liveStreamUrl: 'https://youtube.com/live_example'
  },
  {
    id: 'evt-tp-103',
    candidateId: 'cand-taipei-03',
    candidateName: '黃珊珊',
    party: '台灣民眾黨',
    position: '臺北市長參選人',
    region: '臺北市',
    district: '士林區',
    title: '【士林夜市走透透】早市親自掃街拜票行程',
    type: '掃街拜票',
    date: '2026-09-12',
    time: '08:00 - 10:30',
    locationName: '士林公有市場門口集合',
    address: '臺北市士林區大興街9號',
    lat: 25.0886,
    lng: 121.5248,
    description: '深入士林傳統市場向各位攤商、拜票握手致意，宣導小店家租稅減免與市場通風改善政見。',
    status: 'confirmed',
    verified: true
  },

  // --- 新北市造勢行程 ---
  {
    id: 'evt-ntp-104',
    candidateId: 'cand-ntpc-02',
    candidateName: '蘇巧慧',
    party: '民主進步黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '板橋區',
    title: '【新北新未來】板橋萬人造勢大會',
    type: '造勢大會',
    date: '2026-09-13',
    time: '19:00 - 21:30',
    locationName: '板橋第一運動場 廣場',
    address: '新北市板橋區漢生東路278號',
    lat: 24.9996,
    lng: 121.4674,
    description: '新北市重點會師行程！立法委員、知名藝人陣容歡唱，發表新北托育與河畔休閒廊帶總體規劃計畫。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },
  {
    id: 'evt-ntp-105',
    candidateId: 'cand-ntpc-01',
    candidateName: '侯友宜',
    party: '中國國民黨',
    position: '新北市長參選人',
    region: '新北市',
    district: '三重區',
    title: '【三重三和夜市】掃街問候與後援會成立',
    type: '掃街拜票',
    date: '2026-09-14',
    time: '17:30 - 20:00',
    locationName: '三和夜市入口（中央北路口）',
    address: '新北市三重區中央北路26號',
    lat: 25.0664,
    lng: 121.4988,
    description: '侯友宜市長親自領軍行經三和夜市，傾聽在地商圈心聲，並舉行三重後援會幹部授旗儀式。',
    status: 'confirmed',
    verified: true
  },

  // --- 桃園市造勢行程 ---
  {
    id: 'evt-ty-106',
    candidateId: 'cand-taoyuan-01',
    candidateName: '張善政',
    party: '中國國民黨',
    position: '桃園市長參選人',
    region: '桃園市',
    district: '中壢區',
    title: '【中壢車隊掃街】穿梭大街小巷拜票熱力出發',
    type: '車隊掃街',
    date: '2026-09-13',
    time: '09:30 - 12:00',
    locationName: '中壢火車站前廣場 出發',
    address: '桃園市中壢區中正路1號',
    lat: 24.9537,
    lng: 121.2255,
    description: '競選車隊將由中壢火車站出發，行經中原商圈、內壢地區，沿途揮手向所有縣市民眾致意。',
    status: 'confirmed',
    verified: true
  },

  // --- 臺中市造勢行程 ---
  {
    id: 'evt-tc-107',
    candidateId: 'cand-taichung-01',
    candidateName: '盧秀燕',
    party: '中國國民黨',
    position: '臺中市長參選人',
    region: '臺中市',
    district: '西屯區',
    title: '【台中巨蛋草地音樂會】宜居台中草地派對',
    type: '造勢大會',
    date: '2026-09-14',
    time: '15:30 - 18:30',
    locationName: '臺中中央公園 戶外綠地廣場',
    address: '臺中市西屯區中科路2966號',
    lat: 24.1862,
    lng: 120.6558,
    description: '專為親子與家庭打造的清新造勢音樂會！現場設置大型泡泡遊戲區、美食餐車攤位。',
    status: 'confirmed',
    verified: true,
    isPopular: true
  },

  // --- 高雄市造勢行程 ---
  {
    id: 'evt-kh-108',
    candidateId: 'cand-kaohsiung-01',
    candidateName: '陳其邁',
    party: '民主進步黨',
    position: '高雄市長參選人',
    region: '高雄市',
    district: '鼓山區',
    title: '【亞灣2.0 科技高峰會】科技廊帶發表與直播',
    type: '社群直播',
    date: '2026-09-12',
    time: '15:00 - 17:00',
    locationName: '高雄展覽館 301會議室',
    address: '高雄市前鎮區成功二路39號',
    lat: 22.6063,
    lng: 120.3012,
    description: '聯手半導體大廠與國內外創新團隊，宣布高雄S廊帶第二期開發計畫與國際人才招募政策。粉專同步直播！',
    status: 'confirmed',
    verified: true,
    liveStreamUrl: 'https://facebook.com/live_chen'
  },
  {
    id: 'evt-kh-109',
    candidateId: 'cand-kaohsiung-02',
    candidateName: '柯志恩',
    party: '中國國民黨',
    position: '高雄市長參選人',
    region: '高雄市',
    district: '左營區',
    title: '【左營舊城造勢晚會】溫暖真心守護港都',
    type: '造勢大會',
    date: '2026-09-15',
    time: '18:30 - 21:00',
    locationName: '左營蓮池潭環潭路廣庭',
    address: '高雄市左營區環潭路102號',
    lat: 22.6845,
    lng: 120.2981,
    description: '左營舊城文化體驗與造勢晚會，邀請青年創業代表發表文化資產活化與觀光升級政策。',
    status: 'confirmed',
    verified: true
  },

  // --- 新竹市造勢行程 ---
  {
    id: 'evt-hc-110',
    candidateId: 'cand-hsinchu-city-01',
    candidateName: '高虹安',
    party: '台灣民眾黨',
    position: '新竹市長參選人',
    region: '新竹市',
    district: '東區',
    title: '【竹科工程師客廳會】交通智慧紓解與青年政策對談',
    type: '座談會',
    date: '2026-09-15',
    time: '19:30 - 21:00',
    locationName: '新竹科學園區 科技生活館',
    address: '新竹市東區工業東二路1號',
    lat: 24.7801,
    lng: 121.0022,
    description: '方針對竹科上下班尖峰時刻交通擁塞解方，邀請交通大數據專家與科技從業人員參與討論。',
    status: 'confirmed',
    verified: true
  },

  // --- 基隆市造勢行程 ---
  {
    id: 'evt-kl-111',
    candidateId: 'cand-keelung-01',
    candidateName: '謝國樑',
    party: '中國國民黨',
    position: '基隆市長參選人',
    region: '基隆市',
    district: '仁愛區',
    title: '【廟口夜市親自掃街】聽見基隆青年心聲',
    type: '掃街拜票',
    date: '2026-09-16',
    time: '18:00 - 20:30',
    locationName: '基隆廟口夜市入口（奠濟宮前）',
    address: '基隆市仁愛區仁三路',
    lat: 25.1283,
    lng: 121.7419,
    description: '深入基隆廟口商圈拜訪在地攤商與造訪遊客，宣導捷運建設與港區樂園規劃。',
    status: 'confirmed',
    verified: true
  },

  // --- 宜蘭縣造勢行程 ---
  {
    id: 'evt-yl-112',
    candidateId: 'cand-yilan-01',
    candidateName: '林姿妙',
    party: '中國國民黨',
    position: '宜蘭縣長參選人',
    region: '宜蘭縣',
    district: '宜蘭市',
    title: '【宜蘭南北館市場】晨間親自問候掃街行程',
    type: '掃街拜票',
    date: '2026-09-16',
    time: '07:30 - 09:30',
    locationName: '南館市場入口廣場',
    address: '宜蘭縣宜蘭市光復路',
    lat: 24.7554,
    lng: 121.7533,
    description: '深入傳統南館市場拜訪鄉親，握手致意並感謝在地農特產品業者對宜蘭觀光經濟的貢獻。',
    status: 'confirmed',
    verified: true
  }
];
