import React, { useEffect, useState } from "react";
import { confirm } from '@tauri-apps/api/dialog';

const CustomEditTable = () => {
  const [tableData, setTableData] = useState([
    {
      name: "Aurelia Vega",
      age: "30",
      companyName: "Deepends",
      country: "Spain",
      city: "Madrid",
    },
    {
      name: "Guerra Cortez",
      age: "45",
      companyName: "Insectus",
      country: "USA",
      city: "San Francisco",
    },
    {
      name: "Guadalupe House",
      age: "26",
      companyName: "Isotronic",
      country: "Germany",
      city: "Frankfurt",
    },
    {
      name: "Elisa Gallagher",
      age: "31",
      companyName: "Portica",
      country: "United Kingdom",
      city: "London",
    }
  ]);

  const selectFocusedRow = (e) => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(e.target);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const removeRow = (index) => {
    const updatedData = [...tableData];
    updatedData.splice(index, 1);
    setTableData(updatedData);
  };

  const saveRow = (index) => {
    const updatedData = tableData.map((rowData, i) =>
      i === index
        ? Object.fromEntries(
            Object.keys(rowData).map((key) => [
              key,
              document.getElementById(`${key}-${index}`).textContent,
            ])
          )
        : rowData
    );

    setTableData(updatedData);
    console.log(updatedData[index]);
  };

  useEffect(() => {
    const cells = document.querySelectorAll('.editable-cell');

    // Add event listener for keydown on each cell
    cells.forEach((cell, index) => {
      cell.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default Enter behavior (newline)

          // Determine if Shift key is pressed to decide whether to move to the previous or next cell
          const direction = event.shiftKey ? -1 : 1;

          // Calculate the index of the next cell
          const nextIndex = (index + direction + cells.length) % cells.length;

          // Focus on the next cell and start editing
          cells[nextIndex].focus();
        }
      });
    });

    // Cleanup event listeners when the component is unmounted
    return () => {
      cells.forEach((cell, index) => {
        cell.removeEventListener('keydown', (event) => {
          // Remove event listener
        });
      });
    };
  }, [tableData]); // Include tableData as a dependency to reattach listeners when the data changes

  return (
    <div>
      <div className="card">
        <h3 className="card-header text-center font-weight-bold text-uppercase py-4">
          Grid Table
        </h3>

        <div className="card-body">
          <div className="table-editable">
            <span className="table-add float-right mb-3 mr-2"></span>
            <table className="table table-bordered table-responsive-md table-striped text-center">
              <thead>
                <tr>
                  <th className="text-center">Person Name</th>
                  <th className="text-center">Age</th>
                  <th className="text-center">Company Name</th>
                  <th className="text-center">Country</th>
                  <th className="text-center">City</th>
                  <th className="text-center">Remove</th>
                  <th className="text-center">Save</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((rowData, index) => (
                  <tr key={index}>
                    {Object.keys(rowData).map((key, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="pt-3-half editable-cell"
                        contentEditable="true"
                        id={`${key}-${index}`}
                        dangerouslySetInnerHTML={{ __html: rowData[key] }}
                        onFocus={selectFocusedRow}
                      />
                    ))}
                    <td>
                      <span className="table-remove">
                        <button
                          type="button"
                          className="btn btn-danger btn-rounded btn-sm my-0"
                          onClick={() => removeRow(index)}
                          tabIndex={0}
                        >
                          Remove
                        </button>
                      </span>
                    </td>
                    <td>
                      <span className="">
                        <button
                          type="button"
                          className="btn btn-primary btn-rounded btn-sm my-0"
                          onClick={() => saveRow(index)}
                          tabIndex={0}
                        >
                          Save
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div id="export"></div>
    </div>
  );
};

export default CustomEditTable;
