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
      card: null,
      /* An boolean to control the dialog. */
      dialog: false,
      editCard: null,
      form: null,
      /* An boolean used to indicate that processing is in progress. */
      loading: false,
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
        if (this.editCard && 'scrollToTop' in this.editCard)
          this.editCard.scrollToTop()
      }
    },
  },
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
        editCard: {
          attrs: {
            editMode: 'UPDATE',
            label: this.label,
            ref: (el) => (this.editCard = el),
          },
          on: {
            'click:cancel': this.onClickCancel,
            'click:submit': this.onClickSubmit,
          },
        },
        card: {
          attrs: {
            actions: this.actions,
            item: { ...structuredClone(this.currentModel) },
            ref: (el) => (this.card = el),
            ...this.cardProps,
          },
          on: {
            'click:edit': this.onClickEdit,
            'click:delete': this.onClickDelete,
          },
        },
        dialog: {
          attrs: {
            editMode: 'UPDATE',
            // label: this.label,
            // loading: this.loading,
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
        form: {
          attrs: {
            disabled: this.editMode === 'DELETE',
            ref: (el) => (this.form = el),
            ...this.formProps,
          },
          on: {},
        },
      })
    )
  },
}
</script>
