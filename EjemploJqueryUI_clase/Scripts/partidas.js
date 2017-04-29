var count = 1;
var apuestaRealizada = 0;
var cartasDisponibles = 52;
var puntuacionUsuario=0; 
var puntuacionCrupier=0;
var cartasJugador = new Array();
var cartasCrupier = new Array();

$(function () {
    creaReglasvalidacion();
});

window.onload = function () {
    insertarValores();
}

document.getElementById("botonApostar").onclick =

    function apostar() {

        seleccionarCarta(definirId(), 1, 'playerField');
        setTimeout(function () {
            seleccionarCarta(definirId(), 2, 'crupierField');
        }, 1000);
        setTimeout(function() {
            if (puntuacionUsuario === 21) {
                if (cartasJugador.length < 3) {
                    alert("Dos cartas");
                    apuestaRealizada = apuestaRealizada * 2.5;
                } else {
                    alert("más cartas");
                    apuestaRealizada = apuestaRealizada * 2;
                }
                alert("¡Has ganado: $" + apuestaRealizada + "!");
                borrarPartidaGuardada();
                location.reload();
            } else if (puntuacionUsuario > 21) {
                alert("Has perdido...");
                borrarPartidaGuardada();
                location.reload();
            } else if (puntuacionCrupier > 21) {
                apuestaRealizada = apuestaRealizada * 2;
                alert("¡Has ganado: $" + apuestaRealizada + "!");
                borrarPartidaGuardada();
                location.reload();
            } else if (puntuacionCrupier === 21) {
                alert("Has perdido...");
                borrarPartidaGuardada();
                location.reload();
            }
        }, 2000)

        cartasDisponibles = cartasDisponibles-2;
        document.getElementById("cartasDisponibles").innerHTML = "Cartas Disponibles: " + cartasDisponibles;
        
        
        
    }

function img_create(src) {
    var creationPosition = document.getElementById("imagenBaraja").getBoundingClientRect();
    var imgCreated = document.createElement("img");
    imgCreated.src = src;
    imgCreated.setAttribute("height", "200");
    imgCreated.setAttribute("width", "130");
    imgCreated.setAttribute("class", "cartaSuperpuesta");
    imgCreated.setAttribute("id", "ImgAnimated")
    imgCreated.style.top = creationPosition.top + 'px';
    imgCreated.style.left = creationPosition.left + 'px';
    document.getElementById("tablero").appendChild(imgCreated);
    return imgCreated;
    
}

function borrarElemento(id) {
    setTimeout(function () {
        document.getElementById(id).setAttribute("src", document.getElementById("ImgAnimated").getAttribute('src'));
        $("#ImgAnimated").remove();
    }, 1000);
}
function animacion(element, type) {
    switch (type) {
        case 1:
            var offset = $('#playerField').offset();

            $('#ImgAnimated').animate({
                top: offset.top,
                left: offset.left
            });
            break;
        case 2:
            var offset = $('#crupierField').offset();

            $('#ImgAnimated').animate({
                top: offset.top,
                left: offset.left
            });
            break;
    }

}
function definirId() {
    var id = numAlea();
    return id;
}

function numAlea() {
    var numAlea = Math.floor((Math.random() * (52 - 1))) + 1;
    while (cartasJugador.indexOf(numAlea) !== -1 || cartasCrupier.indexOf(numAlea) !== -1) {
        numAlea = Math.floor((Math.random() * (52 - 1))) + 1;
    }
    return numAlea;

}

