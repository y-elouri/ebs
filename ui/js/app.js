import $ from 'jquery';
import { EMPTY, from, fromEvent, merge, of, partition } from 'rxjs';
import { catchError, map, pluck, switchMap, tap } from 'rxjs/operators';

import { addIssue, deleteIssue, issues } from './release';


const addRow = issue => {
    const { id, dev, estimate } = issue;
    const row = $('<tr>');
    const cell = () => $('<td>').attr('data-type', 'model');
    const deleteIcon = $('<i>').addClass('fas fa-trash-alt');
    row.append(cell().text(id));
    row.append(cell().text(dev));
    row.append(cell().text(estimate));
    row.append($('<td>').append(deleteIcon));
    $('#release tbody').append(row);
    $('#newIssue').trigger('reset');
};

const deleteRow = row => $(`#release tbody tr:nth-of-type(${row})`).remove();

merge(
    from(issues()),
    fromEvent($('#newIssue'), 'submit').pipe(
        map(e => {
            e.preventDefault();
            const issue = {};
            $(e.currentTarget).serializeArray().forEach(e => {
                issue[e.name] = e.value;
            });
            return issue;
        }),
        switchMap(issue => of(issue).pipe(
            tap(addIssue),
            catchError(error => {
                console.log(error);
                return EMPTY;
            })
        ))
    )
).subscribe(addRow);

const [edit$, delete$] = partition(
    fromEvent($('#release tbody'), 'click'),
    e => $(e.target.closest('td')).attr('data-type') === 'model');

delete$.pipe(
    map(e =>  {
        return {
            row: $(e.target.closest('td')).parent().index()+1,
            id: $(e.target.closest('tr')).find(">:first-child").text()
        };
    }),
    tap(r => deleteIssue(r.id)),
    pluck('row')
).subscribe(deleteRow);

edit$.pipe(
    map(e => {
        return {
            row: $(e.target.closest('td')).parent().index()+1,
            column: $(e.target.closest('td')).index()+1,
            id: $(e.target.closest('tr')).find(">:first-child").text()
        };
    })
).subscribe(console.log);
