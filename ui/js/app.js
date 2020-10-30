import $ from 'jquery';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';

import { addIssue, deleteIssue, issues$ } from './release';


const deleteIcon = () => '<i class="fas fa-trash-alt"></i>';
const addIssueRow = issue => {
    const { id, dev, estimate } = issue;
    let row = $('<tr>');
    row.append($('<td>').text(id));
    row.append($('<td>').text(dev));
    row.append($('<td>').text(estimate));
    row.append($('<td>').append(deleteIcon()));
    $('#release tbody').append(row);
};

issues$.subscribe(issue => {
    addIssueRow(issue);
});

[
    { id:"#1", dev:"a", estimate: 3 },
    { id:"#2", dev:"a", estimate: 4 },
    { id:"#3", dev:"a", estimate: 8 },
    { id:"#4", dev:"a", estimate: 12 },
    { id:"#5", dev:"b", estimate: 5 },
    { id:"#6", dev:"b", estimate: 7 },
    { id:"#7", dev:"b", estimate: 4 },
    { id:"#8", dev:"b", estimate: 2 },
    { id:"#9", dev:"c", estimate: 16 },
    { id:"#10", dev:"c", estimate: 10 },
].forEach(addIssue)

fromEventPattern((handler) => $('#newIssue').on('submit', handler)).pipe(
    map(e => {
        e.preventDefault();
        const issue = {};
        $('#newIssue').serializeArray().forEach(e => {
            issue[e.name] = e.value;
        });
        return issue;
    })
).subscribe(issue => {
    addIssue(issue);
    $('#newIssue').trigger('reset');
});

const table$ = fromEventPattern((handler) => $('#release tbody').on('click', handler)).pipe(
    map(e => {
        return {
            row: $(e.target.closest('td')).parent().index()+1,
            column: $(e.target.closest('td')).index()+1,
            id: $(e.target.closest('tr')).find(">:first-child").text()
        };
    })
);

table$.subscribe(r => {
    if (r.column === 4) {
        deleteIssue(r.id);
        $(`#release tbody tr:nth-of-type(${r.row})`).remove();
    }
});
