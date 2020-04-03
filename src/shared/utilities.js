import React, { useContext } from 'react'
import * as firebase from 'firebase/app';
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
    .catch(function( err ) {
        console.log( err );
    })
}

// Only allow certain functions for authenticed group owner
export const currentUserIsOwner = ( authenticated, uid, groupUid ) => {

    return authenticated && uid === groupUid;
}

export const listSubCollections = ( collection, document, stateFunction ) => {
    const getSubCollections = firebase
        .functions()
        .httpsCallable(  'getSubCollections' );

    getSubCollections( { docPath: collection + '/' + document } )
    .then(function(result) {
        stateFunction( result.data.collections )
    })
    .catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log( message )
    });
}




///////////////////////// OLD STUFF PROBS DELETEs //////////////////////////

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


// List sub collections DOESN'T WORK BECUASE CAN'T CALL LISTCOLLECTIONS() FROM WEB
// export const listSubCollections = ( collection, document ) => {
//     let documentRef = db.doc( collection + '/' + document );
//     console.log( collection )
//     console.log( document )
//     documentRef.listCollections().then( collections => {
//         for ( let collectionItem of collections ) {
//             console.log( collectionItem.id )
//         }
//     } )
// }