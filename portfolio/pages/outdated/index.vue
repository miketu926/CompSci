<template>
  <div class="outdated">
    <client-only>
      <ui-particles
        class="outdated__particles"
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
    <div class="outdated__content">
      <h1 class="h1">
        Your browser is <strong>out of date</strong>
      </h1>
      <p class="p">
        It looks like you may be using a web browser version that we don't support.
        Make sure you're using the most recent version of your browser, or try using one of these supported browsers, to get the full website experience.
      </p>
      <ul>
        <li
          v-for="item in browsersList"
          :key="item.name"
        >
          <a :href="item.href" target="_blank" :data-before-content="item.name">
            <i :class="[item.icon]" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import UiParticles from '@/components/UiParticles'

export default {
  components: { UiParticles },
  data: () => ({
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
  head: () => ({
    titleTemplate: '%s - Outdated'
  }),
  layout: 'clean'
}
</script>

<style lang="scss" scoped>
  .outdated{
    height: 100vh;
    background-color: var(--dark-primary-color);
    color: var(--light-text-primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    &:before {
      content: '';
      background-image: url("~static/images/sections/outdated.svg");
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
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
        li {
          display: inline-block;
          margin: 0 10px;
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
          a {
            position: relative;
            display: block;
            font-size: 40px;
            color: var(--light-text-primary-color);
            @include upToMobile {
              font-size: 30px;
            }
            &:after {
              content: attr(data-before-content);
              opacity: 0;
              position: absolute;
              top: calc(100% + 5px);
              font-size: 14px;
              transition: opacity var(--transition);
              width: 100px;
              text-align: center;
              left: -30px;
            }
            &:hover {
              &:after {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
</style>
