<template>
  <section class="ui-contact">
    <div class="g-container">
      <form class="ui-contact__form" @submit.prevent="sendMail">
        <input
          v-model="subject"
          type="text"
          placeholder="Subject"
          :class="{ empty: !subject }"
        >
        <textarea v-model="body" rows="8" placeholder="Your message..." :class="{ empty: !body }" />
        <button type="submit" class="ui-contact__form-send">
          <span class="ui-contact__form-send__text" :class="{ launching: status === 'sending', launched: status === 'sent' }">
            <template v-if="status === 'sending'">
              <i class="fas fa-spinner fa-spin" />
            </template>
            <template v-else-if="status === 'sent'">
              <i class="fas fa-check-circle" />
            </template>
            <template v-else>
              {{ status }}
            </template>
          </span>
          <span class="ui-contact__form-send__icon" :class="{ launching: status === 'sending', launched: status === 'sent' }">
            <i class="fas fa-envelope" />
          </span>
        </button>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    email: 'ndragunservice@gmail.com',
    subject: '',
    body: '',
    status: 'submit'
  }),
  methods: {
    sendMail () {
      if (!this.subject || !this.body) {
        return alert('Please fill the form correctly!')
      }
      this.status = 'sending'
      setTimeout(() => {
        this.status = 'sent'
        setTimeout(() => {
          this.openMailPopup()
        }, 1000)
      }, 1500)
    },
    openMailPopup () {
      const { email, subject, body } = this
      window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
      this.subject = ''
      this.body = ''
      this.status = 'submit'
    }
  }
}
</script>

<style lang="scss" scoped>
// RESET
input, select, textarea, button {
  &:focus {
    outline: none;
  }
}
input {
  -webkit-appearance: none;
  appearance: none;
  &[type="search"] {
    -webkit-appearance: textfield;
    -webkit-box-sizing: content-box;
  }
}
::-webkit-search-decoration {
  display:none;
}
  .ui-contact {
    display: flex;
    align-items: center;
    padding: 40px;
    min-height: calc(100vh - 555px);
    background-color: var(--always-dark-primary);
    color: var(--always-text-light-primary);
    @include upToTablet {
      padding: 40px 30px;
    }
    @include upToMobile {
      padding: 40px 20px;
      min-height: calc(100vh - 405px);
    }
    &__form {
      width: 100%;
      max-width: 468px;
      margin: auto;
      display: flex;
      flex-direction: column;
      input, textarea {
        position: relative;
        z-index: 1;
        font-size: 14px;
        border: 1px solid var(--dark-border-primary-color-fixed);
        margin-bottom: 20px;
        border-radius: var(--radius);
        background-color: var(--always-dark-primary);
        color: var(--always-text-light-primary);;
        transition: border var(--transition) linear;
        &::placeholder {
          color: var(--dark-text-secondary-color-fixed);
        }
        &:focus {
          border-color: var(--active-color-primary);
        }
      }
      input {
        height: 40px;
        padding: 0 20px;
        @include upToMobile {
          padding: 0 10px;
        }
      }
      textarea {
        padding: 20px;
        resize: vertical;
        @include upToMobile {
          padding: 10px;
        }
      }
      &-send {
        border: none;
        cursor: pointer;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 20px;
        height: 40px;
        background-color: var(--active-color-primary);
        color: var(--always-dark-text-primary);
        border-radius: var(--radius);
        box-shadow: var(--box-shadow-box);
        transition: background-color var(--transition) linear;
        &:hover {
          background-color: var(--always-dark-secondary);
          color: var(--always-text-light-primary);
        }
        &__text {
          text-transform: uppercase;
          font-size: 14px;
          font-weight: 600;
          transition: var(--transition) ease transform;
          &.launching {
            color: var(--warning-color);
          }
          &.launched {
            color: var(--success-color);
          }
        }
        &__icon {
          position: absolute;
          width: 40px;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition) ease transform;
          &.launching {
            color: var(--warning-color);
            transform: rotateZ(-90deg);
            animation: shake var(--transition) ease 0.5s infinite;
          }
          &.launched {
            color: var(--success-color);
            transform: rotateZ(-90deg);
            animation: moveUp 1s ease 0s forwards;
          }
        }
        @keyframes moveUp {
          0% {
            margin-top: 0;
            transform: scale(1) rotateZ(-90deg);
          }
          100% {
            margin-top: -100px;
            transform: scale(0) rotateZ(-90deg);
          }
        }
        @keyframes shake {
          10%,
          90% {
            transform: translate3d(-1px, 0, 0) rotateZ(-90deg);
          }
          20%,
          80% {
            transform: translate3d(1px, 0, 0) rotateZ(-90deg);
          }
          30%,
          50%,
          70% {
            transform: translate3d(-1px, 0, 0) rotateZ(-90deg);
          }
          40%,
          60% {
            transform: translate3d(1px, 0, 0) rotateZ(-90deg);
          }
        }
      }
    }
  }
</style>
