import React from 'react';
import Nav from 'react-bootstrap/Nav';

// side navbar that displays links to all batch schedules in batchArray
function ActiveCourses({ batchArray, setBootcampData, setBatchFile }) {
  const handleSelectClick = (batch) => {
    setBootcampData(
      JSON.parse(JSON.stringify(batch.content.days)),
    );
    setBatchFile(
      JSON.parse(JSON.stringify(batch.content)),
    );
  };

  return (
    <div>
      <h4>Batches</h4>
      <Nav variant="pills" className="flex-column ">
        {/* a link is rendered for each element in batchArray */}
        {batchArray.map((batch, index) => (
          <Nav.Link
              // when a link is clicked , the content of the selected batch file is rendered
            onClick={() => handleSelectClick(batch)}
            eventKey={index}
          >
            {batch.name}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
}

export default ActiveCourses;
