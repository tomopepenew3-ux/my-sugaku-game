const http = require('http');
const lang = require('./ja.json');

// サーバーが勝手に数字を決める（1〜100）
const targetNumber = Math.floor(Math.random() * 100) + 1;

// Webサーバーを作る
const server = http.createServer((req, res) => {
    // ★ここが超重要！ブラウザに「これはUTF-8の日本語のHTMLだよ」と伝えるヘッダー
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });

    // URLの末尾から数字を読み取る（例: /?guess=50）
    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const guessParam = urlParams.searchParams.get('guess');
    const guess = parseInt(guessParam, 10);

    // 画面に表示するHTMLを組み立てる
    let html = `<h1>${lang.TITLE}</h1>`;

    if (!guessParam) {
        html += `<p>URLの最後に <b>?guess=数字</b> をつけてアクセスしてね！</p>`;
    } else if (isNaN(guess)) {
        html += `<p style="color:red;">${lang.INVALID}</p>`;
    } else {
        html += `<p>あなたの予想: ${guess}</p>`;
        if (guess === targetNumber) {
            html += `<h2 style="color:green;">${lang.CORRECT.replace('%s', '???')}（リロードすると数字が変わるよ）</h2>`;
        } else if (guess < targetNumber) {
            html += `<p style="color:blue;">${lang.BIGGER}</p>`;
        } else {
            html += `<p style="color:orange;">${lang.SMALLER}</p>`;
        }
    }

    res.end(html);
});

// Renderが指定するポート番号（なければ3000番）で起動する
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});