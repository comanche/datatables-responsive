# datatables-responsive

## Introduction
[Datatables][1] is hands down the best [jQuery][2] table plugin.  I have enjoyed using it over the years and highly recommend it to all.  Recently, I have tried to use Datatables in an responsive web project.  Datatables did everything brilliantly but was not responsive.  After some research, I found [FooTable][3] which handles the responsive behavior perfectly.  After tinkering around, I've come up with something that helps make Datatables respond like FooTable.

Complete working [examples][4] are provided using [Bootstrap][5].  You may use any front-end framework you prefer.

Below are the instructions on how to use the helper.

## Add Viewport Meta Tag For Mobile Support

Add the following viewport meta tag to your HTML's head section:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Include CSS files

Add Bootstrap, Datatables-Bootstrap and responsive Datatables helper CSS files.

**DataTables 1.9.x and Bootstrap 3.x**

```html
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css"/>
<link rel="stylesheet" href="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.css"/>
<link rel="stylesheet" href="../../files/1/css/datatables.responsive.css"/>
```
If you are using Bootstrap 2, see the `ajax-bootstrap2.html` example.

**DataTables 1.10.x and Bootstrap 3.x**

```html
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css"/>
<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap-theme.min.css"/>
<link rel="stylesheet" href="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.css"/>
<link rel="stylesheet" href="../../files/2/css/datatables.responsive.css"/>
```


