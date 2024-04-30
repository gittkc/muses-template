'use strict';

//Webページ読み込み完了したら以下の処理を実行する
document.addEventListener('DOMContentLoaded', async () => {
  //ログイン中のユーザー名を取得
  const username = sessionStorage.username;
  //ユーザー名がfalse?ログインしていない場合
  if (!username) {
    //ウィンドウアラート表示
    window.alert('ログインしてください');
    //ログイン画面へ遷移
    location.href = 'login.html';
  }
  //ログインしているユーザー名をid=user_nameのspanタグのテキストに表示
  document.querySelector('#user_name span').textContent = username;

  //data.jsonの読み込み
  const res = await fetch('data.json');
  const obj = await res.json();

  //読み込んだdata.jsonのListの要素数をspanタグclass="unread"のテキストに表示
  //新着情報に「未読掲示が3件あります！」の表示
  document.querySelectorAll('span.unread').forEach((el) => (el.textContent = obj.list.length));
});
