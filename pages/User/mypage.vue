<template>
<v-list three-line>
    {{user_name}}
</v-list>
</template>

<script>
import firebase from '@/plugins/firebase';
export default {
    name: "Mypage",
    data: () => ({}),
    methods: {
        onAuth: function () {
            this.$store.commit('onAuthStateChanged')
        }
    },
    watch: {},
    mounted: function () {},
    computed: {
        user_id: {
            get() {
                return this.$store.getters.user_id
            },
            set(value) {
                return this.$store.commit('set_user_id', value)
            }
        },
        user_name() {
            return this.$store.getters.user_name
        }
    },
    components: {},
    created: function () {
        this.onAuth()
    }
}
</script>
