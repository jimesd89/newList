<template>
  <nav-menu/>
  <TareaComponent/>
  <FooterComponent/>
</template>

<script>
import TareaComponent from "./components/TareaComponent.vue"
import FooterComponent from './components/layout/FooterComponent.vue'
import NavMenu from './components/layout/NavMenu.vue'
export default {
  name: 'App',
  components: {
    TareaComponent,
    FooterComponent,
    NavMenu
  }
}
</script>

<style>
</style>
