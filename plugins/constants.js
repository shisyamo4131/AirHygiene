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

const ITEM_TYPE = {
  municipal: '一般廃棄物',
  industrial: '産業廃棄物',
  else: '分類なし',
}
const ITEM_TYPE_ARRAY = Object.entries(ITEM_TYPE).map(([value, text]) => ({
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
  inject('ITEM_TYPE', ITEM_TYPE)
  inject('ITEM_TYPE_ARRAY', ITEM_TYPE_ARRAY)
  inject('ROUNDING', ROUNDING)
  inject('ROUNDING_ARRAY', ROUNDING_ARRAY)
}
