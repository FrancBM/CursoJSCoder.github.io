$(document).ready(function () {

    $("#myTable").dynamicTable({
        //Definimos las columnas iniciales    
        columns: [{
            text: "Name",
            key: "name"
        },
        {
            text: "Stock",
            key: "stock"
        },
        {
            text: "Brand",
            key: "brand"
        },
        {
            text: "S/N",
            key: "serialNumber"
        },
        ],

        //Carga de datos
        data: [{
            name: 'Laptop',
            stock: 30,
            brand: 'L',
            serialNumber: 'SDD22223SD'
        },
        {
            name: 'Mouse',
            stock: 24,
            brand: 'L',
            serialNumber: 'DFDD554D'
        },
        {
            name: 'Auricular',
            stock: 31,
            brand: 'J',
            serialNumber: '4545SDDF45'
        }
        ],

        //Definición de botones
        buttons: {
            addButton: '<input type="button" value="New" class="btn btn-success" />',
            cancelButton: '<input type="button" value="Cancel" class="btn btn-primary" />',
            deleteButton: '<input type="button" value="Delete" class="btn btn-danger" />',
            editButton: '<input type="button" value="Edit" class="btn btn-primary" />',
            saveButton: '<input type="button" value="Save" class="btn btn-success" />',
        },
        showActionColumn: true,

        //Condicionales
        getControl: function (columnKey) {
            if (columnKey == "stock") {
                return '<input type="number" class="form-control" />';
            }

            if (columnKey == "brand") {
                return '<select class="form-control"><option value="L">Lenovo</option><option value="J">Jabra</option></select>';
            }

            return '<input type="text" class="form-control" />';
        }
    });

    //Mostrar ocultar area de notificaciones
    $('.btn-Notification').on('click', function () {
        var ContainerNoty = $('.container-notifications');
        var NotificationArea = $('.NotificationArea');
        if (NotificationArea.hasClass('NotificationArea-show') && ContainerNoty.hasClass('container-notifications-show')) {
            NotificationArea.removeClass('NotificationArea-show');
            ContainerNoty.removeClass('container-notifications-show');
        } else {
            NotificationArea.addClass('NotificationArea-show');
            ContainerNoty.addClass('container-notifications-show');
        }
    });

    //Mostrar ocultar menu principal
    $('.btn-menu').on('click', function () {
        var navLateral = $('.navLateral');
        var pageContent = $('.pageContent');
        var navOption = $('.navBar-options');
        if (navLateral.hasClass('navLateral-change') && pageContent.hasClass('pageContent-change')) {
            navLateral.removeClass('navLateral-change');
            pageContent.removeClass('pageContent-change');
            navOption.removeClass('navBar-options-change');
        } else {
            navLateral.addClass('navLateral-change');
            pageContent.addClass('pageContent-change');
            navOption.addClass('navBar-options-change');
        }
    });

    //Salir del sistema
    $('.btn-exit').on('click', function () {
        swal({
            title: 'You want out of the system?',
            text: "The current session will be closed and will leave the system",
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, exit',
            closeOnConfirm: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    window.location = 'index.html';
                }
            });
    });

    //Mostrar y ocultar submenus
    $('.btn-subMenu').on('click', function () {
        var subMenu = $(this).next('ul');
        var icon = $(this).children("span");
        if (subMenu.hasClass('sub-menu-options-show')) {
            subMenu.removeClass('sub-menu-options-show');
            icon.addClass('zmdi-chevron-left').removeClass('zmdi-chevron-down');
        } else {
            subMenu.addClass('sub-menu-options-show');
            icon.addClass('zmdi-chevron-down').removeClass('zmdi-chevron-left');
        }
    });
});

