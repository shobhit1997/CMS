$(document).ready(function() {
    loadBills()

});
billsMap = {};

function loadBills() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonData = JSON.parse(this.responseText);
            for (i = 0; i < jsonData.length; i++) {
                $('#bills-list').append(`<li id="${jsonData[i]._id}"> 
                                       ${jsonData[i].name} 
                                  </li>`);
                billsMap[jsonData[i]._id] = jsonData[i]
            }
            $("#bills-list li").click(function() {
                window.location.href = '/updateBill?id=' + this.id
            });
        } else if (this.readyState == 4) {
            console.log(JSON.parse(this.responseText));
            alert("Invalid Data")
        }
    };
    xhttp.open("GET", window.location.origin + "/api/bill", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}