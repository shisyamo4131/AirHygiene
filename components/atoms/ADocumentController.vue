<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    /* An object priveded to the table component. */
    actions: { type: Array, default: () => [], required: false },
    /* An object provided to the table component. */
    cardProps: { type: Object, default: () => ({}), required: false },
    currentModel: { type: Object, required: true },
    /* An object provided to the dialog component. */
    dialogProps: { type: Object, default: () => ({}), required: false },
    // /* A string used to specified the document. */
    // docId: { type: String, required: true },
    /* A function used to different process from default submit. */
    customSubmit: { type: Function, default: undefined, required: false },
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
          'subscribeDoc',
          'unsubscribe',
        ]
        return required.every((el) => el in v)
      },
      required: true,
    },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      /* An boolean to control the dialog. */
      dialog: false,
      // /* An object extended by the FireModel for editor. */
      // editModel: null,
      /* An boolean used to indicate that processing is in progress. */
      loading: false,
      // /* A listener that subscribe the document. */
      // listener: null,
    }
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    /* Initialize the model if dialog closed. (May not be necessary.) */
    dialog(v) {
      if (!v) {
        this.model.initialize(this.currentModel)
      }
    },
  },
  // /***************************************************************************
  //  * CREATED
  //  ***************************************************************************/
  // created() {
  //   /* Watch the model and doc-id to duplicate the model and subscribe the document. */
  //   this.$watch(
  //     () => ({ model: this.model, docId: this.docId }),
  //     (newVal, oldVal) => {
  //       if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
  //       if (!newVal.model) return
  //       if (!newVal.docId) return
  //       this.editModel = this[`$${newVal.model.constructor.name}`]()
  //       this.editModel.collection = newVal.model.collection
  //       this.listener = this[`$${newVal.model.constructor.name}`]()
  //       this.listener.collection = newVal.model.collection
  //       this.listener.subscribeDoc(newVal.docId)
  //     },
  //     { immediate: true, deep: true }
  //   )
  // },
  // /***************************************************************************
  //  * DESTROYED
  //  ***************************************************************************/
  // destroyed() {
  //   this.listener.unsubscribe()
  // },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async defaultSubmit(mode) {
      if (mode === 'UPDATE') await this.model.update()
      if (mode === 'DELETE') await this.model.delete()
    },
    onClickCancel() {
      this.dialog = false
    },
    onClickDelete() {
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.model.initialize(this.currentModel)
      this.submit('DELETE')
    },
    onClickEdit() {
      this.model.initialize(this.currentModel)
      this.dialog = true
    },
    onClickSubmit() {
      this.submit('UPDATE')
    },
    async submit(mode) {
      try {
        this.loading = true
        if (this.customSubmit) await this.customSubmit(mode)
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
            editMode: 'UPDATE',
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
          attrs: { ...structuredClone(this.model), editMode: 'UPDATE' },
          on: Object.keys(this.model).reduce((sum, i) => {
            sum[`update:${i}`] = ($event) =>
              this.model.initialize({
                ...structuredClone(this.model),
                [i]: $event,
              })
            return sum
          }, {}),
        },
        card: {
          attrs: {
            item: { ...structuredClone(this.currentModel) },
            actions: this.actions,
            ...this.cardProps,
          },
          on: {
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
          },
        },
      })
    )
  },
}
</script>
