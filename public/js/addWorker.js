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
    xhttp.open("POST", window.location.origin + "/api/worker", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonObj = {
        name: jQuery("#worker_name").val(),
        type: jQuery("#worker_type").val(),
        dailyWage: jQuery("#dailyWage").val()
    };
    xhttp.send(JSON.stringify(jsonObj));
});