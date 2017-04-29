$(function () {
            creaReglasvalidacion();
        });
        /////// se encarga de crear las validacion del form
        function creaReglasvalidacion() {
            $("#frmLonging").validate({
                rules: {
                    nombre: {
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
                    nombre: {
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
                    alert("Bienvenido..!! ")
                }
            });
        
        }