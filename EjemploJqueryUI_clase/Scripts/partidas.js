var count = 1;
var apuesta = 0;
var cartasDisponibles = 54;
var puntuacionUsuario=0; 
var puntuacionCrupier=0;
var cartasBarajas = new Array(52);
var cartasJugador = new Array(14);
var cartasCrupier = new Array(14);

window.onload = function () {
    insertarValores();
}

document.getElementById("botonApostar").onclick =

    function apostar() {

        seleccionarCarta(definirId(), 1, 'playerField');
        setTimeout(function () {
        seleccionarCarta(definirId(), 2, 'crupierField');
        }, 1000)
        
        ;
    }

function img_create(src) {
    var creationPosition = document.getElementById("imagenBaraja").getBoundingClientRect();
    var imgCreated = document.createElement("img");
    imgCreated.src = src; //La ruta será dinámica cargada desde la DB
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