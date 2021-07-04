var cdata;
var isSuccessful = false;

$.ajax({
    url : "https://raw.githubusercontent.com/Codeio-Tamil/codeio/main/json/problem/dailydose.json",
    method:"GET",
    success:function(data) {
        cdata = JSON.parse(data);
        isSuccessful = true;
    }, error:function(xhr, status, error) {
        var err = eval("(" + xhr.responseText + ")");
        console.log(err.Message);
        isSuccessful = false;
    }
});

function _(el) {
    return document.getElementById(el);
}

function search() {
    var input = _("input").value;

    var isFound = false;

    if (isSuccessful) {
        var len = cdata.data.length;
        var recommend = '<hr>';
        for (var i=0; i<len; i++) {
            var fetchText = cdata.data[i].name;
            fetchText = fetchText.toLowerCase();
            input = input.toLowerCase();
            if (cdata.data[i].name.search(input) >= 0) {
                console.log("found");
                isFound = true;
                recommend += '<a class="card"><div class="row"><div class="col-3"><img src="https://i1.ytimg.com/vi/' + cdata.data[i].id +'/mqdefault.jpg" width="100" height="60"></div><div class="col-9"> ' + cdata.data[i].name + '</div></div></a>';
            }
        } 

        if (isFound) {
            _("result").innerHTML = recommend;
        }

    } else {
        console.error("Error occured in fetching data");
    }
}
