$(document).ready(function() {
    jQuery("#endDate").val(getDate(Date.now));
    loadWorker();
    $("#editButton").click(function() {
        $('#work_name').removeAttr("disabled");
        $('#work_type').removeAttr("disabled");
        $('#work_description').removeAttr("disabled");
        $('#work_place').removeAttr("disabled");
        $('#startDate').removeAttr("disabled");
        $('#endDate').removeAttr("disabled");
    });

});

function loadWorker() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);

            jQuery("#work_name").val(jsonData.name);
            jQuery("#work_type").val(jsonData.type);
            jQuery("#work_description").val(jsonData.description);
            jQuery("#work_place").val(jsonData.place);
            jQuery("#startDate").val(getDate(jsonData.startData))
            jQuery("#endDate").val(getDate(jsonData.endDate));
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/work" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

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
jQuery('#worker-form').on('submit', function(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            console.log(json);
        } else if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            alert(res.message || "Unknown Error");
        }
    };
    xhttp.open("PATCH", window.location.origin + "/api/work" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonObj = {
        name: jQuery("#work_name").val(),
        type: jQuery("#work_type").val(),
        description: jQuery("#work_description").val(),
        place: jQuery("#work_place").val(),
        startDate: jQuery("#startDate").val(),
        endDate: jQuery("#endDate").val()
    };
    xhttp.send(JSON.stringify(jsonObj));
});