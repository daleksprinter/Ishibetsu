var list={};//コース選択されたスポットデータのリスト
var list_count;
var findLi;//サムネイル要素

function spot_select(){
    $('#spot')[0].style.display="none";
    $('#done')[0].style.display="inline";
    $('#cancel')[0].style.display="inline";
    $('#refine')[0].style.display="none";
    
    for(var key in list){//メモリの解放がされていない?
      delete list[key];
    }
     
     list_count = $("#photo")[0].childElementCount;
     findLi =$('#photo')[0].children;

     //全てのサムネイルに押下されたら選択される関数を割り当て
     for (var i = 0; i < list_count; i++){
        findLi[i].setAttribute('onclick','check(this)');
     }
}
//押下されたサムネイルの選択状態を判定
function check(elm){
    if(String(elm.id) in list){
        delete list[String(elm.id)];
        elm.setAttribute('class','unselected');
    }else{
        var db = openDatabase("database", "1.0", "testdatabase", 1000000);
        db.transaction(
         function(tr){
             tr.executeSql("SELECT * FROM Spot INNER JOIN Tag ON Spot.tagid = Tag.id WHERE Spot.id = ?",[elm.id],function(rt,rs){
                 list[String(elm.id)] = rs.rows.item(0);
             });
        }); 
        elm.setAttribute('class','selected');
    }
}

//完了ボタンを押した時の処理
function done(){
  if(Object.keys(list).length == 0){
        alert("選択されていません");
    }else{
        myNavigator.pushPage('map.html');
        $('#spot')[0].style.display="inline";
   　　  $('#done')[0].style.display="none";
        $('#cancel')[0].style.display="none";
        $('#refine')[0].style.display="inline";
    
        for(var i = 0; i<list_count;i++){
            findLi[i].setAttribute('class','unselected');
            findLi[i].setAttribute('onclick','load_detail(this.id)');
        }  
  }
}

function cancel(){
    $('#spot')[0].style.display="inline";
    $('#done')[0].style.display="none";
    $('#cancel')[0].style.display="none";
    $('#refine')[0].style.display="inline";
    
    for(var i = 0; i<list_count;i++){
        findLi[i].setAttribute('class','unselected');
        findLi[i].setAttribute('onclick','load_detail(this.id)');
    }
}
var root_map;
document.addEventListener('pageinit',function(page){
   if(page.target.id == "map"){
       var lati = 41.733614;
       var long = 140.578877;
    
    var latlng = new google.maps.LatLng(lati,long); 
    root_map = new google.maps.Map($('#rootmap')[0], {
        zoom: 14,       // ズームレベル
        center: latlng     // 中心地を指定
      });
  
     for(var key in list){
        var carousel_item = document.createElement('ons-carousel-item');
        carousel_item.setAttribute('id',key);
        
      
      
      
       carousel_item.addEventListener('touchstart', function(event) {
            start = new Date().getTime();
        });
        carousel_item.addEventListener('touchend', function(event) {
        if (start) {
            end = new Date().getTime();
            longpress = (end - start < 300) ? false : true;
            
            if(longpress){
                data = list[this.id];
               myNavigator.pushPage('detail.html');
               //this.remove();
            }
        }
        });
            
            
        carousel_item.appendChild(img(list[key].imagedata,130,130));
        carousel_item.appendChild(text(list[key].title,'txt'));
       // carousel_item.appendChild(text(list[key].info,'txt')); //よくわからん
        document.getElementById('carousel').appendChild(carousel_item);
      
        lati = list[key].latitude;
        long = list[key].longitude;
        latlng = new google.maps.LatLng(lati,long);
        var marker = new google.maps.Marker({position: latlng, map: root_map});

     }
      navigator.geolocation.getCurrentPosition( successFunc , errorFunc , optionObj ) ;
    }
}); 

function text(text,cls){
    var txt = document.createElement('p');
    txt.textContent = text;
    txt.setAttribute('class',cls);
    return txt;
}

function successFunc(position){
    var lati = position.coords.latitude;
    var long = position.coords.longitude;
    var latlng = new google.maps.LatLng(lati,long); 
    var marker = new google.maps.Marker({position: latlng, map: root_map}); 
}

function errorFunc(error){
    console.log('error');
}

var optionObj = {};