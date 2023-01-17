import { Table } from "reactstrap";
import { useNavigate } from "react-router-dom";



const InstrumentTableList = ({ headers, rows }) => {

    const navigate = useNavigate();

    const handleQuotes = (value) => {
        const symbol = value[1]
        navigate(`/quotes/${symbol}`);
    }

  return (
    <div
      style={{
        margin: "5rem",
      }}
    >
      <Table
        bordered
        hover
        responsive
        style={{
          borderRadius: "10rem",
          textAlign: 'center',
        }}
      >
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index}>{header}</th>
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
                          color: '#fff'
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
          }}
        >
          No matching results or data to display
        </h4>
      )}
    </div>
  );
};

export default InstrumentTableList;
