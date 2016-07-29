var factories = angular.module('notebook.factories', []);

factories.factory('noteStore', function(){
    /*
    var notes = [
        {id:1, titre:'Premiere note', texte:'Le texte de la première note'},
        {id:2, titre:'Deuxième note', texte:'Le texte de la deuxième note'} 
    ];*/
    
    var notes = angular.fromJson(window.localStorage['notes'] || []);
    
    function persist(){
        window.localStorage['notes'] = angular.toJson(notes);
    }
    
    var noteList = function(){
        return notes;
    };
    
    var noteCreate = function(newNote){
        newNote.id = new Date().toString();
        notes.push(newNote);
        persist();
    };
    
    var getNotePosition = function(noteId){
        var position = null;
        var found = false;
        
        for(var i=0; i< notes.length && !found; i++){
            if(noteId == notes[i].id){
                position = i;
                found = true;
            }}
        
        return position;
    };
    
    var getNote = function(noteId){
        return notes[getNotePosition(noteId)];
    };
    
    var updateNote = function(updatedNote){
        var position = getNotePosition(updatedNote.id);
        notes[position] = updatedNote; 
        persist();
    };
    
    var deleteNote = function(noteId){
        var position = getNotePosition(noteId);
        notes.splice(position,1);
        persist();
    };
    
    //Interface (méthodes publiques) de l'objet
    return {
        list: noteList,
        create: noteCreate,
        get: getNote,
        update: updateNote,
        remove: deleteNote
    }
});

var factories = angular.module('bookSearch.factories', []);

factories.factory('bookStore', function(){
    
    var bookDetails = {};
    var getBookPosition = function(bookId){
        var position = null;
        var found = false;
        
        for(var i=0; i< books.length && !found; i++){
            if(bookId == books[i].id){
                position = i;
                found = true;
            }}
        
        return position;
    };
    
    var getBook = function(bookId){
        return books[getBookPosition(bookId)];
    };
    
    var getBookDetails = function(){
        return bookDetails;
    }
    
    var setBookDetails = function(book){
        bookDetails = book;
    }
    
    return {
        
        get: getBook,
        getDetails: getBookDetails,
        setDetails: setBookDetails
    }
});