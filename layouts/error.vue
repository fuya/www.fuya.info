<template>
  <div :class="$style.body">
    <div :class="$style.statusCode">
      {{ error.statusCode }}
    </div>
    <div v-if="error.statusCode === 404">
      申し訳ありませんが、お探しのページはみつかりませんでした。
    </div>
    <div v-else>
      申し訳ありませんが、エラーが発生しました。
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      required: true,
      type: Object
    }
  },
  head: {
    meta: [
      {
        hid: 'robots',
        name: 'robots',
        content: 'noindex'
      }
    ]
  }
}
</script>

<style lang="scss" module>
.body {
  padding: 2rem 0;
  text-align: center;
}

.statusCode {
  font-size: $x-huge-font-size * 3;
}
</style>
