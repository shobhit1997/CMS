$(document).ready(function() {
    jQuery("#endDate").val(getDate(Date.now));
    loadAttendance();
    $("#editButton").click(function() {
        $('#work_name').removeAttr("disabled");
        $('#work_type').removeAttr("disabled");
        $('#work_description').removeAttr("disabled");
        $('#work_place').removeAttr("disabled");
        $('#startDate').removeAttr("disabled");
        $('#endDate').removeAttr("disabled");
    });
    $("#deleteButton").click(function() {
        deleteAttendance();
    });
});
workersMap = {};

function loadAttendance() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);
            for (i = 0; i < jsonData.length; i++) {
                $('#workers-list').append(`<li>
                        <input id="${jsonData[i].worker._id}" type="checkbox" style="margin-right: 25px;" /> ${jsonData[i].worker.name}
                        <div class="form-field">
                            <label>Amount Payed (Default : ${jsonData[i].worker.dailyWage})</label>
                            <input type="number" id="amt_${jsonData[i].worker._id}" value="${jsonData[i].amountPayed}"/>
                        </div>
                        <div class="form-field">
                            <label>Remarks</label>
                            <input type="text" id="rem_${jsonData[i].worker._id}" value="${jsonData[i].remarks != undefined ? jsonData[i].remarks : ""}"/>
                        </div>
                    </li>`);
                if (jsonData[i].present) {
                    $(`#${jsonData[i].worker._id}`).prop('checked', true);
                }
                $("#date").val(getDate(jsonData[i].date));
                workersMap[jsonData[i].worker._id] = jsonData[i]
                addOtherWorkers();
            }
        } else if (this.readyState == 4) {
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/worker/attendance" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}

function addOtherWorkers() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            console.log(jsonData);
            for (i = 0; i < jsonData.length; i++) {
                if (!workersMap[jsonData[i]._id]) {
                    $('#workers-list').append(`<li>
                        <input id="${jsonData[i]._id}" type="checkbox" style="margin-right: 25px;" /> ${jsonData[i].name}
                        <div class="form-field">
                            <label>Amount Payed (Default : ${jsonData[i].dailyWage})</label>
                            <input type="number" id="amt_${jsonData[i]._id}" value="0"/>
                        </div>
                        <div class="form-field">
                            <label>Remarks</label>
                            <input type="text" id="rem_${jsonData[i]._id}" value=""/>
                        </div>
                    </li>`);
                    workersMap[jsonData[i]._id] = jsonData[i]
                }
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
            alert("Success")
        } else if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            alert("Error")
        }
    };
    xhttp.open("PATCH", window.location.origin + "/api/worker/attendance" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");

    var jsonOb = [];
    for (key of Object.keys(workersMap)) {
        var t = {
            date: $("#date").val(),
            worker: key,
            present: $(`#${key}`).is(":checked"),
            amountPayed: $(`#amt_${key}`).val(),
            remarks: $(`#rem_${key}`).val(),
        }
        jsonOb.push(t);
    }
    console.log(jsonOb);
    xhttp.send(JSON.stringify(jsonOb));
});

function deleteAttendance() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var json = JSON.parse(this.responseText);
            alert("Success")
            window.location.href = "/attendances"
        } else if (this.readyState == 4) {
            var res = JSON.parse(this.responseText);
            alert("Error");
        }
    };
    xhttp.open("DELETE", window.location.origin + "/api/worker/attendance" + location.search, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}