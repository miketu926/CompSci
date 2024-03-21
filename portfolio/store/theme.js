export const state = () => ({
  palette: 'light'
})

export const getters = {}

export const mutations = {
  SET_THEME (state, theme = null) {
    state.palette = theme
    this.$cookies.set('theme', state.palette, {
      maxAge: 60 * 60 * 24 * 300
    })
  }
}

export const actions = {
}
