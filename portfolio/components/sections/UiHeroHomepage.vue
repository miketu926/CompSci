<template>
  <div class="ui-hero-homepage">
    <client-only>
      <ui-particles
        class="ui-hero-homepage__particles"
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
    <img class="ui-hero-homepage__me-float" src="~static/images/me.png" alt="Me">
    <div class="ui-hero-homepage__me">
      <div class="ui-hero-homepage__line" />
      <h1>I'm <strong>Nemanja Dragun</strong></h1>
      <div class="ui-hero-homepage__role">
        Full-stack <strong>Web Developer</strong>
      </div>
    </div>
    <div class="g-container ui-hero-homepage__bottom-bar">
      <div>
        <a title="Facebook" rel="noreferrer" href="https://www.facebook.com/Nemanja-Dragun-Web-Developer-115450890258939/" target="_blank">
          <i class="fab fa-facebook-f" />
        </a>
        <a title="Twitter" rel="noreferrer" href="https://twitter.com/nemanjadragun" target="_blank">
          <i class="fab fa-twitter" />
        </a>
        <a title="LinkedIn" rel="noreferrer" href="https://www.linkedin.com/in/nemanja-dragun/" target="_blank">
          <i class="fab fa-linkedin-in" />
        </a>
        <a title="Discord" rel="noreferrer" href="https://discord.gg/mBqdz2a" target="_blank">
          <i class="fab fa-discord" />
        </a>
        <a title="Skype" rel="noreferrer" href="skype:live:nemanjadragun?chat" target="_blank">
          <i class="fab fa-skype" />
        </a>
      </div>
      <div v-scroll-to="'#ui-work-as-developer'">
        <span><i class="fas fa-mouse" /></span>
        <div>
          Scroll down
        </div>
      </div>
      <div>
        <span><i class="fab fa-github" /><a title="Github" rel="noreferrer" href="https://github.com/ndragun92" target="_blank">github.com/ndragun92</a></span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ui-hero-homepage {
    position: relative;
    background-color: var(--always-dark-primary);
    color: var(--always-text-light-primary);
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    clip-path: polygon(100% 0%, 100% 90%, 50% 98%, 50% 98%, 0 90%, 0 0);
    user-select: none;
    @media (max-height: 650px) {
      height: 100vh;
    }
    @include upToMobile {
      margin-top: -70px;
      max-height: 650px;
    }
    &:before {
      content: '';
      background-image: url("~static/images/sections/hero.svg");
      background-repeat: no-repeat;
      background-size: auto;
      background-position: bottom center;
      opacity: 0.1;
      position: absolute;
      //z-index: $z_index-absolute;
      top: 0;
      right: 0;
      bottom: 20px;
      left: 0;
      z-index: -2;
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
    &__line {
      margin: 0 auto 10px auto;
      width: 100px;
      border-bottom: 3px solid var(--active-color-primary);
    }
    &__me {
      padding: 0 20px;
      display: flex;
      flex-direction: column;
      pointer-events: none;
      @media (max-height: 650px) {
        margin-top: -70px;
      }
      &-float {
        position: absolute;
        bottom: 0;
        z-index: -1;
        pointer-events: none;
        opacity: 0.5;
        right: 5%;
        max-width: 100%;
        @media (max-width: 768px) {
          opacity: 0.35;
          max-width: 90%;
          right: 0;
        }
      }
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
    &__role {
      display: inline-block;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0 0 0 auto;
      font-size: 14px;
      font-weight: 400;
      @include smallMobile {
        font-size: 12px;
      }
    }
    &__bottom-bar {
      position: absolute;
      z-index: $z_index-absolute;
      right: 0;
      bottom: calc(10% + 40px);
      left: 0;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 10px;
      align-items: center;
      grid-template-areas: 'social scrollDown git';
      @media (max-height: 650px) {
        bottom: -5px;
      }
      @include upToSmallDesktop {
        grid-template-columns: 1fr;
        grid-template-areas: 'git' 'social' 'scrollDown';
        grid-gap: 20px;
      }
      & > div {
        &:nth-child(1) {
          grid-area: social;
          display: flex;
          align-items: center;
          @include upToSmallDesktop {
            justify-self: center;
          }
          a {
            $size: 45px;
            background-color: transparent;
            border: 2px solid var(--always-text-light-primary);
            color: var(--always-text-light-primary);
            font-size: 16px;
            text-decoration: none;
            display: flex;
            align-items: center;
            justify-content: center;
            width: $size;
            height: $size;
            border-radius: 100%;
            margin: 0 10px;
            transition: var(--transition) linear;
            @include upToSmallDesktop {
              $size: 40px;
              width: $size;
              height: $size;
              font-size: 14px;
            }
            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }
            &:hover {
              transition: none;
              border-color: var(--active-color-primary);
              background-color: var(--active-color-primary);
              color: var(--dark-text-primary-color)
            }
          }
        }
        &:nth-child(2) {
          grid-area: scrollDown;
          cursor: pointer;
          justify-self: center;
          text-align: center;
          @include upToSmallDesktop {
            justify-self: center;
          }
          &:hover {
            i {
              top: -10px;
            }
          }
          i {
            position: relative;
            top: 0;
            font-size: 18px;
            transition: top var(--transition);
          }
          & > div {
            margin-top: 10px;
            font-size: 9px;
            text-transform: uppercase;
          }
        }
        &:nth-child(3) {
          grid-area: git;
          justify-self: flex-end;
          @include upToSmallDesktop {
            justify-self: center;
          }
          i {
            vertical-align: middle;
            font-size: 20px;
            margin-right: 5px;
          }
          a {
            text-decoration: none;
            color: var(--active-color-primary);
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
    }
  }
</style>
<script>
import UiParticles from '../UiParticles'
export default {
  components: { UiParticles }
}
</script>
