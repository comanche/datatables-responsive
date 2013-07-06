/**
 * Take a TR element and alter the table's paging to show the TR in question.
 * http://www.datatables.net/plug-ins/api
 * @param oSettings
 * @param nRow
 */
$.fn.dataTableExt.oApi.fnDisplayRow = function (oSettings, nRow) {
    // Account for the "display" all case - row is already displayed
    if (oSettings._iDisplayLength == -1) {
        return;
    }

    // Find the node in the table
    var iPos = -1;
    for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
        if (oSettings.aoData[ oSettings.aiDisplay[i] ].nTr == nRow) {
            iPos = i;
            break;
        }
    }

    // Alter the start point of the paging display
    if (iPos >= 0) {
        oSettings._iDisplayStart = ( Math.floor(i / oSettings._iDisplayLength) ) * oSettings._iDisplayLength;
        this.oApi._fnCalculateEnd(oSettings);
    }

    this.oApi._fnDraw(oSettings);
};