function seleccionarCarta(id, type, deleted) {
    if (!window.openDatabase) {
        alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
    } else {
        
        var db = openDatabase("BlackJackLocalDB", "1.0", "BlackJackLocalDB", 3 * 1024);
        db.transaction(function (tx) {
            tx.executeSql("Select id, src, valor From tblCartas Where id = ?", [id],
                function (tx, salida) {
                    try {
                        var row = salida.rows.item(0);
                        var salida = row['valor'];
                        animacion(img_create(row['src']), type);
                        borrarElemento(deleted);
                       switch (type) {
                            case 1:
                                cartasJugador.push(row['id']);
                                puntuacionUsuario += salida;
                                document.getElementById("puntuacionJugador").innerHTML="Puntuacion del Jugador: " + puntuacionUsuario;
                                break;
                            case 2:
                                cartasCrupier.push(row['id']);
                                puntuacionCrupier += salida;
                                document.getElementById("puntuacionCrupier").innerHTML="Puntuacion del Crupier: " + puntuacionCrupier;
                                break;
                        }
                    } catch (err) {
                        alert("La carta no existe");
                    }
                },
                function () { alert("Error inesperado") });
        })
       
    }
}
    function insertarValores() {
        if (!window.openDatabase) {
            alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
        } else {
            
            var db = openDatabase("BlackJackLocalDB", "1.0", "BlackJackLocalDB", 3 * 1024);
            db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS tblCartas(id INTEGER PRIMARY KEY AUTOINCREMENT, src TEXT, valor INTEGER)");
                tx.executeSql("SELECT * FROM tblCartas", [], function (tx, salida) {
                    try {
                        var row = salida.rows.item(0);
                    } catch (err) {
                        
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/10_corazon.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/10_diamante.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/10_PICAS.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/10_TREBOL.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/2_corazon.GIF', 2],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/2_diamante.GIF', 2],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/2_PICAS.GIF', 2],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/2_TREBOL.GIF', 2],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/3_corazon.GIF', 3],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/3_diamante.GIF', 3],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/3_PICAS.GIF', 3],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/3_TREBOL.GIF', 3],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/4_corazon.GIF', 4],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/4_diamante.GIF', 4],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/4_PICAS.GIF', 4],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/4_TREBOL.GIF', 4],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/5_corazon.GIF', 5],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/5_diamante.GIF', 5],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/5_PICAS.GIF', 5],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/5_TREBOL.GIF', 5],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/6_corazon.GIF', 6],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/6_diamante.GIF', 6],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/6_PICAS.GIF', 6],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/6_TREBOL.GIF', 6],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/7_corazon.GIF', 7],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/7_diamante.GIF', 7],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/7_PICAS.GIF', 7],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/7_TREBOL.GIF', 7],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/8_corazon.GIF', 8],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/8_diamante.GIF', 8],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/8_PICAS.GIF', 8],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/8_TREBOL.GIF', 8],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/9_corazon.GIF', 9],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/9_diamante.GIF', 9],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/9_PICAS.GIF', 9],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/9_TREBOL.GIF', 9],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/As_corazon.GIF', 11],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/As_diamante.GIF', 11],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/As_PICAS.GIF', 11],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/As_TREBOL.GIF', 11],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/J_corazon.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/J_diamante.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/J_PICAS.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/J_TREBOL.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/K_corazon.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/K_diamante.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/K_PICAS.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/K_TREBOL.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/Q_corazon.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/Q_diamante.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/Q_PICAS.GIF', 10],
                            function () { },
                            function () { });
                        tx.executeSql("INSERT INTO tblCartas(src, valor) VALUES(?, ?)", ['../imagenes/Q_TREBOL.GIF', 10],
                            function () { },
                            function () { });
                    }
                },
                    function () { alert("Ha ocurrido un error inesperado") })
               
            })

        }
}

    /////// se encarga de crear las validacion del form
    function creaReglasvalidacion() {
        $("#frmApuesta").validate({
            rules: {
                apuesta: {
                    required: true,
                    number: true,
                },
            },
            messages: {
                apuesta: {
                    required:"No puede continuar si no ingresa una apuesta",
                    number: "Por favor ingrese solo numeros",
                     },
            },
            submitHandler: function (form) {
                var hide = document.getElementById("formulario");
                var show = document.getElementById("Juego");
                hide.style.display= 'none';
                show.style.display = 'inline-block';
                var cantidadAApostar = parseInt(document.getElementById("apuesta").value);
                apuestaRealizada = cantidadAApostar;
                setTimeout(function () {
                    seleccionarCarta(definirId(), 1, 'playerField');
                    setTimeout(function () {
                        seleccionarCarta(definirId(), 2, 'crupierField');
                    }, 1000);
                }, 400);
                cartasDisponibles = cartasDisponibles - 2;
                document.getElementById("cartasDisponibles").innerHTML = "Cartas Disponibles: " + cartasDisponibles;
            }
        })
    }

document.getElementById("retirarse").onclick = function retirarse() {

    borrarPartidaGuardada();
    if (puntuacionUsuario > puntuacionCrupier) {
            apuestaRealizada = apuestaRealizada * 2;
            alert("¡Has ganado: $" + apuestaRealizada + "!");
    } else if (puntuacionCrupier > puntuacionUsuario) {
        alert("Has perdido...");
    } else {
        alert("¡Empate! Recuperas la apuesta: $" + apuestaRealizada);
    }
    location.reload();
    }
