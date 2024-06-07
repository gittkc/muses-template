'use strict';

PetiteVue.createApp({
  username: '',
  unread: '',
  data: [],
  async init() {
    //ログイン中のユーザー名を取得
    const username = sessionStorage.username;
    //ユーザー名がfalse?ログインしていない場合
    if (!username) {
      //ウィンドウアラート表示
      window.alert('ログインしてください');
      //ログイン画面へ遷移
      location.href = 'login.html';
    }
    this.username = username;

    //data.jsonの読み込み
    const res = await fetch('data.json');
    const obj = await res.json();
    this.data = obj.list;
    console.log(this.data);

    //新着情報に「未読掲示が○件あります！」の表示
    //件数を取得
    this.unread = this.data.length;
  }
}).mount();
