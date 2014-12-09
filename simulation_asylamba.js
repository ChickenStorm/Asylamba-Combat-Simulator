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


function SimulationResult(winFlotte1,winFlotte2,simulationLoop,flotte1,flotte2) { // object SimulationResult
    this.winFlotte1 = winFlotte1;
    this.winFlotte2 = winFlotte2;
    this.simulationLoop = simulationLoop;
    
    this.flotte1 = flotte1;
    this.flotte2 = flotte2;
    
}
var simulationArrayResult = []
var numberOfSimulation=0;
function runSimulation(){ // this is the main function
    
    //escaAttack(attackerFlotte.ligneArray[0].escadrilleArray[0],defenderFlotte.ligneArray[0].escadrilleArray[0]);
    
    
    //alert(getReachingValue(200,0.1))
    var winingOnlyFlotte1 =0;
    var winingOnlyFlotte2 =0;
    var winingFlotte1AndFlotte2 =0;
    var loosingFlotte1AndFlotte2 = 0;
    var totalSimulationLoop = 0;

    
    simulationArrayResult=[]; // reset the array
    //alert(getReachingValue(195,0.9))
    try{
        var valueI1 = parseInt($("i1").value) // c'est le nombre d'itération
        
        
        
        if (isNaN(valueI1) ||  valueI1<=0) {
            throw "le nombre de simulations doit un nombre etre  => 0"
        }
        else{
            numberOfSimulation = valueI1;
        }
        
        setTech(defenderFlotte);
        setTech(attackerFlotte);
        for (var m = 0; m<numberOfSimulation ; ++m) {
            var tempResult = simulation(copie(defenderFlotte,2),copie(attackerFlotte,3)); // I need to copie becaus it passsed by ref and I don't want to influance the input of the user.
            
            
            
            simulationArrayResult.push(tempResult);
            // add to quick stat
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
       var tempStyleArray = [] // i should creat a function for this part
        tempArray.push(["nombre de simulations","seul flotte attaquante victorieuse","seul flotte en defense victorieuse","exaequo (les deux sont d&eacute;truites)","nombre moyen de tour"]);
        tempStyleArray.push(["width:100px","width:100px","width:100px","width:100px","width:100px"]);
        tempArray.push([numberOfSimulation,winingOnlyFlotte2 + " ( "+ winingOnlyFlotte2/ numberOfSimulation+" )",winingOnlyFlotte1 + " ("+ winingOnlyFlotte1/ numberOfSimulation+" )",loosingFlotte1AndFlotte2 +" ( "+ loosingFlotte1AndFlotte2/numberOfSimulation +" )",totalSimulationLoop/numberOfSimulation])
        tempStyleArray.push(["","","","",""]);
        tempArray.push(["<button onclick='drawAdvanceDetail()' id='b1Detail'> afficher plus de d&eacute;tails </button>"]);
        tempStyleArray.push(["text-align: center;' colspan= '5"]);
        
       
       
        $("result").innerHTML = displayTable(tempArray,tempStyleArray);
        $("moreDetaileResult").innerHTML ="";
        
        
    }
    catch(e){
        alert( "error : "+ e)
    }
    
    
    
    
}

function simulation(flotte1,flotte2){ // run an iteration of the simualtion.
    var id1 = flotte1.id;
    var id2 = flotte2.id ;
    var simulationLoop = 0;
    
    while(!isFlotteDestroyed(flotte1) && !isFlotteDestroyed(flotte2) ){
        
        
        ++simulationLoop;
        if (simulationLoop >= 1000000) {
            throw "trop de boulce de simulation";
        }
        
        
        
        for (var i =0 ; i< flotte1.ligneArray.length &&  i < simulationLoop/3; ++i ) { // the simulationLoop/3 repesent the max lign in the combat
            
            for(var j =0 ; j< flotte1.ligneArray[i].escadrilleArray.length;++j){ // for each escadrille in flotte1
                if ( flotte1.ligneArray[i].escadrilleArray[j].pev!=0) { // rencently added optimisation 
                   
                    
                    if (flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis == null || flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis.pev ==0 ) { // does it need to take a new cible
                        
                        flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis = getEscToAttack(flotte2,Math.ceil(simulationLoop/3)); 
                    }
                    if (flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis != null && flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis.pev !=0 ) {
                        escaAttack(flotte1.ligneArray[i].escadrilleArray[j],flotte1.ligneArray[i].escadrilleArray[j].cibledEscEnemis,flotte1.tech,flotte2.tech);
                    }
                }
               
                
                
            }
            
        }
        
        
        if (!isFlotteDestroyed(flotte1) && !isFlotteDestroyed(flotte2)) {
            for (var i =0 ; i< flotte2.ligneArray.length &&  i < simulationLoop/3; ++i ) { // same as the pervious part
                for(var j =0 ; j< flotte2.ligneArray[i].escadrilleArray.length;++j){
                    
                    if ( flotte2.ligneArray[i].escadrilleArray[j].pev!=0) {
                        
                        
                        if (flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis == null || flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis.pev ==0 ) {
                            
                            flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis = getEscToAttack(flotte1,Math.ceil(simulationLoop/3));
                        }
                        if (flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis != null && flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis.pev !=0 ) {
                            escaAttack(flotte2.ligneArray[i].escadrilleArray[j],flotte2.ligneArray[i].escadrilleArray[j].cibledEscEnemis,flotte2.tech,flotte1.tech);
                        }
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

function escaAttack(e1,e2,tech,tech2){ // e1 attack e2 
    
    var randomSpaceShipId;
    /*debugShowHull(e1)
    debugShowHull(e2)*/
    for (var i in e1.spaceShipArray) {
        
        
        if (e1.pev != 0 && e2.pev !=0) {
           
            for (var j=0; j < e1.spaceShipArray[i].type.cannon.attack.length;++j){// for each spaceShip and for each cannon
                // this was here where my porbleme was
                if (e2.pev!=0) {
                    
                    
                    //randomSpaceShipId = Math.floor(Math.random()*e2.spaceShipArray.length); // take a random schip // recently moved
                    
                    //alert(e1.spaceShipArray[i].type.cannon.number[j])
                    
                    
                    for (var k=0; k < e1.spaceShipArray[i].type.cannon.number[j];++k){ //repeat for each apparition of the cannon
                        if (e2.pev!=0) {
                            
                            randomSpaceShipId = Math.floor(Math.random()*e2.spaceShipArray.length); 
                            
                            
                            spaceShipAttack(e1.spaceShipArray[i],j,e2.spaceShipArray[randomSpaceShipId],tech,tech2); 
                            
                            if (e2.spaceShipArray[randomSpaceShipId].hull <= 0) { // remove if the ship is destroy
                                removeSpaceShip(e2,randomSpaceShipId); 
                                
                            }
                            
                        }
                        
                        
                    }
                    /*
                    if (e2.spaceShipArray[randomSpaceShipId].hull <= 0) { // remove if the ship is destroy
                        removeSpaceShip(e2,randomSpaceShipId); 
                        
                    }*/
                }
            }
        }
        //spaceShipAttack(e1.spaceShipArray[i],e2.spaceShipArray[randomSpaceShipId]);
    }
    /*
    for (var i in e2.spaceShipArray) { // same as the pervious part by swaping e1 and e2
        
        if (e1.pev != 0 && e2.pev !=0) {
            //spaceShipAttack(e2.spaceShipArray[i],e1.spaceShipArray[randomSpaceShipId]);
            for (var j=0; j < e2.spaceShipArray[i].type.cannon.attack.length;++j){
                
                randomSpaceShipId = Math.floor(Math.random()*e1.spaceShipArray.length);
                
                for (var k=0; k < e2.spaceShipArray[i].type.cannon.number[j];++k){
                    if (e1.pev!=0) {
                        
                        
                        
                        
                        spaceShipAttack(e2.spaceShipArray[i],j,e1.spaceShipArray[randomSpaceShipId],tech2);
                        
                        
                    }
                    
                }
                
                if (e1.spaceShipArray[randomSpaceShipId].hull <= 0) {
                    removeSpaceShip(e1,randomSpaceShipId);
                }
            }
        }
        
    }
    */
    e2.cibledEscEnemis = e1;
}

function getDamage(attack,def,tech,tech2){ // get the damage
    
    return Math.log(attack*(1+tech)/def*(1+tech2)+1)*4*attack*(1+tech);
}

function getReachingValue(speed,tech){ // get the chance to reach
    
    return 1-Math.max(0,1-80/(speed*(1+tech)));
}



function spaceShipAttack(spaceShip1,cannonPos,spaceShip2,tech,tech2){ // spaceShip1 attack spaceShip2 with the cannon at the position cannonPos
    
    var randomNumber = Math.random();
    
    //it might have a error herre // in fact ther isn't
    
    if (randomNumber < getReachingValue(spaceShip2.type.speed,tech2[spaceShip2.type.typeName]["vitesse"])) {// this is here tha was my real error
        
        spaceShip2.hull -= getDamage(spaceShip1.type.cannon.attack[cannonPos],spaceShip2.type.defense,tech[spaceShip1.type.typeName]["attaque"],tech2[spaceShip2.type.typeName]["defense"]);
        
    }
    
    
    
    
}

function isFlotteDestroyed(flotte){ // détermine s'il y a encore des vaisseaux dans la flotte donnée
   
    
    for (var i in flotte.ligneArray){
        for(var j in flotte.ligneArray[i].escadrilleArray){
            
            if (flotte.ligneArray[i].escadrilleArray[j].pev != 0) {
                return false;
            }
            
        }
        
    }
    
    
    return true;
    
    
}

function getEscToAttack(flotte,maxLine){ // donne une escadrille au hassard à attaquer
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
        
        if (loopTime >= 1000000) {//si la ça loop trop arrette ici
            throw "trop (1'000'000) d'assai sans trouver";
        }
        
        var randomN1 = Math.floor(Math.min(flotte.ligneArray.length,maxLine) * Math.random()); //prend un nombre au hasard pour la ligne   //ligneArray[i].escadrilleArray
        
        var randomN2 =  Math.floor(flotte.ligneArray[randomN1].escadrilleArray.length * Math.random());//prend un nombre au hasard pour l'escadrille
        
        escadrille = flotte.ligneArray[randomN1].escadrilleArray[randomN2];
        
        
    } while(escadrille.pev == 0);
    
    return escadrille;
    
}

function hasSpaceShipLineLimitation(flotte,maxLine){ // détermine si entre 0 et maxLigne il y a des vaisseaux dans la flotte
    
    for (var i = 0; i< Math.min(flotte.ligneArray.length,maxLine);++i){
        for(var j in flotte.ligneArray[i].escadrilleArray){
            
            if (flotte.ligneArray[i].escadrilleArray[j].pev != 0) {
                return true;
            }
            
        }
        
    }
    
    return false;
}

function drawAdvanceDetail(){//affiche plus de détail de la sim. est exécuter quand l'utilisateur appuis sur "afficher plus de détails"
    //alert("")
    
    var tempArrayFlotte1 = [["Nom","nombre moyen restant"]];
    var styleArrayFlotte1 =[["text-align: center;","text-align: center;"]];
    
    $("b1Detail").style.visibility = "hidden";
    
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


function debugShowHull( e ){ // debug not used in normal cicumstance
    var textTemp = '';
    for (var i in e.spaceShipArray){
        textTemp += e.spaceShipArray[i].type.name + ":" + e.spaceShipArray[i].hull +" --- "
        
    }
    alert(textTemp + e.pev);
}
