import {waitFor, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../src/App.jsx';

beforeEach( async () => {
  render(<App/>);
  await waitFor(() => screen.getByRole('table'));
});

test('Should render App', () => {
  expect(screen.getByRole('table')).toBeVisible();
});

test('Should load JSON Data to table', () => {
  let table = screen.getByRole('table');
  expect(table.rows.length).toBe(11);
});

test('Should add new rows to table', () => {
  let button =  screen.getByRole('button', {name: 'Add Debt'});
  fireEvent.click(button);
  fireEvent.click(button);
  fireEvent.click(button);

  let rows = screen.getAllByText('Navy FCU');
  expect(rows.length).toBe(3);
});

test('Should remove rows from table', () => {
  let addButton =  screen.getByRole('button', {name: 'Add Debt'});
  let rmvButton = screen.getByRole('button', {name: 'Remove Debt'});
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(addButton);
  fireEvent.click(rmvButton);

  let rows = screen.getAllByText('Navy FCU');
  expect(rows.length).toBe(2);
});

test('Should add to total when clicking on check box', () => {
  let table = screen.getByRole('table');
  let allRows = table.rows;
  let debtRow = allRows[7].children;
  let debtValue = debtRow[5].childNodes[0].textContent;
  let checkBox = debtRow[0].firstChild;
  let checkBox2 = allRows[5].children[0].firstChild;

  fireEvent.click(checkBox);
  fireEvent.click(checkBox2);

  let sum = Number(debtValue);
  sum+= Number(allRows[5].children[5].childNodes[0].textContent);

  let totalDisplayed = screen.getByText('Total').nextSibling.textContent.slice(1);
  expect(totalDisplayed).toBe(sum.toFixed(2));
});

test('Should subtract from total when clicking again on check box', () => {
  let table = screen.getByRole('table');
  let allRows = table.rows;
  let debtRow = allRows[7].children;
  let checkBox = debtRow[0].firstChild;

  fireEvent.click(checkBox);
  fireEvent.click(checkBox);

  let totalDisplayed = screen.getByText('Total').nextSibling.textContent.slice(1);
  expect(totalDisplayed).toBe('0.00');
});

test('Should decrease debt total when removing lowest checked row', async () => {
  let addButton =  screen.getByRole('button', {name: 'Add Debt'});
  let rmvButton = screen.getByRole('button', {name: 'Remove Debt'});

  fireEvent.click(addButton);

  let allRows = screen.getByRole('table').rows;
  let checkBox = allRows[allRows.length - 1].children[0].firstChild;
  fireEvent.click(checkBox);
  fireEvent.click(rmvButton);

  let totalDisplayed = screen.getByText('Total').nextSibling.textContent.slice(1);
  expect(totalDisplayed).toBe('0.00');
});

test('Should select all boxes when clicking on top most check box', () => {
  let table = screen.getByRole('table');
  let allRows = table.rows;
  let topCheckBox =  allRows[0].children[0].firstChild;

  fireEvent.click(topCheckBox);

  let allChecked = true;

  for (let i = 1; i < allRows.length; i++) {
    let currentBox = allRows[i].children[0].firstChild;
    if (!currentBox.checked) {
      allChecked = false;
    }
  }

  expect(allChecked).toBe(true);
});

test('Should unselect all boxes when clicking on top most check box twice', () => {
  let table = screen.getByRole('table');
  let allRows = table.rows;
  let topCheckBox =  allRows[0].children[0].firstChild;

  fireEvent.click(topCheckBox);
  fireEvent.click(topCheckBox);

  let allChecked = false;

  for (let i = 1; i < allRows.length; i++) {
    let currentBox = allRows[i].children[0].firstChild;
    if (currentBox.checked) {
      allChecked = true;
    }
  }

  expect(allChecked).toBe(false);
});

// test('Should increment Check Row Count when clicking on check box', async () => {
//   let table = screen.getByRole('table');
//   let allRows = table.rows;
//   let checkBox = allRows[3].children[0].firstChild;
//   let checkBox2 = allRows[5].children[0].firstChild;

//   fireEvent.click(checkBox);
//   fireEvent.click(checkBox2);

//   let countText = screen.getByName('check-count').textContent;


//   expect(checkCount).toBe(2);
// });

