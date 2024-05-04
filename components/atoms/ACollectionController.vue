<script>
/**
 * ## ACollectionController
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    /* An object priveded to the table component. */
    actions: { type: Array, default: () => [], required: false },
    /* A function used to different process from default submit. */
    customSubmit: { type: Function, default: undefined, required: false },
    /* An object used to initialize the model when edit-mode is 'REGIST'. */
    defaultItem: { type: Object, default: () => ({}), required: false },
    /* An object provided to the dialog component. */
    dialogProps: { type: Object, default: () => ({}), required: false },
    /* A string used to specify the item in props.items */
    itemKey: { type: String, default: 'docId', required: false },
    /* An array provided to the table component. */
    items: { type: Array, default: () => [], required: false },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* A object controlled by this component. Must be extended by the FireModel. */
    model: {
      type: Object,
      validator: (v) => {
        const required = [
          'collection',
          'initialize',
          'create',
          'update',
          'delete',
        ]
        return required.every((el) => el in v)
      },
      required: true,
    },
    /* An object provided to the table component. */
    tableProps: { type: Object, default: () => ({}), required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      /* An boolean to control the dialog. */
      dialog: false,
      /* A string used to control the edit-mode. */
      editMode: 'REGIST',
      /* An boolean used to indicate that processing is in progress. */
      loading: false,
      /* A number used to controll a pagination component. */
      page: 1,
      /* A number used to controll a pagination component. */
      pageCount: 0,
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    dialog(v) {
      if (!v) {
        // this.editModel.initialize(this.defaultItem)
        this.model.initialize(this.defaultItem)
        this.editMode = 'REGIST'
      }
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async defaultSubmit(mode) {
      if (mode === 'REGIST') await this.model.create()
      if (mode === 'UPDATE') await this.model.update()
      if (mode === 'DELETE') await this.model.delete()
    },
    onClickCancel() {
      this.dialog = false
    },
    async onClickDelete(item) {
      if (!item) return
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.editMode = 'DELETE'
      this.model.initialize(item)
      await this.submit('DELETE')
      this.model.initialize(this.defaultItem)
      this.editMode = 'REGIST'
    },
    onClickDetail(item) {
      this.$emit('click:detail', item)
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      // this.editModel.initialize(item)
      this.model.initialize(item)
      this.dialog = true
    },
    onClickSubmit() {
      this.submit(this.editMode)
    },
    async submit(mode) {
      try {
        this.loading = true
        if (this.customSubmit)
          await this.customSubmit({ model: this.model, editMode: mode })
        if (!this.customSubmit) await this.defaultSubmit(mode)
        this.$emit(`submit:${mode.toLowerCase()}`, structuredClone(this.model))
        this.dialog = false
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
        this.$emit('submit:error')
      } finally {
        this.loading = false
      }
    },
  },
  /***************************************************************************
   * RENDER
   ***************************************************************************/
  render(createElement) {
    return createElement(
      'div',
      {},
      this.$scopedSlots.default({
        dialog: {
          attrs: {
            editMode: this.editMode,
            label: this.label,
            loading: this.loading,
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
          attrs: {
            ...structuredClone(this.model),
            editMode: this.editMode,
          },
          on: Object.keys(this.model).reduce((sum, i) => {
            sum[`update:${i}`] = ($event) =>
              this.model.initialize({
                ...structuredClone(this.model),
                [i]: $event,
              })
            return sum
          }, {}),
        },
        page: this.page,
        pageCount: this.pageCount,
        pagination: {
          attrs: {
            length: this.pageCount,
            value: this.page,
          },
          on: {
            input: ($event) => (this.page = $event),
          },
        },
        table: {
          attrs: {
            actions: this.actions,
            itemKey: this.itemKey,
            items: this.items,
            page: this.page,
            ...this.tableProps,
          },
          on: {
            'update:page': ($event) => (this.page = $event),
            'page-count': ($event) => (this.pageCount = $event),
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
            'click:detail': this.onClickDetail,
          },
        },
        updates: {
          page: ($event) => {
            this.page = $event
          },
        },
      })
    )
  },
}
</script>
