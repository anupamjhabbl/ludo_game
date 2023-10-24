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

// storing the place value of boxes with star
let star_boxes = new Set([22,27,14,9,35,40,1,48]);

// map for stoting the active status of the gotis
let active_status = new Map();

// mapping colors with number
const color_map = new Map([
    [0,"red"],
    [1,"blue"],
    [2,"yellow"],
    [3,"green"]
])

// stroing the first box position of different color goti
let firstValue = new Map([
    ["red",40],
    ["blue",1],
    ["green",27],
    ["yellow",14]
])

let haveUserChoosed = false;              // tracker to stop the other code to run until any of the goti is selected
let userChoice = 0;                       // to store which goti user has selected
let canRoll = true;                       // tracker to store that we can roll the dice or not
let goal_done = false;                    // when one color enter into goal it becomes true

// map to store which color which goti have already went in goal
let goalStatus =  new Map([
    ["goal_green",[false, false, false, false]],
    ["goal_red",[false, false, false, false]],
    ["goal_yellow",[false, false, false, false]],
    ["goal_blue",[false, false, false, false]]
])

// storing the name of users
let user1, user2, user3, user4;
user1 = prompt("Enter the user who want red");
user2 = prompt("Enter the user who want blue");
user3 = prompt("Enter the user who want yellow");
user4 = prompt("Enter the user who want green");

// map to store color taken by username
let user = new Map([
    ["red",user1],
    ["blue",user2],
    ["yellow",user3],
    ["green",user4]
])

// map to store which user have goaled all four
let goaled_all_four = new Map([
    [user1,-1],
    [user2,-1],
    [user3,-1],
    [user4,-1]
])

// to keep the track of winners
let winner1, winner2, winner3, loser;
winner1 = winner2 = winner3 = loser = -1;

let chance = Math.floor(Math.random()*4);


// function for doing selecting one of the blinking goti on click
let doOnClick = (e) => {
    if (e.target.innerHTML!="1" && e.target.innerHTML!="2" && e.target.innerHTML!="3" && e.target.innerHTML!="4"){
        console.log("1");
        if (e.target.children.length>1){
            console.log("11");
            let i = 0;
            while (i<e.target.children.length && e.target.children[i].className.indexOf(`js_${color_map.get(chance)}_goti`)==-1){
                i++;
            }
            userChoice = e.target.children[i].innerHTML;
        }
        else{
            console.log("12");
            userChoice = e.target.children[0].innerHTML;
        }
    }
    else{
        console.log("2");
        if (e.target.parentElement.children.length>1){
            console.log("21");
            let i = 0;
            while (i<e.target.parentElement.children.length && e.target.parentElement.children[i].className.indexOf(`js_${color_map.get(chance)}_goti`)==-1){
                i++;
            }
            userChoice = e.target.parentElement.children[i].innerHTML;
        }
        else{
            console.log("22");
            userChoice = e.target.parentElement.children[0].innerHTML;
        }
    }
    haveUserChoosed = true;
}

// making gotis clickable
let all_gotis = document.getElementsByClassName('choosableByClick');
for (let i=0;i<all_gotis.length;i++){
    all_gotis[i].onclick = (e) => {
        doOnClick(e);
    }
}

// changing the chance and showing whose chance it is
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

// setting first chance randomly
change_the_chance(chance);

// rolling the dice
let roll_dice = async () => {
    if (canRoll==false){
        return ;
    }
    else{
        canRoll = false;                  // making canRoll false until user don't make a move so that no one call roll the dice
        let dice_value = document.getElementById('dice_value');
        let uservalue = Math.floor(Math.random()*6)+1;
        dice_value.innerHTML = uservalue;

        // calling blink_the_goti function that will return a promise and before that it will add class blink to needed goti so that they can blink
        await blink_the_gotis(uservalue, chance);

        if (uservalue!=6){                 // changing the chance value if it is not 6
            chance = (chance+1)%4;
            change_the_chance(chance);
        } 
        else{                              // not changing th chance value if it is 6
            change_the_chance(chance);
        }
        canRoll = true;                    // since user have moved his goti so making canRoll true
    }
}

// making roll dice on click of "ENTER"
let roll_button = document.getElementById('roll_the_dice');
roll_button.onclick = roll_dice;
window.addEventListener("keypress",function(e){
    if (e.key=="Enter"){
        e.preventDefault();
        roll_dice();
    }
})


