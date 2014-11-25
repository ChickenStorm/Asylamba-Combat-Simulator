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



var selectedFlotte = -1;
var selectedLigne = -1;
var selectedEsc = -1;
var flotteCell =[[]];

var flotteArray= [];

var spaceShipType = [];
var sapceShip=[]
var defenderFlotte;
var attackerFlotte;



var version = "pre 0.0.11"

//----------------------------------------------------------------------------------------------

function SpaceShipType (name,cannon,defense,speed,hull,pev,typeName){
    this.name = name;
    this.cannon = cannon;
    this.defense = defense;
    this.speed = speed;
    this.maxHull = hull;
    this.pev = pev;
    this.typeName = typeName;
    
    
}
function Cannon(attack,number){
    
    if (attack.length == number.length) {
        this.attack = attack; // this is an array;
        this.number = number; // this is an array;
    }
    else{
        throw "invalide input";
    }
    
    
}

function SpaceShip(spaceShipType){
    this.type = spaceShipType;
    this.hull = this.type.maxHull;
    
    
}

function Escadrille(refF,refL,refE){
    this.maxPEV = 100;
    this.spaceShipArray = [];
    this.pev=0;
    this.cibledEscEnemis=null;
    this.ref = [refF,refL,refE];
    
    
}

function Ligne(escadrilleArray){
    this.escadrilleArray = escadrilleArray;
    
}

function Flotte(ligneArray,id){
    this.ligneArray = ligneArray;
    this.id = id;
    this.tech =  new Tech();
    
}


function Tech(){
    
    
    const LISTE_OF_SHIP = ["Chasseur","Corvette","Fregate","Destroyer","Croiseur"];
    const LISTE_OF_TECH_TYPE = ["vitesse","attaque","defense"];
    
    for(var i in LISTE_OF_SHIP){
        this[LISTE_OF_SHIP[i]] = []
        for(var j in LISTE_OF_TECH_TYPE){
            this[LISTE_OF_SHIP[i]][LISTE_OF_TECH_TYPE[j]] =0;
            
        }
        
    }
}

function initSpaceShipType(){
    //alert(getDamage(20,50))
    spaceShipType.push(new SpaceShipType("P&eacute;gase",new Cannon([5],[1]),2,200,26,2,"Chasseur"));
    spaceShipType.push(new SpaceShipType("Satyre",new Cannon([6],[1]),5,195,32,3,"Chasseur"));
    spaceShipType.push(new SpaceShipType("Chim&egrave;re",new Cannon([8],[2]),3,195,26,3,"Chasseur"));
    
    spaceShipType.push(new SpaceShipType("Si&egrave;rne",new Cannon([20],[1]),6,175,60,6,"Corvette"));
    spaceShipType.push(new SpaceShipType("Dryade",new Cannon([30],[1]),10,160,60,7,"Corvette"));
    spaceShipType.push(new SpaceShipType("M&eacute;duse",new Cannon([8,40],[2,1]),8,170,75,10,"Corvette"));
    
    spaceShipType.push(new SpaceShipType("Griffon",new Cannon([20],[4]),50,110,300,25,"Fregate"));
    spaceShipType.push(new SpaceShipType("Cyclope",new Cannon([225],[1]),40,90,320,45,"Fregate"));
    
    spaceShipType.push(new SpaceShipType("Minotaure",new Cannon([50,30],[3,1]),100,88,1000,90,"Destroyer"));
    spaceShipType.push(new SpaceShipType("Hydre",new Cannon([25],[20]),100,80,1100,90,"Destroyer"));
    
    spaceShipType.push(new SpaceShipType("Cerb&egrave;re",new Cannon([30,80,175],[4,1,1]),120,70,1220,94,"Croiseur"));
    spaceShipType.push(new SpaceShipType("Ph&eacute;nix",new Cannon([20,50,80,200],[4,2,2,1]),150,50,1300,96,"Croiseur"));
    
}

