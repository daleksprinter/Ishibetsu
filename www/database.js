function snapphoto(){
        
        navigator.camera.getPicture (onSuccess, onFail, 
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL,allowEdit:true});
        
        function onSuccess (imageData) {
       
              var image = document.getElementById ('viewgetphoto');
                image.src = "data:image/jpeg;base64," + imageData;
            console.log(image.src);
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
          
        }

        //A callback function when snapping picture is fail.
        function onFail (message) {
            alert ('Error occured: ' + message);
        }
}



function insert(){
   
     var db = openDatabase("database", "1.0", "testdatabase", 1000000);
         
     var no = document.getElementById("id").value;
     var title = document.getElementById("title").value;
     var info = document.getElementById("info").value;
     var imageurl = document.getElementById("imageurl").value;
 
     db.transaction(
         function(tr){
           tr.executeSql('CREATE TABLE IF NOT EXISTS TestTable (id unique, title ,info,mapx,mapy,opentime,endtime,time,season,slope,imageurl)');
           tr.executeSql('INSERT INTO TestTable VALUES(?,?,?,?,?,?,?,?,?,?)',[no,title,info,imageurl,"","","","","",""]);
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
