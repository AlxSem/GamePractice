let cellArr = []; // Инициализация массива ячеек
let player = [];
let cellSize = 3; // Размер ячейки
let gridSize = 400; // размер поля
let eatCount = 30000; // количество еды на старте
let bonusCount = 100; // количество бонусов
let speed = 20; // скорость хода
let evolution = true; //режим эволюции
const Rand = {
    get: function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

  class Cell {
    constructor(size, x, y, id, state) {
        this.width = size;
        this.height = size;
        this.id = id;
        this.state = Number(state);
        this.colour = this.getColor(this.state);
        this.x = x;
        this.y = y;
        this.drow();
    }

    setState(state) {
        this.state = state;
    }

    getColor(state) {
        let colourArr = [
            "#c5c2c1",
            "#0d5906",
            "#727607",
            "blue",
            "green",
            "black",
            "red"
        ];
        return colourArr[state];
    }

    drow() {
        const canvas = document.getElementById("myCanvas");
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = this.getColor(this.state);
        ctx.strokeStyle = 'green';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fill();
        ctx.closePath();
    }

    refresh() {
        this.drow();
    }
}
class Player {
    nickname;
    isLive = true;
    abylRedi = true;
    color;
    maxHp = 1;
    hp = 1;
    atc = 1;
    def = 1;
    move = 1;
    eat = 0;
    score = 0;
    row;
    col;
    constructor(strength, id, nickname, child = false, x, y, maxHp = 1, atc = 1, def = 1, move = 1) {
        this.id = id;
        this.nickname = nickname;
        this.color = cellArr[0][0].getColor(id);
        if(child)
        {
            this.row = x;
            this.col = y;
            this.maxHp = maxHp;
            this.atc = atc;
            this.def = def;
            this.move = move;
        }
        else{
           
            this.spawn();
        }
        this.generateCharacter(strength);
        console.log(`Здрайствуйте я: ${this.nickname}, цвет ${this.color}, Характеристика такова: Жизни = ${this.maxHp} Защита = ${this.def} Атака = ${this.atc} Шаг = ${this.move}`);
    }

    generateCharacter(strength) {
        do {
            let choice = Rand.get(1, 4);
            switch (choice) {
                case 1:
                    this.maxHp++;
                    break;
                case 2:
                    this.atc++;
                    break;
                case 3:
                    this.def++;
                    break;
                case 4:
                    this.move++;
                    break;
            }
            strength--;
        } while (strength > 0);
        this.hp = this.maxHp;
        
    }
    abyl()
    {

    }
    spawn() {
        do {
            this.row = Rand.get(0, gridSize - 1);
            this.col = Rand.get(0, gridSize - 1);
            if (cellArr[this.row][this.col].state === 0) {
                cellArr[this.row][this.col].state = this.id;
                return;
            }
        } while (1);
    }
    food(x, y)
    {
        cellArr[this.row][this.col].state = 0;
        cellArr[x][y].state = this.id;
        this.eat++;
        this.score += 15;
        if(this.hp<this.maxHp) this.hp++;
        this.row = x;
        this.col = y;
        if(evolution)
        {
            
            if (this.eat >= 5) {
                this.eat = 0;
                player.push(new Player(1, this.id, this.nickname, true, this.row, this.col, this.maxHp, this.atc, this.def, this.move));
            }
            
        }
        
    }
    level(x, y)
    {
        cellArr[this.row][this.col].state = 0;
        cellArr[x][y].state = this.id;
        this.score += 40;
        this.generateCharacter(1);
        console.log(`Я - ${this.nickname}, цвет - ${this.color}, нихуясебе это что магия?`);
        this.row = x;
        this.col = y;
    }
    battle(x, y)
    {
        let foundPlayer = player.find(player => player.row === x && player.col === y);
        if (foundPlayer) {
            console.log(`Игрок ${foundPlayer.nickname} в жуткой опасности. Похоже ${this.nickname} собирается нанести удар`);
            console.log("*Проверка удачи*");
            let roll = Rand.get(0, 100);
            let attackCalk = foundPlayer.def-this.atc;
            if(attackCalk<0) 
            {
                this.step();
                return;
            }
            if(roll <= 30)
            {
                console.log("НЕВЕРОЯТНО!!! КРИТИЧЕСКОЕ ПОПАДАНИЕ!!!");
                attackCalk *=4;
            }
            foundPlayer.hp -= this.atc;
            if (foundPlayer.hp <= 0)
            {
                console.log('Нанесен смертельный удар');
                foundPlayer.death();
            }
            this.step();
        }
    }
    step()
    {
        do {
            let directions = [
                { row: -Rand.get(0,this.move), col: 0 }, // Вверх
                { row: Rand.get(0,this.move), col: 0 },  // Вниз
                { row: 0, col: -Rand.get(0,this.move) }, // Влево
                { row: 0, col: Rand.get(0,this.move) },   // Вправо
                { row: -Rand.get(0,this.move), col: -Rand.get(0,this.move) },  // лево вверх
                { row: -Rand.get(0,this.move), col: Rand.get(0,this.move) },  // право ввех
                { row: Rand.get(0,this.move), col: -Rand.get(0,this.move) },  // лево вниз
                { row: Rand.get(0,this.move), col: Rand.get(0,this.move) },  // право вниз
            ];
            let temp = Rand.get(0, directions.length-1);
            let newRow = this.row + directions[temp].row;
            let newCol = this.col + directions[temp].col;
            if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize) {
                if(cellArr[newRow][newCol].state != 0) break;
                cellArr[this.row][this.col].state = 0;
                cellArr[newRow][newCol].state = this.id;
                this.row = newRow;
                this.col = newCol;
                return;
            }
        } while (1);
        
    }
    death()
    {
        //if(this.abylRedi)
        // {
        //     console.log(this.nickname + ' OMAE WA MOU SHINDEIRU!!! NANIIII???');
        //     this.hp = 1;
        //     this.abyl();
        //     this.abylRedi = false;
        //     return;
        // }
        console.log(`Я - ${this.nickname}, цвет - ${this.color}: Ну всё тю-тю малина =(    Очки: ${this.score}`);
        this.isLive = false;
        cellArr[this.row][this.col].state = 0;
    }
    scan() {
        if(this.isLive)
        {
            const radius = this.move;
            let list = [];
            for (let i = -radius; i <= radius; i++) {
                for (let j = -radius; j <= radius; j++) {
                    let newRow = this.row + i;
                    let newCol = this.col + j;
                    if (newRow >= 0 && newRow < gridSize && newCol >= 0 && newCol < gridSize && !(i === 0 && j === 0)) {
                        let currentState = cellArr[newRow][newCol].state;
                        if (currentState >= 1) {

                            list.push({ x: newRow, y: newCol, state: currentState });
                        }
                    }
                }
            }
            if (list.length > 0) {
                let temp = Rand.get(0, list.length-1);
                this.action(list[temp].x, list[temp].y, list[temp].state);
            }
            else
            {
                this.step();
            }

        }
    }
    action(x, y, state)
    {
        switch (state) {
            case 1:
                this.food(x, y);
                break;

            case 2:
                this.level(x, y);
                break;
            default:
                if(state==this.id)
                {
                    this.step()
                    break;
                }
                this.battle(x, y);
                break;
        }
        
    }
}
function createGrid() {
    for (let i = 0; i < gridSize; i++) {
        cellArr[i] = []; // Инициализация внутренних массивов
        for (let j = 0; j < gridSize; j++) {
            let currentX = j * cellSize; // Вычисляем координату X для текущей ячейки
            let currentY = i * cellSize; // Вычисляем координату Y для текущей ячейки
            cellArr[i][j] = new Cell(cellSize, currentX, currentY, i * gridSize + j, 0); // Сохраняем в двумерный массив
        }
    }
}
function generateEat(amountEat) {
    do {
        let row = Rand.get(0, gridSize - 1);
        let col = Rand.get(0, gridSize - 1);
        if (cellArr[row][col].state === 0) {
            cellArr[row][col].state = 1;
            amountEat--;
        }
    } while (amountEat > 0);
}

function generateBonus(amountBonus) {
    do {
        let row = Rand.get(0, gridSize - 1);
        let col = Rand.get(0, gridSize - 1);
        if (cellArr[row][col].state === 0) {
            cellArr[row][col].state = 2;
            amountBonus--;
        }
    } while (amountBonus > 0);
}

const canvas = document.getElementById("myCanvas");
canvas.width = cellSize*gridSize;
canvas.height = cellSize*gridSize;
createGrid();
generateEat(eatCount);
generateBonus(bonusCount);
player[0] = new Player(5, 3, "Солевой");
player[1] = new Player(5, 4, "Эпилептик");
player[2] = new Player(5, 5, "Торчок");
player[3] = new Player(5, 6, "Бруль");
function move()
{
    for(let i = 0; i<player.length; i++)
    {
        player[i].scan()
    }
}

function draw() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    move();
    for (let i = 0; i < cellArr.length; i++) {
        for (let j = 0; j < cellArr[i].length; j++) {
            cellArr[i][j].refresh();
        }
    }

}

setInterval(draw, speed);
        //return colourArr[Math.floor(Math.random() * colourArr.length)];
        