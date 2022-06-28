import React, {useState, useEffect} from 'react';
import axios from 'axios';

const URL = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json';

const checkBoxStyle = {
  border: 0,
  padding: '0 1em'
};

const numFormat = {textAlign: 'right'};

const App = () => {
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [checkCount, setCheckCount] = useState(0);
  const [totalDebt, setTotalDebt] = useState(0);

  useEffect( () => {
    axios.get(URL)
      .then(res => {
        setData(res.data);
        setRowCount(res.data.length);
      })
      .catch(err => console.error(err));
  }, []);

  const checkRow = (e) => {
    let checked = e.target.checked;
    let rowValue = e.target.parentElement.parentElement.childNodes[5].innerText;

    if (checked) {
      setTotalDebt(totalDebt + Number(rowValue));
      setCheckCount(checkCount + 1);
    } else {
      setTotalDebt(totalDebt - Number(rowValue));
      setCheckCount(checkCount - 1);
    }
  };

  const checkAllRows = (e) => {
    let checked = e.target.checked;
    let allBoxes = document.querySelectorAll('[data="checkbox"]');

    if (checked) {
      let sum = 0;

      allBoxes.forEach(box => {
        box.checked = true;
        let rowValue = box.parentElement.parentElement.childNodes[5].innerText;
        sum+= Number(rowValue);
      });

      setTotalDebt(sum);
      setCheckCount(allBoxes.length);
    } else {
      allBoxes.forEach(box => box.checked = false);

      setTotalDebt(0);
      setCheckCount(0);
    }
  };

  const removeDebt = () => {
    let dataCopy = data.slice();
    let allBoxes = document.querySelectorAll('[data="checkbox"]');
    let lastDebt = allBoxes[allBoxes.length - 1];

    if (lastDebt.checked) {
      let balance = lastDebt.parentElement.parentElement.childNodes[5].innerText;

      setTotalDebt(totalDebt - Number(balance));
      setCheckCount(checkCount - 1);
    }

    dataCopy.pop();
    setData(dataCopy);
    setRowCount(dataCopy.length);
  };

  const addDebt = () => {
    let newRow = {
      id: data.length + 1,
      creditorName: 'Navy FCU',
      firstName: 'Bob',
      lastName: 'Oblaw',
      minPaymentPercentage: 3,
      balance: 3000
    };

    let newData = data.slice();

    newData.push(newRow);
    setData(newData);
    setRowCount(newData.length);
  };

  return !data.length ? null : (
    <div className="table-container">
      <table data="table">
        <colgroup>
          <col className="check-box-style"/>
        </colgroup>
        <thead>
          <tr>
            <th style={checkBoxStyle}><input data="checkAll" onClick={checkAllRows} type="checkbox"/></th>
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
                <td style={checkBoxStyle}><input data="checkbox" onClick={checkRow} type="checkbox"/></td>
                <td>{row.creditorName}</td>
                <td>{row.firstName}</td>
                <td>{row.lastName}</td>
                <td style={numFormat}>{row.minPaymentPercentage.toFixed(2)}%</td>
                <td style={numFormat}>{row.balance.toFixed(2)}</td>
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
          <span>${totalDebt.toFixed(2)}</span>
        </div>
        <div className="sums-row">
          <span>Total Row Count : {rowCount}</span>
          <span>Check Row Count : {checkCount}</span>
        </div>
      </div>
    </div>
  );
};

export default App;