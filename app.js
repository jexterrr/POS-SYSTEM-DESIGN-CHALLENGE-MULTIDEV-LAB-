$(document).ready(function () {
    var cardCounter = 2; //kaya 2 to nag start kasi number 1 na yung parent card :)
    var orderId,
        orderQuantity,
        totalOrders = 0;

    $(document).on("click", ".AddOrder", function () {
        var selectedOrder = $(this)
            .closest(".card")
            .find("select[name='orders']")
            .val();
        var quantity = $(this).closest(".card").find(".quantity").val();

        //console.log("Selected order:", selectedOrder);
        //console.log("Quantity:", quantity);

        if (selectedOrder && quantity) {
            var cardId = "card_" + cardCounter++;
            var orderForm = $(this)
                .closest(".card")
                .find(".card-body.lagayan .card:first-child")
                .clone();
            orderForm.attr("id", cardId);
            $(this)
                .closest(".card")
                .find(".card-body.lagayan")
                .append(orderForm);

            orderForm.find("select[name='orders']").val("");
            orderForm.find(".quantity").val("");
        } else {
            alert("Please select an order and enter a quantity.");
        }

        $(".card-body.lagayan .card").each(function () {
            orderId = $(this).find("select[name='orders']").val();
            orderQuantity = $(this).find(".quantity").val();

            if (orderId && orderQuantity) {
                var price = parseFloat(
                    $(this)
                        .find("select[name='orders'] option:selected")
                        .val()
                        .replace("₱", "")
                );

                if (!isNaN(price)) {
                    var subtotal = parseFloat(price) * parseInt(orderQuantity);
                    totalOrders += subtotal;
                }
            }

            console.log("Card ID:", $(this).attr("id"));
            console.log("Order:", orderId);
            console.log("Quantity:", orderQuantity);
        });
        $(".Total").val("₱ " + totalOrders.toFixed(2));
        console.log("Subtotal:", totalOrders.toFixed(2));
    });

    $(document).on("click", ".pay", function () {
        var bayad = parseFloat($(".bayad").val());
        var remainingBalance;

        if (!isNaN(bayad)) {
            remainingBalance = totalOrders - bayad;

            if (remainingBalance === 0.0) {
                $(".Total").val("₱ " + remainingBalance.toFixed(2));
                alert(
                    "Thank you! After confirming this page will reload in 3 seconds."
                );
                $(".bayad").val("");
                setTimeout(function () {
                    location.reload();
                }, 3000);
            } else if (remainingBalance < 0) {
                alert(
                    "Kuya, Ate, puwede po sakto lang ibayad ni'yo? walang panukli 😂😂😂"
                );
            }
        } else {
            alert("Please enter a valid payment amount.");
        }
    });
});
