var piece;
var emptyX = "300px";
var emptyY = "300px";
var done = false;

function isFinished(){
    for(var i =0; i < piece.length; i++){
        if(piece[i].style.top !== parseInt(i/4) * 100 +'px' || piece[i].style.left !== parseInt(i%4) * 100 + 'px'){
            return false;
        }
    }
    return true;
}
function endGame(){
    for(var i = 0; i < piece.length; i++){
        piece[i].innerHTML = "";
    }
    done = true;
}
function swap(pos){
    var temp = piece[pos].style.top;
    piece[pos].style.top = emptyY;
    emptyY = temp;
    
    temp = piece[pos].style.left;
    piece[pos].style.left = emptyX;
    emptyX = temp;
    
}

function rightSpace(x , y , pos){
    if(x > 0){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) + 100 === x && parseInt(piece[i].style.top) === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function leftSpace(x , y , pos){
    if(x < 300){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) - 100 === x && parseInt(piece[i].style.top) === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function upSpace(x , y , pos){
    if(y < 300 ){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) === x && parseInt(piece[i].style.top) - 100 === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function downSpace(x , y , pos){
    if(y > 0 ){
        for(var i = 0; i < piece.length; i++){
            if(parseInt(piece[i].style.left) === x && parseInt(piece[i].style.top) + 100 === y){
                return i === (pos - 1);
            }
        }
    }
    return false;
}

function canMove(position){
    return rightSpace(parseInt(emptyX) , parseInt(emptyY) , position) || leftSpace(parseInt(emptyX) , parseInt(emptyY) , position) || upSpace(parseInt(emptyX) , parseInt(emptyY) , position) || downSpace(parseInt(emptyX) , parseInt(emptyY) , position);
}

window.onload = function () {
    piece = $$("div#puzzlearea div");
    
    for (var i=0; i<piece.length; i++){
        piece[i].className = "puzzlepiece";
        piece[i].style.left = (i%4*100) + 'px';
        piece[i].style.top = (parseInt(i/4) * 100) + 'px';
        piece[i].style.backgroundPosition = '-' + piece[i].style.left + ' ' + '-' + piece[i].style.top;
        piece[i].onmouseover = function(){
            if(canMove(parseInt(this.innerHTML))){
                this.style.border = "2px solid red";
                this.style.color = "#006600";
            }
        };
     
        piece[i].onmouseout = function(){
            this.style.border = "2px solid black";
            this.style.color = "#000000";
        };
        
        piece[i].onclick = function(){
            if(canMove(parseInt(this.innerHTML))){
                swap(parseInt(this.innerHTML) - 1);
                if(isFinished()){
                    //console.log("Game Done!");
                    endGame();
                }
            }
        };
    
    }
   $("shufflebutton").onclick = function(){
        positions = [];
        for(var i = 0; i <= 300; i += 100){
           for(var j = 0; j <= 300; j += 100){
               positions.push([i,j]);
            }
        }
       if(done){
           for(var i = 1; i <= piece.length; i++){
               piece[i-1].innerHTML = i;
           }
           done = false;
       }
       //console.log(positions[0]);
       for(var i = 0; i < piece.length; i++){
           piece[i].style.left = (i%4) * 1000 + 'px';
           piece[i].style.top = parseInt(i/4) * 1000 + 'px';
       }
       
       for(var i = 0; i < piece.length; i++){
           var pos = Math.floor(Math.random() *positions.length) + 1
           index = positions[pos - 1];
           //console.log(pos);
           piece[i].style.left = index[0] + 'px';
           piece[i].style.top = index[1] + 'px';
           //console.log(piece[i].style.left + " " + piece[i].style.top);
           positions.splice(pos-1,1);
           //console.log(positions.length);
           //console.log(positions[pos-1]);
           //console.log(piece[i].innerHTML);
       }
       emptyX = positions[0][0] + 'px';
       emptyY = positions[0][1] + 'px';
       
       
        
    };
        
 
    
};