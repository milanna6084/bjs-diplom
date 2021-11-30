'use strict';

let newUser = new UserForm();

newUser.loginFormCallback = (data => {
    ApiConnector.login(data, response => {
        console.log(response);
        response.success 
            ? location.reload()
            : newUser.setLoginErrorMessage(response.error);
    });
});

newUser.registerFormCallback = (data => {
    ApiConnector.register(data, response => {
        console.log(response);
        (response.success) 
            ? location.reload()
            : newUser.setRegisterErrorMessage(response.error)
    });
});