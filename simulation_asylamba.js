/**
                                               /-----------/
                                              /           / 
                                             /     /-----/  
                         /--------\         /     /         
                        /          \       /     /-----/    
              /---------\/\/\   /\  \--\  /           /     
             /               \  \/      \/     /-----/      
            /                /           \    /             
           /      /-----/\/\/             \  /              
          /      /      \                  \/               
         /      /        \-----------\      \               
        /      /                      \      \              
       /      /                        \      \             
      /      /                          \      \            
      |     /                            \     |            
      |     |                            |     |            
      |     |                            |     |            
      |     |                            |     |            
      |     |                            |     |            
      |     |                            |     |            
      |     |                            |     |            
      |     \                            /     |            
      \      \                          /      /            
       \      \                        /      /             
        \      \                      /      /              
         \      \                    /      /               
          \      \                  /      /                
           \      \----------------/      /                 
            \                            /                  
             \                          /                   
              \------------------------/
*/


function SimulationResult(winFlotte1,winFlotte2,simulationLoop,flotte1,flotte2) {
    this.winFlotte1 = winFlotte1;
    this.winFlotte2 = winFlotte2;
    this.simulationLoop = simulationLoop;
    
    this.flotte1 = flotte1;
    this.flotte2 = flotte2;
    
}
var simulationArrayResult = []
var numberOfSimulation=0;
function runSimulation(){
    
    //escaAttack(attackerFlotte.ligneArray[0].escadrilleArray[0],defenderFlotte.ligneArray[0].escadrilleArray[0]);
    
    
    //alert(getReachingValue(200,0.1))
    var winingOnlyFlotte1 =0;
    var winingOnlyFlotte2 =0;
    var winingFlotte1AndFlotte2 =0;
    var loosingFlotte1AndFlotte2 = 0;
    var totalSimulationLoop = 0;

    
    simulationArrayResult=[];
    //alert(getReachingValue(195,0.9))
    try{
        var valueI1 = parseInt($("i1").value)
        
        
        
        if (isNaN(valueI1) ||  valueI1<=0) {
            throw "le nombre de simulations doit un nombre etre  => 0"
        }
        else{
            numberOfSimulation = valueI1;
        }
        
        setTechValue();
        
        for (var m = 0; m<numberOfSimulation ; ++m) {
            var tempResult = simulation(copie(defenderFlotte,2),copie(attackerFlotte,3));
            
            
            
            simulationArrayResult.push(tempResult);
            
            if (tempResult.winFlotte1 && tempResult.winFlotte2) {
               ++winingFlotte1AndFlotte2;
            }
            else if (tempResult.winFlotte1) {
                ++winingOnlyFlotte1;
            }
            else if (tempResult.winFlotte2) {
                ++winingOnlyFlotte2;
            }
            else{
                ++loosingFlotte1AndFlotte2;
            }
            totalSimulationLoop += tempResult.simulationLoop;
            
        }
        
        drawInterface();
       
       //drawResult(simulationArrayResult);
       var tempArray = []
       var tempStyleArray = []
        tempArray.push(["nombre de simulations","seul flotte attaquante victorieuse","seul flotte en defense victorieuse","exaequo (les deux sont d&eacute;truites)","nombre moyen de tour"]);
        tempStyleArray.push(["width:100px","width:100px","width:100px","width:100px","width:100px"]);
        tempArray.push([numberOfSimulation,winingOnlyFlotte2 + " ( "+ winingOnlyFlotte2/ numberOfSimulation+" )",winingOnlyFlotte1 + " ("+ winingOnlyFlotte1/ numberOfSimulation+" )",loosingFlotte1AndFlotte2 +" ( "+ loosingFlotte1AndFlotte2/numberOfSimulation +" )",totalSimulationLoop/numberOfSimulation])
        tempStyleArray.push(["","","","",""]);
        tempArray.push(["<button onclick='drawAdvanceDetail()'> afficher plus de d&eacute;tails </button>"]);
        tempStyleArray.push(["text-align: center;' colspan= '5"]);
        
       
       
        $("result").innerHTML = displayTable(tempArray,tempStyleArray);
        $("moreDetaileResult").innerHTML ="";
        
        
    }
    catch(e){
        alert( "error : "+ e)
    }
    
    
    
    
}

