'use strict';

PetiteVue.createApp({
  username: '',
  unread: '',

  async init() {
    //ログイン中のユーザーを取得
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
    //読み込んだdata.jsonのListの要素数をspanタグclass="unread"のテキストに表示
    //新着情報に「未読掲示が3件あります！」の表示
    this.unread = obj.list.length;
  }
}).mount();
