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

const addIssue = (id, dev, estimate) => release.push({id, dev, estimate});

const deleteIssue = (id) => {
    let arr = [];
    for (let i = 0; i < release.length; i++) {
        if (release[i].id !== id) {
            arr.push(release[i]);
        }
    }
    release = arr;
};

const editIssue = (id, dev, estimate) => {
    let arr = [];
    for (let i = 0; i < release.length; i++) {
        if (release[i].id === id) {
            arr.push({id, dev, estimate});
        } else {
            arr.push(release[i]);
        }
    }
    release = arr
};

const issues = () => [...release];

export { addIssue, deleteIssue, editIssue, issues };
