//Resources 
api.GetByID = function (data, callback) { callserver(new envelop('Admin', "Usuarios", "GetByID", data), callback); };
api.Update = function (data, callback) { callserver(new envelop('Admin', "Usuarios", "Update", data), callback); };

//App
var usuariosVue = new Vue({
    el: '#form-data',
    data: {
        Datos: {
            iUsuario: '',
            Usuario: '',
            Nombre: '',
            Apellidos: '',
            Email: '',
            IsActive: false
        }
    },
    mounted: function () {
        var self = this;
        api.GetByID({ id: getParameters("id") }, function (response) {
            if (response.Result == "ok") {
                self.Datos = response.Data[0];
            }
            else {
                window.location = "/admin/usuarios";
            }
        })
    },
    methods: {
        EsValido: function () {
            var self = this;
            valid = true;
            if (!self.Datos.Nombre && !self.Datos.Nombre.trim()) {
                valid = false;
                $("#txtNombres").notify("Nombre requeridos");
            }
            if (!self.Datos.Apellidos && !self.Datos.Apellidos.trim()) {
                valid = false;
                $("#txtApellidos").notify("Apellidos requeridos");
            }
            if (!self.Datos.Email && !self.Datos.Email.trim()) {
                valid = false;
                $("#txtCorreo").notify("Correo electrónico requerido");
            }
            return valid;
        },
        focusNombres: function () {
            $("#txtApellidos").focus();
            if (!this.Datos.Nombres && !this.Datos.Nombres.trim())
                $("#txtNombre").notify("Nombres requeridos");
        },
        focusApellidos: function () {
            $("#txtCorreo").focus();
            if (!this.Datos.Apellidos && !this.Datos.Apellidos.trim())
                $("#txtApellidos").notify("Apellidos requeridos");
        },
        Actualizar: function () {
            var self = this;
            var sd = this.Datos
            var valid = self.EsValido();

            if (valid) {
                var data = {
                    id:sd.iUsuario,
                    Nombre: sd.Nombre,
                    Apellidos: sd.Apellidos,
                    Email: sd.Email,
                    IsActive: sd.IsActive
                };
                api.Update(data, function (data) {
                    if (data.Result == "ok") {
                        window.location = "/admin/usuarios";
                    }
                    else {
                        swal({
                            title: 'Login',
                            text: data.Message,
                            icon: 'error',
                            button: false,
                            timer: 3000
                        });
                    }
                });
            }
        }
    }
});