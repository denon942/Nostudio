<template>
<v-list class="overflow-y-auto" max-height="600" min-height="600" height="500" elevation="0" tile>
    <div v-for="(comment,index) in comments" :key="index" :index="index" class="black--text">
        <v-list-item-subtitle class="text--primary" @click="request(index)" v-if="comment.flg==true">
            タイトル:{{comment.title}}
            <v-img max-height="450" max-width="600" :src="comment.thumbnail"></v-img>
        </v-list-item-subtitle>
    </div>
</v-list>
</template>

<script>
import firebase from '@/plugins/firebase';
export default {
    name: "List",
    data: () => ({
        comments: [],
        comments_box: []
    }),
    methods: {
        //視聴ページ(Viewing)に一覧から選択した情報を送る
        request(a) {
            this.$store.commit('delivery_info', this.comments[a])
        },
        getList() {
            //配信されているものをflgで管理しtruw表示・false非表示
            firebase.firestore().collection("delivery").get().then(async snapshot => {
                await snapshot.forEach(doc => {
                    this.comments_box.push({
                        user_id: doc.data().user_id,
                        title: doc.data().title,
                        thumbnail: doc.data().thumbnail,
                        peerId: doc.data().peer,
                        flg: doc.data().flg
                    })
                })
                this.comments = this.comments_box
                this.comments_box = []
            })
        }
    },
    watch: {},
    mounted: function () {
        //deliveryコレクションに変化があれば一覧を取得し直し表示する
        firebase.firestore().collection("delivery").onSnapshot(() => {
            this.getList()
        })
    },
    computed: {},
    components: {},
    created: function () {}
}
//配信リスト
</script>
