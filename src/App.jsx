import React, {useState, useEffect} from 'react';

const URL = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';

const App = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect( () => {
    fetch(URL)
      .then(res => res.json())
      .then(body => {
        setData(body);
        setRowCount(body.length);
      })
      .catch(err => console.error(err));
  }, []);

  const checkRow = (e) => {
    e.persist();
    console.log(e)
  };

  const removeDebt = () => {
    let newData = data.slice();

    newData.pop();
    setData(newData);
    setRowCount(newData.length);
  };

  const addDebt = () => {
    let newRow = {
      id: data.length + 1,
      creditorName: 'Navy FCU',
      firstName: 'Bob',
      lastName: 'Oblaw',
      minPaymentPercentage: '3',
      balance: '3000'
    };

    let newData = data.slice();

    newData.push(newRow);
    setData(newData);
    setRowCount(newData.length);
  };

  return !data.length ? null : (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th><input onClick={checkRow} type="checkbox"/></th>
            <th>Creditor</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Min Pay %</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => {
            return (
              <tr key={row.id}>
                <td><input type="checkbox"/></td>
                <td>{row.creditorName}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td>{row.minPaymentPercentage}</td>
                <td>{row.balance}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="table-ftr">
        <div className="btn-container">
          <button className="add-btn" onClick={addDebt}>Add Debt</button>
          <button className="rmv-btn" onClick={removeDebt}>Remove Debt</button>
        </div>
        <div className="total-debt">
          <span>Total</span>
          <span>{totalDebt}</span>
        </div>
        <div className="sums-row">
          <span>Total Row Count: {rowCount}</span>
          <span>Check Row Count: {checkCount}</span>
        </div>
      </div>
    </div>
  );
};

export default App;