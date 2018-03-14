//Resources 
api.GetAll = function (data, callback) { callserver(new envelop('Admin', "Usuarios", "GetAll", data), callback); };

//App
new Vue({
    el: '#page-app',
    data: {
        Usuarios: []
    },
    mounted: function () {
        var self = this;
        api.GetAll({ },
            function (response) {
                if (response.Result == "ok") {
                    self.Usuarios = response.Data;
                }

                setTimeout(function () {
                    let table = $('#table-data').dataTable({
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "columnDefs": [{
                            "targets": 'no-sort',
                            "orderable": false,
                        }]
                    });
                }, 0);
            }
        );
    }
});

