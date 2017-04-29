$(function () {
    creaReglasvalidacion();
});
/////// se encarga de crear las validacion del form
function creaReglasvalidacion() {
    $("#frmApuesta").validate({
        rules: {
            apuesta: {
                required: true,
                minlength: 3,
                maxlength: 5,
                pattern: /^[1-9]\d{5}$/
            },
        },
        messages: {
            apuesta: {
                required: "No puede continuar si no ingresa una apuesta",
                minlength: "Debe ingresar minimo 3 caracteres",
                maxlength: "Debe ingresar maximo 15 caracteres",
            },
        },
        submitHandler: function (form) {

        }
    })
}