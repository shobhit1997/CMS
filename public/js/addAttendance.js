$(document).ready(function() {
    loadWorkers()
    $("#date").val(getDate(Date.now()))
});
workersMap = {};

function getDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function loadWorkers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);
            for (i = 0; i < jsonData.length; i++) {
                $('#workers-list').append(`<li>
                        <input type="checkbox" id="${jsonData[i]._id}" style="margin-right: 25px;" /> ${jsonData[i].name}
                    </li>`);
                workersMap[jsonData[i]._id] = jsonData[i]
            }
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/worker", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function markAttendance() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);
            alert("Success");
        } else if (this.readyState == 4) {
            // console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("POST", window.location.origin + "/api/worker/attendance", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonOb = [];
    console.log(Object.keys(workersMap));
    for (key of Object.keys(workersMap)) {
        var t = {
            date: $("#date").val(),
            worker: key,
            present: $(`#${key}`).is(":checked")
        }
        jsonOb.push(t);
    }
    console.log(jsonOb);
    xhttp.send(JSON.stringify(jsonOb));
}