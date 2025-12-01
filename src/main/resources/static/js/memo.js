// HTML作成処理を切り出し
const buildHTML = (XHR) => {
  // レスポンス情報を抽出
  const item = XHR.response;
  // itemをもとに、HTML生成
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.createdAt}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
}

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

    // レスポンス処理
    XHR.onload = () => {
      // リクエスト失敗時
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        // 後続の処理を行わないためnullを返し、JS処理を抜ける
        return null;
        }
      // リストの要素を取得（insertAdjacentHTMLでHTMLを挿入するため）
      const list = document.getElementById("list");
      // リセット対象のフォームの要素を取得
      const formText = document.getElementById("content");
      // 作成したHTMLの挿入
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      // フォームのリセット
      formText.value = "";
    };
  })
};

window.addEventListener('load', post);