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
            <v-row>
                <v-col cols="auto">
                    マイク:
                    <select v-model="selectedAudio" @change="onChange">
                        <option disabled value="">Please select one</option>
                        <option v-for="(audio, key, index) in audios" v-bind:key="index" :value="audio.value">
                            {{ audio.text }}
                        </option>
                    </select>
                </v-col>
                <v-col cols="auto">
                    <v-btn @click="callOn" class="button--green" v-if="flg">
                        <v-icon>mdi-microphone-off</v-icon>
                    </v-btn>
                    <v-btn @click="callOff" class="button--green" v-else>
                        <v-icon>mdi-microphone</v-icon>
                    </v-btn>
                    <v-btn @click="openOrClose(callFlg)" v-if="callFlg">
                        配信開始
                    </v-btn>
                    <v-btn @click="openOrClose(callFlg)" v-else>
                        配信停止
                    </v-btn>
                </v-col>
            </v-row>
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
        //ミュート切り替え
        flg: false,
        thumbnail: '',
        title: '',
        //配信開始・停止
        callFlg: true
    }),
    methods: {
        send: function () {
            //チャット送信
            firebase.firestore().collection('users').doc(items.user_id)
                .collection('room').doc(items.user_id)
                .collection('comments').add({
                    content: this.coment,
                    createdAt: new Date(),
                    userName: this.user_name
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
            // document.getElementById('my-video').srcObject = stream;
            this.localStream = stream;
        },

        makeCall: function () {
            // const call = this.peer.call(this.calltoid, this.localStream);
            // this.connect(call);
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
        openOrClose: function (a) {
            //配信停止
            this.$store.commit('openOrClose', a)
            this.callFlg = !this.callFlg
            if (a == false) {
                //音声の通信切断
                this.peer.destroy()
                //コメント欄削除      検討中
                const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));

                (async () => {
                    await sleep(10000);
                    // window.location.href = '/user/mypage'
                })();
                // const call = this.peer.call(this.calltoid, this.localStream);

            }
        },
        image: function () {
            if (this.user_id != '') {
                firebase.firestore().collection('delivery').doc(this.user_id).onSnapshot(() => {
                    firebase.firestore().collection('delivery').doc(this.user_id).get().then(doc => {
                        this.thumbnail = doc.data().thumbnail,
                            this.title = doc.data().title
                    })
                })
            }
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
                this.image()
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
        //Skyway
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

        this.image()
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
