import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddItemModal({
  show,
  onHide,
  bootcampdatacopy,
  setbootcampdatacopy,
  coursedate,
}) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [section, setSection] = useState("");
  const [sectionClass, setSectionClass] = useState("");

  const handleAddItem = (e) => {
    e.preventDefault();

    const newItem = {
      name: title,
      url: url,
    };

    if (!bootcampdatacopy[coursedate].dateTypes[section][sectionClass].items) {
      bootcampdatacopy[coursedate].dateTypes[section][sectionClass].items = [];
    }

    bootcampdatacopy[coursedate].dateTypes[section][sectionClass].items.push(
      newItem
    );
    console.log(bootcampdatacopy);
    setbootcampdatacopy({ ...bootcampdatacopy });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="add-input-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="add-input-modal">Add an item</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Section</Form.Label>
          <Form.Select
            className="mb-3"
            aria-label="sections"
            onChange={(e) => setSection(e.target.value)}
          >
            <option>choose section</option>
            <option value="general">general</option>
            <option value="css">css</option>
            <option value="ux">ux</option>
            <option value="projects">projects</option>
            <option value="cp">cp</option>
            <option value="dsa">dsa</option>
          </Form.Select>

          <Form.Label>Class </Form.Label>
          <Form.Select
            className="mb-3"
            aria-label="sections"
            onChange={(e) => setSectionClass(e.target.value)}
          >
            <option>choose class type</option>
            <option value="preClass">preClass</option>
            <option value="postClass">postClass</option>
            <option value="inClass">inClass</option>
            {section === "projects" && (
              <>
                <option value="projectDue">projectDue</option>
                <option value="projectStart">projectStart</option>
              </>
            )}
            {section === "cp" && <option value="cpDue">cpDue</option>}
          </Form.Select>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleAddItem(e)}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddItemModal;
