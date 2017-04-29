  $(function () {
            creaReglasvalidacion();
        });
        /////// se encarga de crear las validacion del form
        function creaReglasvalidacion() {

            $("#frmRegistroUsuarios").validate({
                rules: {
                    cedula: {
                        required: true,
                        pattern: /^[1-9]-\d{3}-\d{3}$/
                    },
                    nombre: {
                        required: true,
                        minlength: 6,
                        maxlength: 15,
                    },
                    PrimerApellido: {
                        required: true,
                        minlength: 6,
                        maxlength: 26,
                    },
                    SegundoApellido: {
                        required: true,
                        minlength: 6,
                        maxlength: 26,
                    },
                    correo: {
                        required: true,


                    },
                    password: {
                        required: true,
                        minlength: 8,
                        maxlength: 16
                    }

                },
                messages: {
                    cedula: {
                        pattern: "Formato esperado: #-###-###"
                    },
                    nombre: {
                        required: "El nombre es requerido",
                        minlength: "Debe ingresar minimo 6 caracteres",
                        maxlength: "Debe ingresar maximo 15 caracteres"
                    },
                    PrimerApellido: {
                        required: "El apellido es requerido",
                        minlength: "Debe ingresar minimo 6 caracteres",
                        maxlength: "Debe ingresar maximo 26 caracteres"

                    },
                    SegundoApellido: {
                        required: "El apellido es requerido",
                        minlength: "Debe ingresar minimo 6 caracteres",
                        maxlength: "Debe ingresar maximo 26 caracteres"

                    },
                    correo: {
                        required: "Correo es requerido"
                    },

                    password: {
                        required: "Password es requerido",
                        minlength: "Debe ingresar minimo 8 caracteres",
                        maxlength: "Debe ingresar maximo 16 caracteres"

                    }

                },

                ///función que se ejecuta al validar el formulario
                submitHandler: function (form) {
                    var ced = document.getElementById("cedula").value;
                    var nom = document.getElementById("nombre").value;
                    var pApel = document.getElementById("PrimerApellido").value;
                    var sApel = document.getElementById("SegundoApellido").value;
                    var pass = document.getElementById("password").value;
                    var corr= document.getElementById("correo").value;
                    //Guardar usuario en base de datos Web Sql
                    if(!window.openDatabase){
                        alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
                    }else{
                        var db = openDatabase("BlackJackLocalDB","1.0","BlackJackLocalDB", 3*1024);
                        db.transaction(function(tx){
                            tx.executeSql("CREATE TABLE IF NOT EXISTS tblUsuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, cedula TEXT, nombre TEXT, pApe TEXT, sApe TEXT, contra TEXT, email TEXT)");
                            tx.executeSql("INSERT INTO tblUsuarios(cedula, nombre, pApe, sApe, contra, email) VALUES(?, ?, ?, ?, ?, ?)", [ced, nom, pApel, sApel, pass, corr], 
                                function(){alert("Usuario Registrado ");}, 
                                function(){alert("No se ha podido completar el registro")});  
                    })
                        
                    }
                    location.reload();
                }

            });
  }

