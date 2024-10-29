import { LightningElement, api, track } from 'lwc';
import findProducts from '@salesforce/apex/ProductController.findProducts';

export default class ProductLookup extends LightningElement {
    @api label = 'Product Lookup';
    @track searchTerm = '';
    @track products;
    @track error;

    handleSearchChange(event) {
        this.searchTerm = event.target.value;
        if (this.searchTerm.length >= 2) {
            findProducts({ searchTerm: this.searchTerm })
                .then(result => {
                    this.products = result;
                    this.error = undefined;
                })
                .catch(error => {
                    this.error = error.body.message;
                    this.products = undefined;
                });
        } else {
            this.products = undefined;
        }
    }

    handleProductSelect(event) {
        const productId = event.target.dataset.id;
        const selectEvent = new CustomEvent('select', { detail: { productId } });
        this.dispatchEvent(selectEvent);
    }
}
