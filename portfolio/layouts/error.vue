<template>
  <div class="error">
    <client-only>
      <ui-particles
        class="error__particles"
        color="#27293d"
        :particles-number="100"
        shape-type="star"
        :particle-size="5"
        movement-direction="top"
        lines-color="#CC0000"
        :line-linked="false"
        :move-speed="0.75"
      />
    </client-only>
    <div class="error__content">
      <h1 class="h1">
        Page <strong>not found</strong>
      </h1>
      <p class="p">
        The requested page does not exist. We will try to automatically redirect you in {{ timer }} seconds.
        <br>
        <br>
        Please go to homepage by clicking the button below
      </p>
      <button type="button" @click="$router.push('/')">
        Go to <strong>homepage</strong>
      </button>
    </div>
  </div>
</template>

<script>
import UiParticles from '@/components/UiParticles'

export default {
  components: { UiParticles },
  layout: 'clean',
  data: () => ({
    timer: 10,
    browsersList: [
      {
        name: 'Chrome',
        href: 'https://www.google.com/chrome/',
        icon: 'fab fa-chrome'
      },
      {
        name: 'Firefox',
        href: 'https://www.mozilla.org/download',
        icon: 'fab fa-firefox-browser'
      },
      {
        name: 'Opera',
        href: 'https://www.opera.com/download',
        icon: 'fab fa-opera'
      },
      {
        name: 'Safari',
        href: 'https://www.apple.com/safari/',
        icon: 'fab fa-safari'
      },
      {
        name: 'Edge',
        href: 'https://www.microsoft.com/edge',
        icon: 'fab fa-edge'
      }
    ]
  }),
  mounted () {
    this.setTimer()
  },
  methods: {
    setTimer () {
      setTimeout(() => {
        this.timer -= 1
        if (this.timer >= 1) {
          this.setTimer()
        } else {
          this.$router.push('/')
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.error{
  height: 100vh;
  background-color: var(--dark-primary-color);
  color: var(--light-text-primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  &:before {
    content: '';
    background-image: url("~static/images/sections/notfound.svg");
    background-repeat: no-repeat;
    background-size: 50%;
    background-position: center;
    opacity: 0.1;
    position: absolute;
    z-index: $z_index-absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  &__particles {
    position: absolute;
    z-index: $z_index-absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
  }
  &__content {
    text-align: center;
    max-width: 768px;
    margin: auto;
    position: relative;
    z-index: $z_index-absolute;
    h1 {
      margin: 0 0 20px 0;
      font-weight: 400;
      text-transform: uppercase;
      strong {
        color: var(--error-color)
      }
    }
    p {
      margin: 0 auto 40px auto;
      max-width: 468px;
      font-size: 16px;
      line-height: 24px;
    }
    button {
      cursor: pointer;
      border: 1px solid var(--light-border-secondary-color);
      background-color: var(--light-primary-color);
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      border-radius: var(--radius);
      text-transform: uppercase;
      font-weight: 400;
      &:hover {
        -webkit-mask-image: linear-gradient(-75deg,rgba(0,0,0,.6) 30%,#000 50%,rgba(0,0,0,.6) 70%);
        -webkit-mask-size: 200%;
        -webkit-animation: shine-data 2s infinite;
        animation: shine-data 2s infinite
      }
      @-webkit-keyframes shine-data {
        0% {
          -webkit-mask-position: 150%
        }

        to {
          -webkit-mask-position: -50%
        }
      }
    }
  }
}
</style>
