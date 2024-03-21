<template>
  <div>
    <ui-hero :title="article.name" />
    <section class="ui-tutorials">
      <div class="g-container">
        Tutorials article
        <nuxt-content :document="article" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async fetch () {
    const { params } = this.$route
    this.article = await this.$content(`tutorials/articles/${this.returnCategory}/${params.article}`).fetch()
  },
  data: () => ({
    article: {}
  }),
  computed: {
    returnCategory () {
      return this.$route.params.category
    }
  },
  head () {
    return {
      titleTemplate: `%s - ${this.article.name}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/shared/tutorials";
</style>
