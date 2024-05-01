'use strict';

//Webページ読み込み完了したら以下の処理を実行する
document.addEventListener('DOMContentLoaded', async () => {
  //ログイン中のユーザー名を取得
  const username = sessionStorage.username;
  //ログインしていない場合
  if (!username) {
    //ウィンドウアラート表示
    window.alert('ログインしてください');
    //ログイン画面へ遷移
    location.href = 'login.html';
  }
  //ログインしているユーザー名をid=user_nameのspanタグのテキストに表示
  document.querySelector('#user_name span').textContent = username;

  //data.jsonの呼び出し
  const res = await fetch('data.json');
  const obj = await res.json();
  //data.jsonからList(info@MUSESのお知らせ)を取得
  const data = obj.list;
  //List(info@MUSESのお知らせ)をコンソールに表示
  console.log(data);

  //読み込んだdata.jsonのListの要素数をspanタグclass="unread"のテキストに表示
  //新着情報に「未読掲示が3件あります！」、「！：未読3件」の表示
  document.querySelectorAll('span.unread').forEach((el) => (el.textContent = data.length));

  //info@MUSESのお知らせ一覧(div要素)を読み込み
  const info_list = document.querySelector('div#info_list');

  //info@MUSESのお知らせ各情報について処理
  for (const item of data) {
    //div要素生成
    const record = document.createElement('div');
    //クラス名を設定
    record.className = 'record';

    //Object.entries(item) → [key, value]の形に形成
    /**
     * {
     * "date": "202x/04/20",
     * "from": "教務部　教務課<br />鳴尾　アリス",
     * "imp": "★重要★",
     * "subject": "MUSESモバイルアプリの改善案の募集について"
     * }
     * ↓↓↓
     * [["date", "202x/04/20"],
     *  ["from", "教務部　教務課<br />鳴尾　アリス"], …
     * ]
     */
    for (const [prop, val] of Object.entries(item)) {
      //div要素を生成
      const el = document.createElement('div');
      //propがfromの場合（info@MUSES発信元の情報）
      if (prop == 'from') {
        //生成したdiv要素の値にval(info@MUSES発信元の情報)を設定
        //innerHTMLはHTMLタグをタグとして処理する（textContentはタグも文字列として認識する）
        el.innerHTML = val;
      } else {
        //生成したdiv要素の値にval(info@MUSES発信元の情報)を設定
        el.textContent = val;
      }
      //propをクラス名として設定
      el.className = prop;

      //prop（クラス名）がsubject(info@MUSESのタイトル)の場合
      if (prop == 'subject') {
        //div要素を生成
        const tri = document.createElement('div');

        //生成したdiv要素の値に「 (半角スペース)」を設定
        tri.textContent = '&nbsp;';
        //生成したdiv要素のクラス名を設定
        tri.className = 'tri';

        //クラス名recordのdiv要素の子要素としてtri(div要素)を追加
        record.appendChild(tri);

        //div要素を生成
        const mark = document.createElement('div');
        //生成したdiv要素のクラス名を設定
        mark.className = 'mark';
        //span要素を生成
        const span = document.createElement('span');
        //span要素の値を設定
        span.textContent = '!';
        //span要素のクラス名を設定
        span.className = 'exmark';
        //div要素(mark)の子要素にspan要素を追加
        mark.appendChild(span);
        //div要素(record)の子要素にdiv要素(mark)を追加
        record.appendChild(mark);
      }
      //div要素(record)の子要素にdiv要素(el)を追加
      record.appendChild(el);
    }
    //info@MUSESお知らせ一覧(div要素)の子要素にdiv要素(record)を追加
    info_list.appendChild(record);
  }
});
