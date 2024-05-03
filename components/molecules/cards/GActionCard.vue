<script>
import AIconDelete from '~/components/atoms/icons/AIconDelete.vue'
import AIconDetail from '~/components/atoms/icons/AIconDetail.vue'
import AIconEdit from '~/components/atoms/icons/AIconEdit.vue'
/**
 * ## GActionCard
 * VCardActionsに編集ボタン、削除ボタン、詳細ボタンを配置可能なカードコンポーネントです。
 * このコンポーネントを使用する親コンポーネントがそもそも所有する（はずの）
 * itemをそのまま受け取り、かつslots.defaultでプロパティとして提供しています。
 * 少し違和感のある構成ですが、このコンポーネントがemitするイベントの
 * 引数にitemを含めることにメリットがあります。
 * VDataIteratorコンポーネントがprops.itemsを受け取り、slots.defaultの
 * プロパティとして提供されていることと同様に考えてください。
 *
 * ### PROPS
 * #### actions
 * VCardActionsに表示するボタンを文字列で指定します。
 * 指定できるのは指定できるのは'edit'、'delete'、'detail'です。
 * #### item
 * 当該コンポーネントに表示する情報をオブジェクトで受け取ります。
 * defaultスロットのプロパティとして提供されるほか、
 * props.actionsの指定で表示されたボタンをクリックされた時に
 * イベントとともにemitされます。
 *
 * ### SLOTS
 * #### default
 * メインコンポーネントです。
 * props.itemをスロットプロパティとして使用します。
 * #### append-actions
 * VCardActionsの後部にボタンを追加するために使用します。
 * #### prepend-actions
 * VCardActionsの前部にボタンを追加するために使用します。
 *
 * ### EVENTS
 * #### click:edit
 * 編集ボタンがクリックされた時に、props.itemとともにemitされます。
 * #### click:delete
 * 削除ボタンがクリックされた時に、props.itemとともにemitされます。
 * #### click:detail
 * 詳細ボタンがクリックされた時に、props.itemとともにemitされます。
 *
 * @author shisyamo4131
 */
export default {
  /***************************************************************************
   * COMPONENTS
   ***************************************************************************/
  components: { AIconEdit, AIconDelete, AIconDetail },
  /***************************************************************************
   * PROPS
   ***************************************************************************/
  props: {
    actions: {
      type: Array,
      default: () => [],
      validator: (v) =>
        !v.length ||
        v.some((item) => ['edit', 'delete', 'detail'].includes(item)),
      required: false,
    },
    item: {
      type: Object,
      default: () => {
        return {}
      },
      required: false,
    },
  },
}
</script>

<template>
  <v-card v-bind="$attrs">
    <slot name="default" v-bind="{ item }" />
    <v-card-actions class="justify-end">
      <slot name="prepend-actions" v-bind="{ item }" />
      <v-btn
        v-for="(action, index) of actions"
        :key="index"
        icon
        @click="$emit(`click:${action}`, item)"
      >
        <component :is="`a-icon-${action}`" />
      </v-btn>
      <slot name="append-actions" v-bind="{ item }" />
    </v-card-actions>
  </v-card>
</template>

<style></style>
