// ==UserScript==
// @name         simulator user script
// @namespace    
// @version      0.0.0.1
// @description  simulator user script
// @author       ChickenStorm
// @match        http://game.asylamba.com/beta/fleet/view-spyreport*
// @grant        none
// ==/UserScript==


var d = document.getElementsByTagName("span")
function test(){
    
    for(var i in d){
        var regExp = new RegExp("^commander full show*")
        if (regExp.test(d[i].className)) {
            
            
            d[i].onclick = function(event){
                
                
                var temp = this["outerHTML"]
                
                //var temp = ""
                const SEARCH_TEXT = "data-army=\"["
                
                var pos = temp.indexOf(SEARCH_TEXT) + SEARCH_TEXT.length;
                
                temp = temp.substring(pos,temp.length-1);
                
               
                var pos2 = temp.indexOf("]\">");
                temp = temp.substring(0,pos2);
                window.open("https://dl.dropboxusercontent.com/u/110049848/Projecet_script_public/Asylamba_project_online_launcher.html?d=" + temp +";");
                
               
            };
        }
    }
    
}

test();

