<template>
  <div
    class="ui-hero"
    :class="[`ui-hero--${returnClassNameFromTitle}`]"
  >
    <client-only>
      <ui-particles
        class="ui-hero__particles"
        :class="{ 'ui-hero__particles--fullscreen': particlesFullscreen }"
        color="#27293d"
        :particles-number="100"
        shape-type="polygon"
        :particle-size="5"
        movement-direction="top"
        lines-color="#CC0000"
        :line-linked="false"
        :move-speed="0.75"
      />
    </client-only>
    <div class="ui-hero__title">
      <div class="ui-hero__line" />
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
import UiParticles from '../UiParticles'
export default {
  components: { UiParticles },
  props: {
    title: {
      type: String,
      default: ''
    },
    particlesFullscreen: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    returnClassNameFromTitle () {
      return this.title.toLowerCase().replace(/ /g, '')
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui-hero {
    position: relative;
    background-color: var(--always-dark-primary);
    color: var(--always-text-light-primary);
    padding-top: 80px;
    height: 500px;
    max-height: 90vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    @include upToMobile {
      height: 350px;
    }
    &:before {
      content: '';
      background-repeat: no-repeat;
      background-size: contain;
      background-position: bottom center;
      opacity: 0.1;
      position: absolute;
      z-index: $z_index-absolute;
      top: 80px;
      right: 0;
      bottom: 20px;
      left: 0;
    }
    &--contactme {
      &:before {
        background-image: url("~static/images/sections/contactme.svg");
      }
    }
    &--tutorials {
      clip-path: polygon(100% 0%, 100% 90%, 50% 98%, 50% 98%, 0 90%, 0 0);
      &:before {
        background-image: url("~static/images/sections/tutorials.svg");
      }
    }
    &--projects {
      clip-path: polygon(100% 0%, 100% 90%, 50% 98%, 50% 98%, 0 90%, 0 0);
      &:before {
        background-image: url("~static/images/sections/projects.svg");
      }
    }
    &__particles {
      position: absolute;
      z-index: $z_index-absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
      &--fullscreen {
        position: fixed;
        z-index: 1;
      }
    }
    &__line {
      margin: 0 auto 10px auto;
      width: 100px;
      border-bottom: 3px solid var(--active-color-primary);
    }
    &__title {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      pointer-events: none;
      h1 {
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 0 0 5px 0;
        font-size: 40px;
        font-weight: 400;
        strong {
          color: var(--active-color-primary);
        }
        @include upToMobile {
          font-size: 32px;
        }
        @include smallMobile {
          font-size: 24px;
        }
      }
    }
  }
</style>
