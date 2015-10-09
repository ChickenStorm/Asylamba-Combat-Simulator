/*
Copyright 2015 ChickenStorm

 This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.


*/



// ==UserScript==
// @name         simulator user script
// @version      0.0.3.1
// @description  simulator user script
// @author       ChickenStorm
// @match        http://game.asylamba.com/beta/fleet/view-spyreport*
// @match        http://game.asylamba.com/s6/fleet/view-spyreport*
// @match        http://game.asylamba.com/s7/fleet/view-spyreport*
// @match        https://dl.dropboxusercontent.com/u/110049848/Projecet_script_public/*
// @grant        none
// ==/UserScript==

var versionUserScript = "0.0.3.1";

var d = document.getElementsByTagName("span");
function setOnClickFunction(decalage){
    
    var decString ="";
    
    for (var i=0;i< decalage;++i){
        decString+="0,";
        
        
    }
    
    var regExp = new RegExp("^commander full show*");
    
    for(var i in d){
        
        if (regExp.test(d[i].className)) {
            
            
            d[i].onclick = function(event){
                //******
                
                var temp = this["outerHTML"]
                
                //var temp = ""
                const SEARCH_TEXT = "data-army=\"[";
                
                var pos = temp.indexOf(SEARCH_TEXT) + SEARCH_TEXT.length;
                
                temp = temp.substring(pos,temp.length-1);
                
               
                var pos2 = temp.indexOf("]\">");
                temp = temp.substring(0,pos2);
                window.open("https://dl.dropboxusercontent.com/u/110049848/Projecet_script_public/Asylamba_project_online_launcher.html?d=" +decString+ temp +";");
                //**********
               
            };
        }
    }
    
}

/*function getVersionUS() {
    return version;
}*/


function messageForSimulator(){
    
    document.getElementById("UserScriptMessage").innerHTML = "";
    try{
        if (versionUserScript == userScriptLastVersion) {
            $("generalInfos").innerHTML += "user script &agrave; jour.";
        }
        else{
            $("generalInfos").innerHTML += "l'user script n'est pas &agrave; jour. T&eacute;l&eacute;chargez le <a href='https://github.com/ChickenStorm/Asylamba-Combat-Simulator/raw/master/userScript/simulator_user_script.user.js'>ici</a>.";
            
        }
    }
    catch(e){
        
    }
    
    /*
        if (getVersionUS() == userScriptLastVersion) {
            $("generalInfos").innerHTML += "user script &agrave; jour."
        }
        else{
            $("generalInfos").innerHTML += "l'user script n'est pas &agrave; jour. T&eacute;l&eacute;chargez le <a href='https://github.com/ChickenStorm/Asylamba-Combat-Simulator/raw/master/userScript/simulator_user_script.user.js'>ici</a>."
        }
    */
    
}

//##############################################################################################################################################################################


var regExpUrlAsylambaBeta1 = new RegExp("(^http://game.asylamba.com/beta/fleet/view-spyreport*)");
var regExpUrlAsylambaBeta2 = new RegExp("(^http://game.asylamba.com/s6/fleet/view-spyreport*)")
var regExpUrlAsylambaBeta3 = new RegExp("(^http://game.asylamba.com/s7/fleet/view-spyreport*)") 
var regExpUrlSimulator = new RegExp("^https://dl.dropboxusercontent.com/u/110049848/Projecet_script_public/*");

if (regExpUrlAsylambaBeta1.test(window.location.href)) {
    setOnClickFunction(12);
}
else if (regExpUrlAsylambaBeta2.test(window.location.href)){
    setOnClickFunction(0);
    
}
else if (regExpUrlAsylambaBeta3.test(window.location.href)){
    setOnClickFunction(0);
    
}
else if (regExpUrlSimulator.test(window.location.href)) {
    //messageForSimulator();
    setTimeout(messageForSimulator,0);
    
}

