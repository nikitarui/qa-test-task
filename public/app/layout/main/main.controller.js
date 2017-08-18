class MainController {

	static get $inject () { return ['AuthService'] }

	constructor (AuthService) {
		this.AuthService = AuthService;
		this.user = AuthService.user;
		this.failMessage = '';
	}

	logout () {
		this.AuthService
			.logout()
			.catch(error => this.failMessage = error.message)
	}
}

angular
    .module('app')
    .controller('MainController', MainController);
