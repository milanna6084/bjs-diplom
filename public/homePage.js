'use strict';
const newLogoutButton = new LogoutButton();
const newRatesBoard = new RatesBoard();
const newMoneyManager = new MoneyManager();
const newFavoritesWidget = new FavoritesWidget();

newLogoutButton.action = () => {
    ApiConnector.logout (response => {
        if (response.success) location.reload();
    });
}

ApiConnector.current(response => {
    if (response.success) ProfileWidget.showProfile(response.data);
});

function currentStocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            newRatesBoard.clearTable();
            newRatesBoard.fillTable(response.data);
            console.log(response);
        }
    });
}

newMoneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success)  ProfileWidget.showProfile(response.data); 
        newMoneyManager.setMessage(response.success, 
            response.success ? "Ваш счет был успешно пополнен" : response.error);
    });
}

newMoneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) ProfileWidget.showProfile(response.data); 
        newMoneyManager.setMessage(response.success, 
            response.success ? "Конвертация прошла успешно" : response.error);
        
    });
}

newMoneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success)  ProfileWidget.showProfile(response.data); 
        newMoneyManager.setMessage(response.success,
            response.success ?  "Ваш перевод был успешно отправлен" : response.error);
        
    });
}

ApiConnector.getFavorites(response => {
    if (response.success) {
         newFavoritesWidget.clearTable();
         newFavoritesWidget.fillTable(response.data);
         newMoneyManager.updateUsersList(response.data)
    }
});

newFavoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
         if (response.success) {
            newFavoritesWidget.clearTable();
            newFavoritesWidget.fillTable(response.data);
            newMoneyManager.updateUsersList(response.data);
         }
            newFavoritesWidget.setMessage(response.success,
                response.success ? "Пользователь был успешно добавлен" : response.error);
    });
}

newFavoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
         if (response.success) {
            newFavoritesWidget.clearTable();
            newFavoritesWidget.fillTable(response.data);
            newMoneyManager.updateUsersList(response.data);
         }
            newFavoritesWidget.setMessage(response.success, 
                response.success ? "Пользователь был успешно удален" : response.error);
    });
    
} 


currentStocks();

setInterval(currentStocks, 60000);