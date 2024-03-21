<template>
  <footer>
    <span>ndragun92.github.io/portfolio &copy; Nemanja Dragun. All Rights Reserved</span>
  </footer>
</template>

<style lang="scss" scoped>
  footer {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 55px;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    background-color: var(--always-dark-primary);
    color: var(--always-text-light-primary);
    padding: 0 20px;
    &:before {
      content: '';
      background-color: var(--always-dark-primary);;
      height: 75px;
      width: 100%;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      clip-path: polygon(0% 100%, 0% 25%, 50% 0%, 100% 25%, 100% 100%);
    }
    span {
      position: relative;
      z-index: 1;
    }
  }
</style>
