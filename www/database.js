var imagebase64;
function snapphoto(){
        
        navigator.camera.getPicture (onSuccess, onFail, 
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL,allowEdit:true});
        
        function onSuccess (imageData) {
       
              var image = document.getElementById ('viewgetphoto');
            image.src = "data:image/jpeg;base64," + imageData;
         imagebase64 = image.src;
       document.getElementById(imagestr).textContent=imagebase64;
        }

        //A callback function when snapping picture is fail.
        function onFail (message) {
            alert ('Error occured: ' + message);
        }

} 

function getphoto(){
     navigator.camera.getPicture (onSuccess, onFail, 
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL, sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM,allowEdit:true});
        
        function onSuccess (imageData) {
       
              var image = document.getElementById ('viewgetphoto');
                image.src = "data:image/jpeg;base64," + imageData;
                  imagebase64 = image.src;
                  document.getElementById(imagestr).textContent=imagebase64;
          
        }

        //A callback function when snapping picture is fail.
        function onFail (message) {
            alert ('Error occured: ' + message);
        }
}



function insert(){
   
     var db = openDatabase("database", "1.0", "testdatabase", 1000000);
         
    
     var title = document.getElementById("datatitle").value;
     var info = document.getElementById("datainfo").value;
  
 
     db.transaction(
         function(tr){
           tr.executeSql('INSERT INTO TestTable VALUES(?,?,?,?,?,?,?,?,?,?)',[title,info,"","","","","","","",imagebase64] );
              
         }
         );
}
  

function init(){
    
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
    
    db.transaction(
        function(tr){
            tr.executeSql('DROP TABLE IF EXISTS TestTable');
        }
    );
}
