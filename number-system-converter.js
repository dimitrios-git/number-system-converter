jQuery(document).ready(function($) {
    $('#nsc-form').on('submit', function(e) {
      e.preventDefault();
      
      const nonce = $('#nsc_nonce_field').val();
      if (!nonce) {
        alert('Security error: Missing nonce.');
        return;
      }

      const number = $('#nsc-input-number').val().trim();
      const fromBase = parseInt($('#nsc-from-system').val());
      const toBase = parseInt($('#nsc-to-system').val());
      const $result = $('#nsc-result span');

      let output;
      
      try {
        if (!number) {
          throw new Error('Please enter a number.');
        }
        
        // Define valid patterns
        const patterns = {
          2: /^[01]+$/i,
          8: /^[0-7]+$/i,
          10: /^[0-9]+$/,
          16: /^[0-9A-F]+$/i
        };
        
        if (!patterns[fromBase]) {
          throw new Error('Unsupported base selected.');
        }
        
        if (!patterns[fromBase].test(number)) {
          throw new Error('Invalid number format for the selected base.');
        }
        
        // Perform conversion
        const parsedNumber = parseInt(number, fromBase);
        let result = parsedNumber.toString(toBase).toUpperCase();
        
        // Pad binary results
        if (toBase === 2) {
          let expectedLength;
          if (fromBase === 16) {
            expectedLength = number.length * 4;
          } else if (fromBase === 8) {
            expectedLength = number.length * 3;
          } else if (fromBase === 2) {
            expectedLength = number.length;
          } else {
            expectedLength = Math.ceil(Math.log2(parsedNumber + 1));
          }
          result = result.padStart(expectedLength, '0');
        }
        
        output = `Result: ${result}`;
        $result.removeClass('nsc-error').addClass('nsc-success');
      } catch (err) {
        output = `Error: ${err.message}`;
        $result.removeClass('nsc-success').addClass('nsc-error');
      }
      
      $result.text(output);
    });
});

