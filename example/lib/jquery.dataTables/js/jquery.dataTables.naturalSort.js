/**
 * Natural sort.
 * http://www.datatables.net/plug-ins/sorting
 */
(function () {
    /**
     * Alpha-Numeric Sort
     *
     * Source: http://my.opera.com/GreyWyvern/blog/show.dml/1671288
     *
     * @param {String} a
     * @param {String} b
     * @returns {number}
     */
    function naturalSort(a, b) {
        function chunkify(t) {
            var tz = [], x = 0, y = -1, n = 0, i, j;

            while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                var m = (i == 46 || (i >= 48 && i <= 57));
                if (m !== n) {
                    tz[++y] = "";
                    n = m;
                }
                tz[y] += j;
            }
            return tz;
        }

        var aa = chunkify(a);
        var bb = chunkify(b);

        for (x = 0; aa[x] && bb[x]; x++) {
            if (aa[x] !== bb[x]) {
                var c = Number(aa[x]), d = Number(bb[x]);
                if (c == aa[x] && d == bb[x]) {
                    return c - d;
                } else return (aa[x] > bb[x]) ? 1 : -1;
            }
        }
        return aa.length - bb.length;
    }

    jQuery.extend(jQuery.fn.dataTableExt.oSort, {
        "natural-asc": function (a, b) {
            return naturalSort(a, b);
        },

        "natural-desc": function (a, b) {
            return naturalSort(a, b) * -1;
        }
    });

}());