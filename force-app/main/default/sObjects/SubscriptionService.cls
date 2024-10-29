public with sharing class SubscriptionService {
    
    // Create records
    public static void createProducts(List<Product2> products) {
        insert products;
    }

    public static void createAccounts(List<Account> accounts) {
        insert accounts;
    }

    public static void createSubscriptions(List<Subscription__c> subscriptions) {
        insert subscriptions;
    }

    // Read records
    public static List<Product2> getProductsByIds(Set<Id> productIds) {
        return [SELECT Id, Name FROM Product2 WHERE Id IN :productIds];
    }

    public static List<Account> getAccountsByIds(Set<Id> accountIds) {
        return [SELECT Id, Name  FROM Account WHERE Id IN :accountIds];
    }

    public static List<Subscription__c> getSubscriptionsByIds(Set<Id> subscriptionIds) {
        return [SELECT  Name, Account__c, Product__c, Tier__c /* Add more fields as needed */ 
                FROM Subscription__c WHERE Id IN :subscriptionIds];
    }

    // Update records
    public static void updateProducts(List<Product2> products) {
        update products;
    }

    public static void updateAccounts(List<Account> accounts) {
        update accounts;
    }

    public static void updateSubscriptions(List<Subscription__c> subscriptions) {
        update subscriptions;
    }

    // Delete records
    public static void deleteProducts(List<Product2> products) {
        delete products;
    }

    public static void deleteAccounts(List<Account> accounts) {
        delete accounts;
    }

    public static void deleteSubscriptions(List<Subscription__c> subscriptions) {
        delete subscriptions;
    }
}
