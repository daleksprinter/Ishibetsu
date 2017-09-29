document.addEventListener('pageinit',function(page){
if(page.target.id == "page1"){
    initdb();
    viewthumbs();
  　 } 
 }
);


var spotlabel;
var lati;
var long;
function loadpage(e){
    spotlabel = e.id;
    myNavigator.pushPage('page2.html');
}

document.addEventListener('pageinit',function(page){
    if(page.target.id=="page2"){
    loaddb(spotlabel);
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }
);

function loaddb(id){
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
    db.transaction(
        function(tr){
            tr.executeSql("SELECT * FROM TestTable",[],function(rt,rs){
                img=viewimg(rs.rows.item(id).imageurl,300,300);
                img.setAttribute('class','phototag');
                
                  information.appendChild(img);
                  console.log(img);
                  viewtext(information,rs.rows.item(id).title);
                  viewtext(information,rs.rows.item(id).info);
                  lati=rs.rows.item(id).mapx;
                  long=rs.rows.item(id).mapy;
                  console.log(lati+","+long);
                }
            );
         }
    );   
}
function viewtext(id,text){
     var item = document.createElement('p');
     item.textContent=text;
     id.appendChild(item);
}

function viewimg(imgurl,width,height){
    var img = document.createElement("img");
 
    img.src=imgurl;
    img.width = width;
    img.height = height;
   return img;
    
    
}


function suc(){
 /* ons.notification.alert({
    message: 'Insert Succeed'
  });*/
  console.log("success");
}

function err(){
   /* ons.notification.alert({
    message: 'Insert Failed'
  });*/
  console.log("failed");
}

 function onSuccess(position){
      // 4. Google Maps APIの位置情報オブジェクトを生成
      var latitude = lati;
      var longitude = long;
      var latlng = new google.maps.LatLng(latitude, longitude);        

    		
      // 5. 地図を表示
      map = new google.maps.Map(mapcanv, {
        zoom: 14,       // ズームレベル
        center: latlng 	// 中心地を指定
      });
			
      // 6. マーカーを置く
      var marker = new google.maps.Marker({position: latlng, map: map}); 	
    }
	
    // 7. 現在地取得に失敗した場合の処理
    function onError(error){
      console.log(JSON.stringify(error));
    }