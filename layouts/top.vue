<template>
  <v-app>
    <!-- ヘッダー -->
    <!-- トップ -->
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      elevate-on-scroll
      elevation="0"
      class="black white--text"
      outlined
    >
      <nuxt-link to="/" tag="div" style="cursor: pointer;">
        <v-toolbar-title v-text="title"/>
      </nuxt-link>
      <v-spacer/>
      <Sign/>
    </v-app-bar>
    <v-main style="
      background: #8a2387;
      background: -webkit-linear-gradient(to right, #8a2387, #e94057, #f27121);
      background: linear-gradient(to right, #8a2387, #e94057, #f27121);">
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
      dark
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import Sign from '@/components/top/Sign'
export default {
  layout: 'default',
  data () {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      title: 'Nostudio'
    }
  },
  components:{
    Sign
  }
}
</script>
