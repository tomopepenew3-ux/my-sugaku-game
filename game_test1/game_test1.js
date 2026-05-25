const readline = require('readline-sync');
// 1. さっき作った日本語のデータを読み込む（Javaのプロパティファイル読み込みと同じ）
const lang = require('./ja.json');

const targetNumber = Math.floor(Math.random() * 100) + 1; 
let attempts = 0; 
let isCorrect = false;

// 2. 出力するときは、ロジックの中に日本語を直接書かない！
console.log(lang.TITLE);

while (!isCorrect) {
    // 外部ファイルからメッセージを呼び出す
    let input = readline.question(lang.INPUT);
    let guess = parseInt(input, 10); 

    if (isNaN(guess)) {
        console.log(lang.INVALID);
        continue;
    }

    attempts++; 

    if (guess === targetNumber) {
        // Javaの String.format() みたいに、変数を文字の中に埋め込む処理
        let successMessage = lang.CORRECT.replace('%s', attempts);
        console.log(successMessage);
        isCorrect = true; 
    } else if (guess < targetNumber) {
        console.log(lang.BIGGER);
    } else {
        console.log(lang.SMALLER);
    }
}