function initFlotte(){
    var tempEsqArray =[];
    var ligneArray = [];
    for (var i = 0; i<5;++i){
        //ligneArray.push([])
        
        for (var j =0;j< 9 ;++j){
            
            tempEsqArray.push(new Escadrille(0,i,j));
        }
        
        
        ligneArray.push(new Ligne(tempEsqArray));
        tempEsqArray = [];
    }
    
    
    defenderFlotte = new Flotte(ligneArray,0);
    
    tempEsqArray =[];
    ligneArray = [];
    for (var i = 0; i<5;++i){
        //ligneArray.push([])
        
        for (var j =0;j< 9 ;++j){
            
            tempEsqArray.push(new Escadrille(1,i,j));
        }
        
        ligneArray.push(new Ligne(tempEsqArray));
        tempEsqArray = [];
    }
    
    attackerFlotte = new Flotte(ligneArray,1);
    flotteArray = [defenderFlotte,attackerFlotte];
    return;
    
}


function initAsylamba_Project_Script(){
    
    initSpaceShipType();
    initFlotte();
    drawPage();
    drawTechTable();
    
    
    drawInterface();
    
    
    //$("spaceSchipTable").style.backgroundColor = 'white';
    //$("spaceSchipTable").style.width = 2.5*(w-30)/4;
    
    //var w = window.innerWidth;
    
    var w = 1920;
    
    $("spaceShipTable").style.left = w-30-750+ "px";
    $("spaceShipTable").style.top = "120px"
    
    
    
    
    $("tech1").style.top = "20px"
    $("tech2").style.top = "570px"
    $("viewFlotte1").style.top = "230px";
    $("viewFlotte1").style.height = "100px";
    //$("viewFlotte1").style.width = w-30-900-100+ "px";
    //$("viewFlotte2").style.width = w-30-900-100+ "px";
    $("viewFlotte2").style.top = parseInt($("viewFlotte1").style.top) + parseInt($("viewFlotte1").style.height)+440+"px";
    $("viewSapceShipEsca").style.left = "500px";
    $("viewSapceShipEsca").style.top = "20px";
    $("b1").style.left = "750px";
    $("b1").style.top = "200px";
    
    $("resultGeneral").style.left = "600px";
    $("resultGeneral").style.top = "250px";
    //$("resultGeneral").style.width = "600px"
    
    $("di1").style.top  = "150px";
    $("di1").style.left  = "750px";
    $("i1").defaultValue = 1000
    $("i1").style.left  = "10px";
    
    $("generalInfos").style.top = "20px"
    $("generalInfos").innerHTML = "<p style = 'font-size:  20px;' >Simulateur de combat pour Asylamba. <br>Version "+version+"  <!--<b style='color: red'>FIABILITE EN COUR DE VERIFICATION EN ATTENDANT NE PAS SE FIER. </b>  </p>--><p style='color: blak'> Avertissement : les donn&eacute;e fournies par le simulateur ne sont pas garanties &ecirc;tre juste ni &agrave; jour. </p>"
}


function displayTable(arrayToDisapay,arrayStyle) {
    var tempTextTable = "<table style='background-color :white' >";
    
    for (var i in arrayToDisapay) {
        var iS = i;
        tempTextTable = tempTextTable +"<tr>";
        
        for (var j in arrayToDisapay[i]) {
            ///var temp = ""
            
            var jS = j; // because j in in arrayToDisapay[i] and same for i in arrayToDisapay                                                               &eacute; in utf-8
            tempTextTable = tempTextTable +"<td style='border:solid; border-width: thin; "+ arrayStyle[iS][jS]+" ' >" + (arrayToDisapay[i][j]) + "</td>";
            
        }
        
        tempTextTable = tempTextTable +"</tr>";
    }
    
    tempTextTable = tempTextTable + "</table>" ;
    return tempTextTable;
}



