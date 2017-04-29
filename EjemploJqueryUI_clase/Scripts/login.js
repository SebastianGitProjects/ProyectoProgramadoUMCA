$(function () {
    creaReglasvalidacion();
});
/////// se encarga de crear las validacion del form
function creaReglasvalidacion() {
    $("#frmLonging").validate({
        rules: {
            correo: {
                required: true,
                minlength: 3,
                maxlength: 15,
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 30,
            }
        },
        messages: {
            correo: {
                required: "El nombre es requerido",
                minlength: "Debe ingresar minimo 3 caracteres",
                maxlength: "Debe ingresar maximo 15 caracteres",
            },
            password: {
                required: "El password es requerido",
                minlength: "Debe ingresar minimo 8 caracteres",
                maxlength: "Debe ingresar maximo 16 caracteres",

            }

        },
        submitHandler: function (form) {
            var corr = document.getElementById("correo").value;
            var pass = document.getElementById("password").value;
            if (!window.openDatabase) {
                alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
            } else {
                var db = openDatabase("BlackJackLocalDB", "1.0", "BlackJackLocalDB", 3 * 1024);
                db.transaction(function (tx) {
                    tx.executeSql("Select email, contra From tblUsuarios Where email = ? AND contra = ?", [corr, pass],
                        function (tx, salida) {
                            try{
                            var row = salida.rows.item(0);
                            window.location.href = "../formulario/jugar.html";
                            }catch(err){
                                alert("El usuario o la contraseña son incorrectos");
                            }
                        },
                        function () { alert("No se ha podido completar el registro") });
                })

            }
        }
    });

}