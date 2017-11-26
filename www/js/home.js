
document.addEventListener('pageinit',function(page){
   if(page.target.id == "home"){
　　　　$("#photo").empty();//子要素の初期化
        var db = openDatabase("database", "1.0", "testdatabase", 1000000);
        db.transaction(
         function(tr){
             tr.executeSql("SELECT id,imagedata FROM Spot",[],function(rt,rs){
                 var l= rs.rows.length;

                 var hero = Math.floor( Math.random() * (l + 1) );
                 var pht = img(rs.rows.item(hero).imagedata,screen.width,screen.width);
                 pht.setAttribute('class','heroimg');

                 $('#herophoto')[0].appendChild(pht);
                 var time = new Date();
                 $('#herotime')[0].textContent=String(time.getFullYear()+'/'+time.getMonth()+'/'+time.getDate()+' '+conv_day(time.getDay())+'.')
                 
                 for(var i=0;i<l;i++){
        
                  //作ったサムネイル要素を追加
                 $('#photo')[0].appendChild(create_thumbnail(rs.rows.item(i).id,rs.rows.item(i).imagedata,screen.width/3,screen.width/3));
                 
                 //$('#photo')[0].appendChild(create_thumbnail(rs.rows.item(i).id,rs.rows.item(i).imagedata,(screen.width-36)/3,(screen.width-36)/3));
                 }

             });
        });
    }
});
function create_thumbnail(id,src,width,height){
    var div = document.createElement('div');
    div.setAttribute('class','thumb');
    var button = document.createElement('button');
    button.setAttribute('id',id);
    button.setAttribute('class', 'unselected');
    button.setAttribute('onclick','load_detail(this.id)');
    button.appendChild(img(src,width,height));
    div.appendChild(button);
    return div;
};

function img(src,width,height){  
    var image = document.createElement('img');
    var thum_height = height; //サムネイルの縦幅
    var thum_width = width;  //サムネイルの横幅
    
    image.src = src;
    
      $(image).each(function(){
            var image_width = image.width; // 画像の幅(原寸)
            var image_height = image.height; // 画像の高さ(原寸)
            //横長の画像の場合
            if (image_width >= image_height) {
                var centering = thum_height/image_height*(image_width-image_height)/2;
                $(this).height(thum_height); //高さをサムネイルに合わせる
                $(this).css("top",0);
                $(this).css("left","-"+centering+"px");//画像のセンター合わせ
            } 

            //縦長の画像の場合
            else {
                var centering = (thum_width/image_width*image_height-thum_height)/2; 
                $(this).width(thum_width); //幅をサムネイルに合わせる
                $(this).css("top","-"+centering+"px");//画像のセンター合わせ
                $(this).css("left",0);
            }
        });
    return image;
};

function conv_day(day_code){
    switch(day_code){
		case 0:return 'Sun';
		case 1:return 'Mon';
		case 2:return 'Tue';
		case 3:return 'Wed';
		case 4:return 'Thu';
		case 5:return 'Fri';
		case 6:return 'Sat';

	}
}