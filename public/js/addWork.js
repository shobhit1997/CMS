jQuery('#worker-form').on('submit', function(e) {
    e.preventDefault();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            alert("Success")
        } else if (this.readyState == 4) {
            alert("Error")
        }
    };
    xhttp.open("POST", window.location.origin + "/api/work", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonObj = {
        name: jQuery("#work_name").val(),
        type: jQuery("#work_type").val(),
        description: jQuery("#work_description").val(),
        place: jQuery("#work_place").val(),
        startDate: jQuery("#startDate").val()
    };
    xhttp.send(JSON.stringify(jsonObj));
});

$(document).ready(function() {
    jQuery("#startDate").val(getDate(Date.now()));
});

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