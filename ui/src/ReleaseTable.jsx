import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function AddIssueForm({ addIssue }) {
  const id = useRef();
  const dev = useRef();
  const estimate = useRef();

  const handleAddIssue = e => {
    e.preventDefault();
    const issue = {
      id: id.current.value.trim(),
      dev: dev.current.value.trim(),
      estimate: estimate.current.value.trim()
    };
    addIssue(issue);
    e.currentTarget.reset();
    id.current.focus();
  };

  return (
    <form onSubmit={ handleAddIssue }>
      <input type="text" ref={ id } required autoFocus={ true } />
      <input type="text" ref={ dev } required />
      <input type="number" ref={ estimate } min="0" required />
      <button type="submit">
        <FontAwesomeIcon icon="plus-square" />
      </button>
    </form>
  );
}

function Cell({ text, type, editIssue, i }) {
  const content = useRef();
  const [id, setId] = useState();

  const handleFocus = e => setId(e.currentTarget.closest('tr').children[0].textContent);

  const handleBlur = e => {
    content.current.textContent = content.current.textContent.trim();
    const row = e.currentTarget.closest('tr');
    const issue = {
      id: row.children[0].textContent,
      dev: row.children[1].textContent,
      estimate: row.children[2].textContent
    };
    editIssue(issue, id);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') return e.preventDefault(); // TODO: turn in tab down?
    if (e.key === 'Tab') {
      const valid = data => type === 'number' ? !(isNaN(data) || isNaN(parseInt(data))) : true;
      const input = e.currentTarget.textContent;
      if (!valid(input)) return e.preventDefault();
    }
  };

  return (
    <td
      onFocus={ handleFocus }
      onBlur={ handleBlur }
      onKeyDown={ handleKeyDown }
      suppressContentEditableWarning={ true }
      tabIndex={ i }
      ref={ content }
      contentEditable>
        { text }
    </td>
  );
}

function DeleteCell({ deleteIssue, i }) {
  const onDeleteClick = e => deleteIssue(e.currentTarget.closest('tr').children[0].textContent);
  const onDeletePress = e => { if (e.key === 'Enter') onDeleteClick(e); }

  return (
    <td onClick={ onDeleteClick } onKeyDown={ onDeletePress } tabIndex={ i }>
      <FontAwesomeIcon icon="trash-alt" />
    </td>
  );
}

function Row({ data, editIssue, deleteCell, i }) {
  return (
    <tr>
      <Cell text={ data.id } type="text" editIssue={ editIssue} i={ 4*i + 1 } />
      <Cell text={ data.dev } type="text" editIssue={ editIssue} i={ 4*i + 2 } />
      <Cell text={ data.estimate } type="number" editIssue={ editIssue} i={ 4*i + 3 } />
      { deleteCell }
    </tr>
  );
}

function Issues({ issues, editIssue, deleteIssue }) {
  return [...issues.entries()].map(([id, { dev, estimate }], i) => (
    <Row
      key={ i }
      data={{ id, dev, estimate }}
      editIssue={ editIssue }
      i={ i }
      deleteCell={
        <DeleteCell deleteIssue={ deleteIssue } i={ 4*i + 4 } />
      } />
  ));
}

function ReleaseTable() {
  const [release, setRelease] = useState(new Map([
    ["#5", { dev:"b", estimate: 5 }],
    ["#6", { dev:"b", estimate: 7 }],
    ["#7", { dev:"b", estimate: 4 }],
    ["#8", { dev:"b", estimate: 2 }],
    ["#9", { dev:"c", estimate: 16 }],
    ["#10", { dev:"c", estimate: 10 }],
  ]));

  const addIssue = () => ({ id, dev, estimate }) => setRelease(prev => (
    !prev.has(id)
      ? new Map(prev).set(id, {dev, estimate})
      : prev
  ));

  const editIssue = () => ({ id, dev, estimate }, oldId) => setRelease(prev => {
    let next = new Map(prev).set(id, { dev, estimate });
    if (id !== oldId) next.delete(oldId);
    return next;
  });

  const deleteIssue = () => id => setRelease(prev => {
    let next = new Map(prev);
    next.delete(id);
    return next;
  });
 
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Dev</th>
            <th>Estimate</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <Issues issues={ release } editIssue={ editIssue() } deleteIssue={ deleteIssue() } />
        </tbody>
      </table>
      <AddIssueForm addIssue={ addIssue() } />
    </>
  );
}

export default ReleaseTable;

// TODO:
// - validate onBlur forced through mouse click elsewhere
// - fixed width for cells & contenteditable