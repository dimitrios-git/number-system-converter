<?php
/**
 * Plugin Name: Number System Converter
 * Description: A plugin to convert between number systems (decimal, binary, octal, hexadecimal).
 * Version: 1.0
 * Author: Dimitrios Charalampidis
 */

// Enqueue the styles
function number_system_converter_enqueue_styles() {
    wp_enqueue_style('number-system-converter-css', plugins_url('/style.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'number_system_converter_enqueue_styles');

// Shortcode function for number system converter form
function nsc_number_system_converter_form() {
    ob_start();
    ?>
    <div class="number-system-converter">
        <form id="nsc-converter-form">
            <label for="nsc-input-number">Enter Number:</label>
            <input type="text" id="nsc-input-number" required>
            
            <label for="nsc-from-system">Convert from:</label>
            <select id="nsc-from-system">
                <option value="10">Decimal</option>
                <option value="2">Binary</option>
                <option value="8">Octal</option>
                <option value="16">Hexadecimal</option>
            </select>
            
            <label for="nsc-to-system">Convert to:</label>
            <select id="nsc-to-system">
                <option value="10">Decimal</option>
                <option value="2">Binary</option>
                <option value="8">Octal</option>
                <option value="16">Hexadecimal</option>
            </select>
            
            <button type="submit">Convert</button>
        </form>
        
        <p id="nsc-result">Result: <span></span></p>
    </div>
    <?php
    return ob_get_clean();
}

// Register the shortcode
add_shortcode('number_system_converter', 'nsc_number_system_converter_form');

// Enqueue JavaScript
function nsc_enqueue_scripts() {
    wp_enqueue_script('number-system-converter-js', plugins_url('/number-system-converter.js', __FILE__), array('jquery'), null, true);
}
add_action('wp_enqueue_scripts', 'nsc_enqueue_scripts');

