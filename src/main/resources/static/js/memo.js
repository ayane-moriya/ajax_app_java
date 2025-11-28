function post (){
  const submit = document.getElementById("submit");

  // submitボタンのclickイベントを仕込む
  submit.addEventListener("click", (e) => {
    // 既定イベントの無効化
    e.preventDefault();

    // フォームの要素を取得
    const form = document.getElementById("form");
    
    // フォームの値を取得
    const formData = new FormData(form);
    // 取得したフォームの値を確認
    // for (let value of formData.entries()) { 
    // console.log(value);
    // }
    
    // XMLHttpRequestオブジェクト作成（Ajax実装準備）
    const XHR = new XMLHttpRequest();

    // リクエスト内容を指定
    XHR.open("POST", "/posts", true);

    // レスポンス形式を指定
    XHR.responseType = "json";

    // サーバーに送信
    XHR.send(formData);
  })
};

window.addEventListener('load', post);