<template>
<v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
        <v-row justify="center">
            <v-col cols="10">
                <v-container fluid>
                    <v-row dense>
                        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
                            <v-card v-if="card.title=='視聴'" to="/list">
                                <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                    <v-card-title v-text="card.title"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-radio</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                            <v-card v-else-if="card.title=='配信方法'" @click="linkToOtherWindow('https://drive.google.com/drive/folders/1SeQbDRZXpMCQptHBlUgP2iLyZauTBix8')">
                                <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                    <v-card-title v-text="card.title"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-radio</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>

                            <v-card v-else>
                                <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                                    <v-card-title v-text="card.title"></v-card-title>
                                </v-img>

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn icon>
                                        <v-icon>mdi-radio</v-icon>
                                    </v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-flex>
</v-layout>
</template>

<script>

export default {
    layout: 'top',
    data() {
        return {
            //内容はデータ化
            cards: [{
                    title: 'Nostudio',
                    src: require("@/assets/radio.png"),
                    flex: 12
                },
                {
                    title: '視聴',
                    src: require("@/assets/viewing.jpg"),
                    flex: 6
                },
                {
                    title: '配信方法',
                    src: require("@/assets/delivery.png"),
                    flex: 6
                },
            ]
        }
    },
    methods: {
        linkToOtherWindow(url) {
            window.open(url, '_blank')
        }
    }
}
</script>
