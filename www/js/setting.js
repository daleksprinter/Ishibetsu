document.addEventListener('pageinit',function(page){
  if(page.target.id == "setting"){
    //設定ページが読み込まれた時にスポットの総数を表示
    get_dataLen();
   

   //全てのボタンに、押されたら結果の数を表示するイベントリスナーを追加
   $('#open')[0].addEventListener('change',function(e){
    get_dataLen();
   })
   $('#slope')[0].addEventListener('change',function(e){
    get_dataLen();
   })
   $('#season')[0].addEventListener('change',function(e){
    get_dataLen();
   })
  }
});

//絞り込み後の検索結果の数を表示
function get_dataLen(){

  var res = document.getElementById('result')

        //季節、時間判定用の現在時刻の取得
    var date = new Date();
    var time = date.getHours()*100 + date.getMinutes();
    
    function get_timezone(date){
   　　　 if(6 < date || date < 18)return 'noon';
    　　 else return 'noon';
　　}

   function get_season(date){
          if(date < 4 || 12 <= date) return 'summer';
          if(4 <= date && date < 7) return 'summer';
          if(7 <= date && date <10) return 'summer';
          else return 'summer';
    }
    
    
    
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
     db.transaction(
         function(tr){
             tr.executeSql("SELECT Spot.id FROM Spot INNER JOIN Tag ON Spot.tagid = Tag.id WHERE (((Tag.opentime < ? AND ? < Tag.endtime) OR Tag.endtime is null) OR 1= ?) AND (1 = ? OR Tag.slope = 'false') AND (1 = ? OR (Spot.time = ? AND Spot.season = ? )) ",[time,time,flug(open),flug(slope),flug(season),get_timezone(date.getHours()),get_season(date.getMonth()+1)],function(rt,rs){
               var l = rs.rows.length;
                res.innerHTML = '検索結果は'+String(l)+'件です'
             });
     });
}

//絞り込み用の処理
function refine_thumbnail(){
   
   //季節、時間判定用の現在時刻の取得
    var date = new Date();
    var time = date.getHours()*100 + date.getMinutes();
    
    function get_timezone(date){
   　　　 if(6 < date || date < 18)return 'noon';
    　　 else return 'noon';
　　}

   function get_season(date){
          if(date < 4 || 12 <= date) return 'summer';
          if(4 <= date && date < 7) return 'summer';
          if(7 <= date && date <10) return 'summer';
          else return 'summer';
    }
    
    
    
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
     db.transaction(
         function(tr){
             tr.executeSql("SELECT Spot.id,Spot.imagedata FROM Spot INNER JOIN Tag ON Spot.tagid = Tag.id WHERE (((Tag.opentime < ? AND ? < Tag.endtime) OR Tag.endtime is null) OR 1= ?) AND (1 = ? OR Tag.slope = 'false') AND (1 = ? OR (Spot.time = ? AND Spot.season = ? )) ",[time,time,flug(open),flug(slope),flug(season),get_timezone(date.getHours()),get_season(date.getMonth()+1)],function(rt,rs){
               var l = rs.rows.length;
                $("#photo").empty();
                for(var i=0;i<l;i++){
                  $("#photo")[0].appendChild( create_thumbnail(rs.rows.item(i).id,rs.rows.item(i).imagedata,screen.width/3,screen.width/3) );
                 }
               myNavigator.popPage();
             });
     });  
}



//スイッチが押されているかの判定
function flug(id){
        if(id.checked) return 1;
        else return 0;
};

//絞り込みメニューを表示するための関数
//従来の絞り込み画面に行きたい場合はrefine_thumbnail()を当てる
function menu(){

   if($('#slider_menu').hasClass('menu_off')){
    $('#slider_menu').removeClass('menu_off');
   
    $('#slider_menu').animate({'marginTop':'70px'});
    
    $("body").on('touchmove.noScroll', function(e) {
    e.preventDefault();
    });
    
    console.log('a');
   
  }else{
  
    $('#slider_menu').animate({'marginTop':'0px'});
    $('#slider_menu').addClass('menu_off');

    $("body").off('.noScroll');
    
    console.log('b');
  }
};y