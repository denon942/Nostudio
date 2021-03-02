<template>
<v-list three-line min-width="320">
    <v-list class="overflow-y-auto" max-height="470" height="470" elevation="0" tile v-chat-scroll="{always: false, smooth: true, scrollonremoved:true}">
        <v-list-item v-for="(comment,index) in comments" :key="index" :index="index" class="black--text">
            <v-list-item-subtitle class="subtitle-1">
                <span class="blue--text font-weight-bold">{{comment.userName}}</span>
                <span class="font-weight-thin">{{comment.createdAt}}:</span>
                {{comment.content}}
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
    <v-card class="grey display-1  pa-0 ma-0 pt-1" max-height="60" min-height="50" elevation="0" tile>
        <v-form ref="form" v-model="valid">
            <v-row class="ma-0 pa-0" justify="center">
                <v-col>
                    <v-text-field dense label="Message" class="ma-0" color="black" v-model="coment" :rules="chatRules"></v-text-field>
                </v-col>
                <v-col cols="2" class="ma-0 pa-0 py-1">
                    <v-btn class="pa-0 ma-0 ml-1" tile large color="teal" icon @click="send" :disabled="!valid">
                        <v-icon class="pa-0 ma-0" color="white">mdi-send</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-card>
</v-list>
</template>

<script>
import firebase from '@/plugins/firebase';
export default {
    //取得したuser_idが紛らわしいためuserとgestで
    //チャットコンポーネントを分ける
    name: "ChatBoard",
    data: () => ({
        comments: [],
        comments_box: [],
        coment: '',
        userId: '',
        valid: true,
        //入力チェック
        chatRules: [
            v => !!v || '入力欄が空白です。',
            v => (v && v.length <= 30) || '30字以内で入力してください'
        ],
    }),
    methods: {
        send: function () {
            //チャット送信
            firebase.firestore().collection('users').doc(this.user_id)
                .collection('room').doc(this.user_id)
                .collection('comments').add({
                    content: this.coment,
                    createdAt: new Date(),
                    userName: this.user_name
                })
                .then(
                    this.coment = ""
                )
        },
        getChat: async function () {
            //コメント欄取得
            await firebase.firestore().collection('users').doc(this.user_id)
                .collection('room').doc(this.user_id)
                .collection('comments').orderBy('createdAt', 'asc').limit(50).get().then(snapshot => {
                    snapshot.forEach(doc => {
                        //contentは要素
                        //pushは配列データそのもの
                        // this.allData.push(doc.data().content)
                        this.comments_box.push({
                            content: doc.data().content,
                            createdAt: doc.data().createdAt.toDate().toLocaleTimeString().toLocaleString(),
                            userName: doc.data().userName
                        })
                    })
                })
            this.comments = this.comments_box
            //console.log(this.comments_box)
            this.comments_box = []
        },
        onAuth: function () {
            this.$store.commit('onAuthStateChanged')
        },
    },
    computed: {
        user_name() {
            return this.$store.getters.user_name
        },
        user_id() {
            return this.$store.getters.user_id
        },
    },
    watch: {},
    mounted: function () {
        if (this.user_id != '') {
            //登録した配信情報取得
            //vue-formatでインデントがthisや=に揃う
            firebase.firestore().collection('delivery').doc(this.user_id).onSnapshot(() => {
                firebase.firestore().collection('delivery').doc(this.user_id).get().then(doc => {
                    this.deliveryId = doc.data().peer,
                        this.flg = doc.data().flg,
                        this.thumbnail = doc.data().thumbnail,
                        this.title = doc.data().title,
                        this.userId = doc.data().user_id
                })
            })
        }
        //コメント欄リアルタイム実装
        firebase.firestore().collection('users').doc(this.user_id)
            .collection('room').doc(this.user_id)
            .collection('comments').onSnapshot(() => {
                this.getChat()
            })
    },
    created: function () {
        this.onAuth()
    }
}
</script>
