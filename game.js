const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// プレイヤー情報
let player = { x: 1, y: 1, hp: 20, maxHp: 20 };

// 敵情報
let enemy = { x: 5, y: 5, hp: 10, maxHp: 10 };

// マップ（0:道, 1:壁）
const map = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,0,0,0,1,0,0],
  [0,1,0,1,0,0,0,1,0,0],
  [0,0,0,0,0,1,0,0,0,0],
  [0,0,1,0,0,1,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,1,0,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,0,0,0,1,0,0,1,0],
  [0,0,0,0,0,0,0,0,0,0]
];

const tileSize = 40;
let inBattle = false;

// 描画
function draw() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for(let y=0;y<10;y++){
    for(let x=0;x<10;x++){
      if(map[y][x]===1){
        ctx.fillStyle="grey";
        ctx.fillRect(x*tileSize, y*tileSize, tileSize, tileSize);
      }
    }
  }
  // プレイヤー
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x*tileSize, player.y*tileSize, tileSize, tileSize);
  // 敵
  if(!inBattle){
    ctx.fillStyle = "red";
    ctx.fillRect(enemy.x*tileSize, enemy.y*tileSize, tileSize, tileSize);
  }
}
draw();

// 移動
document.addEventListener("keydown", e=>{
  if(inBattle) return;
  let nx=player.x, ny=player.y;
  if(e.key==="ArrowUp") ny--;
  if(e.key==="ArrowDown") ny++;
  if(e.key==="ArrowLeft") nx--;
  if(e.key==="ArrowRight") nx++;
  if(map[ny][nx]===0){
    player.x=nx;
    player.y=ny;
    checkBattle();
  }
  draw();
});

// バトル開始判定
function checkBattle(){
  if(player.x===enemy.x && player.y===enemy.y){
    inBattle=true;
    alert("敵に遭遇！バトル開始！");
    drawBattle();
  }
}

// 戦闘描画
function drawBattle(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="black";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="blue";
  ctx.fillRect(50,200,50,50);
  ctx.fillStyle="red";
  ctx.fillRect(300,200,50,50);
  ctx.fillStyle="white";
  ctx.fillText(`プレイヤーHP: ${player.hp}`,50,180);
  ctx.fillText(`敵HP: ${enemy.hp}`,300,180);
}

// 戦闘アクション
function action(type){
  if(!inBattle) return;
  if(type==="attack"){
    enemy.hp -= Math.floor(Math.random()*5)+1;
  } else if(type==="defend"){
    player.hp += 2;
    if(player.hp>player.maxHp) player.hp=player.maxHp;
  }
  if(enemy.hp<=0){
    alert("勝利！");
    inBattle=false;
    enemy.hp=enemy.maxHp;
    enemy.x=Math.floor(Math.random()*10);
    enemy.y=Math.floor(Math.random()*10);
  } else {
    // 敵攻撃
    player.hp -= Math.floor(Math.random()*4)+1;
    if(player.hp<=0){
      alert("ゲームオーバー");
      player.hp=player.maxHp;
      player.x=1;
      player.y=1;
      inBattle=false;
    }
  }
  drawBattle();
}
