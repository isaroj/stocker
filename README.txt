1. To start the project run:
    1.1 npm install
    1.2 npm run dev
    1.3 npm run buid (to build the project) (optional)

2. Libraries used:
    2.1 For data fetching: axios
    2.2 For styling: reactstrap
    2.3 For routing: react-router-dom
    2.4 For toast messages: react-toastify
    2.5 For icons: react-icons
    2.6 For comonent structure (Toggle comp): react-switch
    2.7 For fuzzy search: fuse
    2.8 For parsing CSV: papaparse
    2.9 For utility: lodash

3. Working:
    * on landing Instrument comp loads, which fetches & parses csv data & shows in table format.
    * On clicking any symbol, data is fetched for that symbol & quotes are displayed in table format.
    * User can search by Symbol, Name & sector using search bar to filter table data.
    * On quotes table user can sort the data by time by asc or desc
    * The data will refetched automatically is valid_till has exipred, we will make requests & check if we have still expired data, if so we will make another requests but after 3 requests we will fetch in every 2sec.
    * If we have live valid_till then, we will make request once it exipre.