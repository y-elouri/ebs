import Tabulator from './vendor/tabulator.min';
import $ from './vendor/jquery-3.5.1.min';
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

const addIssueForm = () => {
    return `<form>
                <input type="text" name="id" required>
                <input type="text" name="dev" required>
                <input type="number" name="estimate" min="0" required>
                <button type="submit">+</button>
            </form>
    `;
};

const addIssue = ({ id, dev, estimate }) => {
    release.addIssue({ id, dev, estimate });
    table.addData({ id, dev, estimate });
};

const table = new Tabulator("#release", {
    data: release.issues(),
    resizableColumns: false,
    columns: [
        { title: "Issue", field: "id", editor:"input" },
        { title: "Dev", field: "dev" },
        { title: "Estimate", field: "estimate", editor:"number", editorParams:{ min: 0 } },
        { formatter: deleteIcon, width: 40, hozAlign: "center", cellClick: deleteRow },
    ],
    footerElement: addIssueForm()
});

$('form').submit((e) => {
    e.preventDefault();
    const data = {};
    $('form').serializeArray().forEach(e => {
        data[e.name] = e.value;
    });
    addIssue(data);
    $('form').trigger('reset');
});
