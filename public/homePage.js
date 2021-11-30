
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
            response.success ? "Ваш счет был успешно пополнен" : "Произошла ошибка. Ваш счет не был пополнен.");
    });
}

newMoneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) ProfileWidget.showProfile(response.data); 
        newMoneyManager.setMessage(response.success, 
            response.success ? "Конвертация прошла успешно" : "Произошла ошибка. Конвертация не была произведена");
        
    });
}

newMoneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success)  ProfileWidget.showProfile(response.data); 
        newMoneyManager.setMessage(response.success,
            response.success ?  "Ваш перевод был успешно отправлен" : "Произошла ошибка. Ваш перевод не был отправлен");
        
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
            newMoneyManager.setMessage(response.success,
                response.success ? "Пользователь был успешно добавлен" : "Произошла ошибка. Пользователь не был добавлен");
    });
}

newFavoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
         if (response.success) {
            newFavoritesWidget.clearTable();
            newFavoritesWidget.fillTable(response.data);
            newMoneyManager.updateUsersList(response.data);
         }
            newMoneyManager.setMessage(response.success, 
                response.success ? "Пользователь был успешно удален" : "Произошла ошибка. Пользователь не был удален");
    });
} 


currentStocks();

setInterval(currentStocks, 60000);