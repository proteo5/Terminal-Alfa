//Resources
let api = {
    Login: function (data, callback) { callserver(new envelop(null, "Auth", "Login", data), callback); },
    TokenValid: function (data, callback) { callserver(new envelop(null, "Auth", "TokenValid", data), callback); }
};

//App
new Vue({
    el: '#app',
    data: {
        User: '',
        Pass: '',
        UserHasError: false,
        PassHasError: false
    },
    mounted: function () {
        let self = this;
        let pass = true;
        let token = lscache.get("Token");

        if (token) {
            api.TokenValid({ "Token": token },
                function (result) {
                    if (result.Result == "valid") {
                        pass = false;
                        window.location = "/";
                    }
                }
            )
        }

        if (pass) {
            setTimeout(function () {
                $("#user").focus();
            }, 0);
        }
    },
    methods: {
        userFocusPass: function () {
            $("#password").focus();
        },
        userLostFocus: function () {
            this.UserHasError = !this.User && !this.User.trim();
        },
        passFocusPass: function () {
            this.PassHasError = !this.Pass && !this.Pass.trim();
            if (!this.PassHasError) {
                this.login();
            }
        },
        passLostFocus: function () {
            this.PassHasError = !this.Pass && !this.Pass.trim();
        },
        login: function () {
            var self = this;
            var valid = true;

            if (!self.User && !self.User.trim()) {
                valid = false;
                this.UserHasError = true;
            }
            if (!self.Pass && !self.Pass.trim()) {
                valid = false;
                this.PassHasError = true;
            }

            if (valid) {
                let data = {
                    "Usuario": self.User,
                    "Password": self.Pass,
                };
                api.Login(data,
                    function (data) {
                        if (data.Result == 'ok') {
                            var d = data.Data;
                            lscache.set('Token', d.Token);
                            lscache.set("Usuario",
                                {
                                    'Nombre': d.Nombre,
                                    'Apellidos': d.Apellidos,
                                    'Email': d.Email,
                                    'Usuario': d.Usuario
                                });
                            //lscache.set('Menus', data.Data.Menus);
                            window.location = "/";
                        }
                        else {// if (data.Result == Reply.notSuccess || data.Result == Reply.error) {
                            self.Pass = '';
                            // $("#btnSubmit").notify(data.Message);
                            swal({
                                title: 'Login',
                                text: data.Message,
                                icon: 'error',
                                button: false,
                                timer: 3000
                            });
                            this.UserHasError = true;
                            this.PassHasError = true;
                            $("#user").focus();
                        }
                    }
                );
            }
        }
    }
});

