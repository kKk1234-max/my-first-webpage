// HTML要素を取得
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("game-over");

let isGameStarted = false;
let isGameOver = false;
let score = 0;
let scoreInterval;

// ゲームを開始またはリトライする
function startGame() {
    isGameStarted = true;
    isGameOver = false;
    score = 0;
    scoreElement.textContent = score;
    gameOverElement.style.display = 'none'; // 「GAME OVER」を隠す
    cactus.classList.add("cactus-move"); // サボテンを動かし始める

    // スコアを加算する処理
    scoreInterval = setInterval(() => {
        if (!isGameOver) {
            score++;
            scoreElement.textContent = score;
        }
    }, 100);

    // 当たり判定を開始
    checkCollision();
}

// 恐竜をジャンプさせる
function jump() {
    // ジャンプ中、またはゲームオーバー時は何もしない
    if (dino.classList.contains("dino-jump") || isGameOver) {
        return;
    }
    dino.classList.add("dino-jump");
    // 0.5秒後にジャンプアニメーションのクラスを削除
    setTimeout(() => {
        dino.classList.remove("dino-jump");
    }, 500); // CSSのアニメーション時間と合わせる
}

// ゲームオーバー処理
function gameOver() {
    isGameOver = true;
    isGameStarted = false;
    clearInterval(scoreInterval); // スコア加算を停止
    cactus.classList.remove("cactus-move"); // サボテンの動きを停止
    gameOverElement.style.display = 'block'; // 「GAME OVER」を表示
}

// 当たり判定を繰り返しチェックする
function checkCollision() {
    // ゲームオーバーならチェックを停止
    if (isGameOver) {
        return;
    }

    // 恐竜とサボテンの座標とサイズを取得
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    // 座標が重なっていたら当たり
    if (
        dinoRect.right > cactusRect.left &&
        dinoRect.left < cactusRect.right &&
        dinoRect.bottom > cactusRect.top &&
        dinoRect.top < cactusRect.bottom
    ) {
        gameOver();
    } else {
        // 当たっていなければ、次の描画フレームで再度チェック
        requestAnimationFrame(checkCollision);
    }
}

// キーボードのキーが押されたときの処理
document.addEventListener("keydown", (e) => {
    // スペースキーが押されたら
    if (e.code === 'Space') {
        if (!isGameStarted) {
            startGame(); // ゲームが始まっていなければ開始
        }
        jump(); // ジャンプする
    }
});

// スマホ画面がタップされたときの処理
document.addEventListener("touchstart", () => {
    if (!isGameStarted) {
        startGame();
    }
    jump();
});