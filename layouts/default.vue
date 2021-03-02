<template>
<v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" :right="true" fixed app temporary>
        <v-list v-if="flg">
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content v-if="'list'==item.title" @click="list">
                    <v-list-item-title v-text="item.title" v-if="'list'==item.title" @click="list" />
                </v-list-item-content>
                <v-list-item-content  v-else-if="'logout'==item.title" @click="logout" >
                    <v-list-item-title v-text="item.title"/>
                </v-list-item-content>
                <v-list-item-content  v-else>
                    <v-list-item-title v-text="item.title"/>
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <v-list v-else>
            <v-list-item v-for="(item, i) in gest_items" :key="i" :to="item.to" router exact>
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content v-if="'list'==item.title" @click="list">
                    <v-list-item-title v-text="item.title"/>
                </v-list-item-content>
                <v-list-item-content v-else>
                    <v-list-item-title v-text="item.title"/>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
    <!-- ヘッダー -->
    <!-- トップ -->
    <!-- ユーザー -->
    <v-app-bar :clipped-left="clipped" fixed app elevate-on-scroll elevation="0" class="black white--text" outlined>
        <v-toolbar-title v-text="title" />
        <v-spacer />
        <v-app-bar-nav-icon class="white--text" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main style="
      background: #8a2387;
      background: -webkit-linear-gradient(to right, #8a2387, #e94057, #f27121);
      background: linear-gradient(to right, #8a2387, #e94057, #f27121);">
        <v-container>
            <nuxt />
        </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app dark>
        <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
</v-app>
</template>

<script>
import firebase from '@/plugins/firebase';
import Sign from '@/components/top/Sign'
export default {
    layout: 'default',
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            items: [{
                    icon: 'mdi-chart-bubble',
                    title: 'mypage',
                    to: '/user/mypage'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'list',
                    to: '/list'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'logout',
                    to: '/'
                }
            ],
            gest_items: [{
                    icon: 'mdi-chart-bubble',
                    title: 'home',
                    to: '/'
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'list',
                    to: '/list'
                },
            ],
            miniVariant: false,
            title: 'Nostudio',
            flg: false
        }
    },
    components: {
        Sign
    },
    methods: {
        logout: function () {
            window.location.href = '/'
            this.$store.commit('user_logout')
        },
        list:function(){
          window.location.href = '/list'
        },
        onAuth: function () {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                  this.flg = true
                } else {
                  this.flg = false
                }
            })
        }
    },
    created: function () {
        this.onAuth()
    }
}
</script>
