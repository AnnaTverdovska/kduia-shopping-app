# Shopping App

[![CI](https://github.com/AnnaTverdovska/kduia-shopping-app/actions/workflows/ci.yml/badge.svg)](https://github.com/AnnaTverdovska/kduia-shopping-app/actions/workflows/ci.yml)

A small React shopping cart. Pick an item, add or reduce its quantity, and the cart and its
total update straight away. Removing an item takes one click, and the currency can be switched
between pound, dollar, euro and rupee.

The project started from IBM Skills Network's shopping cart template, used in IBM's
*Developing Front-End Apps with React* course.

**[Try the live demo](https://annatverdovska.github.io/kduia-shopping-app/)**. It runs entirely
in your browser; nothing is sent anywhere.

| Desktop | Phone |
|---|---|
| ![The cart with three items](docs/screenshots/cart.png) | <img src="docs/screenshots/phone.png" alt="The cart on a phone" width="260"> |

## How it works

All state lives in one React context (`src/context/AppContext.js`), managed by `useReducer`.
Components never change the state directly; they dispatch one of four actions:

| Action | What it does |
|---|---|
| `ADD_QUANTITY` | Adds the given number of an item to the cart |
| `RED_QUANTITY` | Takes the given number away, never going below zero |
| `DELETE_ITEM` | Removes an item from the cart |
| `CHG_LOCATION` | Switches the currency symbol |

The reducer always returns a new state object instead of changing the old one, so React
re-renders reliably. The cart total is calculated from the items on every render rather than
stored, so it can never drift out of sync.

| Component | Role |
|---|---|
| `CartValue` | Shows the cart total |
| `Location` | Chooses the currency |
| `ExpenseList` | Lists the items in the cart, or says the cart is empty |
| `ExpenseItem` | One row: quantity, unit price, line total and a remove button |
| `ItemSelected` | The form for adding or reducing items. It rejects missing items and quantities that are not whole numbers above zero |

## Running it locally

You need Node.js 18 or newer.

```bash
npm ci        # install the exact versions from package-lock.json
npm start     # development server at http://localhost:3000
npm test      # tests in watch mode
npm run build # production build in build/
```

## Tests

`src/App.test.js` has 8 tests, written with React Testing Library. They cover:

- an empty cart at the start
- adding items and the updated total
- reducing a quantity, which never goes below zero
- the remove button
- switching the currency, which updates every price
- the messages for invalid input
- the reducer leaving the previous state unchanged

GitHub Actions runs the tests and a production build on every push
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)). Every push to `main` also publishes
the live demo with GitHub Pages ([`.github/workflows/pages.yml`](.github/workflows/pages.yml)).

## Changes to the IBM template

This repository is a modified version of IBM Skills Network's template
(`ibm-developer-skills-network/kduia-shopping-app`), licensed under the Apache License 2.0. The
template came with empty components for the learner to complete. AnnaTverdovska wired up
`src/App.js` in 2023 and made all other changes in 2026; the commit history shows each one in
detail. Changed files that allow comments also say so in their first lines.

<details>
<summary>Files changed from the template (14)</summary>

- `.gitignore`
- `README.md`
- `package-lock.json`
- `package.json`
- `public/index.html`
- `public/manifest.json`
- `src/App.js`
- `src/App.test.js`
- `src/components/CartValue.js`
- `src/components/ExpenseItem.js`
- `src/components/ExpenseList.js`
- `src/components/ItemSelected.js`
- `src/components/Location.js`
- `src/context/AppContext.js`

</details>

<details>
<summary>Files added (2, plus the screenshots in docs/)</summary>

- `.github/workflows/ci.yml`
- `.github/workflows/pages.yml`

</details>

## License

[Apache License 2.0](LICENSE), the license of the original template: Copyright 2020 IBM
Developer Skills Network. The template itself was set up with
[Create React App](https://github.com/facebook/create-react-app) (MIT License).
