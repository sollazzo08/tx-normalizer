import {importTdCsvFromFile} from "../src/adapters/td";


const data = importTdCsvFromFile("examples/data/transactions.csv");


console.log("Normalized Transaction: ", data);
