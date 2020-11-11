let release = [
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
];

const addIssue = ({ id, dev, estimate }) => {
    if (isNaN(estimate)) return
    if (release.find(e => e.id === id)) throw 'issue already in release';
    release = [...release, { id, dev, estimate: parseInt(estimate) }];
};

const deleteIssue = (id) => release = release.filter(issue => issue.id !== id);

const editIssue = ({ id, dev, estimate }) => {
    const i = release.findIndex(issue => issue.id === id);
    release[i] = { id, dev, estimate };
};

const issues = () => [...release];

export { addIssue, deleteIssue, editIssue, issues };
