import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react'
const ErrorModal = props => {
  const [open, setOpen] = useState(true)
  return (
    <Modal      
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>Error occurred </Modal.Header>
      <Modal.Content >
        <p>{props.error}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => {
          props.onClear();
          setOpen(false)
        }}>
          Okay
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
export default ErrorModal;
