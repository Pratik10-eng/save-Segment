import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import SchemaDropdown from "./SchemaDropdown";

function App() {
  const [showModal, setShowModal] = useState(false);

  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState([
    { label: "First Name", value: "first_name" },
    { label: "Last Name", value: "last_name" },
    { label: "Gender", value: "gender" },
    { label: "Age", value: "age" },
    { label: "Account Name", value: "account_name" },
    { label: "City", value: "city" },
    { label: "State", value: "state" },
  ]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div className="App">
      <Button variant="primary" onClick={handleShow}>
        Save segment
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Save Segment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Segment Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter segment name"
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />
            </Form.Group>

            <SchemaDropdown
              availableSchemas={availableSchemas}
              selectedSchemas={selectedSchemas}
              setSelectedSchemas={setSelectedSchemas}
              setAvailableSchemas={setAvailableSchemas}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const handleSaveSegment = () => {
                const data = {
                  segment_name: segmentName,
                  schema: selectedSchemas.map((schema) => ({
                    [schema.value]: schema.label,
                  })),
                };

                fetch(
                  "https://thingproxy.freeboard.io/fetch/https://webhook.site/58ac0ac3-9f3d-432a-a580-2c94bb0e0434",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    console.log("Success:", data);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                  });
              };

              handleSaveSegment();
              handleClose();
            }}
          >
            Save Segment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
