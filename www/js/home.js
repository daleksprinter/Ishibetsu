var db = openDatabase("database", "1.0", "testdatabase", 1000000);

function load_database() {
    //テーブル初期化
    delete_table();

    //スポットデータの読み込み
    var loadspot = false;
    var loadtag = false;

    $.ajax({
        type: "GET",
        url: "http://18.219.20.170:13334/spot",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (datas, dataType) {
            for(key in datas) insertSpot(datas[key]);
            loadspot = true;
            if(loadspot && loadtag) generate_heroPhoto(), generate_thumbnail();

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Error : ' + errorThrown);
            $("#XMLHttpRequest").html("XMLHttpRequest : " + XMLHttpRequest.status);
            $("#textStatus").html("textStatus : " + textStatus);
            $("#errorThrown").html("errorThrown : " + errorThrown);
        }
    });

    //タグデータの読み込み
    $.ajax({
        type: "GET",
        url: "http://18.219.20.170:13334/tag",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (datas, dataType) {
            for(key in datas) insertTag(datas[key]);
            loadtag = true;
            if(loadspot && loadtag) generate_heroPhoto(), generate_thumbnail();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Error : ' + errorThrown);
            $("#XMLHttpRequest").html("XMLHttpRequest : " + XMLHttpRequest.status);
            $("#textStatus").html("textStatus : " + textStatus);
            $("#errorThrown").html("errorThrown : " + errorThrown);
        }
    })

}

//WebSQL挿入用関数
function insertSpot(data) {
    const createsql = 'CREATE TABLE IF NOT EXISTS Spot (id PRIMARY KEY,title,info,time,season,tagid INTEGER)'
    const sql = "INSERT INTO Spot VALUES(?,?,?,?,?,?)";
    db.transaction(
        function (tr) {
            tr.executeSql(createsql, [], function () {
            });
            tr.executeSql(sql, [data.id, data.title, data.info, data.time, data.season, data.tagid], function (rt, rs) {
            });
        }
    );
}
function insertTag(data) {
    const createsql = 'CREATE TABLE IF NOT EXISTS Tag (id PRIMARY KEY,name,latitude,longitude,opentime INTEGER,endtime INTEGER,slope)';
    const sql = "INSERT INTO Tag VALUES(?,?,?,?,?,?,?)"
    db.transaction(
        function (tr) {
            tr.executeSql(createsql, [], function () {
            });
            tr.executeSql(sql, [data.id, data.name, data.latitude, data.longitude, data.opentime, data.endtime, data.slope]);
        }
    );
}
function delete_table() {
    db.transaction(
        function (tr) {
            tr.executeSql('DROP TABLE IF EXISTS Spot');
            tr.executeSql('DROP TABLE IF EXISTS Tag');

        }
    );
}


document.addEventListener('pageinit', function (page) {
    if (page.target.id == "home") {
        load_database();
    }
});

function generate_thumbnail(){
    db.transaction(
        function (tr) {
            tr.executeSql("SELECT * FROM Spot", [], function (rt, rs) {
                var l = rs.rows.length;
                for(var i = 0; i < l; i++) $('#photo')[0].appendChild(create_thumbnail(rs.rows.item(i).id));
            });
        });
}

function generate_heroPhoto(){
    const bucketUrl = 'https://s3.us-east-2.amazonaws.com/ishibetsu-images/spot-images/24.jpeg';
    var pht = img(bucketUrl, screen.width, screen.width);
    $('#herophoto')[0].appendChild(pht);
}

function create_thumbnail(id) {
    const url = 'https://s3.us-east-2.amazonaws.com/ishibetsu-images/spot-images/' + String(id) + '.jpeg';
    console.log(url);
    var div = document.createElement('div');
    div.setAttribute('class', 'thumb');
    var button = document.createElement('button');
    button.setAttribute('id', id);
    button.setAttribute('class', 'unselected');
    button.setAttribute('onclick', 'load_detail(this.id)');
    button.appendChild(img(url, (screen.width / 3), (screen.width/3)));
    div.appendChild(button);
    return div;
};

function heroimgMsg(){
    var time = new Date();
    var msg = '石別へようこそ'
    var date = String(time.getFullYear() + '/' + time.getMonth() + '/' + time.getDate() + ' ' + conv_day(time.getDay()) + '.')
    
    return (
        '<div>' + 
            '<div>' + msg + '</div>' + 
            '<div>' + date + '</div>' + 
        '</div>'
    );

}

function img(src, width, height) {
    var image = document.createElement('img');
    image.src = src;
    image.width = width;
    image.height = height;
    return image;
};

function conv_day(day_code) {
    switch (day_code) {
        case 0: return 'Sun';
        case 1: return 'Mon';
        case 2: return 'Tue';
        case 3: return 'Wed';
        case 4: return 'Thu';
        case 5: return 'Fri';
        case 6: return 'Sat';
    }
};