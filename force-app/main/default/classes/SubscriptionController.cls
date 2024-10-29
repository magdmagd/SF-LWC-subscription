public with sharing class SubscriptionController 
{
    @AuraEnabled
    public static String createSubscription(Subscription__c subscription) 
    {
        // Duplicate check
        List<Subscription__c> existingSubscriptions = [
            SELECT Name
            FROM Subscription__c 
            WHERE Account__c = :subscription.Account__c 
            AND Product__c = :subscription.Product__c 
            AND Tier__c = :subscription.Tier__c
        ];
        if (!existingSubscriptions.isEmpty()) {
            return 'A subscription for this account, product, and tier already exists.';
        }

        try 
        {
            insert subscription;
            return 'Subscription created successfully.';
        } catch (Exception e) 
        {
            return 'Error creating subscription: ' + e.getMessage();
        }
    }

     // Method to fetch subscriptions based on the name (since no ID field)
     @AuraEnabled(cacheable=true)
     public static List<Subscription__c> getSubscriptionsByName(String name) 
     {
         try
          {
             List<Subscription__c> subscriptions = 
             [
                 SELECT Name, Subscription_Type__c, Value__c, Currency__c, Tier__c, Description__c, Account__c, Product__c
                 FROM Subscription__c
                 WHERE Name = :name
             ];
              return subscriptions;
        } 
        catch (Exception e) {
             System.debug('Error fetching subscriptions: ' + e.getMessage());
             return new List<Subscription__c>();
         }


    }

    


}