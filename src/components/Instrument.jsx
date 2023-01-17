import {useEffect, useState} from 'react';
import Papa from "papaparse";

import InstrumentTableList from './InstrumentTableList';

import { Input, Spinner } from "reactstrap";
import Fuse from "fuse.js";

import { toast, ToastContainer } from "react-toastify";

// services
import {instrumentService} from '../services/InstrumentsService'


import isEmpty from "lodash/isEmpty";


const Instrument = () => {
    const [instruments, setInstruments] = useState({});
    const [filteredInstruments, setFilteredInstruments] = useState({});
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false)

     const parseFile = (file) => {
       Papa.parse(file, {
         header: true,
         complete: (data) => {
          if (data?.errors) {
            const errCode = 'toofewfields'
            const copyOfData = Object.assign(data)
            copyOfData.errors.forEach((error) => {
              if (error.code.toLocaleLowerCase() === errCode) {
                copyOfData.data.splice(error.row, 1)
              }
            })
            data = Object.assign(copyOfData)
          }
           const metaInstrumentObj = {};
           metaInstrumentObj.headers = data?.meta?.fields.filter(field => ['symbol', 'name', 'sector'].includes(field.toLocaleLowerCase())),
             (metaInstrumentObj.rows = data?.data.map(d => ({
              'Symbol': d?.Symbol,
              'Name': d?.Name,
              'Category': d?.Sector
             })));
           setInstruments(metaInstrumentObj);
           setFilteredInstruments(metaInstrumentObj);
         },
       });
     };

     const handleQuery = (e) => {
       setQuery(e.target.value);
     };

    const getAllInstruments = async () => {
        try {
            setIsLoading(true)
            const {data} = await instrumentService()
            parseFile(data)
           
        } catch (error) {
            toast.error("Oops! something went wrong!");
        } finally {
          setIsLoading(false)
        }
    }

    useEffect(() => {
        getAllInstruments()
    }, []);

    useEffect(() => {
      if (isEmpty(instruments)) return;
      if (query === '') {
        setFilteredInstruments(instruments);
        return
      }  
      const fuse = new Fuse(instruments.rows, {
        shouldSort: true,
        threshold: 0.1,
        location: 0,
        distance: 100,
        keys: instruments.headers,
      });
      const results = fuse.search(query);
      setFilteredInstruments({
        'headers': instruments.headers,
        'rows': results?.map(result => ({
          ...result.item
        }))
      })
    }, [query]);

    return (
      <div
        style={{
          minHeight: "90vh",
        }}
      >
        <ToastContainer
          position="top-right"
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
        />
        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              margin: "15%",
            }}
          >
            <Spinner 
            color="dark" />
            <h4>Fetching instruments.....</h4>
          </div>
        ) : (
          <>
            <Input
              name="search"
              placeholder="type something to search"
              type="text"
              value={query}
              onChange={handleQuery}
              style={{
                width: "50%",
                margin: "2rem auto",
                border: "1px solid black",
              }}
            />
            <InstrumentTableList {...filteredInstruments} />
          </>
        )}
      </div>
    );
}

export default Instrument