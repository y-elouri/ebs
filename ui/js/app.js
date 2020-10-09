import Tabulator from './vendor/tabulator.min';
import * as release from './release';

const deleteIcon = (cell, formatterParams, onRendered) => '<i class="fas fa-trash-alt"></i>';

const deleteRow = (e, cell) => {
    const id = cell.getRow().getData().id;
    release.deleteIssue(id);
    table.getRows().filter(row => {
        if (row.getData().id === id) {
            table.deleteRow(id);
        }
    });
};

const table = new Tabulator("#release", {
    data: release.issues(),
    resizableColumns: false,
    columns: [
        { title: "Issue", field: "id", editor:"input" },
        { title: "Dev", field: "dev" },
        { title: "Estimate", field: "estimate" },
        { formatter: deleteIcon, width: 40, hozAlign: "center", cellClick: deleteRow },
    ],
});
