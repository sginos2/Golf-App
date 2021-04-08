let courseData;
let players = [];

document.getElementById('course-select').addEventListener('change', function(event) {
  let courseId = event.target.value;
  console.log(event.target);
  getCourseInfo(courseId);
});

document.getElementById('tee-box-select').addEventListener('change', function(event) {
  let teeBox = event.target.value;
  getTeeBoxInfo(teeBox);
});

document.getElementById('player1').addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    addNewPlayer('player1');
  }
});
document.getElementById('player2').addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    addNewPlayer('player2');
  }
});
document.getElementById('player3').addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    addNewPlayer('player3');
  }
});
document.getElementById('player4').addEventListener('keydown', event => {
  if (event.key == 'Enter') {
    addNewPlayer('player4');
  }
});

const getCoursesPromise = fetch("https://golf-courses-api.herokuapp.com/courses", {
  method: "GET",
  headers: {
    'Content-Type': 'application/json'
  }
});

const courseDataPromise = getCoursesPromise.then((response) => {
  console.log(response);
  return response.json();
});

courseDataPromise.then(data => {
  let courseOptionsHtml = '';
  data.courses.forEach(course => {
    courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
  });
  getCourseInfo(data.courses[0].id);
  document.getElementById('course-select').innerHTML = courseOptionsHtml;
});

function getCourseInfo(courseId) {
  const getCourseInfoPromise = fetch(`https://golf-courses-api.herokuapp.com/courses/${courseId}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const courseInfoPromise = getCourseInfoPromise.then((response) => {
    return response.json();
  });
  courseInfoPromise.then(course => {
    courseData = course;
    let teeBoxSelectHtml = '';
    course.data.holes[0].teeBoxes.forEach(function (teeBox, index) {
      if (teeBox.teeType.toUpperCase() !== "AUTO CHANGE LOCATION") {
        teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}</option>`;
      }
    });
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  });
}

function getTeeBoxInfo(teeBox) {
  console.log(courseData);
  let totalYards = 0;
  let totalPar = 0;
  courseData.data.holes.forEach((hole, index) => {
    totalYards += hole.teeBoxes[teeBox].yards
    totalPar += hole.teeBoxes[teeBox].par;
    document.getElementById('yard' + (index + 1)).innerText = hole.teeBoxes[teeBox].yards;
    document.getElementById('par' + (index + 1)).innerText = hole.teeBoxes[teeBox].par;
    document.getElementById('handicap' + (index + 1)).innerText = hole.teeBoxes[teeBox].hcp;
  });
  document.getElementById('yard-total').innerText = totalYards;
  document.getElementById('par-total').innerText = totalPar;
}

function addNewPlayer(playerId) {
  const playerName = document.getElementById(playerId).value;
  if (playerName) {
    if (players.some(p => p.name === playerName)) {
      alert("Name is already taken. Please choose another name.");
    }
    else {
      const newPlayer = new Player(playerName, playerId);
      players.push(newPlayer);
      document.getElementById(playerId).classList.add('form-control-plaintext');
      document.getElementById(playerId).readOnly = true;
    }
  }
}

function inputScore(playerId, elementId, totalId, isOut, outInId) {
  const playerScore = document.getElementById(elementId).value;
  if (playerScore) {
    console.log(players);
    for (let i = 0; i < players.length; i++) {
      if (players[i].id === playerId) {
        if(isOut)
        {
          players[i].outTotal += parseInt(playerScore);
          document.getElementById(outInId).innerText = players[i].outTotal;
        }
        else{
          players[i].inTotal += parseInt(playerScore);
          document.getElementById(outInId).innerText = players[i].inTotal;
        }
        players[i].score += parseInt(playerScore);
        document.getElementById(totalId).innerText = players[i].score;
      }
    }
    document.getElementById(elementId).classList.add('form-control-plaintext');
    document.getElementById(elementId).readOnly = true;
  }
}
