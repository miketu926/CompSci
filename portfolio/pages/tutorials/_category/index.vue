<template>
  <div>
    <ui-hero :title="returnCategory" />
    <section class="ui-tutorials">
      <div class="g-container">
        Tutorials category
        <ul>
          <li v-for="article in category" :key="article.slug">
            <nuxt-link :to="`/tutorials/${returnCategory}/${article.slug}`">
              {{ article.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async fetch () {
    const { params } = this.$route
    this.category = await this.$content(`tutorials/articles/${params.category}`).fetch()
  },
  data: () => ({
    category: []
  }),
  computed: {
    returnCategory () {
      return this.$route.params.category
    }
  },
  head () {
    return {
      titleTemplate: `%s - ${this.returnCategory.toUpperCase()}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/shared/tutorials";
</style>
