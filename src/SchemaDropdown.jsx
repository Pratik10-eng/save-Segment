import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SchemaDropdown = ({
  availableSchemas,
  selectedSchemas,
  setSelectedSchemas,
  setAvailableSchemas,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleAddSchema = () => {
    if (selectedOption !== "") {
      const newSelectedSchemas = [
        ...selectedSchemas,
        availableSchemas.find((s) => s.value === selectedOption),
      ];
      setSelectedSchemas(newSelectedSchemas);

      const newAvailableSchemas = availableSchemas.filter(
        (s) => s.value !== selectedOption
      );
      setAvailableSchemas(newAvailableSchemas);

      setSelectedOption("");
    }
  };

  return (
    <>
      <Form.Group controlId="formSchema">
        <Form.Label>Add schema to segment</Form.Label>
        <Form.Control
          as="select"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select schema</option>
          {availableSchemas.map((schema) => (
            <option key={schema.value} value={schema.value}>
              {schema.label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="link" onClick={handleAddSchema}>
        + Add new schema
      </Button>

      <div className="blue-box">
        {selectedSchemas.map((schema, index) => (
          <div key={index}>
            <Form.Control as="select" defaultValue={schema.value}>
              <option value={schema.value}>{schema.label}</option>
            </Form.Control>
          </div>
        ))}
      </div>
    </>
  );
};

export default SchemaDropdown;
