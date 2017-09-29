function viewthumbs(){
     var db = openDatabase("database", "1.0", "testdatabase", 1000000);
     db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM TestTable",[],function(rt,rs){
                 var l= rs.rows.length;
                 for(var i=0;i<l;i++){
            
                    var button=createbutton(i,"loadpage(this)","light");
        
                    //loadImage
                     var img = viewimg(rs.rows.item(i).imageurl,100,100);
                     
                     button.appendChild(img);
                     
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
    
    var nowtime = new Date();
    var nownum = nowtime.getHours()*100+nowtime.getMinutes();
    
    function flug(id){
        if(id.isChecked()){
            return '0';
        }else{
            return '1';
        }
    }

   
   //季節判定
   var time ;
   var season;
   
   if(  nowtime.getHours() <= 6 || 18 <= nowtime.getHours() ){
       time = 'night';
   }else{
       time = 'noon';
   }
   
   if( nowtime.getMonth()+1 <= 3){
       season = 'wint'
   }
   if(3 > nowtime.getMonth+1 <= 5){
       season = 'spr'
   }
   if(5<nowtime.getMonth+1 <= 8){
       season = 'sum'
   }
   if(9<nowtime.getMonth+1 <=11){
       season = 'fall'
   }
   else{
       season = 'wint'
   }


   
    db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM TestTable WHERE ( ( (opentime < ? AND ? < endtime ) OR  endtime='null' ) OR '1'=? ) AND ('1'=? OR slope = 'false') AND ('1'=? OR (season = ? AND time = ?) )",
                                                                  [nownum,nownum,flug(open),flug(onslope),flug(seasonbtn),season,time],function(rt,rs){
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
         
          myNavigator.popPage();
}

function deleteview(id){
//速度低下のリスク
 id.textContent = null;  

}