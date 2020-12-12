<template>
<v-list three-line>
    <section class="container">
        <div>
            <logo />
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
                    <p>Your id: <span id="my-id">{{peerId}}</span></p>
                    <p>他のブラウザでこのIDをコールしましょう。</p>
                    <h3>コールする</h3>
                    <input v-model="calltoid" placeholder="call id">
                    <button @click="makeCall" class="button--green">Call</button>
                    <button @click="callOn" class="button--green">On</button>
                    <button @click="callOff" class="button--green">Off</button>
                </div>
            </div>
        </div>
    </section>
    <v-list class="overflow-y-auto" max-height="470" height="470" elevation="0" tile>
        <v-list-item v-for="(comment,index) in comments" :key="index" :index="index" class="black--text">
            <v-list-item-subtitle class="text--primary">{{comment.content}}</v-list-item-subtitle>
            <v-list-item-subtitle>
                {{comment.createdAt}}
            </v-list-item-subtitle>
        </v-list-item>
    </v-list>
    <v-card class="grey display-1  pa-0 ma-0" height="50" elevation="0" tile>
        <v-row class="ma-0 pa-0" justify="end">
            <v-col cols="6" class="ma-0 pa-0 py-4">
                <v-text-field dense label="Message" class="ma-0" color="black" v-model="coment"></v-text-field>
            </v-col>
            <v-col cols="2" class="ma-0 pa-0 py-1">
                <v-btn class="pa-0 ma-0 ml-1" tile large color="teal" icon @click="send">
                    <v-icon class="pa-0 ma-0" color="white">mdi-send</v-icon>
                </v-btn>
            </v-col>
        </v-row>
    </v-card>
</v-list>
</template>

<script>
import firebase from '@/plugins/firebase';
import Peer from 'skyway-js';
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
        calltoid: ''
    }),
    methods: {
        send: function () {
            //チャート送信
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
            if (this.peerId == '') {
                //ミュート解除
                this.localStream.getAudioTracks()[0].enabled = true
            }
        },
        callOff: function () {
            if (this.peerId == '') {
                //ミュート
                this.localStream.getAudioTracks()[0].enabled = false
            }
        },
        getCaht: async function () {
            await firebase.firestore().collection('room').doc('001').collection('comments').orderBy('createdAt', 'asc').get().then(snapshot => {
                snapshot.forEach(doc => {
                    //contentは要素
                    //pushは配列データそのもの
                    // this.allData.push(doc.data().content)
                    this.comments_box.push({
                        content: doc.data().content,
                        createdAt: doc.data().createdAt.toDate().toLocaleTimeString().toLocaleString()
                    })
                })
            })
            this.comments = this.comments_box
            console.log(this.comments_box)
            this.comments_box = []
        },
    },
    watch: {},
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
        this.getCaht()
    },
    created: function () {

    }
}
</script>
