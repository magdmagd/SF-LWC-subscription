public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> findAccounts(String searchTerm) {
        return [
            SELECT Id, Name 
            FROM Account 
            WHERE Name LIKE :('%' + searchTerm + '%') 
            LIMIT 10
        ];
    }
}
