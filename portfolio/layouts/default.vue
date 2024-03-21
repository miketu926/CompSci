<template>
  <div>
    <ui-navbar />
    <Nuxt />
    <ui-footer />
  </div>
</template>

<script>
export default {
  mounted () {
    if (this.$ua.browser() === 'Internet Explorer') {
      return this.$router.push('/outdated')
    }
  }
}
</script>
