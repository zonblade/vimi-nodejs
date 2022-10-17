import * as LangID from './lang-id.json';
import * as LangEN_US from './lang-en.json';

export default function Lang(LangPrefrence:string) {
    switch(LangPrefrence) { 
        case "ID": { 
           //statements; 
           return LangID;
        } 
        case "EN": { 
           //statements; 
           return LangEN_US;
        } 
        default: { 
           //statements; 
           return LangEN_US;
        } 
     } 
}