function drawInterface(){
    
    drawSpaceShipTable();
    
    
    
    /*
    var tempCheckedValue1 = false;
    var tempCheckedValue2 = false;
    var tempBF1 = 0;
    var tempBF2 = 0;
    
    if ($("bonnusF1")!=null && !isNaN(parseInt($("bonnusF1").value))) {
        tempBF1=$("bonnusF1").value;
    }
    if ($("bonnusF2")!=null && !isNaN(parseInt($("bonnusF2").value))) {
        tempBF2=$("bonnusF2").value;
    }
    
    if ($("hasKBonusF1")!=null) {
        tempCheckedValue1=$("hasKBonusF1").checked;
    }
    if ($("hasKBonusF2")!=null) {
        tempCheckedValue2=$("hasKBonusF2").checked;
    }*/
    //                                                                                                        <button onclick='swapFlotte()'>swap flottes </button>
    $("viewFlotte1").innerHTML = "Cliquez sur une casse pour choisir l'escadrille. <br>flotte en d&eacute;fense. <br>"+ HTMLCodeFlotte(defenderFlotte);
    
    $("viewFlotte2").innerHTML = "flotte en attaque.<br>"+HTMLCodeFlotte(attackerFlotte);
    
    //$("viewFlotte1").innerHTML = "Cliquez sur une casse pour choisir l'escadrille. <br>flotte en d&eacute;fense. <br>Bonus technologique d'&eacute;vitement <input id='bonnusF1'> <br>Bonus de Kovahk <input id='hasKBonusF1' type='checkbox'>  <br><br>"+ HTMLCodeFlotte(defenderFlotte);

    //$("viewFlotte2").innerHTML = "flotte en attaque. <br>Bonus technologique d'&eacute;vitement <input id = 'bonnusF2'> <br>Bonus de Kovahk <input id='hasKBonusF2' type='checkbox'> <br><br>"+HTMLCodeFlotte(attackerFlotte);
    /*
    if ($("hasKBonusF1") != null && $("hasKBonusF2")!=null && $("bonnusF2")!= null && $("bonnusF1")!= null ) {
        $("hasKBonusF1").checked = tempCheckedValue1;
        $("hasKBonusF2").checked = tempCheckedValue2;
        
        
        $("bonnusF1").defaultValue =tempBF1;
        $("bonnusF2").defaultValue =tempBF2;
    }
    */
    
    drawEscaView();//$("viewSapceShipEsca")
    
    try {
        setTech(defenderFlotte);
        setTech(attackerFlotte);
    } catch(e) {
        alert(e);
    }
}

function drawSpaceShipTable(){
    
    
    var arrayToDraw = [["nom","attaque","d&eacute;fense","vitesse","coque","PEV","type"]];
    var styleArray = [["width : 100px;text-align: center;","width : 70px;text-align: center;","width : 70px;text-align: center;","width : 70px;text-align: center;","width : 70px;text-align: center;","width : 70px;text-align: center;","width : 70px;text-align: center;"]];
    /**for (var j in spaceShipType[0]) {
        arrayToDraw[0].push(j); // peut etre changer
        styleArray[0].push("width : 100px;text-align: center;");
    }*/
    var j=0;
    for (var i in spaceShipType) {
        arrayToDraw.push([]);
        styleArray.push([]);
        ++j;
        for (var l=0; l<7;l++){
            
            styleArray[j].push("width : 70px;text-align: center;' onclick ='tableSpaceShipClick(" +i+""  + ",event)");
            
        }
        //alert(spaceShipType[i].name)
        styleArray[j][1] = "width : 210px;text-align: center;' onclick ='tableSpaceShipClick(" +i+""  + ", event)";
        //styleArray[j].push("width : 100px;text-align: center;","width : 210px;text-align: center;","width : 100px;text-align: center;","width : 100px;text-align: center;","width : 100px;text-align: center;","width : 100px;text-align: center;");
        
        
        arrayToDraw[j].push(spaceShipType[i].name);
        
        var attackText="";
        for (var k =0; k < spaceShipType[i].cannon.attack.length; k++ ) {
            attackText +=  spaceShipType[i].cannon.attack[k]
            if (spaceShipType[i].cannon.number[k] !=1) {
                attackText += " * " + spaceShipType[i].cannon.number[k]
            }
            attackText+=" + "
        }
        attackText = attackText.substring(0,attackText.length-2)
        arrayToDraw[j].push(attackText);
        arrayToDraw[j].push(spaceShipType[i].defense,spaceShipType[i].speed,spaceShipType[i].maxHull,spaceShipType[i].pev,spaceShipType[i].typeName)
    }
    arrayToDraw.push(["<button onclick='addNewType();'>ajouter un nouveau type</button> (m&ecirc;me format qu'au dessus et &eacute;vitez les accents dans le nom)"]);
    styleArray.push(["text-align:center;' colspan='7"]);
    
    /*
     *TODO fair entr�e nouveau type
     */
    
    arrayToDraw.push(["<input style='width : 93px;' id='newShipInput1'>","<input style='width : 200px;' id='newShipInput2'>","<input style='width : 63px;' id='newShipInput3'>","<input style='width : 63px;' id='newShipInput4'>","<input style='width : 63px;' id='newShipInput5'> ","<input style='width : 63px;' id='newShipInput6'> ","<input style='width : 63px;' id='newShipInput7'> "]);
    styleArray.push(["width : 70px;"]);
    
    $("spaceShipTable").innerHTML = "<p>Cliquez sur une des lignes pour ajouter le vaisseau (shift/maj ajouter 10 vaisseaux). Cliquez sur le tabeau au dessu du tabelau de flotte pour supprimer un vaisseau.<\p>";
    $("spaceShipTable").innerHTML += displayTable(arrayToDraw,styleArray);
}

