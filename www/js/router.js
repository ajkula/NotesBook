var app = angular.module('notebook');

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('list', {
        url: '/list',
        templateUrl: 'templates/list.html',
        controller: 'listController'
    });

    $stateProvider.state('edit', {
        url: '/edit/:id',
        templateUrl: 'templates/edit.html',
        controller: 'editController'
    });

    $stateProvider.state('add', {
        url: '/add',
        templateUrl: 'templates/edit.html',
        controller: 'addController'
    });
    
    $stateProvider.state('books', {
        url: '/books',
        templateUrl: 'templates/books.html',
        controller: 'booksController'
    });
    
    $stateProvider.state('details', {
        url: '/details',
        templateUrl: 'templates/details.html',
        controller: 'detailsController'
    });
    
    //Route par défaut
    $urlRouterProvider.otherwise('/list');
});


