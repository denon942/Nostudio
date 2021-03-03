<template>
<v-container>
    <v-row justify="center">
        <v-col cols=12 lg="8" md="8" sm="12" xs="12">
            <v-card class="pa-2">
                <v-row justify="center">
                    <v-col cols="auto">
                        <v-img max-height="400" max-width="600" :src="thumbnail"></v-img>
                        <audio id="their-video" width="200" autoplay playsinline></audio>
                        <audio id="my-video" muted="true" width="200" autoplay playsinline></audio>
                    </v-col>
                </v-row>
            </v-card>
            <h2>タイトル名：{{title}} </h2>
            <h3 v-if="!flg">配信は終了いたしました</h3>
        </v-col>
        <v-col cols="12" lg="4" md="4" sm="12" xs="12">
            <!-- チャット -->
            <Chat />
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import firebase from '@/plugins/firebase';
import Peer from 'skyway-js';
import Chat from '@/components/chat/Gest_chat'

export default {
    name: "Viewing",
    data: () => ({
        APIKey: process.env.VUE_APP_API_SKYWAY,
        selectedAudio: '',
        audios: [],
        videos: [],
        localStream: null,
        peerId: '',
        calltoid: '',
        deliveryId: '',
        flg: false,
        thumbnail: '',
        title: ''
    }),
    methods: {
        makeCall: function () {
            //const call = this.peer.call(this.calltoid, this.localStream);
            const call = this.peer.call(this.calltoid);
            this.connect(call);
        },

        connect: function (call) {
            call.on('stream', stream => {
                const el = document.getElementById('their-video');
                el.srcObject = stream;
                el.play();
            });
        }
    },
    watch: {
        deliveryId: function () {
            //取得したpeerで配信元の音声を呼び出す
            this.calltoid = this.deliveryId
            if (this.deliveryId != '') {
                this.makeCall()
            }
        },
    },
    mounted: function () {
        this.peer = new Peer({
            key: this.APIKey,
            debug: 3,
        });

        this.peer.on('open', () => {
            this.peerId = this.peer.id
        });

        this.peer.on('call', call => {
            call.answer(this.localStream);
            this.connect(call);
        });

        if (this.items.user_id != '') {
            //一覧から取得したIdから配信情報を取得
            firebase.firestore().collection('delivery').doc(this.items.user_id).onSnapshot(() => {
                firebase.firestore().collection('delivery').doc(this.items.user_id).get().then(doc => {
                    this.deliveryId = doc.data().peer
                    this.flg = doc.data().flg
                    this.thumbnail = doc.data().thumbnail
                    this.title = doc.data().title
                })
            })
        }
    },
    computed: {
        items() {
            return this.$store.getters.delivery_info
        },
    },
    components: {
        Chat
    },
    created: function () {}
}
</script>
