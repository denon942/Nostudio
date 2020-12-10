import firebase from 'firebase'
export default ({
    state: {
        // ユーザデータ
        array: {},
        user_id:"",
        // ログイン情報のフラグ
        status: false,
        // メールアドレス・パスワード
        user_email: "",
        user_pass: "",
        // 氏名・かな
        user_fname: "",
        user_fname_kana: "",
        user_name: "",
        user_name_kana: "",
        // 住所
        user_post:"",
        user_address: "",
        // 電話番号
        user_tel:"",
        // 性別
        user_gender:0,
        // 誕生日
        user_year:0,
        user_month:0,
        user_day:0,
        // クレジットカードナンバー
        user_credit_number: ""
    },
    mutations:{
      user_regist(state,array){
        firebase.auth().createUserWithEmailAndPassword(
          array['email'],
          array['password']
        )
        .then(function() {
          // ユーザ情報の変更などに検知
          firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                  // User logged in already or has just logged in.
                  // ユーザーIDの取得
                  //console.log(user.uid);
                  // ユーザIDをドキュメントIDとしてコレクションにarrayの中身をフィールドとして追加
                  firebase.firestore().collection("users").doc(user.uid)
                  .set(array)
                  .then(function () {
                      $nuxt.$router.push('/demo')
                  })

              } else {
                  // User not logged in or has just logged out.
              }
          })
        })
      },
      //ログイン
      user_login(state,array)
      {
        firebase.auth().signInWithEmailAndPassword(
            array['email'],
            array['password'])
        .then(()=>{
            $nuxt.$router.push('/demo')
        })
      },
      //ログアウト
      user_logout(){
        firebase.auth().signOut()
        $nuxt.$router.push('/')
      }
    },
    actions:{},
    getters:{}
  })
