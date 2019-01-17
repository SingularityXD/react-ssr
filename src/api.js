import fetch from "isomorphic-fetch";

export function fetchCircuits( ) {
    return fetch( "http://ergast.com/api/f1/2019/circuits.json" )
        .then( res => res.json( ) )
        .then( res => res.MRData.CircuitTable.Circuits );
}
