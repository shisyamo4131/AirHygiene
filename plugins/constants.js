const DEADLINE = {
  '05': '5日',
  10: '10日',
  15: '15日',
  20: '20日',
  25: '25日',
  99: '末日',
}
const DEADLINE_ARRAY = Object.entries(DEADLINE).map(([value, text]) => ({
  value,
  text,
}))

const ITEM_GROUP = {
  1011: '一般廃棄物－可燃ごみ',
  2011: '産業廃棄物－燃え殻',
  2021: '産業廃棄物－汚泥',
  2031: '産業廃棄物－廃油',
  2041: '産業廃棄物－廃酸',
  2051: '産業廃棄物－廃アルカリ',
  2061: '産業廃棄物－廃プラスチック類',
  2071: '産業廃棄物－ゴムくず',
  2081: '産業廃棄物－金属くず',
  2091: '産業廃棄物－ガラス・コンクリート・陶磁器くず',
  2101: '産業廃棄物－鉱さい',
  2111: '産業廃棄物－がれき類',
  2121: '産業廃棄物－ばいじん',
  2131: '産業廃棄物－紙くず',
  2141: '産業廃棄物－木くず',
  2151: '産業廃棄物－繊維くず',
  2161: '産業廃棄物－動物系固形不要物',
  2171: '産業廃棄物－動植物性残さ',
  2181: '産業廃棄物－動物のふん尿',
  2191: '産業廃棄物－動物の死体',
  2201: '産業廃棄物－その他',
  9999: 'その他',
}

const ITEM_GROUP_ARRAY = Object.entries(ITEM_GROUP).map(([value, text]) => ({
  value,
  text,
}))

const ROUNDING = {
  floor: '切り捨て',
  round: '四捨五入',
  ceil: '切り上げ',
}

const ROUNDING_ARRAY = Object.entries(ROUNDING).map(([value, text]) => ({
  value,
  text,
}))

export default (context, inject) => {
  inject('DEADLINE', DEADLINE)
  inject('DEADLINE_ARRAY', DEADLINE_ARRAY)
  inject('ITEM_GROUP', ITEM_GROUP)
  inject('ITEM_GROUP_ARRAY', ITEM_GROUP_ARRAY)
  inject('ROUNDING', ROUNDING)
  inject('ROUNDING_ARRAY', ROUNDING_ARRAY)
}