function simulation(flotte1,flotte2){
    var id1 = flotte1.id;
    var id2 = flotte2.id ;
    var simulationLoop = 0;
    
    while(!isFlotteDestroyed(flotte1) && !isFlotteDestroyed(flotte2) ){
        
        
        ++simulationLoop;
        if (simulationLoop >= 1000000) {
            throw "trop de boulce de simulation";
        }
        
        
        
        for (var i =0 ; i< flotte1.ligneArray.length &&  i < simulationLoop/3; ++i ) {
            
            for(var j =0 ; j< flotte1.ligneArray[i].escadrilleArray.length;++j){
                
                if (flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis == null || flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis.pev ==0 ) {
                    
                    flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis = getEscToAttack(flotte2,Math.ceil(simulationLoop/3));
                }
                if (flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis != null) {
                    escaAttack(flotte1.ligneArray[i].escadrilleArray[j],flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis,flotte2.tech);
                }
               
                
                
            }
            
        }
        
        
        if (!isFlotteDestroyed(flotte1) && !isFlotteDestroyed(flotte2)) {
            for (var i =0 ; i< flotte2.ligneArray.length &&  i < simulationLoop/3; ++i ) {
                for(var j =0 ; j< flotte2.ligneArray[i].escadrilleArray.length;++j){
                    
                    if (flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis == null || flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis.pev ==0 ) {
                        
                        flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis = getEscToAttack(flotte1,Math.ceil(simulationLoop/3));
                    }
                    if (flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis != null) {
                        escaAttack(flotte2.ligneArray[i].escadrilleArray[j],flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis,flotte1.tech);
                    }
                   
                    
                    
                }
            }
        }
        
    }
    
    if (isFlotteDestroyed(flotte1) && isFlotteDestroyed(flotte2)) {
        return new SimulationResult(false,false,simulationLoop,flotte1,flotte2);
    }
    if (isFlotteDestroyed(flotte1)) {
        return new SimulationResult(false,true,simulationLoop,flotte1,flotte2);
    }
    if (isFlotteDestroyed(flotte2)) {
        return new SimulationResult(true,false,simulationLoop,flotte1,flotte2);
    }
    
    return new SimulationResult(true,true,simulationLoop,flotte1,flotte2);
    
    
    
    
}

function escaAttack(e1,e2,tech){
    
    var randomSpaceShipId
    
    for (var i in e1.spaceShipArray) {
        
        
        if (e1.pev != 0 && e2.pev !=0) {
           
            for (var j=0; j < e1.spaceShipArray[i].type.cannon.attack.length;++j){
                
                for (var k=0; k < e1.spaceShipArray[i].type.cannon.number[j];++k){
                    if (e2.pev!=0) {
                        
                        
                        randomSpaceShipId = Math.floor(Math.random()*e2.spaceShipArray.length);
                        
                        spaceShipAttack(e1.spaceShipArray[i],j,e2.spaceShipArray[randomSpaceShipId],tech);
                        
                        if (e2.spaceShipArray[randomSpaceShipId].hull <= 0) {
                            removeSpaceShip(e2,randomSpaceShipId);
                            
                        }
                    }
                    
                    
                }
            }
        }
        //spaceShipAttack(e1.spaceShipArray[i],e2.spaceShipArray[randomSpaceShipId]);
    }
    
    for (var i in e2.spaceShipArray) {
        
        if (e1.pev != 0 && e2.pev !=0) {
            //spaceShipAttack(e2.spaceShipArray[i],e1.spaceShipArray[randomSpaceShipId]);
            for (var j=0; j < e2.spaceShipArray[i].type.cannon.attack.length;++j){
                
                for (var k=0; k < e2.spaceShipArray[i].type.cannon.number[j];++k){
                    if (e1.pev!=0) {
                        
                        
                        randomSpaceShipId = Math.floor(Math.random()*e1.spaceShipArray.length);
                        
                        spaceShipAttack(e2.spaceShipArray[i],j,e1.spaceShipArray[randomSpaceShipId],tech);
                        
                        if (e1.spaceShipArray[randomSpaceShipId].hull <= 0) {
                            removeSpaceShip(e1,randomSpaceShipId);
                        }
                    }
                }
            }
        }
        
    }
    
    e2.cibledEscEnemis = e1
}

function getDamage(attack,def){
    
    return Math.log(attack/def+1)*4*attack;
}

function getReachingValue(speed,tech){
    
    return 1-Math.max(0,1-80/(speed*(1+tech)));
}

function spaceShipAttack(spaceShip1,cannonPos,spaceShip2,tech){
    
    var randomNumber = Math.random();
    if (randomNumber < getReachingValue(spaceShip1.type.speed,tech)) {
        
        spaceShip2.hull -= getDamage(spaceShip1.type.cannon.attack[cannonPos],spaceShip2.type.defense);
        
    }
    
    
    
}

function isFlotteDestroyed(flotte){
   
    
    for (var i in flotte.ligneArray){
        for(var j in flotte.ligneArray[i].escadrilleArray){
            
            if (flotte.ligneArray[i].escadrilleArray[j].pev != 0) {
                return false;
            }
            
        }
        
    }
    
    
    return true;
    
    
}

