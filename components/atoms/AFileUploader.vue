<script>
import imageCompression from 'browser-image-compression'

export default {
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    accept: { type: String, default: 'image/*', required: false },
    compressOptions: {
      type: Object,
      default: () => ({ maxSizeMB: 2 }),
      required: false,
    },
    fileName: { type: undefined, required: true },
    noCompress: { type: Boolean, default: false, required: false },
    directory: { type: undefined, required: true },
    thumb: { type: String, default: 'thumb', required: false },
  },
  /***************************************************************************
   * DATA
   ***************************************************************************/
  data() {
    return {
      file: null,
      loading: false,
    }
  },
  /***************************************************************************
   * COMPUTED
   ***************************************************************************/
  computed: {
    computedFileName() {
      if (!this.fileName) return undefined
      return `${this.fileName}.${this.extension.toLowerCase()}`
    },
    extension() {
      if (!this.file) return undefined
      const pop = this.file.name.split('.').pop()
      if (!pop) throw new Error('Could not get extension.')
      return pop.split('?')[0]
    },
  },
  /***************************************************************************
   * METHODS
   ***************************************************************************/
  methods: {
    async compressImage(options) {
      try {
        return await imageCompression(this.file, options)
      } catch (error) {
        // eslint-disable-next-line
        console.error('An error has occured at compressImage().', error)
        throw error
      }
    },
    async upload() {
      if (!this.validator()) return
      try {
        const result = {
          // src: `${this.directory}/${this.computedFileName}`,
          // thumb: `${this.directory}/${this.thumb}/${this.computedFileName}`,
          url: '',
          thumb: '',
        }
        this.loading = true
        const uploadFile = this.noCompress
          ? this.file
          : await this.compressImage(this.options)
        result.url = await this.$fileUploader(
          uploadFile,
          `${this.directory}/${this.computedFileName}`
        )
        if (this.thumb) {
          const thumbFile = await this.compressImage({ maxSizeMB: 0.2 })
          result.thumb = await this.$fileUploader(
            thumbFile,
            `${this.directory}/${this.thumb}/${this.computedFileName}`
          )
        }
        this.file = null
        this.$emit('upload:complete', result)
      } catch (err) {
        // eslint-disable-next-line
        console.error(err)
        alert(err.message)
      } finally {
        this.loading = false
      }
    },
    validator() {
      if (!this.directory || !this.fileName) {
        // eslint-disable-next-line
        console.error('Parameters directory and file-name are required.')
        return false
      }
      if (
        typeof this.directory !== 'string' ||
        typeof this.fileName !== 'string'
      ) {
        // eslint-disable-next-line
        console.error('Parameters directory and file-name must be string.')
        return false
      }
      return true
    },
  },
  /***************************************************************************
   * RENDER
   ***************************************************************************/
  render(createElement) {
    return createElement('div', {}, [
      this.$scopedSlots.default({
        attrs: {
          accept: this.accept,
          disabled: this.loading,
          value: this.file,
        },
        on: {
          change: (v) => (this.file = v),
        },
        uploader: {
          attrs: {
            disabled:
              !this.fileName || !this.directory || !this.file || this.loading,
            loading: this.loading,
          },
          on: { click: this.upload },
        },
      }),
    ])
  },
}
</script>
