
function saveFlotte(flotte) {
    var input = prompt("entree un nom");
    var cText = "flotte&";
    
    
    if (input != "" && input!=null) {
        for (var i in flotte.ligneArray){
            for (var j in flotte.ligneArray[i].escadrilleArray){
                
                for (var k in flotte.ligneArray[i].escadrilleArray[j].spaceShipArray){
                    
                    cText += getPosFromShipType(flotte.ligneArray[i].escadrilleArray[j].spaceShipArray[k].type) + ",";
                    
                }
                
                cText += "#";
                
            }
            cText += "*";
        }
        const YEARS = 1000;
        const DAY_PER_YEAR = 365.2425 // in Gregorian calendar the real value is 365,25696 day 
        setCookie(input,cText,DAY_PER_YEAR*YEARS); // i think that it's enougth time
        
    }
    else{
        alert("le nom ne peut pas etre vide")
    }
}

function loadFlotteFromACookie(key, flotte){
    
    for (var i in flotte.ligneArray){
            for (var j in flotte.ligneArray[i].escadrilleArray){
                
                flotte.ligneArray[i].escadrilleArray[j].spaceShipArray = [];
                flotte.ligneArray[i].escadrilleArray[j].pev = 0;
                
                
                
            }
            
        }
    
    var cText = getCookie(key);
    var cArray = cText.split("&");
    
    if (cArray[0]!="flotte") {
        throw "mauvais type de cookie";
    }
    else{
        
        /*
         *
         * TODO verfier que l'on ne fasse pas de segmentation fault
         *
         */
        
        var cArray2 = cArray[1].split("*");
        for(var i in cArray2){
            var cArray3 = cArray2[i].split("#");
            for(var j in cArray3){
                var cArray4 = cArray3[j].split(",")
                for(var k = 0; k < cArray4.length-  1;++k){
                    
                    addSchip(1,flotte,i,j,cArray4[k]);
                    
                }
                
            }
        }
    }
    
    
    drawInterface();
}




function setCookie(key, value ,exdays) {
    var d = new Date();
    if (exdays == null) {
        exdays = 360;
    }
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    
    document.cookie = key + "=" + value + "; " + expires;
}

function getCookie(key) {
    var name = key + "=";
    var ca = document.cookie.split(';');
    
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        
        while (c.charAt(0)==' '){
            c = c.substring(1);
        }
        
        if (c.indexOf(name) == 0){
            return c.substring(name.length, c.length);
        }
    }
    
    return "";
}

function deleteCookie(key){
    
    setCookie(key,"",-1);
    
}

