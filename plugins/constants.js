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

export default (context, inject) => {
  inject('DEADLINE', DEADLINE)
  inject('DEADLINE_ARRAY', DEADLINE_ARRAY)
}
