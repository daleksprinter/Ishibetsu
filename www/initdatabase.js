//初回起動のデータベース処理

var titles = new Array("アイスクリーム","並木道","トラピスト修道院","クッキー","風の丘","ルルドの洞窟","夜空","サイクリング貸し出し","葛登支岬灯台");
var informations = new Array("２８０円","ライトアップ","女人禁制","お土産","カレーとピザ","マリア様","満天の星空","４時間500円","大型第三等レンズ");
var mapxs = new Array("41.7385998","41.7367126","41.7403125","41.7385998","41.7409997","41.7441505","","41.7367116","41.7422058");
var mapys = new Array("140.5714353","140.5729199","140.5692805","140.5714353","140.5948942","140.5619855","","140.5796727","140.5994875");
var opentimes = new Array("900","null","null","900","1100","null","null","900","null");　
var endtimes  = new Array("1700","null","null","1700","1700","null","null","1800","null");
var times = new Array("noon","night","noon","noon","noon","noon","night","noon","noon");
var seasons = new Array("sum","sum","spr","spr","wint","wint","fall","fall","fall");
var slopes = new Array("false","false","true","false","true","true","false","false","false");
var imageurls = new Array("img/icecream.jpg","img/namikido.jpg","img/trapist.jpg","img/cookie.jpg","img/kazenooka.jpg","img/rurudo.jpg","img/yozora.jpg","img/cycle.jpg","img/kattoshi.jpg");
var datalen = titles.length;

var authority = new Array("contributer","administer");
var password = new Array("cont0001","admin0001");

function initdb(){
 
    var db = openDatabase("database", "1.0", "testdatabase", 1000000);
    
    db.transaction(
         function(tr){
             tr.executeSql('CREATE TABLE IF NOT EXISTS TestTable (id unique, title ,info,mapx,mapy,opentime INTEGER,endtime INTEGER,time,season,slope,imageurl)');
              
              for(var i = 0;i<datalen;i++){
               tr.executeSql('INSERT INTO TestTable VALUES(?,?,?,?,?,?,?,?,?,?,?)',[i,titles[i],informations[i],mapxs[i],mapys[i],opentimes[i],endtimes[i],times[i],seasons[i],slopes[i],imageurls[i]]);
           
             }
          });
  
    db.transaction(
         function(tr){
             tr.executeSql('CREATE TABLE UserTable(authority,pass)');
            
             for(var i=0;i<2;i++){
             tr.executeSql('INSERT INTO UserTable VALUES(?,?)',[authority[i],password[i]]);
        
             }
             });
    
}
