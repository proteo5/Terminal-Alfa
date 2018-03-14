let serverPath = 'http://localhost:61101';
let version = "1.0";

let callserver = function (req, callback) {
    req.Token = lscache.get("Token");
    $.ajax({
        url: serverPath,
        type: "POST",
        crossDomain: true,
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(req),
        xhrFields: {
            withCredentials: true
        },
        success: callback
    });
}

let envelop = function (area, entity, action, data) {
    this.Version = version;
    this.Area = area;
    this.Entity = entity;
    this.Action = action;
    this.Data = data;
    this.Token = "";
}

var getParameters = function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