document.getElementById("guardar").onclick = function guardar() {
    GuardarValores();
}
function GuardarValores() {
    var srcJugador = document.getElementById("playerField").getAttribute("src");
    var srcCrupier = document.getElementById("crupierField").getAttribute("src");
    if (localStorage) {
        localStorage.clear();
        for (i = 0; i < cartasJugador.length; i++) {
            if (cartasJugador[i] !== null);
            localStorage.setItem('\'' + i + 'J\'', '\'' + cartasJugador[i] + '\'');
            if (cartasCrupier[i] !== null);
            localStorage.setItem('\'' + i + 'C\'', '\'' + cartasCrupier[i] + '\'');

        };
    } else {
        alert("Local Storage no soportado");
    }
    if (!window.openDatabase) {
        alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
    } else {

        var db = openDatabase("BlackJackLocalDB", "1.0", "BlackJackLocalDB", 3 * 1024);
        db.transaction(function (tx) {
            tx.executeSql("CREATE TABLE IF NOT EXISTS tblPartidas(id INTEGER PRIMARY KEY AUTOINCREMENT, srcJugador TEXT, srcCrupier TEXT, apuesta INTEGER, puntuacionJugador INTEGER, PuntuacionCrupier INTEGER, cartasDisponibles INTEGER)", [],
                function () {},
                function () { alert("Imposible crear la tabla"); });

            try {
                tx.executeSql("DELETE FROM tblPartidas");
            } catch (err) {

            }

            tx.executeSql("INSERT INTO tblPartidas(srcJugador, srcCrupier, apuesta, puntuacionJugador, PuntuacionCrupier, cartasDisponibles) VALUES(?, ?, ?, ?, ?, ?)", [srcJugador, srcCrupier, apuestaRealizada, puntuacionUsuario, puntuacionCrupier, cartasDisponibles],
                function () { alert("Partida Guardada"); location.reload(); },
                function () { alert("Ocurrió un error al guardar la información, inténtelo de nuevo");});
        })

    }
}

document.getElementById("cargar").onclick = function CargarValores() {
    if (!window.openDatabase) {
        alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
    } else {
        var db = openDatabase("BlackJackLocalDB", "1.0", "BlackJackLocalDB", 3 * 1024);
        db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM tblPartidas", [], function(tx, salida) {
                try {
                    var row = salida.rows.item(0);
                    apuestaRealizada = row['apuesta'];
                    cartasDisponibles = row['cartasDisponibles'];
                    puntuacionUsuario = row['puntuacionJugador'];
                    puntuacionCrupier = row['PuntuacionCrupier'];
                    srcPlayer = row['srcJugador'];
                    srcCru = row['srcCrupier'];
                    var hide = document.getElementById("formulario");
                    var show = document.getElementById("Juego");
                    hide.style.display = 'none';
                    show.style.display = 'inline-block';
                    document.getElementById("cartasDisponibles").innerHTML = "Cartas disponibles: " + cartasDisponibles;
                    document.getElementById("puntuacionJugador").innerHTML = "Puntuacion Jugador: " + puntuacionUsuario;
                    document.getElementById("puntuacionCrupier").innerHTML = "Puntuacion Crupier: " + puntuacionCrupier;
                    document.getElementById("playerField").setAttribute("src", srcPlayer);
                    document.getElementById("crupierField").setAttribute("src", srcCru);

                    if (localStorage) {
                        for (i = 0; i < localStorage.length/2; i++) {
                            cartasJugador[i] = localStorage.getItem('\'' + i + 'J\'');
                            cartasCrupier[i] = localStorage.getItem('\'' + i + 'C\'');

                        };
                    } else {
                        alert("Local Storage no soportado");
                    }
                } catch (err) {
                    alert("No existen partidas guardadas: ");
                }
            }, function () {
                alert("Fallo en la carga de datos");
            });
        })
    }
      
}

function borrarPartidaGuardada() {
    if (!window.openDatabase) {
        alert("Tu navegador no tiene soporte para Web Sql, por favor utiliza otro para realizar el registro de usuario");
    } else {
        var db = openDatabase("BlackJackLocalDB", "1.0", "BlackJackLocalDB", 3 * 1024);
        db.transaction(function (tx) {
            try {
                tx.executeSql("DELETE FROM tblPartidas");
            } catch (err) {

            }
        })
    }

    if (localStorage) {
        localStorage.clear();
    } else {
        alert("Local Storage no soportado");
    }
}