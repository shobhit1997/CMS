$(document).ready(function() {
    loadWorkers()

});
workersMap = {};

function loadWorkers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);
            for (i = 0; i < jsonData.length; i++) {
                $('#workers-list').append(`<li id="${jsonData[i]._id}"> 
                                       ${jsonData[i].name} 
                                  </li>`);
                workersMap[jsonData[i]._id] = jsonData[i]
            }
            $("#workers-list li").click(function() {
                window.location.href = '/updateWorker?id=' + this.id
            });
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/worker", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}