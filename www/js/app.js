// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('notebook', ['ionic', 'notebook.factories', 'bookSearch.factories']);

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.controller('listController', function($scope, noteStore, $state) {
    //Récupération de la liste des notes depuis l'objet noteStore
    $scope.notes = noteStore.list();

    $scope.remove = function(noteId) {
        noteStore.remove(noteId);
        $scope.notes = noteStore.list();
    };

    $scope.goBooks = function() {
        $state.go('books');
    };
});

app.controller('editController', function($scope, $state, noteStore) {
    var noteId = $state.params.id;
    $scope.note = noteStore.get(noteId);

    $scope.saveNote = function() {
        noteStore.update($scope.note);
        $state.go('list');
    };
    
    i=0;
    $scope.switchColors = function($scope, noteStore){
        tableau = ['white','#91E4FF','#FFB3D9','#EDC9FF','#F2EF8F'];
        
        if (i<4){
            $scope.note.color = tableau[i];
            
            i++;
        } else {
            i=0;
        }
        console.log($scope.note);
        console.log(tableau[i]);
        
        $scope.saveNote = function() {
        noteStore.update($scope.note);
        $state.go('edit');
    };
        
    };

});

app.controller('addController', function($scope, noteStore, $state) {
    $scope.note = {
        id: null,
        titre: null,
        texte: null,
        color: 'white'
    };

    $scope.saveNote = function() {
        noteStore.create($scope.note);
        $state.go('list');
    };
});

app.controller('booksController', function($scope, bookStore, $http, $state) {
    $scope.books = [];

    $scope.livres = function() {
        $http.get('https://www.googleapis.com/books/v1/volumes?q=' + this.subject + '&langRestrict=french&projection=lite')
                .then(function success(response) {
                    $scope.books = response.data.items;
                    console.log($scope.books);
                });
        $scope.search = function() {
            subject.create($scope.subject);
            $state.go('books');
        };

        $scope.details = function(pos) {
            var book = $scope.books[pos];
            bookStore.setDetails(book);
            //var bookId = $state.book.id;
            //$scope.book = bookStore.get(bookId);
            //subject.create($scope.book);
            $state.go('details');
            console.log(book);
            
        };
    };
});

app.controller('detailsController', function($scope, bookStore) {
    $scope.details = bookStore.getDetails();
});


