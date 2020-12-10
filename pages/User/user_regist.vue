<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
    >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <v-text-field
          prepend-icon="mdi-email"
          v-model="mailaddress"
          counter
          label="メールアドレス"
          :rules="registemailRules"
          hint="メールアドレスは50字以下で記入してください。"/>
        <v-text-field
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          prepend-icon="mdi-lock-outline"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          label="パスワード"
          counter
          hint="パスワードは8字以上20字以下にしてください。"
          :rules="registpassRules"/>
        <v-row justify="center">
          <v-col cols="auto">
            <v-btn
              dark
              outlined
              rounded
              :disabled="!valid"
              color="blue"
              class="mr-4 white--text mb-5"
              @click="signUp"
              width="120">
                登録
            </v-btn>
          </v-col>
        </v-row>

      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  layout:'top',
  data(){

    return{
      //  imgPath: require('@/assets/nosimg.png'),
          array: {},
          mailaddress: '',
          password: '',
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
        signUp:function(){
            this.array['email'] = this.mailaddress
            this.array['password'] = this.password
            this.$store.commit('user_regist',this.array)
        },
        signOut:function(){
            this.$store.commit('logout')
        }
    },
}
</script>
