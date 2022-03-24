var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssue = function(repo) {
    console.log(repo);
    var apiUrl="https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
    if(response.ok){
        response.json().then(function(data){
            displayIssues();
            console.log(data)
        });
    } else {
        alert("There was a problem with your request!");
    }
    });
};

var displayIssues= function(issues){
    if(issues.length === 0){
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    issueContainerEl.appendChild(issueEl);
  for(var i = 0; i < issues.length; i++) {
      var issueEl = document.createElement("a");
      issueEl.classList = "list-item flex-row justify-space-between align-center";
      issueEl.setAttribute("href", issues[i].html_url);
      issueEl.setAttribute("target", "_blank");

      var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    issueEl.appendChild(titleEl);

    var typeEl = document.createElement("span");
    if(issues[i].pull_request) {
        typeEl.textContent = "(Pull Request)";
    } else {
        typeEl.textContent = "(Issue)";
    }

    issueEl.appendChild(typeEl)
    }

    
};

getRepoIssue("facebook/react");