// function to blink the neede gotis and then call the function move_the_goti which will move the goti according to user selceted goti and dice value
async function blink_the_gotis(uservalue, chance){
    let counter = 0;
    if (uservalue==6){
        for (let i=1;i<=4;i++){
            if (gotis_position_array_map[color_map.get(chance)][i-1]==-2){

            }
            else{
                active_status.set(`id_${color_map.get(chance)}_goti${i}`,1);
                document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className += " blink";
                counter = 1;
            }
        }
    }
    else{
        for (let i=1;i<=4;i++){
            if (gotis_position_array_map[color_map.get(chance)][i-1]>=0){
                active_status.set(`id_${color_map.get(chance)}_goti${i}`,1);
                document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className += " blink";
                counter = 1;
            }
        }
    }
    if (counter==0){
        return ;
    }

    // calling move the goti which will resolve after user move the goti
    await move_the_goti(uservalue, chance);

    if (uservalue==6){
        for (let i=1;i<=4;i++){
            if (gotis_position_array_map[color_map.get(chance)][i-1]==-2){

            }
            else{
                active_status.set(`id_${color_map.get(chance)}_goti${i}`,0);
                let k = document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className;
                document.getElementById(`id_${color_map.get(chance)}_goti${i}`).className = k.substring(0,k.length-6);
            }
        }
    }
    else{
        for (let i=1;i<=4;i++){
            if (gotis_position_array_map[color_map.get(chance)][i-1]>=0){
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

// function to check that is there any goti out 
function isAnyOut(chance){
    let isAnyOutv = gotis_position_array_map[color_map.get(chance)];
    for (let i=0;i<isAnyOutv.length;i++){
        if (isAnyOutv[i]!=-1){
            return 1;
        }
    }
    return 0;
}

// a function returning promise and it will stop the other js code to run until the user selects a goti and make the move
let choosedGoti = () =>  new Promise((resolve, reject) => {
    const check = () => {
        if (haveUserChoosed){
            resolve(userChoice);
        }
        else{
            setTimeout(check,1000);
        }
    }
    check();
})


// find the Loser
function findTheLoser() {
    if (goaled_all_four.get(user1)==-1){
        return user1;
    }
    else if(goaled_all_four.get(user2)==-1){
        return user2;
    }
    else if(goaled_all_four.get(user3)==-1){
        return user3;
    }
    else{
        return user4;
    }
}

// function to move the goti
async function move_the_goti(uservalue, chance){
    // when it is other than 6 and checking if any goti is out, if no then just return from here and give the chance to next user
    if (uservalue!=6 && !isAnyOut(chance)){
        return ;
    }

    let k = await choosedGoti();         // waiting for the user select a goti that he want to move
    haveUserChoosed = false;             // dubara se usko false kardo so that next move wale ke liye false rahe
    let m;
    while(!active_status.get(`id_${color_map.get(chance)}_goti${k}`)){      // looping until user don't select a valid button
        k = await choosedGoti();
    }

    // getting the position of the box where the selected goti is cureently at
    let prePosition = gotis_position_array_map[color_map.get(chance)][k-1];
    let goal_entered = false;
    if (prePosition==-1 && uservalue==6){          // if goti is inside the home and uservalue is 6
        gotis_position_array_map[color_map.get(chance)][k-1] = firstValue.get(color_map.get(chance));
    }
    else{
        let previous_value = gotis_position_array_map[color_map.get(chance)][k-1];
        m = gotis_position_array_map[color_map.get(chance)][k-1] + uservalue;      // getting the position of the box where it will go
        
        // for different different color handling the case if goti is going to be goaled, goti is trying to go beyond or goti is trying to go on some box
        if (chance==0 && m>38 && (previous_value<=38 || goalStatus.get(`goal_${color_map.get(chance)}`)[k-1])){
            if (m==44){
                goal_done = true;
            }
            if (m>44){
                return ;
            }
            else{
                m = m - 38;
                goal_entered = true;
                gotis_position_array_map[color_map.get(chance)][k-1] += uservalue;
                goalStatus.get(`goal_${color_map.get(chance)}`)[k-1] = true;
            }
        }
        else if(chance==1 && m>51){
            if (m==57){
                goal_done = true;
            }
            if (m>57){
                return ;
            }
            else{
                m = m - 51;
                goal_entered = true;
                gotis_position_array_map[color_map.get(chance)][k-1] += uservalue;
                goalStatus.get(`goal_${color_map.get(chance)}`)[k-1] = true;
            }
        }
        else if(chance==2 && m>12 && (previous_value<=12 || goalStatus.get(`goal_${color_map.get(chance)}`)[k-1])){
            if (m==18){
                goal_done = true;
            }
            if (m>18){
                return ;
            }
            else{
                m = m - 12;
                goal_entered = true;
                gotis_position_array_map[color_map.get(chance)][k-1] += uservalue;
                goalStatus.get(`goal_${color_map.get(chance)}`)[k-1] = true;
            }
        }
        else if(chance==3 && m>25 && (previous_value<=25 || goalStatus.get(`goal_${color_map.get(chance)}`)[k-1])){
            if (m==31){
                goal_done = true;
            }
            if (m>31){
                return ;
            }
            else{
                m = m - 25;
                goal_entered = true;
                gotis_position_array_map[color_map.get(chance)][k-1] += uservalue;
                goalStatus.get(`goal_${color_map.get(chance)}`)[k-1] = true;
            }
        }
        else if (m>52){
            m = m - 52;
            gotis_position_array_map[color_map.get(chance)][k-1] = m;
        }
        else{
            gotis_position_array_map[color_map.get(chance)][k-1] = m;
        }
    }
    if (prePosition==-1){      // if preposition is -1 then preElement will be taken differently
        let gotis = document.getElementsByClassName(`${color_map.get(chance)}_goti`);
        let preElement = gotis[k-1].children[0];
        gotis[k-1].innerHTML = '';              // making the box clean where it was prior
        if (document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).innerHTML != ''){   // if the box where it is going is not empty
            // if the goti there is of same color or box is a star box
            if (document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).children[0].className == preElement.className || star_boxes.has(gotis_position_array_map[color_map.get(chance)][k-1])){
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).appendChild(preElement);
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
                    doOnClick(e);
                }
            }
            else{      // if the goti is of different color      
                let gotis_in_next = document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).children;
                for (let i=0;i<gotis_in_next.length;i++){
                    let id_of_element = gotis_in_next[i].getAttribute("id");
                    let goti_no = id_of_element[id_of_element.length-1];
                    let color = id_of_element.substring(3,id_of_element.length-6);
                    document.getElementsByClassName(`${color}_goti`)[goti_no-1].appendChild(gotis_in_next[i]);
                    gotis_position_array_map[color][goti_no-1] = -1;
                }
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).innerHTML = '';
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).appendChild(preElement);
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
                    doOnClick(e);
                }
            }
        }
        else{         // if the box where we are going to store has nothing
            document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).appendChild(preElement);
            document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
                doOnClick(e);
            }
        }
    }
    else if (goal_done==true){            // if the element is goaled
        if (chance==0){
            let preElement;
            if (prePosition==38){         // if it is previously out of goal boxes
                preElement = document.getElementById(`g${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`g${prePosition}`).children.length>1){
                    while (i<document.getElementById(`g${prePosition}`).children.length && document.getElementById(`g${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`g${prePosition}`).children[i];
                }
                document.getElementById(`g${prePosition}`).removeChild(preElement);
            }
            else{            // if it is previously in the goal box
                prePosition = prePosition - 38;
                preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length>1){
                    while (i<document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length && document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i];
                }
                document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).removeChild(preElement);
            }
            let id_of_element = preElement.getAttribute("id");
            let goti_no = id_of_element[id_of_element.length-1];
            let color = id_of_element.substring(3,id_of_element.length-6);
            gotis_position_array_map[color][goti_no-1] = -2;
            let classnameofpre = preElement.className;
            preElement.className = classnameofpre.substring(0,classnameofpre.length-23);
            preElement.className += ' goaled_goti';
            document.getElementById(`done_${color_map.get(chance)}`).appendChild(preElement);
            if (document.getElementById(`done_${color_map.get(chance)}`).children.length==4){
                if (winner1==-1){
                    winner1 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner1,2);
                }
                else if (winner2==-1){
                    winner2 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner2,2);
                }
                else{
                    winner3 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner3,2);
                    loser = findTheLoser();
                    storeMatchResult();
                    location.href='results.html';            // redirecting to page which contains result
                }
            }
        }
        else if (chance==1){
            let preElement;
            if (prePosition==51){
                preElement = document.getElementById(`g${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`g${prePosition}`).children.length>1){
                    while (i<document.getElementById(`g${prePosition}`).children.length && document.getElementById(`g${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`g${prePosition}`).children[i];
                }
                document.getElementById(`g${prePosition}`).removeChild(preElement);
            }
            else{
                prePosition = prePosition - 51;
                preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length>1){
                    while (i<document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length && document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i];
                }
                document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).removeChild(preElement);
            }
            let id_of_element = preElement.getAttribute("id");
            let goti_no = id_of_element[id_of_element.length-1];
            let color = id_of_element.substring(3,id_of_element.length-6);
            gotis_position_array_map[color][goti_no-1] = -2;
            let classnameofpre = preElement.className;
            preElement.className = classnameofpre.substring(0,classnameofpre.length-23);
            preElement.className += ' goaled_goti';
            document.getElementById(`done_${color_map.get(chance)}`).appendChild(preElement);
            if (document.getElementById(`done_${color_map.get(chance)}`).children.length==4){
                if (winner1==-1){
                    winner1 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner1,2);
                }
                else if (winner2==-1){
                    winner2 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner2,2);
                }
                else{
                    winner3 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner3,2);
                    loser = findTheLoser();
                    storeMatchResult();
                    location.href='results.html';    // redirecting to page which contains result
                }
            }
        }
        else if (chance==2){
            let preElement;
            if (prePosition==12){
                preElement = document.getElementById(`g${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`g${prePosition}`).children.length>1){
                    while (i<document.getElementById(`g${prePosition}`).children.length && document.getElementById(`g${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`g${prePosition}`).children[i];
                }
                document.getElementById(`g${prePosition}`).removeChild(preElement);
            }
            else{
                prePosition = prePosition - 12;
                preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length>1){
                    while (i<document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length && document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i];
                }
                document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).removeChild(preElement);
            }
            let id_of_element = preElement.getAttribute("id");
            let goti_no = id_of_element[id_of_element.length-1];
            let color = id_of_element.substring(3,id_of_element.length-6);
            gotis_position_array_map[color][goti_no-1] = -2;
            let classnameofpre = preElement.className;
            preElement.className = classnameofpre.substring(0,classnameofpre.length-23);
            preElement.className += ' goaled_goti';
            document.getElementById(`done_${color_map.get(chance)}`).appendChild(preElement);
            if (document.getElementById(`done_${color_map.get(chance)}`).children.length==4){
                if (winner1==-1){
                    winner1 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner1,2);
                }
                else if (winner2==-1){
                    winner2 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner2,2);
                }
                else{
                    winner3 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner3,2);
                    loser = findTheLoser();
                    storeMatchResult();
                    location.href='results.html';     // redirecting to page which contains result
                }
            }
        }
        else{
            let preElement;
            if (prePosition==25){
                preElement = document.getElementById(`g${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`g${prePosition}`).children.length>1){
                    while (i<document.getElementById(`g${prePosition}`).children.length && document.getElementById(`g${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`g${prePosition}`).children[i];
                }
                document.getElementById(`g${prePosition}`).removeChild(preElement);
            }
            else{
                prePosition = prePosition - 25;
                preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[0];
                let i = 0;
                if (document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length>1){
                    while (i<document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children.length && document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i].innerHTML!=k){
                        i++;
                    }
                    preElement = document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).children[i];
                }
                document.getElementById(`${color_map.get(chance)}_goal${prePosition}`).removeChild(preElement);
            }
            let id_of_element = preElement.getAttribute("id");
            let goti_no = id_of_element[id_of_element.length-1];
            let color = id_of_element.substring(3,id_of_element.length-6);
            gotis_position_array_map[color][goti_no-1] = -2;
            let classnameofpre = preElement.className;
            preElement.className = classnameofpre.substring(0,classnameofpre.length-23);
            preElement.className += ' goaled_goti';
            document.getElementById(`done_${color_map.get(chance)}`).appendChild(preElement);
            if (document.getElementById(`done_${color_map.get(chance)}`).children.length==4){
                if (winner1==-1){
                    winner1 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner1,2);
                }
                else if (winner2==-1){
                    winner2 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner2,2);
                }
                else{
                    winner3 = user.get(color_map.get(chance));
                    goaled_all_four.set(winner3,2);
                    loser = findTheLoser();
                    storeMatchResult();
                    location.href='results.html';      // redirecting to page which contains result
                }
            }
        }
        goal_done = false;
    }
    else if(goal_entered==false){          // if goti is not already in goal box and also not going this time
        let preElement = document.getElementById(`g${prePosition}`).children[0];
        let i = 0;
        if (document.getElementById(`g${prePosition}`).children.length>1){
            while (i<document.getElementById(`g${prePosition}`).children.length && document.getElementById(`g${prePosition}`).children[i].innerHTML!=k){
                i++;
            }
            preElement = document.getElementById(`g${prePosition}`).children[i];
        }
        document.getElementById(`g${prePosition}`).removeChild(preElement);
        if (document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).innerHTML != ''){
            if (document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).children[0].className == preElement.className || star_boxes.has(gotis_position_array_map[color_map.get(chance)][k-1])){
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).appendChild(preElement);
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
                    doOnClick(e);
                }
            }
            else{
                let gotis_in_next = document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).children;
                for (let i=0;i<gotis_in_next.length;i++){
                    let id_of_element = gotis_in_next[i].getAttribute("id");
                    let goti_no = id_of_element[id_of_element.length-1];
                    let color = id_of_element.substring(3,id_of_element.length-6);
                    document.getElementsByClassName(`${color}_goti`)[goti_no-1].appendChild(gotis_in_next[i]);
                    gotis_position_array_map[color][goti_no-1] = -1;
                }
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).innerHTML = '';
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).appendChild(preElement);
                document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
                    doOnClick(e);
                }
            }
        }
        else{
            document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).appendChild(preElement);
            document.getElementById(`g${ gotis_position_array_map[color_map.get(chance)][k-1]}`).onclick = (e) => {
                doOnClick(e);
            }
        }
    }
    else{      // going in goal box ans previously was not also in goal boxes
        let preElementBox;
        if (chance==0 && prePosition>38){
            preElementBox = document.getElementById(`${color_map.get(chance)}_goal${prePosition-38}`);
        }
        else if (chance==1 && prePosition>51){
            preElementBox = document.getElementById(`${color_map.get(chance)}_goal${prePosition-51}`);
        }
        else if (chance==2 && prePosition>12){
            preElementBox = document.getElementById(`${color_map.get(chance)}_goal${prePosition-12}`);
        }
        else if (chance==3 && prePosition>25){
            preElementBox = document.getElementById(`${color_map.get(chance)}_goal${prePosition-25}`);
        }
        else{
            preElementBox = document.getElementById(`g${prePosition}`);
        }
        let preElement = preElementBox.children[0];
        let i = 0;
        if (preElementBox.children.length>1){
            while (i<preElementBox.children.length && preElementBox.children[i].innerHTML!=k){
                i++;
            }
            preElement = preElementBox.children[i];
        }
        preElementBox.removeChild(preElement);
        if (document.getElementById(`${color_map.get(chance)}_goal${m}`).innerHTML != ''){
            if (document.getElementById(`${color_map.get(chance)}_goal${m}`).children[0].className == preElement.className){
                document.getElementById(`${color_map.get(chance)}_goal${m}`).appendChild(preElement);
                document.getElementById(`${color_map.get(chance)}_goal${m}`).onclick = (e) => {
                    doOnClick(e);
                }
            }
        }
        else{
            document.getElementById(`${color_map.get(chance)}_goal${m}`).appendChild(preElement);
            document.getElementById(`${color_map.get(chance)}_goal${m}`).onclick = (e) => {
                doOnClick(e);
            }
        }
        goal_entered = false;
    }

    return new Promise((resolve) => {
        resolve("done");
    })
}

// storing the match result
function storeMatchResult() {
    let thisMatchResult = {
        "winner1":winner1,
        "winner2":winner2,
        "winner3":winner3,
        "loser":loser
    }
    let k = localStorage.getItem("matchResults");
    if (k==null){
        let value = new Array();
        value.push(thisMatchResult);
        localStorage.setItem("matchResults",JSON.stringify(value));
    }
    else{
        k = JSON.parse(k);
        k.push(thisMatchResult);
        localStorage.setItem("matchResults",JSON.stringify(k));
    }
}