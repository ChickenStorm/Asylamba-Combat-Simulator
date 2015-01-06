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


function opperationBasedOnUrl(){ // the data after ? 
    var badUrl = false;
    try{
        urlData = getUrlData();
        
        urlDataArray = urlData.split(";");
        
        for(var i in urlDataArray){
            
            var tempData = urlDataArray[i].split("=");
            if (tempData.length ==2) {
                
                if (tempData[0]=="d") {
                    
                    fillFlotte(defenderFlotte,tempData[1].split(","));
                }
                else if (tempData[0]=="a") {
                    fillFlotte(attackerFlotte,tempData[1].split(","));
                }
                else{
                    badUrl=true;
                }
                
                
                
            }
            else{
                badUrl=true;
            }
            
        }
    }
    
    catch(e){
        badUrl = true;
    }
    finally{
        
        return badUrl;
    }
}

function getUrlData(){
    var tempUrl = window.location.href;
    arrayUrl = tempUrl.split("?");
    
    if (arrayUrl.length == 1) {
        return null;
    }
    else{
        return arrayUrl[1];
    }
}