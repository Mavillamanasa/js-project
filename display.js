const pollData = JSON.parse(localStorage.getItem("pollData"));
const pollQuestionElement = document.getElementById("pollQuestion");
const pollOptionsElement = document.getElementById("pollOptions");
const resultsElement = document.getElementById("results");
const totalVotesElement = document.getElementById("totalVotes");
const backToVotingBtn = document.getElementById("backToVotingBtn");

if (pollData) {
    pollQuestionElement.textContent = pollData.question;

    pollData.options.forEach((option, index) => {
        const optionElement = document.createElement("div");
        optionElement.className = "poll-option mb-2";
        optionElement.innerHTML = `
            <input type="radio" name="pollOption" id="option${index}" value="${index}">
            <label for="option${index}">${option}</label>
            <div class="progress mt-2">
                <div class="progress-bar" id="progress${index}"></div>
            </div>
        `;
        pollOptionsElement.appendChild(optionElement);
    });

    document.querySelectorAll('input[name="pollOption"]').forEach(option => {
        option.addEventListener('change', (e) => {
            const selectedIndex = parseInt(e.target.value);
            pollData.votes[selectedIndex]++;
            localStorage.setItem("pollData", JSON.stringify(pollData));
            updateResults();
            switchToResults();
        });
    });

    backToVotingBtn.addEventListener("click", switchToVoting);
    updateResults();
}

function updateResults() {
    const totalVotes = pollData.votes.reduce((sum, votes) => sum + votes, 0);
    totalVotesElement.textContent = totalVotes;

    pollData.votes.forEach((votes, index) => {
        const percentage = totalVotes ? (votes / totalVotes) * 100 : 0;
        const progressBar = document.getElementById(`progress${index}`);
        if (progressBar) progressBar.style.width = `${percentage}%`;
    });
}

function switchToResults() {
    pollOptionsElement.style.display = "none";
    resultsElement.style.display = "block";
}

function switchToVoting() {
    pollOptionsElement.style.display = "block";
    resultsElement.style.display = "none";
}