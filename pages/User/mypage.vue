<template>
<v-list three-line>
    <p>{{user_name}}</p>
    <v-img max-height="450" max-width="600" v-model="thumbnail" v-if="thumbnail != ''" alt="アイコン" :src="thumbnail"></v-img>
    <v-img max-width="400" v-else :src="user_image" alt="アイコン"></v-img>
    <input style="display: none" ref="input" type="file" accept="image/*,image/*,image/*" @change="selectedFile()" />
    <v-row>
        <v-col cols="12" sm="6" md="6">
            <v-text-field prepend-icon="mdi-email" class="pt-6" v-model="title" :rules="titleRules" counter label="Title" hint="配信タイトル" required />
        </v-col>
    </v-row>
    <v-btn elevation="2" dark @click="btnclick()">画像選択</v-btn>
    <v-btn @click="delivery">配信する</v-btn>
</v-list>
</template>

<script>
import firebase from '@/plugins/firebase';
export default {
    name: "Mypage",
    data: () => ({
        array: {},
        thumbnail: require('@/assets/viewing.jpeg'),
        title: '',
        titleRules: [
            v => !!v || '入力欄が空白です。',
        ],

    }),
    methods: {
        onAuth: function () {
            this.$store.commit('onAuthStateChanged')
        }, //ファイルの選択
        btnclick: function () {
            this.$refs.input.click()
        },
        async selectedFile() {
            this.isUploading = true;
            const file = this.$refs.input.files[0]
            if (!file) {
                return;
            }
            const fr = new FileReader()
            fr.readAsDataURL(file)
            fr.addEventListener('load', () => {
                this.uploadImageUrl = fr.result
                // alert(this.uploadImageUrl);
            })
        },
        delivery: function () {
            this.array['title'] = this.title
            this.array['user_id'] = this.user_id
            this.array['thumbnail'] = this.thumbnail
            this.array['flg'] = false
            this.$store.commit('delivery', this.array)
        }
    },
    watch: {},
    mounted: function () {},
    computed: {
        user_id() {
            return this.$store.getters.user_id
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
