/* public/js/preferences.js */

const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const buttonNext = document.getElementById('button-next'); 
const buttonNextList = document.querySelectorAll('.click-next');
const buttonBack = document.getElementById('button-back'); 
const buttonClose = document.getElementById('button-close'); 
const optionsSelected = [];

let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active");
});
let el = "progress-step-1";

// If no active step is found, start at the first step
if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}

buttonNextList.forEach(button => {
    button.addEventListener("click", e => {
        currentStep += 1; // Or however you want to handle step increments
        showCurrentStep();
    });
});

// Attach event listeners to inputs to track changes
formSteps.forEach((step, index) => {
    const inputs = step.querySelectorAll("input[type='radio'], input[type='checkbox']");
    inputs.forEach(input => {
        input.addEventListener('change', () => {
            console.log(`Input changed on step ${index}`);
            if (!optionsSelected.includes(currentStep)) {
                optionsSelected.push(currentStep);
                console.log(`Added step ${currentStep} to optionsSelected.`);
            }
            buttonNext.disabled = false;  // Enable the button when an option is selected
        });
    });
});

// Event listener for the "Back" button
buttonBack.addEventListener("click", (e) => {
    console.log("Back button clicked");

    let incrementor = -1;

    if (incrementor == null) return;

    const inputs = [...formSteps[currentStep].querySelectorAll("input")];
    const allValid = inputs.every(input => input.reportValidity());
    if (allValid) {
        currentStep += incrementor;
        console.log(`Moved back to step ${currentStep}`);
        showCurrentStep();
    }
});

// Event listener for the "Close" button
buttonClose.addEventListener("click", (e) => {
    console.log("Close button clicked. Redirecting to home.");
    window.location.href = "/";
});

// Function to show the current step and update button states
function showCurrentStep() {
    console.log(`Showing step: ${currentStep}`);

    // Toggle the visibility of steps
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep);
        console.log(`Step ${index} is ${index === currentStep ? "active" : "inactive"}`);
    });

    // Update next button state based on selection for the current step
    if (optionsSelected.includes(currentStep)) {
        buttonNext.disabled = false;
        console.log("Next button enabled.");
    } else {
        buttonNext.disabled = true;
        console.log("Next button disabled.");
    }

    // Update the progress indicators
    let tmp = 1;
    while(tmp < formSteps.length) {
        el = "progress-step-" + tmp;
        document.getElementById(el).style.fontWeight = 'normal';
        document.getElementById(el).style.color = 'grey';
        tmp += 1;
    }

    // Highlight the current step in the progress indicator
    el = "progress-step-" + (currentStep + 1);
    document.getElementById(el).style.fontWeight = 'bold';
    document.getElementById(el).style.color = 'black';
}

// Debug log to check the initialization
console.log(`Initial currentStep: ${currentStep}, formSteps length: ${formSteps.length}`);
