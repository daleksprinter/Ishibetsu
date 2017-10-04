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
    
    var now = new Date();
    var nownum = now.getHours()*100+now.getMinutes();
    var time   = gettime(now);
    var season = getseason(now);
   
    db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM TestTable WHERE ( ( (opentime < ? AND ? < endtime ) OR  endtime='null' ) OR '1'=? ) AND ('1'=? OR slope = 'false') AND ('1'=? OR (season = ? AND time = ?) )",
                                                                  [nownum,nownum,flug(open),flug(onslope),flug(seasonbtn),season,time],function(rt,rs){
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
         
          myNavigator.popPage();
}

function deleteview(id){
//速度低下
       id.textContent = null;  

}

function flug(id){
        if(id.isChecked()){
            return '0';
        }else{
            return '1';
        }
    }

function getseason(nowtime){
    
   if( nowtime.getMonth()+1 <= 3){
       return 'wint'
   }
   if(3 > nowtime.getMonth+1 <= 5){
       return 'spr'
   }
   if(5<nowtime.getMonth+1 <= 8){
       return 'sum'
   }
   if(9<nowtime.getMonth+1 <=11){
       return 'fall'
   }
   else{
       return 'wint'
   }
}

function gettime(nowtime){
      if(  nowtime.getHours() <= 6 || 18 <= nowtime.getHours() ){
       return 'night';
   }else{
        return 'noon';
   }
}