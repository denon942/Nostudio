<template>
  <v-layout
    column
    justify-end
    align-end
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-btn text color="green lighten-2" @click="dialog = true">
        ログイン
      </v-btn>
      <v-dialog
          v-model="dialog" width="500">
          <v-card
           class="px-5 py-2">
            <v-form
                ref="form"
                v-model="valid">
                <!-- mail入力 -->
                <v-text-field prepend-icon="mdi-email" class="pt-6" v-model="mailaddress"
                    :rules="registemailRules"
                    counter
                    label="E-mail"
                    hint="メールアドレスは50字以下で記入してください。"
                    required />
                <!-- パスワード入力 -->
                <v-text-field :type="showPassword ? 'text' : 'password'" prepend-icon="mdi-lock"
                    v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword" v-model="password"
                    :rules="registpassRules"
                    counter
                    label="password"
                    hint="パスワードは8字以上20字以下にしてください。"
                    required/>
                    <!-- ログインボタン -->
                  <v-row justify="center" align="center" class="ma-0 pa-0 mt-2">
                      <v-btn
                          :disabled="!valid"
                          color="blue"
                          class="mr-4 white--text"
                          @click="login"
                          :loading="loading"
                          width="120"
                      >
                          | Login |
                      </v-btn>
                      <v-progress-linear :active="loading" :indeterminate="loading" top color="blue accent-4"></v-progress-linear>
                  </v-row>
              </v-form>
          </v-card>
      </v-dialog>
      <!-- 新規登録ページボタン -->
      <v-btn color="green lighten-2" dark to="/User/user_regist">
          新規登録
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  data(){

    return{
      //  imgPath: require('@/assets/nosimg.png'),
          array: {},
          mailaddress: '',
          password: '',
          // モーダル表示・非表示
          dialog:false,
          // ローディング切り替え
          loading:false,
          // ログイン状態の確認
          authenticatedUser:false,
          valid: true,
          showPassword:false,
          // メールアドレスの登録
          registemailRules: [
              v => !!v || '入力欄が空白です。',
              v => /.+@.+\..+/.test(v) || '想定していない文字形式で入力されました。',
              v => (v && v.length <= 50) || '50字以内で入力してください。',
              v => /^\S+@\S+\.\S+$/.test(v) || '想定していない文字形式で入力されました。'
          ],
          // パスワードの登録
          registpassRules:[
              v => !!v || '入力欄が空白です。',
              v => (v&& 8<=v.length) || '',
              v => (v&& v.length<=20) || '有効桁を超えた不正な値が入力されました。',
              v => /[a-zA-Z\d]$/.test(v) || '半角英数字のみで入力してください。'
          ],
        }
    },
    methods: {
        signUp:async function(){
            this.array['email'] = this.mailaddress
            this.array['password'] = this.password
            await this.$store.commit('registUser',this.array)
        },
        // ログイン
        login(){
            if (this.mailaddress === '' || this.password === '') return
            this.loading = true
            this.array['email'] = this.mailaddress
            this.array['password'] = this.password
            $store.commit('user_login', this.array)
        },
        close(){
            this.dialog = false
            this.loading = false
        }
    },
    watch: {
      // ログインアニメーションなど試作段階でできてないボタンなど変化させたい
      // 3秒間ローディング
      loading (val) {
          val && setTimeout(async() => {
              // async await 遅らせる
              await this.close()
              if(this.authenticatedUser == true)
              {
                  alert('ログイン成功')
              }
              else{
                  alert('ログイン失敗');
              }
          }, 3000)
      },
      //   モーダル初期化
      dialog:function(){
          if(this.authenticatedUser == false)
          {
              if(this.dialog ===true) return
                  this.$refs.form.reset()
          }
      },
    }
}
</script>
