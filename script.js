// putting all the gotis in their home in starting
let yellow_gotis = document.getElementsByClassName('peeli_goti');
for (let i=0;i<yellow_gotis.length;i++){
    let yellow_goti = document.createElement('div');
    yellow_goti.className = 'js_yellow_goti';
    yellow_gotis[i].appendChild(yellow_goti);
}

let blue_gotis = document.getElementsByClassName('nili_goti');
for (let i=0;i<blue_gotis.length;i++){
    let blue_goti = document.createElement('div');
    blue_goti.className = 'js_blue_goti';
    blue_gotis[i].appendChild(blue_goti);
}

let green_gotis = document.getElementsByClassName('hari_goti');
for (let i=0;i<green_gotis.length;i++){
    let green_goti = document.createElement('div');
    green_goti.className = 'js_green_goti';
    green_gotis[i].appendChild(green_goti);
}

let red_gotis = document.getElementsByClassName('laal_goti');
for (let i=0;i<red_gotis.length;i++){
    let red_goti = document.createElement('div');
    red_goti.className = 'js_red_goti';
    red_gotis[i].appendChild(red_goti);
}

// rshowing the chance function
let change_the_chance = (chance) => {
    console.log(chance);
    let chance_goti = document.getElementById('chance_goti');
    switch(chance){
        case 0:
            let goti1 = document.createElement('div');
            goti1.className = "js_red_goti";
            chance_goti.innerHTML = '';
            chance_goti.appendChild(goti1);
            break;
        case 1:
            let goti2 = document.createElement('div');
            goti2.className = "js_blue_goti";
            chance_goti.innerHTML = '';
            chance_goti.appendChild(goti2);
            break;
        case 2:
            let goti3 = document.createElement('div');
            goti3.className = 'js_yellow_goti';
            chance_goti.innerHTML = '';
            chance_goti.appendChild(goti3);
            break;
        case 3:
            let goti4 = document.createElement('div');
            goti4.className = 'js_green_goti';
            chance_goti.innerHTML = '';
            chance_goti.appendChild(goti4);
            break;
    }
}

// setting first chance
let chance = Math.floor(Math.random()*4);
change_the_chance(chance);

// rolling the dice
let roll_button = document.getElementById('roll_the_dice');
roll_button.onclick = () => {
    let dice_value = document.getElementById('dice_value');
    let uservalue = Math.floor(Math.random()*6)+1;
    dice_value.innerHTML = uservalue;

    user_move(uservalue, chance);

    if (uservalue!=6){
        console.log("helo world");
        chance = (chance+1)%4;
        change_the_chance(chance);
    }
}

let user_move = (uservalue, chance) => {
    console.log(chance+" got the number "+uservalue);
}

