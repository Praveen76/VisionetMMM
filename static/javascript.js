
$(function () {
    var date = new Date();
    date.setMonth(date.getMonth() + 1, 1);

    var year = date.getFullYear(); //get year
    var month = date.getMonth(); //get month

    $('#datepicker').datepicker({
        format: "M-yyyy",
        startView: "months",
        // minViewMode: "months",
        minViewMode: 1,
        autoclose: true,
        startDate: getDefaultDate(), //set it here
        endDate: new Date(year + 1, month, '31'),
        defaultDate: 3
    });

    $("#datepicker").datepicker("setDate", getDefaultDate());
    $("#datepicker").on("hide", function (e) {
        console.log(reset());
    });


});

function getDefaultDate() {
    var defaultDate = new Date();
    //defaultDate.setDate(6)
    if (defaultDate.getDate() > 5) {
        defaultDate.setMonth(defaultDate.getMonth() + 1, 1);
    }
    return defaultDate;
}


function reset() {
    document.getElementById("panel").style.display = "none";
    $(".alert-danger").hide();
    $(".outer-warning").hide();
    document.getElementById("qty1").value = "";
    document.getElementById("qty2").value = "";
    document.getElementById("qty3").value = "";
    document.getElementById("qty4").value = "";
    document.getElementById("qty5").value = "";
    document.getElementById("iLeads").innerHTML = "00";
    document.getElementById("sLeads").innerHTML = "00";
    document.getElementById("tLeads").innerHTML = "00";
    document.getElementById("rLeads").innerHTML = "00";
    document.getElementById("oLeads").innerHTML = "00";

}

// Leads Per 1000$ Calculation

function getLeads() {

    let args = [];
    var value = (document.getElementById("qty1").value);
    value = value.replace(/,/g, "");

    if (value != "" && !isNaN(value) && parseInt(value) > 0) {
        var number = parseInt(value);
        args.push(number);
    }
    var value = (document.getElementById("qty2").value);
    value = value.replace(/,/g, "");
    if (value != "" && !isNaN(value) && parseInt(value) > 0) {
        var number = parseInt(value);
        args.push(number);
    }

    var value = (document.getElementById("qty3").value);
    value = value.replace(/,/g, "");
    if (value != "" && !isNaN(value) && parseInt(value) > 0) {
        var number = parseInt(value);
        args.push(number);
    }

    var value = (document.getElementById("qty4").value);
    value = value.replace(/,/g, "");
    if (value != "" && !isNaN(value) && parseInt(value) > 0) {
        var number = parseInt(value);
        args.push(number);
    }

    var value = (document.getElementById("qty5").value);
    value = value.replace(/,/g, "");
    if (value != "" && !isNaN(value) && parseInt(value) > 0) {
        var number = parseInt(value);
        args.push(number);
    }

    let xhttp = new XMLHttpRequest();
    let url = "/predict";
    xhttp.onreadystatechange = function () {
        if (this.responseText) {
            let data = JSON.parse(this.responseText);
            document.getElementById("iLeads").innerHTML = data.InternetPredict;
            document.getElementById("sLeads").innerHTML = data.SocialMediaPredict;
            document.getElementById("tLeads").innerHTML = data.TelevisionPredict;
            document.getElementById("rLeads").innerHTML = data.RadioPredict;
            document.getElementById("oLeads").innerHTML = data.OtherPredict;
            document.getElementById("total").innerHTML = data.TotalPredict;
        }
        else {
            document.getElementById("iLeads").innerHTML = "00";
            document.getElementById("sLeads").innerHTML = "00";
            document.getElementById("tLeads").innerHTML = "00";
            document.getElementById("rLeads").innerHTML = "00";
            document.getElementById("oLeads").innerHTML = "00";
            document.getElementById("total").innerHTML = "00";
        }
    };
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(args));
}
