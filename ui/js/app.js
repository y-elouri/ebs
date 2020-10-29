import $ from 'jquery';
import { fromEvent, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as release from './release';


const deleteIcon = () => '<i class="fas fa-trash-alt"></i>';
const addIssueRow = issue => {
    const { id, dev, estimate } = issue;
    $('table').append(`
        <tr>
            <td>${id}</td>
            <td>${dev}</td>
            <td>${estimate}</td>
            <td>${deleteIcon()}</td>
        </tr>
    `);
};
release.issues().map(issue => addIssueRow(issue));

const release$ = new Observable();
const _release = release$.subscribe(v => {
    release.addIssue(v);
    addIssueRow(v);
});
let subs = [_release];

// TODO: try fromEventPattern
const issue$ = fromEvent($('form'), 'submit');
const _issue = issue$.subscribe(e => {
    e.preventDefault();
    const data = {};
    $('form').serializeArray().forEach(e => {
        data[e.name] = e.value;
    });
    _release.next(data);
    $('form').trigger('reset');
});
subs = [...subs, _issue];

const table$ = fromEvent($('table tr td'), 'click')
    .pipe(map(e => {
        let x = $.parseHTML(e.currentTarget);
        return {
            row: e.currentTarget.cellIndex,
            column: e.currentTarget.parentNode.sectionRowIndex
        };
    }));
const _table = table$.subscribe(target => {
    console.log(target);
});
subs = [...subs, _table];
