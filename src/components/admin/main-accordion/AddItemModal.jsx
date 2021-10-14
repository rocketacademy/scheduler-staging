import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AddItemModal({
  show,
  onHide,
  bootcampdata,
  coursedate,
  setDaysInBatchFile,
  setDaysInMainFile,
}) {
  // input fields for a entry of a new item into the main data file
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [section, setSection] = useState("");
  const [sectionClass, setSectionClass] = useState("");

  // function that adds new item to main data file
  const handleAddItem = (e) => {
    e.preventDefault();

    // new item that will be added to main data file
    const newItem = {
      name: title,
      url: url,
    };

    // if the section that the new item is to be added to is empty, an empty array called items is added to it
    if (!bootcampdata[coursedate].dateTypes[section][sectionClass].items) {
      bootcampdata[coursedate].dateTypes[section][sectionClass].items = [];
    }

    // the new item is then pushed into items array
    bootcampdata[coursedate].dateTypes[section][sectionClass].items.push(
      newItem
    );

    // the new content is saved in state
    bootcampdata.constructor === Array
      ? setDaysInMainFile([...bootcampdata])
      : setDaysInBatchFile({ ...bootcampdata });
  };

  return (
    // modal that takes in user input for the creation of a new item
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
            <option value="ip">ip</option>
            <option value="algos">algorithms</option>
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
            {section === "ip" && <option value="ipDue">ipDue</option>}
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