function getEscToAttack(flotte,maxLine){
    var escadrille = null;
    var loopTime = 0;
    if (isFlotteDestroyed(flotte)) {
        return null;
        //throw "la simulation ne peut pas se faire => flotte détruite"
    }
    
    if (!hasSpaceShipLineLimitation(flotte,maxLine)) {
        return null;
    }
    
    do {
        ++loopTime;
        
        if (loopTime >= 1000000) {
            throw "trop (1'000'000) d'assai sans trouver";
        }
        
        var randomN1 = Math.floor(Math.min(flotte.ligneArray.length,maxLine) * Math.random()); //ligneArray[i].escadrilleArray
        
        var randomN2 =  Math.floor(flotte.ligneArray[randomN1].escadrilleArray.length * Math.random());
        
        escadrille = flotte.ligneArray[randomN1].escadrilleArray[randomN2];
        
        
    } while(escadrille.pev == 0);
    
    return escadrille;
    
}

function hasSpaceShipLineLimitation(flotte,maxLine){
    
    for (var i = 0; i< Math.min(flotte.ligneArray.length,maxLine);++i){
        for(var j in flotte.ligneArray[i].escadrilleArray){
            
            if (flotte.ligneArray[i].escadrilleArray[j].pev != 0) {
                return true;
            }
            
        }
        
    }
    
    return false;
}

function drawAdvanceDetail(){
    //alert("")
    
    var tempArrayFlotte1 = [["Nom","nombre moyen restant"]];
    var styleArrayFlotte1 =[["text-align: center;","text-align: center;"]];
    
    for (var l in simulationArrayResult){
        for (var iLine in simulationArrayResult[l].flotte1.ligneArray){
            for (var iEsc in simulationArrayResult[l].flotte1.ligneArray[iLine].escadrilleArray){
                var spaceShipTemp = simulationArrayResult[l].flotte1.ligneArray[iLine].escadrilleArray[iEsc].spaceShipArray;
                
                for (var i in spaceShipTemp){
                    
                    if (tempArrayFlotte1.length==0) {
                        tempArrayFlotte1.push([spaceShipTemp[i].type.name,1]);
                        
                        styleArrayFlotte1.push(["text-align: center;","text-align: center;"]);
                    }
                    else{
                        var isInside = false;
                        for(var j in tempArrayFlotte1){
                            
                            
                            if (tempArrayFlotte1[j][0] == spaceShipTemp[i].type.name) {
                                ++tempArrayFlotte1[j][1];
                                isInside = true;
                            }
                            
                            
                        }
                        
                        if (!isInside) {
                            
                            tempArrayFlotte1.push([spaceShipTemp[i].type.name,1]);
                            styleArrayFlotte1.push(["text-align: center;","text-align: center;"]);
                            
                        }
                    }
                    
                }
            }
        }
    }
    
    for (var iDiv = 1 ; iDiv < tempArrayFlotte1.length;++iDiv){
        tempArrayFlotte1[iDiv][1] = tempArrayFlotte1[iDiv][1]/numberOfSimulation;
    }
    
    var tempArrayFlotte2 = [["Nom","nombre moyen restant"]];
    var styleArrayFlotte2 =[["text-align: center;","text-align: center;"]];
    
    for (var l in simulationArrayResult){
        for (var iLine in simulationArrayResult[l].flotte2.ligneArray){
            for (var iEsc in simulationArrayResult[l].flotte2.ligneArray[iLine].escadrilleArray){
                var spaceShipTemp = simulationArrayResult[l].flotte2.ligneArray[iLine].escadrilleArray[iEsc].spaceShipArray;
                
                for (var i in spaceShipTemp){
                    
                    if (tempArrayFlotte2.length==0) {
                        tempArrayFlotte2.push([spaceShipTemp[i].type.name,1]);
                        
                        styleArrayFlotte2.push(["text-align: center;","text-align: center;"]);
                    }
                    else{
                        var isInside = false;
                        for(var j in tempArrayFlotte2){
                            
                            
                            if (tempArrayFlotte2[j][0] == spaceShipTemp[i].type.name) {
                                ++tempArrayFlotte2[j][1];
                                isInside = true;
                            }
                            
                            
                        }
                        
                        if (!isInside) {
                            
                            tempArrayFlotte2.push([spaceShipTemp[i].type.name,1]);
                            styleArrayFlotte2.push(["text-align: center;","text-align: center;"]);
                            
                        }
                    }
                    
                }
            }
        }
    }
    
    for (var iDiv = 1 ; iDiv < tempArrayFlotte2.length;++iDiv){
        tempArrayFlotte2[iDiv][1] = tempArrayFlotte2[iDiv][1]/numberOfSimulation;
    }
    
    
    
    $("moreDetaileResult").innerHTML ="Flotte en d&eacute;fense <br>"+ displayTable(tempArrayFlotte1,styleArrayFlotte1) + "<br> flotte en attaque <br>"+displayTable(tempArrayFlotte2,styleArrayFlotte2);
}

