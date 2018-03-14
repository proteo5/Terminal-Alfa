//Resources 
api.Create = function (data, callback) { callserver(new envelop('Admin', "Usuarios", "Create", data), callback); };

//App
var usuariosVue = new Vue({
    el: '#form-data',
    data: {
        Datos: {
            Usuario: '',
            Nombre: '',
            Apellidos: '',
            Email: ''
        }
    },
    mounted: function () {
        var self = this;
    },
    methods: {
        EsValido: function () {
            var self = this;
            valid = true;
            if (!self.Datos.Usuario && !self.Datos.Usuario.trim()) {
                valid = false;
                $("#txtUsuario").notify("Usuario requerido");
            }
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
        focusUsuario: function () {
            $("#txtNombres").focus();
            if (!this.Datos.Usuario && !this.Datos.Usuario.trim())
                $("#txtUsuario").notify("Usuario requerido");
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
        Crear: function () {
            var self = this;
            var sd = this.Datos
            var valid = self.EsValido();

            if (valid) {
                var data = {
                    Usuario: sd.Usuario,
                    Nombre: sd.Nombre,
                    Apellidos: sd.Apellidos,
                    Email: sd.Email
                };
                api.Create(data,function (data) {
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