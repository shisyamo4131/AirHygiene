<script>
export default {
  model: { prop: 'value', event: 'input' },
  props: {
    /* An object priveded to the table component. */
    actions: { type: Array, default: () => [], required: false },
    /* An object used to initialize the model when edit-mode is 'REGIST'. */
    defaultItem: { type: Object, default: () => ({}), required: false },
    /* An object provided to the dialog component. */
    dialogProps: { type: Object, default: () => ({}), required: false },
    /* To switch delete direct if true. */
    directDelete: { type: Boolean, default: false, required: false },
    /* A string used to specify the item in props.value */
    itemKey: { type: String, default: 'id', required: false },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* Specifies the model-id that controlled by this component. */
    modelId: { type: String, required: true },
    /* An object provided to the table component. */
    tableProps: { type: Object, default: () => ({}), required: false },
    /* An array provided to the table component. */
    value: { type: Array, default: () => [], required: false },
  },
  data() {
    return {
      dialog: false,
      editMode: 'REGIST',
      editKey: null,
      editItem: null,
      /* A string used for searching items provided to table-props. */
      internalSearch: null,
    }
  },
  computed: {
    editItemAttrs() {
      return {
        ...JSON.parse(JSON.stringify(this.editItem)),
      }
    },
    editItemOn() {
      const result = {}
      Object.keys(this.editItem).forEach((key) => {
        result[`update:${key}`] = ($event) => {
          this.editItem[key] = $event
        }
      })
      return result
    },
  },
  watch: {
    dialog(v) {
      if (!v) {
        this.editMode = 'REGIST'
        this.editKey = null
        this.editItem.initialize()
        this.$refs[`air-form-${this._uid}`].resetValidation()
      }
    },
    modelId: {
      handler(v) {
        this.editItem = this[`$${v}`](this.defaultItem)
      },
      immediate: true,
    },
  },
  methods: {
    onClickRegist() {
      this.editItem.initialize()
      this.editMode = 'REGIST'
      this.dialog = true
    },
    onClickEdit(item) {
      this.editItem.initialize(item)
      this.editKey = this.editItem[this.itemKey]
      this.editMode = 'UPDATE'
      this.dialog = true
    },
    onClickDelete(item) {
      this.editItem.initialize(item)
      this.editKey = this.editItem[this.itemKey]
      this.editMode = 'DELETE'
      if (this.directDelete) {
        this.dialog = false
        const answer = window.confirm('削除してもよろしいですか？')
        if (!answer) return
        this.submit()
      } else {
        this.dialog = true
      }
    },
    onClickCancel() {
      this.dialog = false
      // this.editItem.initialize()
      // this.$refs[`air-form-${this._uid}`].resetValidation()
    },
    validate() {
      const result = this.$refs[`air-form-${this._uid}`].validate()
      if (!result) alert('入力に不備があります。')
      return result
    },
    duplicated(v) {
      const uniques = [...new Set(v.map((item) => item[this.itemKey]))]
      return v.length !== uniques.length
    },
    submit() {
      if (this.editMode !== 'DELETE' && !this.validate()) return
      try {
        let result
        if (this.editMode === 'REGIST') result = this.regist()
        if (this.editMode === 'UPDATE') result = this.update()
        if (this.editMode === 'DELETE') result = this.delete()
        this.$emit('input', result)
        this.dialog = false
      } catch (err) {
        alert(err.message)
      }
    },
    regist() {
      const item = JSON.parse(JSON.stringify(this.editItem))
      const result = this.value.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      result.push(item)
      if (this.duplicated(result)) {
        throw new Error('重複して登録することはできません。')
      }
      return result
    },
    update() {
      const item = JSON.parse(JSON.stringify(this.editItem))
      const result = this.value.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      const index = this.value.findIndex((item) => {
        return item[this.itemKey] === this.editKey
      })
      if (index !== -1) result.splice(index, 1, item)
      if (this.duplicated(result)) {
        throw new Error('重複して登録することはできません。')
      }
      return result
    },
    delete() {
      const result = this.value.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      const index = this.value.findIndex((item) => {
        return item[this.itemKey] === this.editKey
      })
      if (index !== -1) result.splice(index, 1)
      return result
    },
  },
  render(createElement) {
    return createElement(
      'v-form',
      {
        attrs: {
          disabled: this.editMode === 'DELETE',
        },
        ref: `air-form-${this._uid}`,
      },
      this.$scopedSlots.default({
        dialog: {
          attrs: {
            editMode: this.editMode,
            label: this.label,
            value: this.dialog,
            ...this.dialogProps,
          },
          on: {
            input: (v) => (this.dialog = v),
            'click:cancel': this.onClickCancel,
            'click:submit': this.onClickSubmit,
          },
        },
        editItem: {
          attrs: { ...this.editItemAttrs, editMode: this.editMode },
          on: this.editItemOn,
        },
        editKey: this.editKey,
        editMode: this.editMode,
        /* The editItem is editing if dialog is true. */
        isEditing: this.dialog,
        search: {
          attrs: { value: this.internalSearch },
          on: { input: (v) => (this.internalSearch = v) },
        },
        table: {
          attrs: {
            actions: this.actions,
            disableDelete: this.dialog,
            disableEdit: this.dialog,
            itemKey: this.itemKey,
            items: this.value,
            search: this.internalSearch,
            ...this.tableProps,
          },
          on: {
            'click:regist': this.onClickRegist,
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
            // 'click:detail': this.onClickDetail,
          },
        },
        btns: {
          regist: {
            on: {
              click: this.dialog ? this.submit : this.onClickRegist,
            },
          },
          cancel: {
            attrs: {
              disabled: !this.dialog,
            },
            on: {
              click: this.onClickCancel,
            },
          },
        },
      })
    )
  },
}
</script>

<style></style>