trigger uniqueSub on Subscription__c (before insert , before update)
{
   Set<String> subscriptionKeys = new Set<String>();

    for (Subscription__c subscription : Trigger.new)
    {
        if(subscription.Account__c != null && subscription.Product__c != null && subscription.Tier__c != null) {
            String uniqueKey = subscription.Account__c + '-' + subscription.Product__c + '-' + subscription.Tier__c;
            
            if (subscriptionKeys.contains(uniqueKey)) {
                subscription.addError('Duplicate subscription detected: Same account, product, and tier combination.');
            } else {
                subscriptionKeys.add(uniqueKey);
            }
        }
    }//end for
    
    List<Subscription__c> existingSubscriptions = [
        SELECT Id, Account__c, Product__c, Tier__c
        FROM Subscription__c
        WHERE Account__c IN :Trigger.newMap.keySet() 
        AND Product__c IN :Trigger.newMap.keySet()
        AND Tier__c IN :Trigger.newMap.keySet()
    ];

    for (Subscription__c existing : existingSubscriptions) {
        for (Subscription__c subscription : Trigger.new) {
            if(subscription.Account__c == existing.Account__c && 
               subscription.Product__c == existing.Product__c && 
               subscription.Tier__c == existing.Tier__c) {
                subscription.addError('Duplicate subscription detected: Same account, product, and tier combination.');
            }
        }
    }
}