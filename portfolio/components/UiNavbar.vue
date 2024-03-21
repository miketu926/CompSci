<template>
  <nav class="ui-navbar">
    <div
      class="g-container ui-navbar__container ui-navbar__container--transparent"
    >
      <div class="ui-navbar__logo" @click="$router.push('/')">
        <img src="~static/images/avatar35.png" alt="Avatar">
        <span>Nemanja <strong>Dragun</strong></span>
      </div>
      <ul class="ui-navbar__links">
        <li v-for="link in links" :key="link.href">
          <nuxt-link class="ui-navbar__link" :to="link.href" :class="{'ui-navbar__link--bordered': link.bordered}">
            <i v-if="link.icon" :class="[link.icon]" />{{ link.name }}
          </nuxt-link>
        </li>
        <li class="ui-navbar__link--theme">
          <a title="Dark/Light theme" role="button" @click="toggleTheme()"><i
            class="fas"
            :class="themeToChose === 'dark' ? 'fa-moon' :
              'fa-sun'"
          /></a>
        </li>
        <li class="ui-navbar__link--theme">
          <a title="Accessibility theme" role="button" @click="accessibilityTheme()"><i class="fas fa-universal-access" /></a>
        </li>
        <li class="ui-navbar__link--hamburger">
          <a title="Hamburger menu" role="button" :class="{active: showMobileMenu}" @click.stop="toggleMenu()"><i class="fas fa-bars" /></a>
        </li>
      </ul>
    </div>
    <div v-click-outside="onCloseMobileMenu" class="ui-navbar__mobile" :class="{ active: showMobileMenu }">
      <div>
        <ul class="ui-navbar__links">
          <li v-for="link in links" :key="link.href">
            <nuxt-link class="ui-navbar__link" :to="link.href" :class="{'ui-navbar__link--bordered': link.bordered}">
              <i v-if="link.icon" :class="[link.icon]" />{{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import clickOutside from '~/directives/clickOutside'
export default {
  directives: {
    clickOutside
  },
  data: () => ({
    links: [
      {
        name: 'Home',
        href: '/',
        icon: 'fas fa-home'
      },
      {
        name: 'Projects',
        href: '/projects'
      },
      // {
      //   name: 'Tutorials',
      //   href: '/tutorials'
      // },
      {
        name: 'Contact me',
        href: '/contact',
        bordered: true
      }
    ],
    showMobileMenu: false
  }),
  computed: {
    themeToChose () {
      return this.$store.state.theme.palette === 'light' ? 'dark' : 'light'
    },
    themeToDelete () {
      return this.$store.state.theme.palette !== 'light' ? 'dark' : 'light'
    }
  },
  watch: {
    '$route.path': {
      handler () {
        this.onCloseMobileMenu()
      }
    }
  },
  async mounted () {
    if (this.$cookies.get('theme')) {
      await this.$store.commit('theme/SET_THEME', this.$cookies.get('theme'))
      this.selectTheme()
    }
  },
  methods: {
    async toggleTheme () {
      await this.$store.commit('theme/SET_THEME', this.themeToChose)
      this.selectTheme()
    },
    selectTheme () {
      document.documentElement.classList.remove(`theme-${this.themeToChose}`)
      document.documentElement.classList.remove('theme-accessibility')
      document.documentElement.classList.add(`theme-${this.themeToDelete}`)
    },
    accessibilityTheme () {
      document.documentElement.classList.remove(`theme-${this.themeToChose}`)
      document.documentElement.classList.add('theme-accessibility')
    },
    toggleMenu () {
      this.showMobileMenu = !this.showMobileMenu
    },
    onCloseMobileMenu () {
      this.showMobileMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui-navbar {
    top: 0;
    position: absolute;
    width: 100%;
    z-index: $z_index-fixed;
    user-select: none;
    &__container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 80px;
      background-color: var(--always-dark-primary);
      &--transparent {
        background-color: transparent;
      }
    }
    &__logo {
      text-transform: uppercase;
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      color: var(--always-text-light-primary);
      display: flex;
      align-items: center;
      img {
        $size: 35px;
        width: $size;
        height: $size;
        display: block;
      }
      span {
        margin-left: 10px;
        @include upToMobile {
          display: none;
        }
      }
      strong {
        color: var(--active-color-primary);
      }
    }
    &__links {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        display: inline-block;
        margin: 0 10px;
        a {
          padding: 5px 10px;
          cursor: pointer;
          font-size: 16px;
          color: var(--always-text-light-primary);
          text-decoration: none;
          text-transform: uppercase;
          i {
            margin-right: 10px;
          }
        }
      }
    }
    &__link {
      @include upToSmallDesktop {
        display: none;
      }
      &:hover, &.nuxt-link-exact-active {
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
      &--bordered {
        //border-left: 1px solid var(--active-color-primary);
        //border-right: 1px solid var(--active-color-primary);
        border: 1px solid rgba(255, 255, 255, 0.05);
        background-color: rgba(255, 255, 255, 0.025);
        border-radius: 3px;
      }
      &--theme {
        margin: 0 !important;
        i {
          margin: 0 !important;
        }
      }
      &--hamburger {
        display: none !important;
        margin-right: 0 !important;
        a {
          &.active {
            color: var(--active-color-primary);
          }
        }
        i {
          margin: 0 !important;
        }
        @include upToSmallDesktop {
          display: inline-block !important;
        }
      }
    }
    &__mobile {
      display: none;
      height: 100vh;
      overflow-y: auto;
      position: fixed;
      width: calc(100% - 55px);
      max-width: 320px;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(var(--dark-primary-color-rgb), 0.9);
      z-index: $z_index-dropdown-navbar;
      transform: translateX(-100%);
      transition: transform var(--transition);
      @include upToSmallDesktop {
        display: block;
      }
      &.active {
        transform: translateX(0);
      }
      .ui-navbar__links{
        display: flex !important;
        flex-direction: column !important;
        padding: 40px !important;
        li {
          margin: 10px 0;
        }
      }
      .ui-navbar__link {
        display: inline-block !important;
        color: var(--light-text-primary-color) !important;
      }
    }
  }
</style>
