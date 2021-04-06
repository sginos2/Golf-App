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

/*printScores(){
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  //put the value of sum in the 'total' column
  //if players.player[playerId].scores.length =
}
*/

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
  document.getElementById('yardtotal').innerText = totalYards;
  document.getElementById('partotal').innerText = totalPar;
}

function addNewPlayer(playerId) {
  const playerName = document.getElementById(playerId).value;
  if (playerName) {
    const newPlayer = new Player(playerName);
    players.push(newPlayer);
    document.getElementById(playerId).classList.add('form-control-plaintext');
    document.getElementById(playerId).readOnly = true;
  }
}

// function inputScore(playerId) {
//   const playerScore = document.getElementById('p1score1').value;
//   if (playerScore) {
//     players.player[playerId].scores.push(playerScore);
//     document.getElementById('p1score1').classList.add('form-control-plaintext');
//     document.getElementById('p1scores1').readOnly = true;
//     printScores();
//   }
// }
