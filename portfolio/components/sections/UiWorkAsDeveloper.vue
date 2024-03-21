<template>
  <section id="ui-work-as-developer" class="ui-work-as-developer">
    <div class="g-container">
      <h2 class="h2">
        Why do i love to work as developer?
      </h2>
      <div class="heading__separator" />
      <div class="ui-work-as-developer__cards">
        <div v-for="(item, index) in list" :key="index" class="ui-work-as-developer__card">
          <i :class="[item.icon]" />
          <h3 class="h3">
            {{ item.name }}
          </h3>
          <p class="p">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    list: [
      {
        name: 'Ability to learn',
        description: 'The thing I love about this job is that I am learning something new every day. Each day I meet new obstacles I love to solve. Each day brings me something new and exciting. Working as a developer is my passion. I love to spend time coding and reading articles.',
        icon: 'fas fa-book'
      },
      {
        name: 'Workplace',
        description: 'It\'s nice to have the opportunity to work fully/partly remotely or from the Office. I love the combination. Often working from home gives me more focus and perks to organize my day while working from Office brings closer teamwork.',
        icon: 'fas fa-home'
      },
      {
        name: 'Team player and individual',
        description: 'I am comfortable working on projects alone, or as a part of a bigger team. It\'s nice to have the opportunity to meet a lot of great people, great developers. Being a part of a team has its challenges but I\'m loving the benefits of growing faster, learning more, and sharing my own experience with others!',
        icon: 'fas fa-user-friends'
      },
      {
        name: 'How am I trying to stay successful?',
        description: 'In order to be successful I am giving my best in everything that I do! In this job I have to be up to date with everything. Things that I code today might be outdated tomorrow. Community is growing, a lot of new things shows up on daily basis. By reading articles and learning new stuff I can improve my skills and make my code even better!',
        icon: 'fas fa-trophy'
      }
    ]
  })
}
</script>

<style lang="scss" scoped>
  .ui-work-as-developer {
    padding-top: 60px;
    padding-bottom: 100px;
    background-color: var(--light-primary-color);
    @include upToTablet {
      padding-top: 40px;
      padding-bottom: 80px;
    }
    @include upToMobile {
      padding-bottom: 40px;
    }
    &__cards {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;
      @include upToTablet {
        grid-template-columns: 1fr;
      }
      @include upToMobile {
        grid-gap: 10px;
      }
    }
    &__card {
      position: relative;
      overflow: hidden;
      background-color: var(--light-secondary-color);
      border: 1px solid var(--light-border-secondary-color);
      padding: 40px;
      text-align: center;
      border-radius: var(--radius);
      box-shadow: var(--box-shadow-box);
      color: var(--dark-text-primary-color);
      @include upToTablet {
        padding: 40px 20px;
      }
      i {
        color: var(--dark-primary-color);
        position: absolute;
        top: 5%;
        left: -5%;
        font-size: 200px;
        opacity: 0.05;
        -webkit-mask-image: linear-gradient(-75deg,rgba(0,0,0,.6) 30%,var(--dark-primary-color) 50%,rgba(0,0,0,.6) 70%);
        -webkit-mask-size: 200%;
        -webkit-animation: shine-data 2s infinite;
        animation: shine-data 2s infinite;
        @-webkit-keyframes shine-data {
          0% {
            -webkit-mask-position: 150%
          }

          to {
            -webkit-mask-position: -50%
          }
        }
      }
      h3, p {
        position: relative;
      }
      h3 {
        margin: 0 0 20px 0;
      }
      p {
        margin: 0;
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
