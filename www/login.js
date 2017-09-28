function logindatabase(){
    var user = document.getElementById('authority').value;
    var pass = document.getElementById('password').value;
    
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
     db.transaction(
         function(tr){
           tr.executeSql("SELECT * FROM UserTable WHERE authority = ? AND pass = ? ",[user,pass],function(rt,rs){
               if(rs.rows.length == 0){
                   console.log("login missed");
                   
               }else{
                   myNavigator.pushPage("page1.html");
               }
             }
           );
        }
     );
}

