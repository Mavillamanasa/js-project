const pollForm = document.getElementById("pollForm");
const addOptionBtn = document.getElementById("addOptionBtn");
const pollOptionsContainer = document.getElementById("pollOptionsContainer");
let optionCount = 1;

// Add new option input 
addOptionBtn.addEventListener("click", () => {
    optionCount++;
    const formGroup = document.createElement("div");
    formGroup.className = "form-group";

    const optionLabel = document.createElement("label");
    optionLabel.setAttribute("for", `pollOption${optionCount}`);
    optionLabel.textContent = `Option ${optionCount}:`;

    const optionInput = document.createElement("input");
    optionInput.type = "text";
    optionInput.id = `pollOption${optionCount}`;
    optionInput.className = "form-control";
    optionInput.required = true;
    optionInput.placeholder = `Enter option ${optionCount}`;

    formGroup.appendChild(optionLabel);
    formGroup.appendChild(optionInput);
    pollOptionsContainer.appendChild(formGroup);
});

//  poll submission
pollForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const pollQuestion = document.getElementById("pollQuestion").value;
    const pollOptions = [];

    for (let i = 1; i <= optionCount; i++) {
        const optionValue = document.getElementById(`pollOption${i}`).value.trim();
        if (optionValue) pollOptions.push(optionValue);
    }

    if (pollOptions.length > 0) {
        const pollData = {
            question: pollQuestion,
            options: pollOptions,
            votes: Array(pollOptions.length).fill(0),
        };

        localStorage.setItem("pollData", JSON.stringify(pollData));
        alert("Poll created successfully! Redirecting to results...");
        window.location.href = "display.html";
    } else {
        alert("Please add at least one option.");
    }
});