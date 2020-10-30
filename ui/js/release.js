import { Subject } from "rxjs";

let release = [];

const _issues = new Subject();
const issues$ = _issues.asObservable();

const addIssue = (issue) => {
    const { id, dev, estimate } = issue;
    if (isNaN(estimate)) return
    if (release.find(e => e.id === id)) return // no dup id
    release = [...release, { id, dev, estimate }];
    _issues.next({ id, dev, estimate: parseInt(estimate) });
};

const deleteIssue = (id) => {
    release = release.filter(issue => issue.id !== id);
}

const editIssue = ({ id, dev, estimate }) => {
    const i = release.findIndex(issue => issue.id === id);
    release[i] = { id, dev, estimate };
};

const issues = () => [...release];

export { addIssue, deleteIssue, editIssue, issues, issues$ };
