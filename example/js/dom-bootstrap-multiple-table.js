'use strict';

$(document).ready(function () {
    var responsiveHelper = undefined;
    var breakpointDefinition = {
        tablet: 1024,
        phone : 480
    };
    var tableElement = $('table');

    tableElement.dataTable({
        sDom           : '<"row"<"span6"l><"span6"f>r>t<"row"<"span6"i><"span6"p>>',
        sPaginationType: 'bootstrap',
        oLanguage      : {
            sLengthMenu: '_MENU_ records per page'
        },
        bAutoWidth     : false,
        fnPreDrawCallback: function () {
            // Initialize the responsive datatables helper once.
            if (!this.data('responsiveHelper')) {
                this.data('responsiveHelper', new ResponsiveDatatablesHelper(this, breakpointDefinition));
            }
        },
        fnRowCallback  : function (nRow) {
            this.data('responsiveHelper').createExpandIcon(nRow);
        },
        fnDrawCallback : function (oSettings) {
            this.data('responsiveHelper').respond();
        }
    });
});
