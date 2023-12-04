/* File: ~/script.js
  Homework 4: Creating an Interactive Dynamic Table
  Modib Qadir, UMass Lowell Computer Science, Modib_qadir@student.uml.edu
  Copyright (c) 2023 by Modib Qadir. All rights reserved. May be freely copied or
  excerpted for educational purposes with credit to the author.
  Updated by MQ on November 28th, 2023.
 */

  $(document).ready(function () {
    // Initialize sliders and sync with input fields

    $("#tabs").tabs();

    slider();

    function slider(){
        $("#startHorizontalSlider").slider({
            min: -50,
            max: 50,
            slide: function(event, ui) {
                validate();
                createTable();
            }
        });
    
        $("#endHorizontalSlider").slider({
            min: -50,
            max: 50,
            slide: function(event, ui) {
                validate();
                createTable();
            }
        });
        $("#startVerticalSlider").slider({
            min: -50,
            max: 50,
            slide: function(event, ui) {
                validate();
                createTable();
            }
        });
        $("#endVerticalSlider").slider({
            min: -50,
            max: 50,
            slide: function(event, ui) {
                validate();
                createTable();
            }
        });
    
    }
    
    function bindSliderToInput(sliderId, inputId) {
        $(`#${sliderId}`).on("slide", function(event, ui) {
            $(`#${inputId}`).val(ui.value);
            validate();
            createTable();
        });
    }
    
    bindSliderToInput("startHorizontalSlider", "startHorizontal");
    bindSliderToInput("endHorizontalSlider", "endHorizontal");
    bindSliderToInput("startVerticalSlider", "startVertical");
    bindSliderToInput("endVerticalSlider", "endVertical");
    
    function bindInputToSlider(inputId, sliderId) {
        $(`#${inputId}`).on("change", function() {
            $(`#${sliderId}`).slider("value", $(this).val());
        });
    }
    
    bindInputToSlider("startHorizontal", "startHorizontalSlider");
    bindInputToSlider("endHorizontal", "endHorizontalSlider");
    bindInputToSlider("startVertical", "startVerticalSlider");
    bindInputToSlider("endVertical", "endVerticalSlider");   
    
    

});



function validate(){

    $.validator.addMethod("greaterThanStartHorizontal", function(value, element) {
        var startHorizontal = parseInt($('#startHorizontal').val());
        return parseInt(value) >= startHorizontal;
    }, "Maximium Column Value must be greater than Minimum Column Value");

    $.validator.addMethod("greaterThanStartVertical", function(value, element) {
        var startVertical = parseInt($('#startVertical').val());
        return parseInt(value) >= startVertical;
    }, "Maximum Row Value must be greater than Minimum Row Value");

    $("#multiplicationForm").validate({
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

function createTable() {
    // Gets values from the form
    const startHorizontal = parseInt($("#startHorizontal").val());
    const endHorizontal = parseInt($("#endHorizontal").val());
    const startVertical = parseInt($("#startVertical").val());
    const endVertical = parseInt($("#endVertical").val());

    // Validates the form
    validate();

    if ($("#multiplicationForm").valid()) {
        const tabContent = buildTableHTML(startHorizontal, endHorizontal, startVertical, endVertical);
        $("#tableContainer").html(tabContent);
        // Unhide the table when there are no validation errors
        $("#tableContainer").css("display", "block");
    } else {
        // If validation fails, hide the table
        $("#tableContainer").css("display", "none");
    }
}


function createNewTab(startHorizontal, endHorizontal, startVertical, endVertical) {
    const tabTitle = `(${startHorizontal})-(${endHorizontal})-(${startVertical})-(${endVertical})`;

    const existingTab = $(`#tabs a:contains('${tabTitle}')`);
    if (existingTab.length) {
        // Set the active tab index to the existing tab's index
        $("#tabs").tabs("option", "active", existingTab.parent().index());
    } else {
        const tabId = `tabs-${tabTitle}`;
        const tabContent = buildTableHTML(startHorizontal, endHorizontal, startVertical, endVertical);
        
        // Create a new tab with a delete button
        const tabElement = $(`<div id="${tabId}" class="scrollable-tab-content">${tabContent}</div>`);
        const tabTitleElement = $('<li><a href="#' + tabId + '">' + tabTitle + '</a></li>');
        const deleteButton = $('<span class="ui-icon ui-icon-close delete-tab-button" role="presentation">Remove Tab</span>');

        deleteButton.appendTo(tabTitleElement);
        tabTitleElement.appendTo('#tabs ul');
        tabElement.appendTo('#tabs');
        
        $("#tabs").tabs("refresh");
        // Set the active tab index to the newly created tab's index
        $("#tabs").tabs("option", "active", -1);
    }
}

//Realized I had some issues with my Id not working so did some research and found out that I needed to escape a special characters so I found this link
//https://stackforgeeks.com/blog/need-to-escape-a-special-character-in-a-jquery-selector-string that helped me figure out a way to avoid any issues. 
$("#tabs").on("click", "span.ui-icon-close", function() {
    var tID = $(this).closest("li").remove().attr("aria-controls");
    tID = tID.replace(/(:|\.|\[|\]|,|=|@|\(|\))/g, "\\$1"); // Escape special characters
    $("#" + tID).remove();
    $("#tabs").tabs("refresh");
});

function deleteTabs() {
    $("#tabs ul li").remove();
    $("#tabs div").remove();
    $("#tabs").tabs("refresh");
}

$("#multiplicationForm input").on("input", function () {
    createTable();
});

const saveTableBtn = document.querySelector('button');
saveTableBtn.addEventListener('click', function (event) {
    event.preventDefault();
    
    const startHorizontal = parseInt($("#startHorizontal").val());
    const endHorizontal = parseInt($("#endHorizontal").val());
    const startVertical = parseInt($("#startVertical").val());
    const endVertical = parseInt($("#endVertical").val());
    const currentTabIndex = $("#tabs").tabs("option", "active"); // Get the current table index

    // Call createNewTab with the correct parameters
    createNewTab(startHorizontal, endHorizontal, startVertical, endVertical);

    $("#tabs").tabs("option", "active", currentTabIndex);

});


      