function plus_pressed() {
  var input = $(this).parent().parent().find('input');
  if (parseInt(input.val()) < 10) {
    input.val(parseInt(input.val()) + 1);
    recalculate();
  }
}

function minus_pressed() {
  var input = $(this).parent().parent().find('input');
  if (parseInt(input.val()) > 0) {
    input.val(parseInt(input.val()) - 1);
    recalculate();  
  }
}

function recalculate() {
  var subtotal = 0;
  $('.cost').each(function() {
    var tr = $(this).parent().parent();
    var qty = tr.find('input').val();
    //qty = parse
    var price = tr.find('.price').html();
    var cost = price * qty;
    subtotal = subtotal + cost;
    $(this).html(cost.toFixed(2));
  });

  $('.subtotal').html(subtotal.toFixed(2));
  var vat = subtotal * 0.2;
  $('.vat').html(vat.toFixed(2));
  var total_cost = subtotal + vat;
  $('.total-cost').html(total_cost.toFixed(2));
  if (total_cost == 0) {
    $('.button').prop("disabled", true);
  } else {
    $('.button').prop("disabled", false);
  }
}

function validate_qty() {
  var val = $(this).val();
  var intVal = parseInt(val);

  if (intVal != val && val) {
    $(this).val(intVal);
  }
  if (intVal > 10) {
    $(this).val(10);
  }
  if (intVal < 0) {
    $(this).val(0);
  }
  recalculate();
}

function basket_pressed() {
  $(this).parent().parent().remove();
  recalculate();
}

$(function() {
  $('.plus').click(plus_pressed);
  $('.minus').click(minus_pressed);
  $('.qty').keyup(validate_qty);
  $('.basket').click(basket_pressed);
  recalculate();
  $("#basket-form").submit(function(event) {
    event.preventDefault();
    $.ajax({url: "", data: $(this).serialize()}).done(function() {
      alert("AJAX request sent!");
    });
  });
})