function addNewType(){
    try {
        
        var input2 = "";
        var input1 = $("newShipInput1").value;
        var input2 = $("newShipInput2").value;
        var input3 = parseInt($("newShipInput3").value);
        var input4 = parseInt($("newShipInput4").value);
        var input5 = parseInt($("newShipInput5").value);
        var input6 = parseInt($("newShipInput6").value);
        var input7 = ($("newShipInput7").value);
        
        var j =0;
        
        
        for (var i in spaceShipType){
            if (spaceShipType[i].name == input1) {
                throw "le type ne peut pas porter un nom deja existant";
            }
        }
        
        if (isNaN(input3) || input3<=0) {
            throw "mauvaise entee un nombre est attendu";
        }
        
        if (isNaN(input4) || input4<=0) {
            throw "mauvaise entee un nombre est attendu";
        }
        if (isNaN(input5) || input5<=0) {
            throw "mauvaise entee un nombre est attendu";
        }
        if (isNaN(input6) || input6<=0) {
            throw "mauvaise entee un nombre est attendu";
        }
        if (input7 != "Chasseur" && input7 != "Corvette" && input7 != "Fregate" && input7 != "Destroyer" && input7 != "Croiseur" ) {
            throw "le type doit etre soit Chasseur, Corvette, Fregate (je sais pour les acents mais pour des raison d'encodage ils ne peuvent pas etre comme entre au clavier), Destroyer soit Croiseur";
        }
        
        
        input2 = input2.replace(" ","");
        //alert(input2);
        var tableTemp = input2.split('+');
        var tableTemp2 =[];
        var attakArray = [];
        var numberArray = [];
        
        for (var i=0;i< tableTemp.length ;++i){
            tableTemp2.push(tableTemp[i].split('*'))
            if (tableTemp2[i].length == 1) {
                
                tableTemp2[i].push(1);
            }
            if (tableTemp2[i].length != 2){
                
                throw "mauvaise entree pour l'attaque";
                
            }
            else{
                for (var j in tableTemp2[i]){
                    tableTemp2[i][j] = parseInt(tableTemp2[i][j]);
                    if (isNaN(tableTemp2[i][j]) || tableTemp2[i][j]<=0) {
                        alert((tableTemp2[i][j]));
                        throw "mauvaise entree pour l'attaque";
                    }
                    
                    
                }
                attakArray.push(tableTemp2[i][0]);
                numberArray.push(tableTemp2[i][1]);
            }
            
            
            
            
            
            
        }
        
        spaceShipType.push(new SpaceShipType(input1,new Cannon(attakArray,numberArray),input3,input4,input5,input6,input7));
        drawInterface();
        
        
    } catch(e) {
        alert(e);
    }
    
    
}


function HTMLCodeFlotte(flotte){
    
    var arrayToDraw = [];
    var styleArray = [];
    
    for (var i in flotte.ligneArray){
        arrayToDraw.push(["ligne "+ (parseInt(i)+1) ]);
        styleArray.push(["height: 50px; width: 75px;text-align: center;"]);
        
        for (var j in flotte.ligneArray[i].escadrilleArray) {
            var pevTot = flotte.ligneArray[i].escadrilleArray[j].pev;;
            
            /*for (k in flotte.ligneArray[i].escadrilleArray[j].spaceShipArray) {
                pevTot += flotte.ligneArray[i].escadrilleArray[j].spaceShipArray[k].type.pev;
            }*/
            
            arrayToDraw[arrayToDraw.length-1].push(pevTot);
            if (selectedFlotte == flotte.id && selectedLigne == i && selectedEsc == j) {
                styleArray[arrayToDraw.length-1].push("height: 50px; width: 50px;text-align: center;background-color: lightblue; ' onclick ='tableFlotteClick(" + flotte.id+ "," + i + "," + j + ")");
            }
            else{
                styleArray[arrayToDraw.length-1].push("height: 50px; width: 50px;text-align: center;background-color: white;' onclick ='tableFlotteClick(" + flotte.id+ "," + i + "," + j + ")");
            }
            
            
        }
    }
    
    return displayTable(arrayToDraw,styleArray);
    
}

