let result = localStorage.getItem('matchResults');

function elementProvider(winner1, winner2, winner3, loser){
    let element = document.createElement('div');
    element.className = "result";
    element.innerHTML = `<div class="prtc winner">${winner1}</div>
    <div class="prtc winner">${winner2}</div>
    <div class="prtc winner">${winner3}</div>
    <div class="prtc loser">${loser}</div>`;
    return element;
}

if (result==null){                     // if there is no result stored

}
else{                                 // if there is some result then show them
    result = JSON.parse(result);
    let maindiv = document.getElementById('results');
    for (let i=result.length-1;i>=0;i--){
        let resultdata = result[i];
        let element = elementProvider(resultdata.winner1, resultdata.winner2, resultdata.winner3, resultdata.loser);
        maindiv.appendChild(element);
    }
}