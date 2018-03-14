//Resources
let api = {
    TokenValid: function (data, callback) { callserver(new envelop(null, "Auth", "TokenValid", data), callback); }
};

let userInfoLayout = new Vue({
    el: '#navbar',
    data: {
        Nombre: '',
        Usuario: '',
        Email: '',
        Apellidos: ''
    },
    mounted: function () {
        let self = this;
        let pass = true;
        let token = lscache.get("Token");
        let user = lscache.get("Usuario");

        if (token && user) {
            api.TokenValid({ "Token": token },
                function (result) {
                    if (result.Result == "notValid") {
                        pass = false;
                        self.Logout();
                    }
                }
            );
        }
        else {
            pass = false;
            this.Logout();
        }

        if (pass) {
            self.Nombre = user.Nombre;
            self.Usuario = user.Usuario;
            self.Email = user.Email;
            self.Apellidos = user.Apellidos
        }
    },

    methods: {
        Logout: function () {
            lscache.remove("Token");
            lscache.remove("Usuario");
            window.location = "/login";
        }
    }
});


//var menuLayout = new Vue({
//    el: '#layout-menu',
//    data: {
//        Menus: [],
//        MenuActivo: 'D'
//    },
//    mounted: function () {
//        self = this;
//        self.Menus = locache.get("Menus");
//    }
//});