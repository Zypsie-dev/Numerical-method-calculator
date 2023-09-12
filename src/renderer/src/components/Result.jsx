function Result({ result, tableData, headers, dataKeys }) {
  return (
    <div id="result">
      {tableData.length === 0 ? null : (
        <table className="table-styled">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((rowData, rowIndex) => (
              <tr key={rowIndex}>
                {dataKeys.map((key, colIndex) => (
                  <td key={colIndex}>{rowData[key]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {result === '' ? null : <div className="ans">{result}</div>}
    </div>
  );
}

export default Result;
