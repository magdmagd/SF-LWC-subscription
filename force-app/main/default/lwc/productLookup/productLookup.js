import { LightningElement, track, wire, api } from 'lwc';
import findProducts from '@salesforce/apex/ProductController.findProducts'; // Apex method

export default class ProductLookup extends LightningElement {
    @api label; // Label for the lookup field
    @api value; // Selected value (Product Id)
    @track productOptions = [];

    handleSelect(event) {
        this.value = event.detail.value;

        // Dispatch event to notify parent of the selected Product
        const selectedEvent = new CustomEvent('select', {
            detail: { value: this.value }
        });
        this.dispatchEvent(selectedEvent);
    }

    @wire(findProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.productOptions = data.map(product => {
                return { label: product.Name, value: product.Id };
            });
        } else if (error) {
            this.productOptions = [];
            console.error('Error fetching products:', error);
        }
    }
}