For more information on Datatables and Bootstrap 2, see
[http://www.datatables.net/blog/Twitter_Bootstrap][6]
[http://www.datatables.net/blog/Twitter_Bootstrap_2][7]

For Bootstrap 3, see
[https://github.com/DataTables/Plugins/tree/master/integration/bootstrap/3][8]

## Include JS files

Add jQuery, Datatables, Datables-Bootstrap and the responsive Datatables helper scripts.

**DataTables 1.9.x and Bootstrap 3.x**

```html
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="//cdn.datatables.net/1.9.4/js/jquery.dataTables.min.js"></script>
<script src="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.js"></script>
<script src="../../files/1/js/datatables.responsive.js"></script>
```
**DataTables 1.10.x and Bootstrap 3.x**

```html
<script src="//code.jquery.com/jquery.min.js"></script>
<script src="//cdn.datatables.net/1.10.0/js/jquery.dataTables.min.js"></script>
<script src="//cdn.datatables.net/plug-ins/e9421181788/integration/bootstrap/3/dataTables.bootstrap.js"></script>
<script src="../../files/2/js/datatables.responsive.js"></script>
```

## Create variables and break point definitions.

```javascript
var responsiveHelper;
var breakpointDefinition = {
    tablet: 1024,
    phone : 480
};
var tableElement = $('#example');
```


## Create Datatables Instance
Create the datatables instance with the following

### DataTables 1.9.x

- Set `bAutoWidth` to `false`.
- Set `fnPreDrawCallback` to only initialize the responsive datatables helper once
- Set `fnRowCallback` to create expand icon.
- Set `fnDrawCallback` to respond to window `resize` events.

**DataTables 1.9.x and Responsive Helper Initialization**

```javascript
tableElement.dataTable({

    // Setup for Bootstrap support.
    sPaginationType  : 'bootstrap',
    oLanguage        : {
        sLengthMenu: '_MENU_ records per page'
    },

    // Setup for responsive datatables helper.
    bAutoWidth       : false,
    fnPreDrawCallback: function () {
        // Initialize the responsive datatables helper once.
        if (!responsiveHelper) {
            responsiveHelper = new ResponsiveDatatablesHelper(tableElement, breakpointDefinition);
        }
    },
    fnRowCallback  : function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        responsiveHelper.createExpandIcon(nRow);
    },
    fnDrawCallback : function (oSettings) {
        responsiveHelper.respond();
    }

});
```

### DataTables 1.10.x

- Set `autoWidth` to `false`.
- Set `preDrawCallback` to only initialize the responsive datatables helper once
- Set `rowCallback` to create expand icon.
- Set `drawCallback` to respond to window `resize` events.

**DataTables 1.10.x and Responsive Helper Initialization**

```javascript
tableElement.dataTable({
    autoWidth        : false,
    preDrawCallback: function () {
        // Initialize the responsive datatables helper once.
        if (!responsiveHelper) {
            responsiveHelper = new ResponsiveDatatablesHelper(tableElement, breakpointDefinition);
        }
    },
    rowCallback    : function (nRow) {
        responsiveHelper.createExpandIcon(nRow);
    },
    drawCallback   : function (oSettings) {
        responsiveHelper.respond();
    }
});
```


## Add Data Attributes to the Table Elements
- Add the `data-class="expand"` attribute to the `th` element for the respective column that will you want to display the expand icon in.  The `th` element cannot be for a column that will be hidden.

- Add `data-hide="phone,tablet"` to the `th` element for the respective column that will you want to hide when the window is resized.

- Add `data-name="Hidden Column Name"` to the `th` element for the respective column that will you would like its label to be set to when hidden.

```html
<div class="span12">
    <table id="example" cellpadding="0" cellspacing="0" border="0" class="table table-bordered table-striped">
        <!--thead section is required-->
        <thead>
        <tr>
            <th class="centered-cell"><input type="checkbox" id="masterCheck" class="checkbox"/></th>
            <th data-class="expand">Rendering engine</th>
            <th>Browser</th>
            <th data-hide="phone" data-name="Plat">Platform(s)</th>
            <th data-hide="phone,tablet" data-name="Eng Ver">Engine version</th>
            <th data-hide="phone,tablet" data-name="CSS Grd">CSS grade</th>
        </tr>
        </thead>
        <!--tbody section is required-->
        <tbody></tbody>
        <!--tfoot section is optional-->
        <tfoot>
        <tr>
            <th></th>
            <th>Engine</th>
            <th>Browser</th>
            <th>Platform(s)</th>
            <th>Engine version</th>
            <th>CSS grade</th>
        </tr>
        </tfoot>
    </table>

</div>
```

That's it!

To see a working example, look in the `example` folder of the repository.

## How to Always Keep a Column Hidden
If you want to always keep a column hidden, add the `data-hide="always"` attribute to that column's `th` element.  Note that the `always` breakpoint is reserved.

## Destroying and Recreating a Data Table on the Same Element
If you need to destroy and recreate a data table on the same table element, see the `ajax-bootstrap-recreate-table.html` example.

## Initializing Multiple Data Tables
Each data table instance needs its own instance of a responsive helper.  If you are initializing multiple tables using a single jQuery wrapped set, see the `dom-bootstrap-multiple-table.html` example.

## Options
The responsive helper supports options via a third parameter in the constructor like this:
```javascript
var tableElement = $('myTable');
var breakpointDefinition  = { /* Break points here */ };
var responsiveHelper;
// ...
responsiveHelper = new ResponsiveDatatablesHelper(tableElement, breakpointDefinition, {
   hideEmptyColumnsInRowDetail: true
});
```

Currently supported options are:

`hideEmptyColumnsInRowDetail`

- Type: `Boolean`
- Default: `false`
- In responsive mode, clicking on the expand icon will only show hidden columns that actually have content.

`clickOn`

- Type: `String`
- Acceptable values: `icon`, `cell` or `row`
- Default: `icon`

`showDetail`

- Type: `Function`
- Default: null
- Function called when the detail row has been shown.  Passes the jquery tr object for the detail row as an argument.

`hideDetail`

- Type: `Function`
- Default: null
- Function called when the detail row is going to be hidden.  Passes the jquery tr object for the detail row as an argument.

## Thanks
Thanks to Allan Jardine for making the best data table plugin for jQuery.  Nothing out there comes close.

Thanks to Brad Vincent and his friend Steve for making the awesome responsive [FooTable][9].  In my opinion, their implementation for a responsive table is the best to date.  Much of what I have done here is borrowed from FooTable.  Thanks again!


  [1]: http://datatables.net/
  [2]: http://jquery.com/
  [3]: http://themergency.com/footable/
  [4]: https://github.com/Comanche/datatables-responsive/tree/master/examples
  [5]: http://getbootstrap.com/
  [6]: http://www.datatables.net/blog/Twitter_Bootstrap
  [7]: http://www.datatables.net/blog/Twitter_Bootstrap_2
  [8]: https://github.com/DataTables/Plugins/tree/master/integration/bootstrap/3
  [9]: https://github.com/bradvin/FooTable
