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
    /* A object that duplicated and controlled by this component. Should be extended by the FireModel. */
    model: {
      type: Object,
      validator: (v) => {
        const required = ['initialize']
        return required.every((el) => el in v)
      },
      required: true,
    },
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
      /* A string used for searching items provided to table-props. */
      internalSearch: null,
    }
  },
  watch: {
    dialog(v) {
      if (!v) {
        this.editMode = 'REGIST'
        this.editKey = null
        this.model.initialize()
        this.$refs[`air-form-${this._uid}`].resetValidation()
      }
    },
  },
  methods: {
    onClickRegist() {
      this.model.initialize()
      this.editMode = 'REGIST'
      this.dialog = true
    },
    onClickEdit(item) {
      this.model.initialize(item)
      this.editKey = this.model[this.itemKey]
      this.editMode = 'UPDATE'
      this.dialog = true
    },
    onClickDelete(item) {
      this.model.initialize(item)
      this.editKey = this.model[this.itemKey]
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
      const item = structuredClone(this.model)
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
      const item = structuredClone(this.model)
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
        editor: {
          attrs: { ...structuredClone(this.model), editMode: this.editMode },
          on: Object.keys(this.model).reduce((sum, i) => {
            sum[`update:${i}`] = ($event) =>
              this.model.initialize({
                ...structuredClone(this.model),
                [i]: $event,
              })
            return sum
          }, {}),
        },
        editKey: this.editKey,
        editMode: this.editMode,
        /* The model is editing if dialog is true. */
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
