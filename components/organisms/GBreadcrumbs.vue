<template>
  <v-breadcrumbs v-bind="$attrs" v-on="$listeners" />
</template>

<script>
export default {
  props: {
    path: { type: String, required: true },
  },
  data() {
    return {
      labels: {
        customers: '取引先',
      },
    }
  },
  computed: {
    items() {
      const separated = this.path.split('/')
      separated.shift()
      const result = separated
        .reduce((sum, i) => {
          sum.push([...sum, i].join('/'))
          return sum
        }, [])
        .map((item) => {
          const text = this.getLabel(item)
          return {
            text,
            to: `/${item}`,
          }
        })
      result.unshift({ text: 'TOP', to: '/' })
      return result
    },
  },
}
</script>

<style></style>
