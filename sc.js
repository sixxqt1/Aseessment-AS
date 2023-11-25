$(document).ready(function () {
    var itemQuantity = {};
    var initialItemPrices = {};

    function calculateTotalAfterTax(totalBeforeTax) {
        var tax = totalBeforeTax * 0.1;
        var totalAfterTax = totalBeforeTax + tax;
        return {
            tax: tax,
            totalAfterTax: totalAfterTax
        };
    }

    function updateTotal(total) {
        $('#totalAmount').text('Rp. ' + total.toLocaleString('id-ID'));
    }

    function updateTax(tax) {
        $('#taxDiscount').text('Rp. ' + tax.toLocaleString('id-ID'));
    }

    function updateTotalAmount(totalAmount) {
        $('#totalAmount').text('Rp. ' + totalAmount.toLocaleString('id-ID'));
    }

    function updateItemTotalPrice(formattedItemName) {
        var itemTotalPrice = initialItemPrices[formattedItemName] * itemQuantity[formattedItemName];
        $('#total_' + formattedItemName).text('Rp. ' + itemTotalPrice.toLocaleString('id-ID'));
    }

    function updateTotalAfterQuantityChange() {
        var totalPrice = 0;
        for (var item in itemQuantity) {
            totalPrice += initialItemPrices[item] * itemQuantity[item];
            updateItemTotalPrice(item);
        }

        var { tax, totalAfterTax } = calculateTotalAfterTax(totalPrice);
        updateTotal(totalPrice);
        updateTax(tax);
        updateTotalAmount(totalAfterTax);
    }

    // Event listener untuk tombol "Add"
    $('.btn-success').on('click', function () {
        var $clickedItem = $(this).closest('.card');
        var itemName = $clickedItem.find('.card-title').text().trim();
        var itemPriceText = $clickedItem.find('.card-text').text().trim();
        var itemPrice = parseFloat(itemPriceText.replace('Rp.', '').replace('.', '').replace(',', '.'));

        if (!isNaN(itemPrice)) {
            var formattedItemName = itemName.replace(/\s+/g, '_').toLowerCase();

            if (!itemQuantity[formattedItemName]) {
                itemQuantity[formattedItemName] = 1;
                initialItemPrices[formattedItemName] = itemPrice;
                var newElement = `
                    <li class="list-group-item">
                        <div class="barang">
                            <div class="detail-kiri">
                                <p>${itemName}</p>
                                <p class="normal">Unit Price: Rp. ${itemPrice.toLocaleString('id-ID')}</p>
                            </div>
                            <div class="detail-kanan">
                                <p style="text-align: right; font-size: small;"> <span class="item-total" id="total_${formattedItemName}">${itemPrice.toLocaleString('id-ID')}</span></p>
                                <p class="normal" style="display: flex; justify-content: space-between;">
                                    Quantity: <span class="stock" id="stock_${formattedItemName}">${itemQuantity[formattedItemName]}</span>
                                </p>
                            </div>
                            <button class="btn btn-danger remove">
                                <span class="material-symbols-outlined">Delete</span>
                            </button>
                        </div>
                    </li>
                `;
                $('#cart-list').append(newElement);
                updateTotalAfterQuantityChange();
            } else {
                itemQuantity[formattedItemName]++;
                $('#stock_' + formattedItemName).text(itemQuantity[formattedItemName]);
                updateItemTotalPrice(formattedItemName);
                updateTotalAfterQuantityChange();
            }
        } else {
            console.error('Harga item tidak valid');
        }
    });

    // Event listener untuk tombol "Remove"
    $('#cart-list').on('click', '.remove', function () {
        var $item = $(this).closest('.list-group-item');
        var itemName = $item.find('.detail-kiri p').first().text().trim();
        var formattedItemName = itemName.replace(/\s+/g, '_').toLowerCase();

        if (itemQuantity[formattedItemName] > 1) {
            itemQuantity[formattedItemName]--;
            $('#stock_' + formattedItemName).text(itemQuantity[formattedItemName]);
            updateItemTotalPrice(formattedItemName);
        } else {
            delete itemQuantity[formattedItemName];
            $item.remove();
        }

        updateTotalAfterQuantityChange();
    });

    // ... (kode lainnya)
});
