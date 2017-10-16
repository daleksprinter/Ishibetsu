var data;//保存用

function load_detail(id){
     var db = openDatabase("database", "1.0", "testdatabase", 1000000);
     //スポットデータを読み込む処理。押された写真のIDと一致するタプルを検索
     db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM Spot INNER JOIN Tag ON Spot.tagid = Tag.id WHERE Spot.id = ?",[id],function(rt,rs){
                 data = rs.rows.item(0);
                 myNavigator.pushPage('detail.html');
             });
     });
    
}

document.addEventListener('pageinit',function(page){
   if(page.target.id == "detail"){
       
    //画像表示
    var img = $("#image")[0];
    img.src = data.imagedata;
    img.width = 300;
    img.height = 300;
    
    //テキスト表示
    $("#title")[0].textContent = data.title;
    $("#info")[0].textContent = data.info;
    $("#opentime")[0].textContent = '開店時間: ' + Number(data.opentime)/100 + '時';
    $("#endtime")[0].textContent = '閉店時間: ' + Number(data.endtime)/100+ '時';
    
    //マップ作成
    var latlng = new google.maps.LatLng(data.latitude,data.longitude); 
    var map = new google.maps.Map(mapcanv, {
        zoom: 14,       // ズームレベル
        center: latlng     // 中心地を指定
      });
    var marker = new google.maps.Marker({position: latlng, map: map}); 
    
   } 
});


