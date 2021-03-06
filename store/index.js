import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
// [vuex] do not mutate vuex store state outside mutation handlers.
//保留
export  const  strict  =  false
export const state = () => ({
  // ユーザデータ
  array: {},
  user_id:'',
  // ログイン情報のフラグ
  status: false,
  // メールアドレス・パスワード
  user_email: '',
  user_pass: '',
  // 氏名・かな
  user_fname: '',
  user_fname_kana: '',
  user_name: 'ゲスト',
  user_name_kana: '',
  // // 住所
  // user_post:'',
  // user_address:'',
  // // 電話番号
  // user_tel:'',
  // // 性別
  // user_gender:0,
  // // 誕生日
  // user_year:0,
  // user_month:0,
  // user_day:0,
  // // クレジットカードナンバー
  // user_credit_number: '',
  //チャット
  comments:[],
  //サムネイル
  thumbnail:'',
  // ユーザアイコン
  user_image:'',
  //配信情報
  delivery_info:[]
})

export const mutations = {
  set_user_id(state,payload){
      state.user_id = payload
  },
  set_user_name(state,payload){
      state.user_name = payload
  },
  set_user_image(state,payload){
      state.user_image = payload
  },
  set_thumbnail(state,payload){
      state.thumbnail = payload
  },
  delivery_info(state){
      return state.delivery_info
  },
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
                  $nuxt.$router.push('/user/mypage')
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
        $nuxt.$router.push('/user/mypage')
    })
  },
  onAuthStateChanged(state) {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User logged in already or has just logged in.
        // ユーザーIDの取得
        // console.log(user.uid);
        state.user_id = user.uid
        // ドキュメントIDをユーザIDとしているのでユーザIDを持ってきてそこからフィールド取り出し
        firebase.firestore().collection('users').doc(user.uid).get().then( doc => {
            console.log(doc.data())
            // ユーザアイコン
            // state.user_image = doc.data().user_image
            // // 氏名・かな
            state.user_name = doc.data().name
          })
      } else {
          // User not logged in or has just logged out.
          // router.push('/')
      }
    })
  },
  //ログアウト
  user_logout(){
    firebase.auth().signOut()
    $nuxt.$router.push('/')
  },
  //配信
  delivery(state,array){
    // ユーザ情報の変更などに検知
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            // ユーザーIDの取得
            console.log(user.uid);
            // ユーザIDをドキュメントIDとしてコレクションにarrayの中身をフィールドとして追加
            state.user_id = user.uid
            firebase.firestore().collection("users").doc(state.user_id).collection('delivery').doc(state.user_id)
            .set(array, {
                    merge: true
                })
            .then(function () {
                // 正常にデータ保存できた時の処理
                //console.log('success')
            })

            firebase.firestore().collection("delivery").doc(state.user_id)
            .set(array, {
                    merge: true
                })
            .then(function () {
                // 正常にデータ保存できた時の処理
                //console.log('success')
            })
            $nuxt.$router.push('/demo')
        } else {
            // User not logged in or has just logged out.
        }
    })
  },
  delivery_info(state,a){
    state.delivery_info = a
    $nuxt.$router.push('/viewing')
  },
  openOrClose(state,a){
    //配信開始停止
    //ユーザID取得
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // ユーザーIDの取得
            state.user_id = user.uid
            //配信フラグ変更
            if(a){
              firebase.firestore().collection('delivery').doc(state.user_id)
              .update({
                  flg:a
              })
            }else{
              firebase.firestore().collection('delivery').doc(state.user_id)
              .update({
                  flg:a
              })
              console.log('delete')
              //コメント削除
              firebase.firestore().collection('users').doc(state.user_id)
                .collection('room').doc(state.user_id)
                .collection('comments').orderBy('createdAt', 'asc').get().then(snapshot => {
                        snapshot.forEach(doc => {
                            doc.ref.delete()
                        })
                        if(snapshot.size != 0){
                          this.commit('openOrClose', false)
                        }else if(snapshot.size == 0){
                          window.location.href = '/User/mypage'
                        }
                    })
            }


            // firebase.firestore().collection("users").doc(state.user_id).collection('delivery').doc(state.user_id)
            // .update({
            //     flg:false
            // })
            // $nuxt.$router.push('/demo')
        } else {
            // User not logged in or has just logged out.

        }
    })
  }
}

export const getters = {
  user_id(state){
      return state.user_id
  },
  user_image(state){
      return state.user_image
  },
  user_name(state) {
      return state.user_name
  },
  thumbnail(state) {
      return state.thumbnail
  },
  delivery_info(state) {
    return state.delivery_info
  }
}
