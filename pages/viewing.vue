<template>
<v-list three-line>
    <section class="container">
        <div>
            <logo />
            <video id="their-video" width="200" autoplay playsinline></video>
            <video id="my-video" muted="true" width="200" autoplay playsinline></video>

            <div class="main">
                <h2>Nuxt.js + SkyWayのラジオチャット</h2>
            </div>
        </div>
    </section>
    <!-- チャット -->
    <Chat />
</v-list>
</template>

<script>
import firebase from '@/plugins/firebase';
import Peer from 'skyway-js';
import Chat from '@/components/chat/Chat'
export default {
    name: "ChatBoard",
    data: () => ({
        APIKey: process.env.VUE_APP_API_SKYWAY,
        selectedAudio: '',
        audios: [],
        videos: [],
        localStream: null,
        peerId: '',
        calltoid: '',
        deliveryId: '',
        flg:false
    }),
    methods: {

        makeCall: function () {
            const call = this.peer.call(this.calltoid, this.localStream);
            this.connect(call);
        },

        connect: function (call) {
            call.on('stream', stream => {
                const el = document.getElementById('their-video');
                el.srcObject = stream;
                el.play();
            });
        },
    },
    watch: {
      deliveryId:function(){
        this.calltoid=this.deliveryId
        if(this.deliveryId!=''){
          this.makeCall()
        }
      }
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
            firebase.firestore().collection('delivery').doc('OJcNACQyCvNASCF2PJ6ktMDXFSu2').onSnapshot(() => {
                firebase.firestore().collection('delivery').doc('OJcNACQyCvNASCF2PJ6ktMDXFSu2').get().then(doc => {
                    this.deliveryId = doc.data().peer
                    this.flg = doc.data().flg
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
