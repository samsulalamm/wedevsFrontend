import {Button, Modal} from "react-bootstrap";
import {FiTrash} from "react-icons/all";
import React, {useState} from "react";

function ModalDelete(props)  {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button size={`sm`} variant={`default`} onClick={handleShow}><FiTrash/></Button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={() => {
            props.handleDelete();
            handleClose();
        }}>Confirm</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default ModalDelete;
