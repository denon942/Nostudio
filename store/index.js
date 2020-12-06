import firebase from 'firebase'
export default ({
    state: {
      // ユーザデータ
        array: {},
        user: {},
        user_id:'',
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
        user_credit_number: ''
    },
    mutations:{
      registUser(state,array){
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
                  console.log(user.uid);
                  // ユーザIDをドキュメントIDとしてコレクションにarrayの中身をフィールドとして追加
                  state.user_id = user.uid
                  firebase.firestore().collection("users").doc(state.user_id)
                  .set(array)
                  .then(function () {
                      // 正常にデータ保存できた時の処理
                      console.log('success')
                      firebase.firestore().collection("judge").doc(state.user_id)
                      .set({judge:0})
                      .then(function () {
                          // 正常にデータ保存できた時の処理
                          console.log('success')
                          router.push('/user_mypage')
                      })
                  })

              } else {
                  // User not logged in or has just logged out.
              }
          })
        })
      }
    },
    actions:{},
    getters:{}
  })
