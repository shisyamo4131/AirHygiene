<script>
export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    /* An object provided to the table component. */
    cardProps: { type: Object, default: () => ({}), required: false },
    /* A string used to specified the document. */
    docId: { type: String, required: true },
    /* A function used to different process from default submit. */
    customSubmit: { type: Function, default: undefined, required: false },
    /* A string provided to dialog component. */
    label: { type: String, default: undefined, required: false },
    /* Specifies the model-id that controlled by this component. */
    modelId: { type: String, required: true },
    /* Specifies the parent-id that the model controlled by this component depends on. */
    parentId: { type: [String, Object], default: undefined, required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      /* An boolean to control the dialog. */
      dialog: false,
      /* An object extended by the FireModel for editor. */
      editModel: null,
      /* An boolean used to indicate that processing is in progress. */
      loading: false,
      /* The model controlled by this component. */
      model: null,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    /* Returns definitions of update events for all properties of the edit-model. */
    editorOn() {
      return Object.keys(this.editModel).reduce((result, key) => {
        result[`update:${key}`] = ($event) => {
          this.editModel[key] = $event
        }
        return result
      }, {})
    },
  },
  /***************************************************************************
   * WATCH
   ***************************************************************************/
  watch: {
    /* Initialize the edit-model if dialog closed. (May not be necessary.) */
    dialog(v) {
      if (!v) {
        this.editModel.initialize(this.model)
      }
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  created() {
    /* Watch the model-id, parent-id, doc-id to define the model and subscribe the document. */
    this.$watch(
      () => ({
        modelId: this.modelId,
        parentId: this.parentId,
        docId: this.docId,
      }),
      (newVal, oldVal) => {
        if (JSON.stringify(newVal) === JSON.stringify(oldVal)) return
        if (!newVal.modelId) return
        if (!newVal.docId) return
        if (!newVal.parentId) {
          this.model = this[`$${newVal.modelId}`]()
          this.editModel = this[`$${newVal.modelId}`]()
        } else {
          this.model = this[`$${newVal.modelId}`](newVal.parentId)
          this.editModel = this[`$${newVal.modelId}`](newVal.parentId)
        }
        this.model.subscribeDoc(newVal.docId)
      },
      { immediate: true }
    )
  },
  /***************************************************************************
   * DESTROYED
   ***************************************************************************/
  destroyed() {
    this.model.unsubscribe()
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async defaultSubmit(mode) {
      if (mode === 'UPDATE') await this.editModel.update()
      if (mode === 'DELETE') await this.editModel.delete()
    },
    onClickCancel() {
      this.dialog = false
    },
    onClickDelete() {
      const answer = window.confirm('削除してもよろしいですか？')
      if (!answer) return
      this.editModel.initialize(this.model)
      this.submit('DELETE')
    },
    onClickEdit() {
      this.editModel.initialize(this.model)
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
        this.$emit(`submit:${mode.toLowerCase()}`)
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
          },
          on: {
            input: (v) => (this.dialog = v),
            'click:cancel': this.onClickCancel,
            'click:submit': this.onClickSubmit,
          },
        },
        editor: {
          attrs: { ...this.editModel, editMode: 'UPDATE' },
          on: this.editorOn,
        },
        model: this.model,
        card: {
          attrs: { item: this.model, ...this.cardProps },
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
