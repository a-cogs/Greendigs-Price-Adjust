const ready = (elem, callback) => {
    let loaded = setInterval(() => {
        if ( document.querySelectorAll(elem).length ) {
            clearInterval(loaded);
            callback();
        }
    }, 100);
}

ready('.product-grid > div.grid-footer', () => {
    const $ = jQuery;

    // PRICE ADJUST FUNCTION
    const daPrices = () => {
        const cProds = document.querySelectorAll('.product-grid > div:not(.grid-footer)');

        cProds.forEach(function(prod, i){
            /*** Skip products that have already been adjusted ***/
            if ( prod.matches('.da-price') ) return;

            prod.classList.add('da-price');
            /*** Check for range, then adjust accordingly ***/
            const range = prod.querySelector('.range');
            if ( range ) {
                const from = range.querySelector('span:first-child');
                range.innerHTML = from.innerHTML;
            } else {
                const from = prod.querySelector('.c-product-tile__body__price__text');
                from.parentNode.removeChild(from);
            }
        });
    }

    // RUN FUNCTION ON LOAD AND AGAIN ON MUTATION
    daPrices();

    let mList = document.querySelector('.product-grid'),
        options = {
            childList: true
        },
        observer = new MutationObserver(mCallback);
    
    function mCallback(mutations) {
        for (let mutation of mutations) {
            if (mutation.type === 'childList') {
                daPrices();
            }
        }
    }
    
    observer.observe(mList, options);
});