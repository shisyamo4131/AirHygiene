/**
 * ## mixins.EditMode.js
 * データ入力用コンポーネントの編集モードを表すeditModeをpropsに定義します。
 * .sync修飾子で同期できるようにしています。
 * 当該mixinを使用するコンポーネント内ではcomputedEditModeを参照するようにしてください。
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    editMode: {
      type: String,
      default: 'REGIST',
      validator: (v) => ['REGIST', 'UPDATE', 'DELETE'].includes(v),
      required: false,
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      internalEditMode: undefined,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedEditMode: {
      get() {
        return this.internalEditMode
      },
      set(v) {
        this.internalEditMode = v
        this.$emit('update:editMode', v)
      },
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    editMode: {
      handler(newVal, oldVal) {
        if (newVal === oldVal) return
        this.internalEditMode = newVal
      },
      immediate: true,
    },
  },
}
