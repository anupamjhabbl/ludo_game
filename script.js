// putting all the gotis in their home in starting

let yellow_gotis = document.getElementsByClassName('peeli_goti');
for (let i=0;i<yellow_gotis.length;i++){
    let yellow_goti = document.createElement('div');
    yellow_goti.className = 'js_yellow_goti';
    yellow_goti.id = `id_yellow_goti${i+1}`;
    yellow_gotis[i].appendChild(yellow_goti);
}

let blue_gotis = document.getElementsByClassName('nili_goti');
for (let i=0;i<blue_gotis.length;i++){
    let blue_goti = document.createElement('div');
    blue_goti.className = 'js_blue_goti';
    blue_goti.id = `id_blue_goti${i+1}`;
    blue_gotis[i].appendChild(blue_goti);
}

let green_gotis = document.getElementsByClassName('hari_goti');
for (let i=0;i<green_gotis.length;i++){
    let green_goti = document.createElement('div');
    green_goti.className = 'js_green_goti';
    green_goti.id = `id_green_goti${i+1}`;
    green_gotis[i].appendChild(green_goti);
}

let red_gotis = document.getElementsByClassName('laal_goti');
for (let i=0;i<red_gotis.length;i++){
    let red_goti = document.createElement('div');
    red_goti.className = 'js_red_goti';
    red_goti.id = `id_red_goti${i+1}`;
    red_gotis[i].appendChild(red_goti);
}



// mapping every color with array containing position of their gotis
let gotis_position_array_map = {
    "red":[-1,-1,-1,-1],
    "yellow":[-1,-1,-1,-1],
    "green":[-1,-1,-1,-1],
    "blue":[-1,-1,-1,-1]
}

let active_status = new Map();
const color_map = new Map([
    [0,"red"],
    [1,"blue"],
    [2,"yellow"],
    [3,"green"]
])

// rshowing the chance function
let change_the_chance = (chance) => {
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
        chance = (chance+1)%4;
        change_the_chance(chance);
    }
}

let user_move = (uservalue, chance) => {
    if (uservalue==6){
        for (let i=1;i<=4;i++){
            active_status.set(`id_${color_map.get(chance)}_goti${i}`,1);
            document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className += " blink";
        }
    }
    else{
        for (let i=1;i<=4;i++){
            if (gotis_position_array_map[color_map.get(chance)][i-1]!=-1){
                active_status.set(`id_${color_map.get(chance)}_goti${i}`,1);
                document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className += " blink";
            }
        }
    }

    move_the_goti(uservalue);

    if (uservalue==6){
        for (let i=1;i<=4;i++){
            active_status.set(`id_${color_map.get(chance)}_goti${i}`,0);
            let k = document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className;
            document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className = k.substring(0,k.length-6);
        }
    }
    else{
        for (let i=1;i<=4;i++){
            if (gotis_position_array_map[color_map.get(chance)][i-1]!=-1){
                active_status.set(`id_${color_map.get(chance)}_goti${i}`,0);
                let k = document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className;
                document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className = k.substring(0,k.length-6);
            }
        }
    }

}

// function to move the goti
const move_the_goti = (uservalue) => {
    
}

