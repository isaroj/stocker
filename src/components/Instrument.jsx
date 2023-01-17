import {useEffect, useState} from 'react';
import Papa from "papaparse";

import { toast, ToastContainer } from "react-toastify";


// services
import {instrumentService} from '../services/InstrumentsService'

const Instrument = () => {
    const [file, setFile] = useState([]);

     const parseFile = (file) => {
       Papa.parse(file, {
         header: true,
         complete: (data) => {
           console.log(data);
         },
       });
     };

    const getAllInstruments = async () => {
        try {
            const {data} = await instrumentService()
            debugger
            parseFile(data)
           
        } catch (error) {
            toast.error("Oops! something went wrong!");
        }
    }

    useEffect(() => {
        getAllInstruments()
    }, []);
    return (
      <div>
        <ToastContainer
          position="top-right"
          closeOnClick
          draggable
          pauseOnHover
          theme="light"
        />
        <h1>Instruemnt</h1>
      </div>
    );
}

export default Instrument