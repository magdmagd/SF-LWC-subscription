public with sharing class SubscriptionController {

    // Method to create a new Subscription record
    @AuraEnabled
    public static String createSubscription(Subscription__c subscription) {
        try {
            // Insert the new subscription record into Salesforce
            insert subscription;
            return subscription.Name;
        } catch (Exception ex) {
            throw new AuraHandledException('Error creating subscription: ' + ex.getMessage());
        }
    }

    // Existing method to retrieve subscription details
    @AuraEnabled(cacheable=true)
    public static Subscription__c getSubscriptionDetails(String subscriptionName) {
        try {
            return [
                SELECT Name, Subscription_Type__c, Value__c, Currency__c, Tier__c, 
                       Description__c, Product__r.Name, Account__r.Name 
                FROM Subscription__c
                WHERE Name = :subscriptionName
                LIMIT 1
            ];
        } catch (Exception ex) {
            throw new AuraHandledException('Error fetching subscription: ' + ex.getMessage());
        }
    }

    // Existing method to fetch all subscriptions related to a specific Account
    @AuraEnabled(cacheable=true)
    public static List<Subscription__c> getSubscriptionsByAccount(Id accountId) {
        try {
            return [
                SELECT Id, Subscription_Type__c, Value__c, Currency__c, Tier__c, 
                       Description__c, Product__r.Name, Account__r.Name 
                FROM Subscription__c
                WHERE Account__c = :accountId
            ];
        } catch (Exception ex) {
            throw new AuraHandledException('Error fetching subscriptions: ' + ex.getMessage());
        }
    }
}
