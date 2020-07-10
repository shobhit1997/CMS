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
    xhttp.open("POST", window.location.origin + "/api/bill", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    var jsonObj = {
        name: jQuery("#name").val(),
        quantity: jQuery("#quantity").val(),
        description: jQuery("#description").val(),
        unitPrice: jQuery("#unitPrice").val(),
        billDate: jQuery("#billDate").val(),
        billAmount: jQuery("#billAmount").val(),
        billCopy: jQuery("#billCopy").val()
    };
    xhttp.send(JSON.stringify(jsonObj));
});

$(document).ready(function() {
    jQuery("#billDate").val(getDate(Date.now()));
    $("#quantity").change(function() {
        $("#billAmount").val(parseInt($("#quantity").val()) * parseInt($("#unitPrice").val()))
    });
    $("#unitPrice").change(function() {
        $("#billAmount").val(parseInt($("#quantity").val()) * parseInt($("#unitPrice").val()))
    });
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

function uploadBill() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            $("#billCopy").val(json.imageUrl);
        } else if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            alert(res.message || "Unknown Error");
        }
    };
    xhttp.open("POST", window.location.origin + "/api/bill/images", true);
    // xhttp.setRequestHeader("Content-type", "application/json");
    var formData = new FormData();
    formData.append('image', document.getElementById('billFile').files[0]);
    xhttp.send(formData);
}