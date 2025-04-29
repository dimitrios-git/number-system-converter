jQuery(document).ready(function($) {
    $('#nsc-converter-form').on('submit', function(e) {
        e.preventDefault();

        var number = $('#nsc-input-number').val();
        var fromBase = parseInt($('#nsc-from-system').val());
        var toBase = parseInt($('#nsc-to-system').val());

        var result;

        try {
            // Validate if the input number is valid for the selected base
            var validNumberPattern;

            switch (fromBase) {
                case 2:
                    validNumberPattern = /^[01]+$/i; // Binary only allows 0 and 1
                    break;
                case 8:
                    validNumberPattern = /^[0-7]+$/i; // Octal only allows 0-7
                    break;
                case 10:
                    validNumberPattern = /^[0-9]+$/; // Decimal only allows 0-9
                    break;
                case 16:
                    validNumberPattern = /^[0-9A-F]+$/i; // Hexadecimal allows 0-9, A-F
                    break;
                default:
                    throw 'Unsupported base.';
            }

            if (!validNumberPattern.test(number)) {
                throw 'Invalid number for the selected base.';
            }

            // Convert the number from the source base to an integer
            var parsedNumber = parseInt(number, fromBase);

            // Convert the number to the target base
            result = parsedNumber.toString(toBase).toUpperCase();

            // Handle padding when converting to binary
            if (toBase === 2) {
                // Calculate the expected bit length based on the original input's length
                if (fromBase === 16) {
                    var expectedLength = number.length * 4; // 4 bits per hex digit
                } else if (fromBase === 8) {
                    var expectedLength = number.length * 3; // 3 bits per octal digit
                } else if (fromBase === 2) {
                    var expectedLength = number.length; // 1 bit per binary digit
                } else {
                    // For decimal, determine the binary length manually
                    var expectedLength = Math.ceil(Math.log2(parsedNumber + 1));
                }
                
                // Pad the result with leading zeros to match the expected length
                result = result.padStart(expectedLength, '0');
            }
        } catch (e) {
            result = e; // Display the error message
        }

        $('#nsc-result').text('Result: ' + result);
    });
});

