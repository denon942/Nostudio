<template>
<v-list class="overflow-y-auto" max-height="500" height="500" elevation="0" tile>
    <v-list-item v-for="(comment,index) in comments" :key="index" :index="index" class="black--text">
        <v-list-item-subtitle class="text--primary" @click="request(index)" v-if="comment.flg==true">
            タイトル:{{comment.title}}
            <v-img max-height="450" max-width="600" :src="comment.thumbnail"></v-img>
        </v-list-item-subtitle>
    </v-list-item>
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
        request(a) {
            this.$store.commit('delivery_info', this.comments[a])
        }
    },
    watch: {},
    mounted: function () {
        firebase.firestore().collection("delivery").get().then(async snapshot => {
            await snapshot.forEach(doc => {
                //contentは要素
                //pushは配列データそのもの
                // this.allData.push(doc.data().content)
                this.comments_box.push({
                    user_id: doc.data().user_id,
                    title: doc.data().title,
                    thumbnail: doc.data().thumbnail,
                    peerId:doc.data().peer,
                    flg:doc.data().flg
                })
            })
            this.comments = this.comments_box
            this.comments_box = []
        })
    },
    computed: {},
    components: {},
    created: function () {}
}
//配信リスト
</script>
