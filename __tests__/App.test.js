import {waitFor, fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import fs from "fs";
import App from '../src/App.jsx';

window.document.body.innerHTML = fs.readFileSync("./public/index.html");

test('Should render App', async () => {
  render(<App/>);

  await waitFor(() => screen.getByRole('table'));

  expect(screen.getByRole('table')).toBeVisible();
});