function tableFlotteClick(flotteId,ligneNb,escadrilleNb) {
    selectedFlotte =flotteId;
    selectedLigne = ligneNb;
    selectedEsc = escadrilleNb;
    //alert("tableFlotte"+ flotteId + "-" + ligneNb + "-" + escadrilleNb+ ")");
    //alert($("tableFlotte"+ flotteId + "-" + ligneNb + "-" + escadrilleNb+ ")").style);
    drawInterface();
    
    
}

function tableSpaceShipClick(spaceShipTypePos,ev){
    
    var numberOfAdding = 1;
    var booHasEnoughtSpace = true
    if (ev.shiftKey) {
        numberOfAdding = 10;
    }
    for (var p = 0; p< numberOfAdding && booHasEnoughtSpace;++p){
        if (selectedFlotte==0) {
            if (selectedLigne != -1 && selectedEsc != -1) {
                if (defenderFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].maxPEV >= defenderFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].pev + spaceShipType[spaceShipTypePos].pev) {
                    
                    
                    defenderFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].spaceShipArray.push(new SpaceShip(spaceShipType[spaceShipTypePos]));
                    defenderFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].pev += spaceShipType[spaceShipTypePos].pev;
                }
                else{
                    alert("plus assez de place");
                    booHasEnoughtSpace = false;
                }
            }
        }
        if (selectedFlotte==1) {
            if (selectedLigne != -1 && selectedEsc != -1) {
                if (attackerFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].maxPEV >= attackerFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].pev + spaceShipType[spaceShipTypePos].pev) {
                    
                    
                    attackerFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].spaceShipArray.push(new SpaceShip(spaceShipType[spaceShipTypePos]));
                    attackerFlotte.ligneArray[selectedLigne].escadrilleArray[selectedEsc].pev += spaceShipType[spaceShipTypePos].pev;
                    
                }
                else{
                    alert("plus assez de place");
                    booHasEnoughtSpace = false;
                }
            }
        }
    }
    drawInterface();
}

function drawEscaView() {
    
    arraySpaceShipNumber = [["<button onclick = 'flotteArray[selectedFlotte].ligneArray[selectedLigne].escadrilleArray[selectedEsc].spaceShipArray = []; flotteArray[selectedFlotte].ligneArray[selectedLigne].escadrilleArray[selectedEsc].pev=0; drawInterface();' > clear </button>"]];
    styleArray = [[""]];
    
    if (selectedFlotte!= -1) {
        
        
        var spaceShipTemp = flotteArray[selectedFlotte].ligneArray[selectedLigne].escadrilleArray[selectedEsc].spaceShipArray;
        
        for (var i in spaceShipTemp){
            
            if (arraySpaceShipNumber.length==0) {
                arraySpaceShipNumber.push([spaceShipTemp[i].type.name,1]);
                
                styleArray.push(["width : 75px;text-align: center;' onclick='removeSpaceShipEsc("+i+");","width : 20px;text-align: center;' onclick='removeSpaceShipEsc("+i+");"]);
            }
            else{
                var isInside = false;
                for(var j in arraySpaceShipNumber){
                    
                    
                    if (arraySpaceShipNumber[j][0] == spaceShipTemp[i].type.name) {
                        ++arraySpaceShipNumber[j][1];
                        isInside = true;
                    }
                    
                    
                }
                
                if (!isInside) {
                    
                    arraySpaceShipNumber.push([spaceShipTemp[i].type.name,1]);
                    styleArray.push(["width : 75px;text-align: center; ' onclick ='removeSpaceShipEsc("+i+");","width : 20px;text-align: center;' onclick='removeSpaceShipEsc("+i+");"]);
                    
                }
            }
            
        }
        
        $("viewSapceShipEsca").innerHTML = displayTable(arraySpaceShipNumber,styleArray);
    }
}

