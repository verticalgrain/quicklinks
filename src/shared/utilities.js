import React from 'react'
import * as firebase from 'firebase/app';
import { db } from '../firebase'

export const generateUniqueId = ( length ) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for ( let i = 0; i < length; i++ ) {
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
        allQueryData.length ? stateFunction( allQueryData ) : console.log( 'Cant reach firebase, using localstorage' );
    } )
    .catch(function( err ) {
        console.log( err );
    })
}

// Only allow certain functions for authenticed group owner
export const currentUserIsOwner = ( authenticated, uid, groupUid ) => {
    return authenticated && uid === groupUid;
}

const returnSomething = ( thing ) => {
    return thing;
}

// List sub collections of a collection using getSubCollections function
export const listSubCollections = ( collection, document, stateFunction ) => {
    const getSubCollections = firebase
        .functions()
        .httpsCallable( 'getSubCollections' );

    const subCollections = getSubCollections( { docPath: collection + '/' + document } )
    .then( function( result ) {
        // resolve();
        stateFunction( result.data.collections )
        // return result.data.collections
        // returnSomething( result.data.collections )
    })
    .catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log( message )
    });

    return subCollections
}

/**
 * Update a link group object.
 *
 * @param {number}      linkPageId      ID of the link page
 * @param {number}      linkGroupId     ID of the specific link group on the page
 * @param {number}      linkGroupDocId  Optional parameter.
 * @param {Object}      dataNew         Object of data to overwrite link group object with
 *
 * @returns {Object}
 */
export const updateLinkGroup = ( linkPageId, linkGroupId, linkGroupDocId, dataNew ) => {
    db.collection( 'linkpages' ).doc( linkPageId ).collection( linkGroupId ).doc( linkGroupDocId ).set( dataNew );
}

// /**
//  * Delete a link group object.
//  *
//  * @param {number}      linkPageId      ID of the link page
//  * @param {number}      linkGroupId     ID of the specific link group on the page
//  * @param {number}      linkGroupDocId  Optional parameter.
//  * @param {Object}      dataNew         Object of data to overwrite link group object with
//  *
//  * @returns {Object}
//  */
// export const deleteLinkGroup = ( linkPageId, linkGroupId, linkGroupDocId ) => {
//     db.collection( 'linkpages' ).doc( linkPageId ).collection( linkGroupId ).doc( linkGroupDocId ).delete();
// }

/**
 * Update a link page object.
 *
 * @param {number}      linkPageId      ID of the link page
 * @param {Object}      dataNew         Object of data to overwrite link group object with
 *
 * @returns {Object}
 */
export const updateLinkPage = ( linkPageId, dataNew ) => {
    db.collection( 'linkpages' ).doc( linkPageId ).set( dataNew );
}

/**
 * Create a new linkGroup subCollection.
 *
 * @param {Object}      linkPageData         Object of data to overwrite link group object with
 * @param {}            callback             The callback to be executed once finished
 *
 * @returns {Object}
 */
export const createSubCollection = ( linkPageData, callback ) => {
    // Create unique collectionId
    const collectionId = generateUniqueId( 20 );
    // Create linkGroup object
    const subCollection = {
        parentLinkGroupId: collectionId,
        parentLinkPageId: linkPageData.id,
        title: 'Untitled link group',
        links: [],
    }
    // Add the ID of the new linkGroup subcollection to the beginning of the linkPage linkGroupIds array
    let linkPageGroupIds = linkPageData.linkGroupIds
    linkPageGroupIds.unshift( collectionId )
    linkPageData.linkGroupIds = linkPageGroupIds
    // Update the linkPage array of linkGroupIds
    updateLinkPage( linkPageData.id, linkPageData )
    // Add the linkGroup to the linkPage
    db.collection( 'linkpages' ).doc( linkPageData.id ).collection( collectionId ).add( subCollection )
    .then( function() {
        return callback()
    } )
}

/**
 * Delete a linkPage subCollection.
 *
 * @param {Object}      linkPageData         Object of data for the link page
 * @param {String}            linkGroupId    ID of the link group
 * @param {String}            linkGroupDocId ID of the link group document
 *
 */
export const deleteLinkGroup = ( linkPageData, linkGroupId, linkGroupDocId, setLinkPageSubCollections, callback ) => {
    db.collection( 'linkpages' ).doc( linkPageData.id ).collection( linkGroupId ).doc( linkGroupDocId ).delete();

    let linkPageDataNew = linkPageData;
    let linkPageGroupIds = linkPageData.linkGroupIds
    const index = linkPageGroupIds.indexOf( linkGroupId );
    console.log( linkPageGroupIds );
    if (index > -1) {
        linkPageGroupIds.splice( index, 1 );
    }
    console.log( 'link page group ids:')
    console.log( linkPageGroupIds );
    linkPageDataNew.linkGroupIds = linkPageGroupIds
    // Update the local state of sub collections in link page component
    setLinkPageSubCollections( linkPageGroupIds )
    // Update link page in FB
    updateLinkPage( linkPageData.id, linkPageDataNew )
    return callback();
}

/**
 * Delete a link from a link group object.
 *
 * @param {Object}      dataCurrent     Object of data to overwrite link group object with.
 * @param {String}      href            The href of the link to be deleted.
 *
 * @returns {Object}
 */
export const deleteLink = ( dataCurrent, href ) => {
    let dataNew = dataCurrent;
    let links = dataCurrent.links;

    const linksNew = links.filter( function( linkItem ) {
        return linkItem.href !== href;
    });

    dataNew.links = linksNew;

    updateLinkGroup( dataCurrent.parentLinkPageId, dataCurrent.parentLinkGroupId, dataCurrent.id, dataNew )
}

export const reorder = ( list, startIndex, endIndex ) => {
    const result = Array.from( list );
    const [ removed ] = result.splice( startIndex, 1 );
    result.splice( endIndex, 0, removed );

    return result;
};

export const randomString = [...Array(6)].map(i=>(~~(Math.random()*36)).toString(36)).join('');

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
    const docRef = db.collection( 'linkpages' ).doc( 'f868hk34ED1o211LyjPa' );

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

export const fireBaseGetLinkgroups = db.collection( 'linkpages' ).onSnapshot( snapshot => {
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