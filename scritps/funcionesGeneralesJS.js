///Función que permite establecer los mensajes en 
///español para todas las validaciones de jqueryValidate
    $.extend($.validator.messages, {
        maxlength: $.validator.format("Favor ingrese {0} o menos caracteres"),
        minlength: $.validator.format("Favor ingrese al menos {0} caracteres"),
        required: $.validator.format("Valor Requerido"),
        url: "Debe ingresar una dirección web válida",
        rangelength: $.validator.format("Favor ingrese un valor entre {0} y {1} caracteres de longitud"),
        range: $.validator.format("Favor ingrese un valor entre {0} y {1}"),
        max: $.validator.format("Favor ingrese un valor menor o igual a: {0}"),
        min: $.validator.format("Favor ingrese un valor mayor o igual a: {0}"),
        number: "Favor ingrese un número válido",
        digits: "Favor ingrese solo números",
        email: "Favor ingrese una dirección de correo electrónico válida",
        accept: $.validator.format("Favor seleccione un formato válido {0}"),
        extension: $.validator.format("Favor seleccione un formato válido {0}"),
        require_from_group: $.validator.format("Ingrese al menos uno de estos valores")
    });

    ///Cambia los datos del jqeuryui datepicker a español
    $.datepicker.setDefaults(
        {
            dateFormat: "dd/mm/yy",
            timeFormat: "HH:mm",
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié;', 'Juv', 'Vie', 'Sáb'],
            dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
            weekHeader: 'Sm',
            currentText: 'Hoy',
            firstDay: 1,
            yearSuffix: '',
            fechaCR: true
        });