function removeSpaceShipEsc(pos){
    var spaceShipTemp = flotteArray[selectedFlotte].ligneArray[selectedLigne].escadrilleArray[selectedEsc].spaceShipArray;
    var pevTemp = spaceShipTemp[pos].type.pev;
    spaceShipTemp = removeOneElementFromPos(spaceShipTemp,pos);
    
    flotteArray[selectedFlotte].ligneArray[selectedLigne].escadrilleArray[selectedEsc].pev -= pevTemp;
    flotteArray[selectedFlotte].ligneArray[selectedLigne].escadrilleArray[selectedEsc].spaceShipArray = spaceShipTemp;
    drawInterface();
    
}

function removeOneElementFromPos(array,pos){
    var temp = [];
    //var j =0;
    for(var i in array){
        
        if (i!= pos) {
            temp.push(array[i]);
        }
        
    }
    return temp;
    
}

function removeSpaceShip(esquadrille,pos){
    var temp = esquadrille.spaceShipArray[pos];
    esquadrille.pev -= temp.type.pev;
    esquadrille.spaceShipArray = removeOneElementFromPos(esquadrille.spaceShipArray,pos);
    
    
}

function copie(flotte,id) {
    var returnFlotte = null;
    var tempEsqArray =[];
    var ligneArray = [];
    for (var i = 0; i<5;++i){
        //ligneArray.push([])
        
        for (var j =0;j< flotte.ligneArray[i].escadrilleArray.length ;++j){ // recently modifed
            var esquaTemp = new Escadrille(id,i,j);
           
            
            esquaTemp.maxPEV = flotte.ligneArray[i].escadrilleArray[j].maxPEV;
            esquaTemp.pev = flotte.ligneArray[i].escadrilleArray[j].pev;
            esquaTemp.spaceShipArray = [];
            //esquaTemp.spaceShipArray = new Array(flotte.ligneArray[i].escadrilleArray[j].spaceShipArray)
            for (var k=0;k < flotte.ligneArray[i].escadrilleArray[j].spaceShipArray.length;++k){
                esquaTemp.spaceShipArray.push( new SpaceShip(flotte.ligneArray[i].escadrilleArray[j].spaceShipArray[k].type));
                
            }
            
            
            //esquaTemp.ref[0] = id;
            tempEsqArray.push(esquaTemp);
        }
        
        
        ligneArray.push(new Ligne(tempEsqArray));
        tempEsqArray = [];
    }
    
    
    returnFlotte = new Flotte(ligneArray,id);
    returnFlotte.tech = flotte.tech; // tech is not change by the simulation
    return returnFlotte;
    
}
/*function setTechValue(){
    var valueTech1 = 0;;
    var valueTech2 = 0;;
    var hasKBonusF1 = 0;
    var hasKBonusF2 = 0;
    
    if ($("bonnusF1") != null && $("bonnusF2") != null && $("hasKBonusF1")!= null && ("hasKBonusF2")!= null) {
        
        
        valueTech1 =  parseFloat($("bonnusF1").value);
        valueTech2 = parseFloat($("bonnusF2").value);
        if ($("hasKBonusF1").checked) {
            
            hasKBonusF1 = 1;
        }
        else{
            hasKBonusF1 =0;
        }
        
        if ($("hasKBonusF2").checked) {
            
            hasKBonusF2 = 1;
        }
        else{
            hasKBonusF2 =0;
        }
        
        
        if (isNaN(valueTech1) ||  valueTech1<0) {
            throw "a valeur du bonnus technologique doit un nomre "+"e"+"tre  => 0";
        }
        else{
            defenderFlotte.tech = 0.02*valueTech1+ hasKBonusF1*0.1;
        }
        
        if (isNaN(valueTech2) ||  valueTech2<0) {
            throw "a valeur du bonnus technologique doit un nomre "+"e"+"tre  => 0";
        }
        else{
            attackerFlotte.tech = 0.02*valueTech2 + hasKBonusF2*0.1;
        }
        return 0;
    }
    else{
        return 1;
    }
}*/

