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


var htmlPage = " <div style =' position:relative;text-align: center' id='generalInfos' > Version "+ version +" </div> <div id='spaceShipTable' style=' display: inline-block; position:absolute; '></div> <div id='viewSapceShipEsca' style=' display: inline-block; position:absolute; '> </div>  <div id='viewFlotte1' style=' display: inline-block; position:absolute; '></div> <div id='viewFlotte2' style=' display: inline-block; position:absolute; '></div>  <button id='b1'  style='position:absolute;' onclick='runSimulation()'> lancer la simulation</button> "
htmlPage += " <div style='display: inline-block; position:absolute;' id='resultGeneral'> <div id='result' style=' display: inline-block; position:relative; '></div> <br> <div id='moreDetaileResult' style=' display: inline-block; position:relative; '></div> </div> <div id = 'di1' style ='display: inline-block; position:absolute;'> Nombre d'it&eacute;rations <input id='i1' style='position:relative;' type='number' > <br>  (un grand nombre augmente la pr&eacute;cision) <br>  afficher automatiquement les vaisseaux restant <input id='autoMoreDetails' type='checkbox' checked=true> </div>"
htmlPage += " <div style='display: inline-block; position:absolute;' id='tech1'> </div> <div style='display: inline-block; position:absolute;' id='tech2'> </div>"


htmlPage += "<div id='saveOptionDiv' style='display: inline-block; position:absolute;'><\div>"
// this is the html main part
// may change <= unreadable

//resultGeneral moreDetaileResult


function drawPage(){
    $("body").innerHTML = htmlPage;
    
}