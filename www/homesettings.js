function viewthumbs(){
     var db = openDatabase("database", "1.0", "testdatabase", 1000000);
     db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM TestTable",[],function(rt,rs){
                 var l= rs.rows.length;
                 for(var i=0;i<l;i++){
            
                    var button=createbutton(i,"loadpage(this)","light");
        
                    //loadImage
                     var img = viewimg(button,rs.rows.item(i).imageurl,100,100);
                     
                     //setComponent
                     photo.appendChild(button);
                     ons.compile(button);
                 }
             });
         });  
}
 
function createbutton(id,method,modifier){
     var btn = document.createElement("ons-button");
                      btn.setAttribute("id",id);
                      btn.setAttribute("onclick", method);
                      btn.setAttribute("modifier", modifier);
                      return btn;
                     
}

function refineimg(){
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
    deleteview(photo);
    
    //坂判定
    var slopeflug;
    if(onslope.isChecked()){
        slopeflug = 'false';
    }else{
        slopeflug = 'true';
    }
    
    
    //営業判定
    var nowtime = new Date();
    var nownum = nowtime.getHours()*100+nowtime.getMinutes();
    var openflug;


  if(open.isChecked()){
      openflug = nowtime;
  }else{
      openflug = 0;
  }
   
   console.log(nownum);
    
    db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM TestTable WHERE( opentime < ? AND ? < endtime OR endtime='null'OR ? < opentime) AND (slope = 'false' or slope = ?)",[nownum,nownum,openflug,slopeflug],function(rt,rs){
                 var l= rs.rows.length;
        
                 for(var i=0;i<l;i++){

                    var button=createbutton(i,"loadpage(this)","light");
        
                    //loadImage
                     var img = viewimg(button,rs.rows.item(i).imageurl,100,100);
                     
                     //setComponent
                     photo.appendChild(button);
                     ons.compile(button);
                 }
             });
         });
}

function deleteview(id){
//速度低下のリスク
 id.textContent = null;  
 myNavigator.popPage();
}