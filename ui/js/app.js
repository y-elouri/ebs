import $ from 'jquery';
import { EMPTY, from, fromEvent, merge, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { addIssue, deleteIssue, issues } from './release';


const addIssueRow = issue => {
    const { id, dev, estimate } = issue;
    const row = $('<tr>');
    const deleteIcon = $('<i>').addClass('fas fa-trash-alt');
    row.append($('<td>').text(id));
    row.append($('<td>').text(dev));
    row.append($('<td>').text(estimate));
    row.append($('<td>').append(deleteIcon));
    $('#release tbody').append(row);
    $('#newIssue').trigger('reset');
};

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
).subscribe(addIssueRow);

fromEvent($('#release tbody'), 'click').pipe(
    map(e => {
        return {
            row: $(e.target.closest('td')).parent().index()+1,
            column: $(e.target.closest('td')).index()+1,
            id: $(e.target.closest('tr')).find(">:first-child").text()
        };
    })
).subscribe(r => {
    if (r.column === 4) {
        deleteIssue(r.id);
        $(`#release tbody tr:nth-of-type(${r.row})`).remove();
    }
});

