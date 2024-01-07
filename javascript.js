const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160, 10, 100, 40);
// ctx.strokeStyle = "rgba(0, 0, 255, 0.5)";
// ctx.stroke();
// ctx.closePath();
let x = canvas.width / 2;
let y = canvas.height- 50;
const ballRadius = 10;

let dx = 2;
let dy = 2;
function drawBall()
{
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    if(x + dx >canvas.width-ballRadius || x + dx < ballRadius)
    {
        dx = -dx;
        dx -= 0.5;
    }
    if(y + dy > canvas.height - ballRadius || y + dy < ballRadius)
    {
        dy = -dy;
        dy -= 0.5;
    }
    
    //if(x >= canvas.width-ballRadius) x = canvas.width-ballRadius;
    if(y <= canvas.height-ballRadius) dy += 0.1;
    x += dx;
    y += dy;
    
}
setInterval(draw, 10);
const matrixSize = 10; // Размер матрицы (например, 10x10)
const playerIndex = 50; // Текущая позиция игрока в одномерном массиве (это пример, замените на ваше значение)

function scanArea(matrixSize, playerIndex) {
    const radius = 1; // Радиус сканирования

    const row = Math.floor(playerIndex / matrixSize); // Определение текущей строки
    const col = playerIndex % matrixSize; // Определение текущего столбца

    const scannedCells = [];

    // Проход по окрестности радиуса в матрице
    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            const newRow = row + i;
            const newCol = col + j;

            // Проверка на границы матрицы
            if (newRow >= 0 && newRow < matrixSize && newCol >= 0 && newCol < matrixSize) {
                const index = newRow * matrixSize + newCol; // Индекс сканируемой ячейки в одномерном массиве
                scannedCells.push(index); // Добавляем сканируемую ячейку в список
            }
        }
    }

    return scannedCells;
}

const scannedCells = scanArea(matrixSize, playerIndex);
console.log(scannedCells);


scan() {
    const radius = this.move;
    console.log(`Я ${this.nickname}, ${this.color}, нашел еду`);
    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            let newRow = this.row + i;
            let newCol = this.col + j;
            console.log(`Я ${this.nickname}, ${this.color}, нашел еду`);
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !(i === 0 && j === 0)) {
                let currentState = cellArr[newRow][newCol].state;
                console.log(`Я ${this.nickname}, ${this.color}, нашел еду`);
                if(currentState === 1)
                {
                    console.log(`Я ${this.nickname}, ${this.color}, нашел еду`);
                }
                
            }
        }
    }
}