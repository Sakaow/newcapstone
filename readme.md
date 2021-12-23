# Project Description

This project is created user the instruction of the Udacity Front End Web Developer Nanodegree Program. Which is to practice configure the build tools and using the MeaningCloud API to evaluate the Natural Language Processing information.

### Prerequisites

You will need the following installed on your local computer.

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en/)

Using webpack as a build tool

- [Webpack](https://webpack.js.org/)

Register an account at Weatherbit.io and get API key.

- [weatherbit.io](https://www.weatherbit.io/account/login)

Create a config file in `src/client/js/config.js` and place your api keys in.

```
export const config = {
    wApiKey: 'your_weatherbit_api_key',
    pApiKey: 'your_pixabay_api_key',
    geoname: 'Yourname',
}

```

To hide your API KEY from uploaded it to git repository then put the `config.js` file into the `.gitignore` file.

### Installation

Clone this repository from github

- `git clone <repository-url>`

Get into your local project

- `cd to-your-project`

To install packages

- `npm install`

### Running / Development

- Run the development:

`npm run dev`

- Run the production:

`npm run prod`

- Start the server:

`npm start`

- Visit your app at (http://localhost:8081)
