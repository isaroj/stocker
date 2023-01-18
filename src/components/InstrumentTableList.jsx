// react
import {useState, useEffect} from 'react'

// router
import { useNavigate } from "react-router-dom";

// reactstrap
import { Table, Badge } from "reactstrap";

// icons
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

// switch comp
import Switch from "react-switch";



const InstrumentTableList = ({
  headers,
  rows,
  tableTitle,
  sortableParameters,
  sortQuotes,
}) => {
  const [isAscending, setIsAscending] = useState(true);

  const navigate = useNavigate();

  const handleQuotes = (value) => {
    const symbol = value[1];
    navigate(`/quotes/${symbol}`);
  };

  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  useEffect(() => {
    if (!sortQuotes) return
      if (isAscending) {
        sortQuotes(rows, "asc", 'time');
      } else {
        sortQuotes(rows, "dsc", 'time');
      }
  }, [isAscending]);

  return (
    <div
      style={{
        margin: "2rem",
      }}
    >
      <h4 className="m-4">
        <Badge color="dark" pill>
          {tableTitle}
        </Badge>
      </h4>
      <Table
        bordered
        responsive
        striped
        style={{
          textAlign: "center",
        }}
      >
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index}>
                {header}
                {sortableParameters?.includes(header.toLowerCase()) ? (
                  <div
                    className="m-2"
                    style={{
                      display: "inline",
                      cursor: "pointer",
                    }}
                  >
                    <Switch
                      onChange={handleSort}
                      checked={isAscending}
                      offColor="#F7CD2E"
                      onColor="#46B2E0"
                      checkedIcon={
                        <div style={switchIcon}>
                          <span>A</span>
                          <FaArrowDown />
                        </div>
                      }
                      uncheckedIcon={
                        <div style={switchIcon}>
                          <span>D</span>
                          <FaArrowUp />
                        </div>
                      }
                    />
                  </div>
                ) : (
                  ""
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, index) => (
            <tr key={index}>
              {Object.entries(row)?.map((innerRow, innerIndex) => (
                <td
                  style={
                    innerRow[0] === "Symbol"
                      ? {
                          cursor: "pointer",
                          backgroundColor: "#242B2E",
                          color: "#fff",
                        }
                      : {}
                  }
                  key={innerIndex}
                  onClick={
                    innerRow[0] === "Symbol"
                      ? () => handleQuotes(innerRow)
                      : null
                  }
                >
                  {innerRow[1] ? innerRow[1] : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {rows?.length ? (
        ""
      ) : (
        <h4
          style={{
            margin: " 2rem auto",
            textAlign: 'center'
          }}
        >
          No matching results or data to display
        </h4>
      )}
    </div>
  );
};

export default InstrumentTableList;

const switchIcon = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  fontSize: 15,
  padding: "0.256rem",
};
