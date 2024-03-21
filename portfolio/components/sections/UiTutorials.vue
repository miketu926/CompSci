<template>
  <section class="ui-tutorials">
    <div class="g-container">
      Tutorials
      <ul>
        <li v-for="category in categories" :key="category.slug">
          <nuxt-link :to="`/tutorials/${category.slug}`">
            {{ category.name }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  async fetch () {
    this.categories = await this.$content('tutorials/categories').fetch()
  },
  data: () => ({
    categories: []
  })
}
</script>

<style lang="scss" scoped>
@import "~assets/styles/shared/tutorials";
</style>
