$(document).ready(function() {

    loadWorker();
    $("#editButton").click(function() {
        $('#worker_name').removeAttr("disabled");
        $('#worker_type').removeAttr("disabled");
        $('#dailyWage').removeAttr("disabled");
    });

    $("#deleteButton").click(function() {
        deleteWorker();
    });

});

function loadWorker() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);

            jQuery("#worker_name").val(jsonData.name);
            jQuery("#worker_type").val(jsonData.type);
            jQuery("#dailyWage").val(jsonData.dailyWage);
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/worker" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

jQuery('#worker-form').on('submit', function(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            alert("Success")
        } else if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            alert("Error")
        }
    };
    xhttp.open("PATCH", window.location.origin + "/api/worker" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonObj = {
        name: jQuery("#worker_name").val(),
        type: jQuery("#worker_type").val(),
        dailyWage: jQuery("#dailyWage").val()
    };
    xhttp.send(JSON.stringify(jsonObj));
});

function deleteWorker() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            alert("Success")
            window.location.href = "/workers"
        } else if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            alert("Error");
        }
    };
    xhttp.open("DELETE", window.location.origin + "/api/worker" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}