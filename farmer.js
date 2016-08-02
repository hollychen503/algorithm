console.log('begin');

//农夫需要把狼、羊、菜和自己运到河对岸去，只有农夫能够划船，而且船比较小，除农夫之外每次只能运一种东西，还有一个棘手问题，就是如果没有农夫看着，羊会偷吃菜，狼会吃羊。请考虑一种方法，让农夫能够安全地安排这些东西和他自己过河。

var stateLeft = [];
var stateRight = [];
var initStat = 1111;//farmer, wolf, sheep, vagetable
//var finalStat = 0;//farmer, wolf, sheep, vagetable


var actName = [];

stateLeft.push(initStat);
stateRight.push(0);

function isLoop(newSta, stateStack) {
    if (stateStack.indexOf(newSta) >=0 )
        return true;
    return false;
}

function canStay(newSta) {
    if (newSta/1000 > 1) 
        return true; // farmer is here
    else {
        // farmer not here
        var wolf  = parseInt( (newSta/100)%10 );
        var sheep = parseInt( (newSta/10) %10 );
        var vag   = parseInt( newSta %10 );
        
        if (wolf>0 && sheep>0)
            return false;
        
        if (sheep>0 && vag>0)
            return false;
        
        return true;        
    }
}

/////////////////////////////////////////////////////////////////////
function farmerGo(leftSta, rightSta){
    if (leftSta/1000 < 1)
        return null;
    leftSta  -= 1000;
    rightSta += 1000;
    return [leftSta, rightSta];   
}
function farmerBack(leftSta, rightSta){
    if (rightSta/1000 < 1)
        return null;
    leftSta  += 1000;
    rightSta -= 1000;
    return [leftSta, rightSta];   
}
////
function farmerGoWithWolf(leftSta, rightSta){
    if (leftSta/1000 < 1)
        return null; // farmer not left
    var wolf  = parseInt( (leftSta/100)%10 );
    if (0 == wolf )
        return null; // wolf not left
    
    leftSta  -= 1100; 
    rightSta += 1100;
    return [leftSta, rightSta];   
}
function farmerBackWithWolf(leftSta, rightSta){
    if (rightSta/1000 < 1)
        return null; // farmer not right
    var wolf  = parseInt( (rightSta/100)%10 );
    if (0 == wolf )
        return null; // wolf not right
    
    leftSta  += 1100; 
    rightSta -= 1100;
    return [leftSta, rightSta];   
}
////
function farmerGoWithSheep(leftSta, rightSta){
    if (leftSta/1000 < 1)
        return null; // farmer not left
    var sheep = parseInt( (leftSta/10) %10 );
    if (0 == sheep )
        return null; // sheep not left
    
    leftSta  -= 1010; 
    rightSta += 1010;
    return [leftSta, rightSta];   
}
function farmerBackWithSheep(leftSta, rightSta){
    if (rightSta/1000 < 1)
        return null; // farmer not right
    var sheep = parseInt( (rightSta/10) %10 );
    if (0 == sheep )
        return null; // wolf not right
    
    leftSta  += 1010; 
    rightSta -= 1010;
    return [leftSta, rightSta];   
}
////
function farmerGoWithVag(leftSta, rightSta){
    if (leftSta/1000 < 1)
        return null; // farmer not left
    var vag   = parseInt( leftSta %10 );
    if (0 == vag )
        return null; // vag not left
    
    leftSta  -= 1001; 
    rightSta += 1001;
    return [leftSta, rightSta];   
}
function farmerBackWithVag(leftSta, rightSta){
    if (rightSta/1000 < 1)
        return null; // farmer not right
    var vag   = parseInt( rightSta %10 );
    if (0 == vag )
        return null; // wolf not right
    
    leftSta  += 1001; 
    rightSta -= 1001;
    return [leftSta, rightSta];   
}
/////////////////////////////////////////////////////////////////////
var processArr=[farmerGo, farmerBack,
        farmerGoWithWolf, farmerBackWithWolf,
        farmerGoWithSheep, farmerBackWithSheep,
        farmerGoWithVag, farmerBackWithVag
        ];

function goTry(stateLeft, stateRight){
    // get current left state
    var left = stateLeft[ stateLeft.length -1 ];
    if (0 == left) {
        // all done
        console.log('++++++++++++++++++++++++++++');
        console.log('done');
        console.log(stateLeft);  
        console.log(stateRight);  
        console.log(actName);        
        return;
    }
    
    // get current left state
    var right = stateRight[ stateRight.length -1 ];
    
    // try each process
    for (var i=0; i< processArr.length; i++) {
        //console.log(left+'--'+right);
        var ret = processArr[i](left, right);
        if (null != ret 
            && !isLoop(ret[0], stateLeft )
            && canStay(ret[0]) 
            && canStay(ret[1])  ) 
        {
            stateLeft.push(ret[0]);
            stateRight.push(ret[1]);
            actName.push(processArr[i].name);
            
            //console.log('new step:'+ ret[0]);
                       
            goTry(stateLeft, stateRight);
            
            stateLeft.pop();
            stateRight.pop();
            actName.pop();
        }
    }
    
}
goTry(stateLeft, stateRight);
console.log('--------------------------------');
console.log('finish');
