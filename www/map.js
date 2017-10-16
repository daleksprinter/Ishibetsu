var list;
var list_count;
var findLi;

function spot_select(){
    $('#spot')[0].style.display="none";
    $('#done')[0].style.display="inline";
    $('#cancel')[0].style.display="inline";
    $('#refine')[0].style.display="none";
    
     list = {};
     list_count = $("#photo")[0].childElementCount;
     findLi =$('#photo')[0].children;

     
     for (var i = 0; i < list_count; i++){
        findLi[i].setAttribute('onclick','check(this)');
     }
}

function check(elm){
    if(list[String(elm.id)]=='true'){
        delete list[String(elm.id)];
        elm.setAttribute('class','unselected');
    }else{
        list[String(elm.id)] = 'true';
        elm.setAttribute('class','selected');
    }  
}

function done(){
    if(Object.keys(list).length == 0){
        alert("選択されていません");
    }else{
        myNavigator.pushPage('map.html');
        console.log(list);
    }
    
    $('#spot')[0].style.display="inline";
    $('#done')[0].style.display="none";
    $('#cancel')[0].style.display="none";
    $('#refine')[0].style.display="inline";
    
    for(var i = 0; i<list_count;i++){
        findLi[i].setAttribute('class','unselected');
        findLi[i].setAttribute('onclick','load_detail(this.id)');
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

document.addEventListener('pageinit',function(page){
   if(page.target.id == "map"){
    navigator.geolocation.getCurrentPosition( successFunc , errorFunc , optionObj ) ;
   } 
});


function successFunc(position){
    var lati = position.coords.latitude;
    var long = position.coords.longitude
    
    var latlng = new google.maps.LatLng(lati,long); 
    map = new google.maps.Map(document.getElementById('rootmap'), {
        zoom: 14,       // ズームレベル
        center: latlng     // 中心地を指定
      });
    var marker = new google.maps.Marker({position: latlng, map: map}); 
}

function errorFunc(error){
    console.log('error');
}

var optionObj = {};