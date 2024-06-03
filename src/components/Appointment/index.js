import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";

import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  const onAdd = () => {
    transition(CREATE);
  };

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
  
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }
  const onCancel = () => {
    back();
  };

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      destroy();
    }
  };

  const onEdit = () => {
    transition(EDIT);
  };

  function destroy() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
      {mode === CREATE && ( // Render Form component when mode is CREATE
        <Form 
          interviewers={props.interviewers} // Pass interviewers prop
          onCancel={onCancel} // Pass onCancel as a prop
          onSave={onSave}

        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onCancel={onCancel}
          onSave={save}
        />
      )}
     
    </article>

  );
}
