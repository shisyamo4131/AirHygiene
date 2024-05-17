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
    actions: {
      type: Array,
      default: () => ['edit', 'delete', 'detail'],
      validator: (v) =>
        !v.length ||
        v.every((action) => ['edit', 'delete', 'detail'].includes(action)),
      required: false,
    },
    /* A function used to different process from default submit. */
    customSubmit: { type: Function, default: undefined, required: false },
    /* An object used to initialize the model when edit-mode is 'REGIST'. */
    defaultItem: { type: Object, default: () => ({}), required: false },
    /* An object provided to the dialog component. */
    dialogProps: { type: Object, default: () => ({}), required: false },
    /* A form will be disabled if true. */
    disabledForm: { type: Boolean, default: false, required: false },
    /* An object provided to the form component in form-slot. */
    formProps: { type: Object, default: () => ({}), required: false },
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
      /* A card object. */
      card: null,
      /* An boolean to control the dialog. */
      dialog: false,
      /* A string used to control the edit-mode. */
      editMode: 'REGIST',
      /* A form object. */
      form: null,
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
    defaultItem: {
      handler(newVal) {
        this.model.initialize({ ...structuredClone(this.model), ...newVal })
      },
      immediate: true,
      deep: true,
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    initialize() {
      this.dialog = false
      this.model.initialize(this.defaultModel)
      this.editMode = 'REGIST'
      if (this.form) this.form.resetValidation()
      if (this.card && 'scrollToTop' in this.card) this.card.scrollToTop()
    },
    async defaultSubmit(mode) {
      if (mode === 'REGIST') await this.model.create()
      if (mode === 'UPDATE') await this.model.update()
      if (mode === 'DELETE') await this.model.delete()
    },
    onClickCancel() {
      this.initialize()
    },
    async onClickDelete(item) {
      if (!item) return
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.editMode = 'DELETE'
      this.model.initialize(item)
      await this.submit('DELETE')
      this.initialize()
    },
    onClickDetail(item) {
      this.$emit('click:detail', item)
    },
    onClickEdit(item) {
      this.editMode = 'UPDATE'
      this.model.initialize(item)
      this.dialog = true
    },
    async onClickSubmit() {
      if (this.editMode !== 'DELETE' && this.form && !this.form.validate()) {
        alert('入力に不備があります。')
        return
      }
      await this.submit(this.editMode)
      this.initialize()
    },
    async submit(mode) {
      try {
        this.loading = true
        if (this.customSubmit)
          await this.customSubmit({ model: this.model, editMode: mode })
        if (!this.customSubmit) await this.defaultSubmit(mode)
        this.$emit(`submit:${mode.toLowerCase()}`, structuredClone(this.model))
        // this.dialog = false
        // this.model.initialize(this.defaultModel)
        // this.editMode = 'REGIST'
        // if (this.form) this.form.resetValidation()
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
        card: {
          attrs: {
            editMode: this.editMode,
            label: this.label,
            ref: (el) => (this.card = el),
          },
          on: {
            'click:cancel': this.onClickCancel,
            'click:submit': this.onClickSubmit,
          },
        },
        dialog: {
          attrs: {
            editMode: this.editMode,
            persistent: true,
            scrollable: true,
            value: this.dialog,
            ...this.dialogProps,
          },
          on: {
            input: (v) => (this.dialog = v),
            // 'click:cancel': this.onClickCancel,
            // 'click:submit': this.onClickSubmit,
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
        form: {
          attrs: {
            disabled: this.loading || this.disabledForm,
            ref: (el) => (this.form = el),
            ...this.formProps,
          },
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
        submit: {
          attrs: {
            disabled: this.loading || this.disabledForm,
            loading: this.loading,
          },
          on: {
            click: this.onClickSubmit,
          },
        },
        cancel: {
          attrs: {
            disabled: this.loading,
          },
          on: {
            click: this.onClickCancel,
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
