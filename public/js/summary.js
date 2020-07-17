$(document).ready(function() {
    loadSummary()

    $('select').on('change', function() {
        updateValues(parseInt(summary[this.value].workerPay || 0), parseInt(summary[this.value].materialPay || 0))
    });

});
summary = {}

function loadSummary() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            summary = jsonData.summary;
            $('#day').append(`<option value="total"> 
                                        Total
                                  </option>`);
            for (i = 0; i < Object.keys(summary).length; i++) {
                day = Object.keys(summary)[i];
                $('#day').append(`<option value="${day}"> 
                                        ${getDate(day)}
                                  </option>`);
            }
            var total = jsonData.total;
            updateValues(parseInt(total.workerTotal || 0), parseInt(total.materialTotal || 0))
            summary.total = { materialPay: total.materialTotal, workerPay: total.workerTotal }
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/bill/summary", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function updateValues(labourCost, materialCost) {
    $("#labour_cost").val(labourCost);
    $("#material_cost").val(materialCost);
    $("#total_cost").val(labourCost + materialCost);
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