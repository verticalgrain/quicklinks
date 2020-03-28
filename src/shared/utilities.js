import React from 'react'
import { db } from '../firebase'

export const generateNewUserId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for ( let i = 0; i < 20; i++ ) {
        autoId += chars.charAt( Math.floor( Math.random() * chars.length ) )
    }
    return autoId;
}

export const convertSpinalCase = ( str ) => {
    return str.replace(/^[\W_]+|[\W_]+$|([\W_]+)/g, function ($0, $1) {
        return $1 ? "-" : "";
    }).replace(/([a-z])(?=[A-Z])/g, '$1-').toLowerCase();
}

export const fireBaseQuery = ( collection, fieldName, fieldValue, stateFunction, operation = '==' ) => {
    db.collection( collection ).where( fieldName, operation, fieldValue )
    .get()
    .then( function( querySnapshot ) {
        const allQueryData = querySnapshot.docs.map( doc => ( {
            id: doc.id,
            ...doc.data()
        } ) )
        stateFunction( allQueryData );
    } )
    .catch(function(err) {
        console.log( err );
    })
}

/////////////////////////

export const fireBaseGet1 = ( collectionName, fieldName, condition = '==' ) => {
    db.collection( collectionName ).where( fieldName, condition, true )
    .get()
    .then( function( querySnapshot ) {
        querySnapshot.forEach( function( doc ) {
            // doc.data() is never undefined for query doc snapshots
            console.log( doc.id, ' => ', doc.data() );
        } );
    } )
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    } );
}

export const fireBaseSnapshotDocument = ( collection, document ) => {
    db.collection( collection ).doc( document )
    .onSnapshot( doc => {
        console.log( doc.data() );
    });
}

export const fireBaseGet = () => {
    const docRef = db.collection( 'linkgroups' ).doc( 'f868hk34ED1o211LyjPa' );

    docRef.get().then( doc => {
        if ( doc.exists ) {
            console.log( "Document data:", doc.data() );
        } else {
            console.log( "No such document!" );
        }
    }).catch( function( error ) {
        console.log( "Error getting document:", error );
    });
}

export const fireBaseGetLinkgroups = db.collection( 'linkgroups' ).onSnapshot( snapshot => {
    return snapshot.docs.map( doc => ( {
        id: doc.id,
        ...doc.data()
    } ) )
} );