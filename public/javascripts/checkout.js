var stripe = Stripe('pk_test_Hc6Yu7DPQr0FszXslAuv9C2W');
var elements = stripe.elements();

// Customizing Card Elements  when creating component
var card = elements.create('card', {
  'style': {
    'base': {
      'fontFamily': 'Century Gothic, sans-serif',
      'fontSize': '13px',
      'fontSmoothing': 'antialiased',
      'color': '#C1C7CD',
      'iconColor': '#000',
    },
    '::placeholder': {
      color: '#ccc',
    },
    'invalid': {
      'color': 'red',
    },
  }
});

// Add an instance of the card UI component into the `card-element` <div>
card.mount('#card-element');

function stripeTokenHandler(token) {
  // Insert the token ID into the form so it gets submitted to the server
  var form = document.getElementById('payment-form');
  var hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
}

function createToken() {
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Inform the user if there was an error
      var errorElement = document.getElementById('card-errors');
      errorElement.textContent = result.error.message;
    } else {
      // Send the token to your server
      stripeTokenHandler(result.token);
    }
  });
};

// Create a token when the form is submitted.
var form = document.getElementById('payment-form');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  createToken();
});

// Handle Event & Errors
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});