(function ($) {
    'use strict';

    $(window).on("load", function () {
        $(".NotificationArea, .pageContent").mCustomScrollbar({
            theme: "dark-thin",
            scrollbarPosition: "inside",
            autoHideScrollbar: true,
            scrollButtons: { enable: true }
        });
        $(".navLateral-body").mCustomScrollbar({
            theme: "light-thin",
            scrollbarPosition: "inside",
            autoHideScrollbar: true,
            scrollButtons: { enable: true }
        });
    });

    //Animacion título
    window.onload = function () {
        var tl = new TimelineLite({ delay: 1 }),
            firstBg = document.querySelectorAll('.text__first-bg'),
            secBg = document.querySelectorAll('.text__second-bg'),
            word = document.querySelectorAll('.text__word');
        tl
            .to(firstBg, 0.2, { scaleX: 1 })
            .to(secBg, 0.2, { scaleX: 1 })
            .to(word, 0.1, { opacity: 1 }, "-=0.1")
            .to(firstBg, 0.2, { scaleX: 0 })
            .to(secBg, 0.2, { scaleX: 0 });
    }

    $.fn.dynamicTable = function (options) {
        var settings = $.extend({}, {
            showActionColumn: true,
            buttons: {
                addButton: '<input type="button" value="Add" class="btn btn-primary" />',
                cancelButton: '<input type="button" value="Cancel" class="btn btn-primary" />',
                deleteButton: '<input type="button" value="Delete" class="btn btn-danger" />',
                editButton: '<input type="button" value="Edit" class="btn btn-primary" />',
                saveButton: '<input type="button" value="Save" class="btn btn-success" />',
            },
            columns: [],
            data: [],
            getControl: function (columnKey) {
                return '<input type="text" class="form-control" />';
            },
        }, options);

        var populateActionButtons = function (tableRow, addButton, cancelButton, deleteButton, editButton, saveButton) {
            var showHideButtons = function (tableCell, localFlags) {
                var theButtons = {
                    cancelButton: $(tableCell).find('*[data-codeapi-cancelcommand]'),
                    deleteButton: $(tableCell).find('*[data-codeapi-deletecommand]'),
                    editButton: $(tableCell).find('*[data-codeapi-editcommand]'),
                    saveButton: $(tableCell).find('*[data-codeapi-savecommand]')
                };

                if (theButtons.cancelButton) {
                    if (localFlags.cancel) {
                        $(theButtons.cancelButton).show();
                    } else {
                        $(theButtons.cancelButton).hide();
                    }
                }

                if (theButtons.deleteButton) {
                    if (localFlags.delete) {
                        $(theButtons.deleteButton).show();
                    } else {
                        $(theButtons.deleteButton).hide();
                    }
                }

                if (theButtons.editButton) {
                    if (localFlags.edit) {
                        $(theButtons.editButton).show();
                    } else {
                        $(theButtons.editButton).hide();
                    }
                }

                if (theButtons.saveButton) {
                    if (localFlags.save) {
                        $(theButtons.saveButton).show();
                    } else {
                        $(theButtons.saveButton).hide();
                    }
                }
            };

            //Botones (action)
            var tableCell = $('<td class="mdl-data-table__cell--non-numeric"></td>');
            $(tableRow).append($(tableCell));

            if (saveButton) {
                var localButton = $($(saveButton).clone());
                $(localButton).attr('data-codeapi-savecommand', 'true');
                $(localButton).hide();
                $(tableCell).append(' ');
                $(tableCell).append($(localButton));

                $(localButton).click(function () {
                    $(this).parents('tr:first').find('*[data-codeapi-inputkey]').each(function () {
                        var inputControl = $(this);
                        var spanControl = $(inputControl).parent().find('span[data-codeapi-displaykey="' + $(inputControl).attr('data-codeapi-inputkey') + '"]');
                        $(spanControl).attr('data-codeapi-value', encodeURIComponent($(inputControl).val()));
                        if ($(inputControl).is('select')) {
                            $(spanControl).text($(inputControl).find('option:selected').text());
                        } else {
                            $(spanControl).text($(inputControl).val());
                        }

                        $(inputControl).hide();
                        $(spanControl).show();
                    });

                    showHideButtons($(tableCell), {
                        cancel: false,
                        delete: true,
                        edit: true,
                        save: false,
                    });
                });
            }

            if (editButton) {
                var localButton = $($(editButton).clone());
                $(localButton).attr('data-codeapi-editcommand', 'true');
                $(tableCell).append(' ');
                $(tableCell).append($(localButton));

                $(localButton).click(function () {
                    $(this).parents('tr:first').find('*[data-codeapi-inputkey]').each(function () {
                        var inputControl = $(this);
                        var spanControl = $(inputControl).parent().find('span[data-codeapi-displaykey="' + $(inputControl).attr('data-codeapi-inputkey') + '"]');

                        $(inputControl).val(decodeURIComponent($(spanControl).attr('data-codeapi-value')));

                        $(inputControl).show();
                        $(spanControl).hide();
                    });

                    showHideButtons($(tableCell), {
                        cancel: true,
                        delete: false,
                        edit: false,
                        save: true,
                    });
                });
            }

            if (deleteButton) {
                var localButton = $($(deleteButton).clone());
                $(localButton).attr('data-codeapi-deletecommand', 'true');
                $(tableCell).append(' ');
                $(tableCell).append($(localButton));

                $(localButton).click(function () {
                    var table = $(this).parents("table:first");
                    $(this).parents('tr:first').replaceWith('');
                    resetSrNoColumn(table);
                });
            }

            if (cancelButton) {
                var localButton = $($(cancelButton).clone());
                $(localButton).attr('data-codeapi-cancelcommand', 'true');
                $(localButton).hide();
                $(tableCell).append(' ');
                $(tableCell).append($(localButton));

                $(localButton).click(function () {
                    $(this).parents('tr:first').find('*[data-codeapi-inputkey]').each(function () {
                        var inputControl = $(this);
                        var spanControl = $(inputControl).parent().find('span[data-codeapi-displaykey="' + $(inputControl).attr('data-codeapi-inputkey') + '"]');

                        $(inputControl).val(decodeURIComponent($(spanControl).attr('data-codeapi-value')));

                        $(inputControl).hide();
                        $(spanControl).show();
                    });

                    showHideButtons($(tableCell), {
                        cancel: false,
                        delete: true,
                        edit: true,
                        save: false,
                    });
                });
            }
        };

        var resetSrNoColumn = function (table) {
            $(table).find("td[data-codeapi-srno]").not(':first').each(function (index, element) {
                $(this).text((index + 1));
            });
        };

        return this.each(function () {
            var addButton = settings.buttons.addButton;
            var cancelButton = settings.buttons.cancelButton;
            var deleteButton = settings.buttons.deleteButton;
            var editButton = settings.buttons.editButton;
            var saveButton = settings.buttons.saveButton;

            var $this = $(this);
            $this.empty();

            //Cabecera de la tabla
            var tableRow = $('<tr class="mdl-data-table__cell--non-numeric"></tr>');
            $this.append($(tableRow));

            var tableCell = $('<th>#</th>');
            $(tableRow).append($(tableCell));

            //Texto
            for (var x = 0; x < settings.columns.length; x++) {
                tableCell = $('<th class="mdl-data-table__cell--non-numeric">' + settings.columns[x].text + '</th>');
                $(tableRow).append($(tableCell));
            }

            if (settings.showActionColumn) {
                tableCell = $('<th class="mdl-data-table__cell--non-numeric">Action</th>');
                $(tableRow).append($(tableCell));
            }

            if (settings.showActionColumn) {
                //Fila de input
                tableRow = $('<tr></tr>');
                $this.append($(tableRow));

                tableCell = $('<td data-codeapi-srno="0"></td>');
                $(tableRow).append($(tableCell));

                for (var x = 0; x < settings.columns.length; x++) {
                    tableCell = $('<td class="mdl-data-table__cell--non-numeric"></td>');
                    $(tableRow).append($(tableCell));

                    var inputControl = $(settings.getControl(settings.columns[x].key));
                    $(inputControl).attr('data-codeapi-inputkey', settings.columns[x].key);
                    $(inputControl).attr('data-codeapi-defaultvalue', $(inputControl).val());
                    $(tableCell).append($(inputControl));
                }

                if (addButton) {
                    tableCell = $('<td class="mdl-data-table__cell--non-numeric"></td>');
                    $(tableRow).append($(tableCell));

                    var localButton = $($(addButton).clone());
                    $(tableCell).append(' ');
                    $(tableCell).append($(localButton));

                    $(localButton).click(function () {
                        var table = $(this).parents("table:first");
                        var currentRow = $(this).parents('tr:first');
                        var newRow = $('<tr></tr>');
                        $(table).append($(newRow));

                        var newTableCell = $('<td data-codeapi-srno="0"></td>');
                        $(newRow).append($(newTableCell));

                        //Agregar celdas
                        currentRow.find('td').not(':first,:last').each(function () {
                            var tableCell = $(this);
                            var key = $(tableCell).find('*[data-codeapi-inputkey]').attr('data-codeapi-inputkey');
                            var newTableCell = $('<td class="mdl-data-table__cell--non-numeric"></td>');
                            $(newRow).append($(newTableCell));
                            var currentInput = $(tableCell).find('*[data-codeapi-inputkey]');
                            var inputControl = $(currentInput).clone();
                            $(inputControl).val($(currentInput).val());
                            $(inputControl).hide();
                            $(newTableCell).append($(inputControl));

                            var spanControl = $('<span></span>');
                            $(spanControl).attr('data-codeapi-displaykey', key);
                            $(spanControl).attr('data-codeapi-value', encodeURIComponent($(inputControl).val()));
                            if ($(inputControl).is("select")) {
                                $(spanControl).text($(inputControl).find('option:selected').text());
                            } else {
                                $(spanControl).text($(inputControl).val());
                            }
                            $(newTableCell).append($(spanControl));

                            $(currentInput).val($(currentInput).attr('data-codeapi-defaultvalue'));
                        });

                        if (settings.showActionColumn) {
                            populateActionButtons(newRow, addButton, cancelButton, deleteButton, editButton, saveButton);
                        }

                        resetSrNoColumn($(table));
                    });
                } else {
                    tableCell = $('<td class="mdl-data-table__cell--non-numeric">&nbsp;</td>');
                    $(tableRow).append($(tableCell));
                }
            }

            //Datos de filas
            for (var x = 0; x < settings.data.length; x++) {
                tableRow = $('<tr></tr>');
                $this.append($(tableRow));

                tableCell = $('<td data-codeapi-srno="' + (x + 1) + '">' + (x + 1) + '</td>');
                $(tableRow).append($(tableCell));

                for (var y = 0; y < settings.columns.length; y++) {
                    tableCell = $('<td class="mdl-data-table__cell--non-numeric"></td>');
                    $(tableRow).append($(tableCell));

                    var inputControl = $(settings.getControl(settings.columns[y].key));
                    $(inputControl).attr('data-codeapi-inputkey', settings.columns[y].key);
                    $(inputControl).val(settings.data[x][settings.columns[y].key]);
                    $(inputControl).hide();
                    $(tableCell).append($(inputControl));

                    var spanControl = $('<span></span>');
                    $(spanControl).attr('data-codeapi-displaykey', settings.columns[y].key);
                    $(spanControl).attr('data-codeapi-value', encodeURIComponent($(inputControl).val()));
                    if ($(inputControl).is("select")) {
                        $(spanControl).text($(inputControl).find('option:selected').text());
                    } else {
                        $(spanControl).text($(inputControl).val());
                    }
                    $(tableCell).append($(spanControl));
                }

                if (settings.showActionColumn) {
                    populateActionButtons(tableRow, addButton, cancelButton, deleteButton, editButton, saveButton);
                }
            }
        });
    };

    $.fn.getTableData = function () {
        var data = [];

        $(this).find("tr").each(function () {
            if ($(this).find('span[data-codeapi-displaykey]').length > 0) {
                var objModel = {};

                $(this).find('span[data-codeapi-displaykey]').each(function () {
                    var key = 'data-codeapi-displaykey';
                    var valueKey = 'data-codeapi-value';
                    objModel[$(this).attr(key)] = decodeURIComponent($(this).attr(valueKey));
                });

                data.push(objModel);
            }
        });

        return data;
    };

})(jQuery);

//Búsqueda
function searchTable() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}
