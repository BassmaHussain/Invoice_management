# Invoice Management (React)

A small invoice management SPA built with React, Redux Toolkit and Tailwind CSS. It supports creating, editing, viewing and deleting invoices, persisting data to localStorage, and simple invoice calculations (subtotal / tax / total).

## Quick start

Prerequisites: Node 18+ / npm

Install and run:

```sh
npm install
npm start
```

## Features

Create, edit and delete invoices.
Update invoice status (Draft, Sent, Paid).
Line-item invoices with quantity, unit price, subtotal, tax and total.
Persist invoices to browser localStorage (key: invoices).
Client-side validation and responsive UI.

## Project structure (key files)

src/
components/
InvoiceForm/InvoiceForm.jsx — create/edit form + InvoiceItemInput
InvoiceTable/InvoiceTable.jsx — listing table
InvoiceDetails/InvoiceDetails.jsx — single invoice view
DeleteConfirmModal.jsx — deletion confirmation
pages/
InvoicesList.jsx — main list and actions
CreateInvoice.jsx — page wrapper for create
EditInvoice.jsx — page wrapper for edit
InvoiceDetailsPage.jsx — details page
store/
invoicesSlice.js — Redux slice: add/edit/delete/updateStatus/getSingleInvoice; includes TAX rate in initial state
index.js — store configuration
utils/
calculations.js — calculateSubtotal, calculateTax, calculateTotal
localStorage.js — loadFromLocalStorage, saveToLocalStorage
App.js — routes and route declarations
index.js — app entry
**Notes: Tailwind configuration is in tailwind.config.js and styles are imported in src/index.css.**

## Data model (invoice)

id (string)
invoiceNumber (string)
clientName, clientAddress
issueDate, dueDate
items: [{ id, name, quantity, unitPrice }]
status: "Draft" | "Sent" | "Paid"
subtotal, tax, total, tax_rate (computed/stored)

## Persistence & calculations

Invoices are saved to localStorage via utils/localStorage.js.
Subtotal = sum(item.quantity _ item.unitPrice).
Tax uses TAX_RATE (from slice initial state); tax = subtotal _ tax_rate.
Total = subtotal + tax.

## Tests

Test setup: src/setupTests.js
Run with: npm test

## Known issues / TODO

Route typo: edit route is declared as /edite-invoice/:id and maps to Edit page (file: src/pages/EditInvoice.jsx) — consider renaming route for consistency.
Consider switching persistence to a backend API for multi-user scenarios.
Add more unit/integration tests for reducer edge cases and form validation.

## Contributing

Open an issue or submit a PR.
Follow existing code patterns and add tests for new behavior.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
