<template>
  <section class="ui-frameworks">
    <div class="g-container">
      <h2 class="h2">
        Things that i am familiar with
      </h2>
      <div class="heading__separator" />
      <div class="ui-frameworks__tabs">
        <button type="button" :class="{ active: selectedList.length === 13 }" @click="frontend">
          Frontend
        </button>
        <button type="button" :class="{ active: selectedList.length === 9 }" @click="backend">
          Backend
        </button>
        <button type="button" :class="{ active: selectedList.length === 6 }" @click="tools">
          Tools
        </button>
      </div>
      <transition-group tag="ul" class="ui-frameworks__list" name="ui-frameworks__list--animation">
        <li
          v-for="(item, index) in list"
          :key="item"
          class="ui-frameworks__list-item"
          :class="{ active: selectedList.includes(item) }"
          :style="{ borderColor: selectedList.includes(item) ? returnBorderColor : 'transparent'}"
        >
          <span v-if="selectedList.includes(item)">{{ index + 1 }}</span>
          <img :src="`images/frameworks/${item}.jpg`" :alt="item">
        </li>
      </transition-group>
    </div>
  </section>
</template>

<script>
const defaultList = ['nuxt', 'adonis', 'git', 'vue', 'feathers',
  'photoshop', 'angular', 'laravel', 'adobexd', 'react',
  'node', 'figma', 'html', 'php', 'intellij',
  'js', 'mysql', 'heroku', 'ts', 'mongodb',
  'sass', 'css', 'bootstrap', 'mssql', 'vuetify',
  'restapi', 'tailwind', 'jquery']
export default {
  data: () => ({
    list: defaultList,
    selectedList: []
  }),
  computed: {
    returnBorderColor () {
      const { length } = this.selectedList
      if (length === 13) { return '#01c888' } else if (length === 9) { return '#220051' } else if (length === 6) { return '#f05134' } else { return 'transparent' }
    }
  },
  methods: {
    frontend () {
      this.selectedList = ['nuxt', 'vue', 'angular', 'react', 'html',
        'js', 'ts', 'sass', 'css', 'bootstrap',
        'vuetify', 'tailwind', 'jquery']
      this.list = [...new Set([...this.selectedList, ...this.list])]
    },
    backend () {
      this.selectedList = ['adonis', 'feathers', 'laravel', 'node', 'php',
        'mysql', 'mongodb', 'mssql', 'restapi']
      this.list = [...new Set([...this.selectedList, ...this.list])]
    },
    tools () {
      this.selectedList = ['git', 'photoshop', 'adobexd', 'figma', 'intellij',
        'heroku']
      this.list = [...new Set([...this.selectedList, ...this.list])]
    }
  }
}
</script>

<style lang="scss" scoped>
  .ui-frameworks {
    padding-top: 100px;
    padding-bottom: 60px;
    background-color: var(--light-secondary-color);
    clip-path: polygon(0% 100%, 0% 10%, 50% 0%, 100% 10%, 100% 100%);
    min-height: 500px;
    user-select: none;
    @include upToTablet {
      padding-top: 80px;
      padding-bottom: 40px;
      clip-path: polygon(0% 100%, 0% 5%, 50% 0%, 100% 5%, 100% 100%);
    }
    @include upToMobile {
      padding-top: 40px;
      clip-path: none
    }
    &__tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-bottom: 20px;
      @include smallMobile {
        font-size: 16px;
      }
      & > button {
        cursor: pointer;
        margin: 0 5px;
        background-color: transparent;
        padding: 5px 10px;
        color: var(--dark-text-primary-color);
        transition: background-color var(--transition) linear;
        &:hover {
          color: var(--always-text-light-primary);
          transition: none;
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
        &.active {
          color: var(--always-text-light-primary);
        }
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
        &:nth-child(1) {
          border: 2px solid #01c888;
          color: #01c888;
          &:hover, &.active {
            background-color: #01c888;
            color: var(--dark-text-primary-color);
          }
        }
        &:nth-child(2) {
          border: 2px solid #370579;
          color: #370579;
          &:hover, &.active {
            background-color: #370579;
            color: var(--always-light-primary);
          }
        }
        &:nth-child(3) {
          border: 2px solid #f05134;
          color: #f05134;
          &:hover, &.active {
            background-color: #f05134;
            color: var(--dark-text-primary-color);
          }
        }
      }
    }
    &__list {
      position: relative;
      padding: 0;
      list-style: none;
      margin: 0;
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      grid-gap: 20px;
      @include upToSmallDesktop {
        grid-template-columns: repeat(5, 1fr);
      }
      @include upToTablet {
        grid-template-columns: repeat(4, 1fr);
      }
      @include upToMobile {
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;
      }
      @include smallMobile {
        grid-template-columns: repeat(2, 1fr);
      }
      img {
        display: block;
        width: 100%;
      }
      &--animation {
        &-enter, &-leave-to {
          opacity: 0;
          transform: translateY(30px);
        }
        &-leave-active {
          position: absolute;
        }
      }
      &-item {
        position: relative;
        transition: all 1s;
        border: 2px solid transparent;
        border-radius: 3px;
        span {
          position: absolute;
          top: 5px;
          left: 5px;
          font-size: 12px;
          color: var(--always-dark-text-primary);
        }
        &.active {
          border-color: var(--active-color-primary)
        }
      }
    }
  }
  h2 {
    text-align: center;
    text-transform: uppercase;
    margin: 0;
    color: var(--dark-text-primary-color);
  }
</style>
