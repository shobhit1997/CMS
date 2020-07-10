$(document).ready(function() {
    loadBill();
    $("#quantity").change(function() {
        $("#billAmount").val(parseInt($("#quantity").val()) * parseInt($("#unitPrice").val()))
    });
    $("#unitPrice").change(function() {
        $("#billAmount").val(parseInt($("#quantity").val()) * parseInt($("#unitPrice").val()))
    });
    $("#editButton").click(function() {
        $('#name').removeAttr("disabled");
        $('#unitPrice').removeAttr("disabled");
        $('#description').removeAttr("disabled");
        $('#quantity').removeAttr("disabled");
        $('#billDate').removeAttr("disabled");
        $('#billAmount').removeAttr("disabled");
        $('#billFile').removeAttr("disabled");
        $('#uploadBill').removeAttr("disabled");
    });

});

function loadBill() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);

            jQuery("#name").val(jsonData.name);
            jQuery("#quantity").val(jsonData.quantity);
            jQuery("#description").val(jsonData.description);
            jQuery("#unitPrice").val(jsonData.unitPrice);
            jQuery("#billAmount").val(jsonData.billAmount)
            jQuery("#billDate").val(getDate(jsonData.billDate));
            jQuery("#billCopy").val(jsonData.billCopy);
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/bill" + location.search, true);
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
    xhttp.open("PATCH", window.location.origin + "/api/bill" + location.search, true);
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