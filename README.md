## 1. About

When having a large amount of Youtube subscriptions, YouTheme is a tool that can help you manage and sort your favorite content by themes.

Tech Stack :
- React (Hooks)
- Node (Express)
- Material-UI
- Firebase Auth
- Firebase Real Time Database

## 2. Installation

- `npm install` to install back-end dependencies.
- `npm client-install` to install front-end dependencies

- create a `.env` file in root of the project and create a `REACT_APP_GOOGLE_KEY` variable to store your Google Api Key.
- create a `config` folder in `client/src`
- create  a `fire.js` file in `config` folder
- inside of `fire.js` import and initialize your firebase config object like so and fill the relevant informations:

```javascript
import firebase from 'firebase'

var config = {
  apiKey: "YOUR API KEY",
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
};

const fire = firebase.initializeApp(config);
const db = firebase.database()

export { fire, db }
```



## 3. Usage

npm run dev to run the app (back + front concurrently) locally.
