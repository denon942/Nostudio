<template>
<v-list three-line>
    <section class="container">
        <div>
            <v-img max-height="450" max-width="600" :src="thumbnail"></v-img>
            <video id="their-video" width="200" autoplay playsinline></video>
            <video id="my-video" muted="true" width="200" autoplay playsinline></video>

            <div class="main">
                <h2>Nuxt.js + SkyWayのビデオチャット</h2>
                マイク:
                <select v-model="selectedAudio" @change="onChange">
                    <option disabled value="">Please select one</option>
                    <option v-for="(audio, key, index) in audios" v-bind:key="index" :value="audio.value">
                        {{ audio.text }}
                    </option>
                </select>

                <div>
                    <button @click="callOn" class="button--green" v-if="flg">ミュート解除</button>
                    <button @click="callOff" class="button--green" v-else>ミュート</button>
                </div>
                <v-btn @click="close">
                    配信停止
                </v-btn>
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
        comments: [],
        comments_box: [],
        coment: '',
        APIKey: process.env.VUE_APP_API_SKYWAY,
        selectedAudio: '',
        audios: [],
        videos: [],
        localStream: null,
        peerId: '',
        calltoid: '',
        flg: false,
        thumbnail:''
    }),
    methods: {
        send: function () {
            //チャット送信
            firebase.firestore().collection('room').doc('001').collection('comments').add({
                    content: this.coment,
                    createdAt: new Date(),
                    userid: '001'
                })
                .then(
                    this.getCaht(),
                    this.coment = ""
                )
        },
        onChange: function () {
            if (this.selectedAudio != '') {
                this.connectLocalAudio();
            }
        },
        connectLocalAudio: async function () {
            const constraints = {
                audio: this.selectedAudio ? {
                    deviceId: {
                        exact: this.selectedAudio
                    }
                } : false
            }

            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            document.getElementById('my-video').srcObject = stream;
            this.localStream = stream;
        },

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
        callOn: function () {
            if (this.peerId != '') {
                //ミュート解除
                this.localStream.getAudioTracks()[0].enabled = true
                this.flg = false
            }
        },
        callOff: function () {
            if (this.peerId != '') {
                //ミュート
                this.localStream.getAudioTracks()[0].enabled = false
                this.flg = true
            }
        },
        onAuth: function () {
            this.$store.commit('onAuthStateChanged')
        },
        close: function () {
            //配信停止
            this.$store.commit('closeDelivery')
        }
    },
    watch: {
        user_id: function () {
            if (this.user_id != '') {
                firebase.firestore().collection("delivery").doc(this.user_id).set({
                    peer: this.peerId,
                }, {
                    merge: true
                })
            }
        },
        peerId: function () {
            if (this.user_id != '') {
                firebase.firestore().collection("delivery").doc(this.user_id).set({
                    peer: this.peerId,
                }, {
                    merge: true
                })
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

        //デバイスへのアクセス
        navigator.mediaDevices.enumerateDevices()
            .then((deviceInfos) => {
                for (let i = 0; i !== deviceInfos.length; ++i) {
                    const deviceInfo = deviceInfos[i]
                    if (deviceInfo.kind === 'audioinput') {
                        this.audios.push({
                            text: deviceInfo.label ||
                                `Microphone ${this.audios.length + 1}`,
                            value: deviceInfo.deviceId
                        })
                    }
                }
            })

        if (this.user_id != '') {
            firebase.firestore().collection('delivery').doc(this.user_id).onSnapshot(() => {
                firebase.firestore().collection('delivery').doc(this.user_id).get().then(doc => {
                    this.thumbnail = doc.data().thumbnail
                })
            })
        }
    },
    computed: {
        user_id() {
            return this.$store.getters.user_id
        },
        user_name() {
            return this.$store.getters.user_name
        }
    },
    components: {
        Chat
    },
    created: function () {

        this.onAuth()
    }
}
</script>
