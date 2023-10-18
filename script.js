// putting all the gotis in their home in starting

let yellow_gotis = document.getElementsByClassName('yellow_goti');
for (let i=0;i<yellow_gotis.length;i++){
    let yellow_goti = document.createElement('div');
    yellow_goti.className = 'js_yellow_goti choosableByClick';
    yellow_goti.id = `id_yellow_goti${i+1}`;
    yellow_goti.innerHTML = i+1;
    yellow_gotis[i].appendChild(yellow_goti);
}

let blue_gotis = document.getElementsByClassName('blue_goti');
for (let i=0;i<blue_gotis.length;i++){
    let blue_goti = document.createElement('div');
    blue_goti.className = 'js_blue_goti choosableByClick';
    blue_goti.id = `id_blue_goti${i+1}`;
    blue_goti.innerHTML = i+1;
    blue_gotis[i].appendChild(blue_goti);
}

let green_gotis = document.getElementsByClassName('green_goti');
for (let i=0;i<green_gotis.length;i++){
    let green_goti = document.createElement('div');
    green_goti.className = 'js_green_goti choosableByClick';
    green_goti.id = `id_green_goti${i+1}`;
    green_goti.innerHTML = i+1;
    green_gotis[i].appendChild(green_goti);
}

let red_gotis = document.getElementsByClassName('red_goti');
for (let i=0;i<red_gotis.length;i++){
    let red_goti = document.createElement('div');
    red_goti.className = 'js_red_goti choosableByClick';
    red_goti.id = `id_red_goti${i+1}`;
    red_goti.innerHTML = i+1;
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

let firstValue = new Map([
    ["red",40],
    ["blue",1],
    ["green",27],
    ["yellow",14]
])

let haveUserChoosed = false;
let userChoice = 0;
let canRoll = true;

// function for doing something onclick
let doOnClick = (e) => {
    console.log(e.target);
    userChoice = e.target.innerHTML;
    if (!(userChoice=="1" || userChoice=="2" || userChoice=="3" || userChoice=="4")){
        userChoice = e.target.children[0].innerHTML;
    }
    console.log(userChoice);
    haveUserChoosed = true;
}
// making gotis clickable
let all_gotis = document.getElementsByClassName('choosableByClick');
for (let i=0;i<all_gotis.length;i++){
    all_gotis[i].onclick = (e) => {
        doOnClick(e);
    }
}

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
roll_button.onclick = async () => {
    if (canRoll==false){
        return ;
    }
    else{
        canRoll = false;
        let dice_value = document.getElementById('dice_value');
        let uservalue = Math.floor(Math.random()*6)+1;
        dice_value.innerHTML = uservalue;

        await blink_the_gotis(uservalue, chance);

        if (uservalue!=6){
            chance = (chance+1)%4;
            change_the_chance(chance);
        }
        else{
            change_the_chance(chance);
        }
        canRoll = true;
    }
}



let blink_the_gotis = async (uservalue, chance) => {
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

    await move_the_goti(uservalue, chance);

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

    return new Promise((resolve) => {
        resolve("done");
    })

}

// isAnyOut
function isAnyOut(chance){
    let isAnyOutv = gotis_position_array_map[color_map.get(chance)];
    for (let i=0;i<isAnyOutv.length;i++){
        if (isAnyOutv[i]!=-1){
            return 1;
        }
    }
    return 0;
}

// a function returning promise
let choosedGoti = () =>  new Promise((resolve, reject) => {
    const check = () => {
        console.log("hellow oror");
        if (haveUserChoosed){
            resolve(userChoice);
        }
        else{
            setTimeout(check,1000);
        }
    }
    check();
})

// function to move the goti
const move_the_goti = async (uservalue, chance) => {
    // when it is other than 6 and checking if any goti is out
    if (uservalue!=6 && !isAnyOut(chance)){
        return ;
    }

    let k = await choosedGoti();
    console.log(k);
    haveUserChoosed = false;
    while(!active_status.get(`id_${color_map.get(chance)}_goti${k}`)){
        console.log("something is wrong");
        k = await choosedGoti();
    }

    let prePosition = gotis_position_array_map[color_map.get(chance)][k-1];
    if (prePosition==-1 && uservalue==6){
        console.log(firstValue.get(color_map.get(chance)));
        gotis_position_array_map[color_map.get(chance)][k-1] = firstValue.get(color_map.get(chance));
    }
    else{
        gotis_position_array_map[color_map.get(chance)][k-1] += uservalue;
        console.log(gotis_position_array_map[color_map.get(chance)]);
    }
    if (prePosition==-1){
        let gotis = document.getElementsByClassName(`${color_map.get(chance)}_goti`);
        let preElement = gotis[k-1].innerHTML;
        gotis[k-1].innerHTML = '';
        document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).innerHTML = preElement;
        document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
            doOnClick(e);
        }
    }
    else{
        let preElement = document.getElementById(`g${prePosition}`).innerHTML;
        document.getElementById(`g${prePosition}`).innerHTML = '';
        document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).innerHTML =  preElement;
        document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
            doOnClick(e);
        }
    }

    return new Promise((resolve) => {
        resolve("done");
    })
}

{/* <div class="js_blue_goti choosableByClick blink" id="id_blue_goti4">4</div> script.js:70:13
hellow oror script.js:187:17
<div class="js_blue_goti choosableByClick blink" id="id_blue_goti4">4</div> script.js:206:13
something is wrong */}



