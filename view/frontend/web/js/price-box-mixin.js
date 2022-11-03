(function () {
    'use strict';

    $.mixin('priceBox', {
        reloadPrice: function (original) {
            var priceFormat = (this.options.priceConfig && this.options.priceConfig.priceFormat) || {},
                priceTemplate = _.template(this.options.priceTemplate);

            _.each(this.cache.displayPrices, function (price, priceCode) {
                price.final = _.reduce(price.adjustments, function (memo, amount) {
                    return memo + amount;
                }, price.amount);

                price.formatted = $.catalog.priceUtils.formatPrice(price.final, priceFormat);

                $('[data-price-type="' + priceCode + '"]', this.element).html(priceTemplate({
                    data: price
                }));
                if (priceCode == 'finalPrice') {
                    let element = this.element;
                    $('body').trigger('afterReloadPrice', {price, element});
                }
            }, this);
        }
    });
})();