function setTech(flotte) {
    const LISTE_OF_SHIP = ["Chasseur","Corvette","Fregate","Destroyer","Croiseur"];
    const LISTE_OF_SHIP_ALPHA = ["Chasseur","Corvette"];
    const LISTE_OF_SHIP_LIGNE = ["Fregate","Destroyer","Croiseur"];
    const LISTE_OF_TECH_TYPE = ["vitesse","attaque","defense"];
    var id = flotte.id +1; // go see how it is defind in drawTechTable
    
    var needToThrow = false;
    for( var i in LISTE_OF_SHIP){
        for (var j in LISTE_OF_TECH_TYPE){
            
            var value = parseInt($(id+"*"+LISTE_OF_SHIP[i]+"*"+LISTE_OF_TECH_TYPE[j]).value);
           
            if (isNaN(value) || value < 0) {
                needToThrow = true;
                
                $(id+"*"+LISTE_OF_SHIP[i]+"*"+LISTE_OF_TECH_TYPE[j]).value =0;
                flotte.tech[LISTE_OF_SHIP[i]][LISTE_OF_TECH_TYPE[j]] = 0;
            }
            else{
                if (LISTE_OF_SHIP[i]=="Chasseur") {
                    flotte.tech[LISTE_OF_SHIP[i]][LISTE_OF_TECH_TYPE[j]] = value*0.03;
                }
                else{
                flotte.tech[LISTE_OF_SHIP[i]][LISTE_OF_TECH_TYPE[j]] = value*0.02;
                }
            }
        }
    }
    
    if ($(id+"*Kovahk").checked) {
        for  (var i in LISTE_OF_SHIP_ALPHA ){
            flotte.tech[LISTE_OF_SHIP_ALPHA[i]]["vitesse"] += 0.1;
        }
        
        for (var i in LISTE_OF_SHIP_LIGNE){
            flotte.tech[LISTE_OF_SHIP_LIGNE[i]]["vitesse"] -= 0.05;
        }
    }
    
    if (needToThrow) {
        throw "mauvaise entee";
    }
    
}

function drawTechTable(){
    const inputSize = 50
    const lsiteOfShipType = ["Chasseur","Corvette","Fregate","Destroyer","Croiseur"];
    var arrayDisplay = [["Bonus (niveau de technologie)","vitesse","attaque","d&eacute;fense"]]; //vitesse attque defense
    var arrayDisplay2 = [["Bonus (niveau de technologie)","vitesse","attaque","d&eacute;fense"]]; //vitesse attque defense
    var styleArray = [[""],[""],[""],[""],[""],[""],[""]];
    

    for (var i =0;i<=4;++i){
        arrayDisplay.push([lsiteOfShipType[i],"<input style='width : "+inputSize+"px;' id='"+"1*"+lsiteOfShipType[i]+"*"+arrayDisplay[0][1]+"'>","<input style='width : "+inputSize+"px;' id='"+"1*"+lsiteOfShipType[i]+"*"+arrayDisplay[0][2] +"'>","<input style='width : "+inputSize+"px;' id='"+"1*"+lsiteOfShipType[i]+"*"+"defense"+"'>"]);
        arrayDisplay2.push([lsiteOfShipType[i],"<input style='width : "+inputSize+"px;' id='"+"2*"+lsiteOfShipType[i]+"*"+arrayDisplay[0][1]+"'>","<input style='width : "+inputSize+"px;' id='"+"2*"+lsiteOfShipType[i]+"*"+arrayDisplay[0][2]+"'>","<input style='width : "+inputSize+"px;' id='"+"2*"+lsiteOfShipType[i]+"*"+"defense"+"'>"]);
        //alert("1*"+lsiteOfShipType[i]+"*"+arrayDisplay[0][1])
    }
    
    $("tech1").innerHTML = displayTable(arrayDisplay,styleArray)+ " Bonus de Kovahk <input id='1*Kovahk' type='checkbox'> " ;
    $("tech2").innerHTML = displayTable(arrayDisplay2,styleArray)+ " Bonus de Kovahk <input id='2*Kovahk' type='checkbox'> ";
    
    const LISTE_OF_SHIP = ["Chasseur","Corvette","Fregate","Destroyer","Croiseur"];
    const LISTE_OF_TECH_TYPE = ["vitesse","attaque","defense"];
    
    for( var i in LISTE_OF_SHIP){
        for (var j in LISTE_OF_TECH_TYPE){
            
            $(1+"*"+LISTE_OF_SHIP[i]+"*"+LISTE_OF_TECH_TYPE[j]).defaultValue =0;
            $(2+"*"+LISTE_OF_SHIP[i]+"*"+LISTE_OF_TECH_TYPE[j]).defaultValue =0;
        }
    }
    
}


