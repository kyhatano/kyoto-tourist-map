export type LocationType = 'primary' | 'secondary';
export type AreaType = '洛中・嵐山' | '東山' | '洛南（宇治）' | '海の京都';

export interface TouristLocation {
    id: string;
    name: string;
    area: AreaType;
    lat: number;
    lng: number;
    desc: string;
    type: LocationType;
}

export const locations: TouristLocation[] = [
    // --- 洛中・嵐山 ---
    { id: 'kinkakuji', name: "金閣寺", area: "洛中・嵐山", lat: 35.03937, lng: 135.72924, desc: "正式名称は鹿苑寺。鏡湖池に映る黄金の楼閣は京都を代表する絶景です。", type: 'primary' },
    { id: 'arashiyama', name: "嵐山", area: "洛中・嵐山", lat: 35.01366, lng: 135.67784, desc: "渡月橋を中心とする景勝地。竹林の小径や天龍寺など見どころが多数集まります。", type: 'primary' },
    { id: 'hanana', name: "鯛匠 HANANA", area: "洛中・嵐山", lat: 35.01633, lng: 135.67808, desc: "嵐山メインストリートにある超人気行列店。絶品の「鯛茶漬け御膳」が名物。", type: 'primary' },
    { id: 'gosho', name: "京都御所", area: "洛中・嵐山", lat: 35.02544, lng: 135.76211, desc: "かつての皇居。広大な京都御苑の中心に位置し、歴史ある厳かな建築と庭園が楽しめます。", type: 'primary' },
    { id: 'kamogawa', name: "鴨川", area: "洛中・嵐山", lat: 35.00375, lng: 135.77258, desc: "京都市内を南北に流れる象徴的な川。夏には納涼床が並び、夕暮れの散策に最適です。", type: 'primary' },
    // おすすめスポット追加
    { id: 'nijojo', name: "二条城", area: "洛中・嵐山", lat: 35.01423, lng: 135.74821, desc: "徳川家康が築城。大政奉還の舞台となった国宝・二の丸御殿は必見です。", type: 'secondary' },
    { id: 'tenryuji', name: "天龍寺", area: "洛中・嵐山", lat: 35.01579, lng: 135.67375, desc: "嵐山を借景とした曹源池庭園が美しい、京都五山第一位の名刹。", type: 'secondary' },
    { id: 'ryoanji', name: "龍安寺", area: "洛中・嵐山", lat: 35.03449, lng: 135.71826, desc: "枯山水庭園（石庭）で世界的に有名。金閣寺からのアクセスも良好です。", type: 'secondary' },

    // --- 東山 ---
    { id: 'kiyomizu', name: "清水寺", area: "東山", lat: 34.99484, lng: 135.78504, desc: "「清水の舞台」で知られる世界遺産。京都市街を一望でき、音羽の滝の清水が名高いです。", type: 'primary' },
    { id: 'ninenzaka', name: "二年坂", area: "東山", lat: 34.99831, lng: 135.78061, desc: "清水寺へ続く石畳の坂道。伝統的な町家建築が軒を連ね、京都らしい風情を色濃く残します。", type: 'primary' },
    { id: 'sannenzaka', name: "三年坂", area: "東山", lat: 34.99696, lng: 135.78166, desc: "産寧坂とも呼ばれます。お土産やスイーツのお店がひしめき合う、活気あふれる通り。", type: 'primary' },
    { id: 'zuikou', name: "瑞光窯 (清水店)", area: "東山", lat: 34.99351, lng: 135.77977, desc: "八坂の塔近辺で人気の陶芸体験工房。電動ろくろで本格的な器作りが楽しめます。", type: 'primary' },
    { id: 'sanjusangendo', name: "三十三間堂", area: "東山", lat: 34.98767, lng: 135.77197, desc: "本堂に1001体の木造千手観音立像がずらりと並ぶ、圧巻の光景で有名な天台宗の寺院。", type: 'primary' },
    // おすすめスポット追加
    { id: 'yasaka', name: "八坂神社", area: "東山", lat: 35.00366, lng: 135.77855, desc: "祇園祭で有名な「祇園さん」。厄除け・縁結びの神様として親しまれています。", type: 'secondary' },
    { id: 'nanzenji', name: "南禅寺", area: "東山", lat: 35.01148, lng: 135.79309, desc: "広大な境内に立つ重厚な三門や、レンガ造りの水路閣など見どころの多い禅寺。", type: 'secondary' },

    // --- 洛南（宇治） ---
    { id: 'fushimi', name: "伏見稲荷大社", area: "洛南（宇治）", lat: 34.96714, lng: 135.77267, desc: "全国の稲荷神社の総本宮。朱塗りの鳥居が連なる「千本鳥居」は海外からも大人気。", type: 'primary' },
    { id: 'byodoin', name: "平等院鳳凰堂", area: "洛南（宇治）", lat: 34.88929, lng: 135.80768, desc: "宇治市にある世界遺産。10円硬貨のデザインでおなじみ。平安貴族の極楽浄土の夢を表現。", type: 'primary' },
    // おすすめスポット追加
    { id: 'toji', name: "東寺", area: "洛南（宇治）", lat: 34.98114, lng: 135.74762, desc: "京都のシンボル・五重塔がそびえ立つ、弘法大師空海ゆかりの真言宗総本山。", type: 'secondary' },

    // --- 海の京都 ---
    { id: 'amanohashidate', name: "天橋立", area: "海の京都", lat: 35.56834, lng: 135.19251, desc: "日本三景の一つ。宮津湾と阿蘇海を隔てる全長3.6kmの砂州に約8,000本の松が茂ります。", type: 'primary' },
    { id: 'ine', name: "伊根の舟屋", area: "海の京都", lat: 35.67503, lng: 135.28681, desc: "海面すれすれに建つ独特の舟屋建築。1階が船置き場、2階が生活空間という世界的にも珍しい景観。", type: 'primary' },
    // おすすめスポット追加
    { id: 'maizuru', name: "舞鶴赤れんがパーク", area: "海の京都", lat: 35.47466, lng: 135.39566, desc: "明治から大正にかけて建設された旧海軍の赤れんが倉庫群。レトロな雰囲気が魅力。", type: 'secondary' }
];
