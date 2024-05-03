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
    /* An array provided to the table component. */
    items: { type: Array, default: () => [], required: false },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* A object that duplicated and controlled by this component. Should be extended by the FireModel. */
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
      /* The model duplicated by the props.model and controlled by this component. */
      editModel: null,
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
        this.editModel.initialize(this.defaultItem)
        this.editMode = 'REGIST'
      }
    },
    model: {
      handler(v) {
        this.editModel = this[`$${v.constructor.name}`]()
        this.editModel.collection = v.collection
      },
      immediate: true,
      deep: true,
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async defaultSubmit(mode) {
      if (mode === 'REGIST') await this.editModel.create()
      if (mode === 'UPDATE') await this.editModel.update()
      if (mode === 'DELETE') await this.editModel.delete()
    },
    onClickCancel() {
      this.dialog = false
    },
    async onClickDelete(item) {
      if (!item) return
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.editMode = 'DELETE'
      this.editModel.initialize(item)
      await this.submit('DELETE')
      this.editModel.initialize()
      this.editMode = 'REGIST'
    },
    onClickDetail(item) {
      this.$emit('click:detail', item)
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      // this.model.initialize(item)
      this.editModel.initialize(item)
      this.dialog = true
    },
    onClickSubmit() {
      this.submit(this.editMode)
    },
    async submit(mode) {
      try {
        this.loading = true
        if (this.customSubmit)
          await this.customSubmit({ model: this.editModel, editMode: mode })
        if (!this.customSubmit) await this.defaultSubmit(mode)
        this.$emit(`submit:${mode}`, this.modelAttrs)
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
        model: {
          attrs: {
            ...structuredClone(this.editModel),
            editMode: this.editMode,
          },
          on: Object.keys(this.editModel).reduce((sum, i) => {
            sum[`update:${i}`] = ($event) => (this.editModel[i] = $event)
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
            items: this.items,
            actions: this.actions,
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
