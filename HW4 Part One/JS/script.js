/* File: ~/script.js
  Homework 4: Creating an Interactive Dynamic Table
  Modib Qadir, UMass Lowell Computer Science, Modib_qadir@student.uml.edu
  Copyright (c) 2023 by Modib Qadir. All rights reserved. May be freely copied or
  excerpted for educational purposes with credit to the author.
  Updated by MQ on November 28th, 2023.
 */

$(document).ready(function () {

    $.validator.addMethod("greaterThanStartHorizontal", function(value, element) {
        var startHorizontal = parseInt($('#startHorizontal').val());
        return parseInt(value) >= startHorizontal;
    }, "Maximium Column Value must be greater than Minimum Column Value");

    $.validator.addMethod("greaterThanStartVertical", function(value, element) {
        var startVertical = parseInt($('#startVertical').val());
        return parseInt(value) >= startVertical;
    }, "Maximum Row Value must be greater than Minimum Row Value");

    $("#multiplicationForm").validate({
        // Define validation rules and messages for each input field
        rules: {
            startHorizontal: {
                required: true,
                min: -50,
                max: 50
            },
            endHorizontal: {
                required: true,
                min: -50,
                max: 50,
                greaterThanStartHorizontal: true
            },
            startVertical: {
                required: true,
                min: -50,
                max: 50
            },
            endVertical: {
                required: true,
                min: -50,
                max: 50,
                greaterThanStartVertical: true
            }
        },
        messages: {
            // Define error messages for each input field
            startHorizontal: {
                required: "Please enter a valid number.",
                min: "Number must be Greater than -50.",
                max: "Number must be Less than 50."
            },
            endHorizontal: {
                required: "Please enter a valid number.",
                min: "Number must be Greater than -50.",
                max: "Number must be Less than 50."
            },
            startVertical: {
                required: "Please enter a valid number.",
                min: "Number must be Greater than -50.",
                max: "Number must be Less than 50."
            },
            endVertical: {
                required: "Please enter a valid number.",
                min: "Number must be Greater than -50.",
                max: "Number must be Less than 50."
            }
        },
        highlight: function(element) {
            $(element).css('border', '2px solid red');
        }, 
        unhighlight: function(element) {
            $(element).css('border', '');
        }
    });
});

 // Function to generate the multiplication table
function generateTable() {
    // Check if the form is valid
    if ($("#multiplicationForm").valid()) {
        const startHorizontal = parseInt($("#startHorizontal").val());
        const endHorizontal = parseInt($("#endHorizontal").val());
        const startVertical = parseInt($("#startVertical").val());
        const endVertical = parseInt($("#endVertical").val());

        clearResults();

        const table = document.getElementById('multiplicationTable');
        const tableHTML = buildTableHTML(startHorizontal, endHorizontal, startVertical, endVertical);
        table.innerHTML = tableHTML;
    }
}

// Function to clear results and error messages
function clearResults() {
    const table = document.getElementById('multiplicationTable');
    table.innerHTML = '';
}

// Function to build the multiplication table HTML
function buildTableHTML(startHorizontal, endHorizontal, startVertical, endVertical) {
    let tableHTML = '<table>';

    tableHTML += '<tr><th></th>';
    for (let i = startHorizontal; i <= endHorizontal; i++) {
        tableHTML += `<th>${i}</th>`;
    }
    tableHTML += '</tr>';

    for (let i = startVertical; i <= endVertical; i++) {
        tableHTML += '<tr>';
        tableHTML += `<th>${i}</th>`;
        for (let j = startHorizontal; j <= endHorizontal; j++) {
            tableHTML += `<td>${i * j}</td>`;
        }
        tableHTML += '</tr>';
    }

    tableHTML += '</table>';
    return tableHTML;
}

// Attach the generateTable function to the click event of the "Generate" button
const generateButton = document.querySelector('button');
generateButton.addEventListener('click', generateTable);
