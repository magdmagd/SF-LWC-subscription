public with sharing class ProductController {
    @AuraEnabled(cacheable=true)
    public static List<Product2> findProducts(String searchTerm) {
        return [
            SELECT Id, Name 
            FROM Product2 
            WHERE Name LIKE :('%' + searchTerm + '%') 
            LIMIT 10
        ];
    }
}