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
    /* A string used to specify the item in props.value */
    itemKey: { type: String, default: 'id', required: false },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* Specifies the model-id that controlled by this component. */
    modelId: { type: String, required: true },
    /* An object provided to the table component. */
    tableProps: { type: Object, default: () => ({}), required: false },
    formValid: { type: Boolean, default: true, required: false },
    /* An array provided to the table component. */
    value: { type: Array, default: () => [], required: false },
  },
  data() {
    return {
      dialog: false,
      editMode: 'REGIST',
      editItem: null,
      /* A string used for searching items provided to table-props. */
      internalSearch: null,
      isEditing: false,
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
      this.isEditing = true
    },
    onClickEdit(item) {
      this.editItem.initialize(item)
      this.editMode = 'UPDATE'
      this.dialog = true
      this.isEditing = true
    },
    onClickDelete(item) {
      this.editItem.initialize(item)
      this.editMode = 'DELETE'
      this.dialog = true
      this.isEditing = true
    },
    submit() {
      if (!this.formValid) return
      let result
      if (this.editMode === 'REGIST') result = this.regist()
      if (this.editMode === 'UPDATE') result = this.update()
      if (this.editMode === 'DELETE') result = this.delete()
      this.$emit('input', result)
      this.dialog = false
      this.isEditing = false
    },
    regist() {
      const item = JSON.parse(JSON.stringify(this.editItem))
      const result = this.value.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      result.push(item)
      return result
    },
    update() {
      const item = JSON.parse(JSON.stringify(this.editItem))
      const result = this.value.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      const index = this.value.findIndex((item) => {
        return item[this.itemKey] === this.editItem[this.itemKey]
      })
      if (index !== -1) result.splice(index, 1, item)
      return result
    },
    delete() {
      const result = this.value.map((item) => {
        return JSON.parse(JSON.stringify(item))
      })
      const index = this.value.findIndex((item) => {
        return item[this.itemKey] === this.editItem[this.itemKey]
      })
      if (index !== -1) result.splice(index, 1)
      return result
    },
  },
  render(createElement) {
    return createElement(
      'div',
      {},
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
        editMode: this.editMode,
        isEditing: this.isEditing,
        search: {
          attrs: { value: this.internalSearch },
          on: { input: (v) => (this.internalSearch = v) },
        },
        table: {
          attrs: {
            items: this.value,
            search: this.internalSearch,
            actions: this.actions,
            ...this.tableProps,
          },
          on: {
            'click:regist': this.onClickRegist,
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
            // 'click:detail': this.onClickDetail,
          },
        },
        btnRegist: {
          on: {
            click: () => {
              if (this.isEditing) {
                this.submit()
              } else {
                this.onClickRegist()
              }
            },
          },
        },
      })
    )
  },
}
</script>

<style></style>
