let courseData;
let players = {};

document.getElementById('course-select').addEventListener('change', function(event) {
  let courseId = event.target.value;
  console.log(event.target);
  getCourseInfo(courseId);
});

document.getElementById('tee-box-select').addEventListener('change', function(event) {
  let teeBox = event.target.value;
  getTeeBoxInfo(teeBox);
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
  courseData.data.holes.forEach((hole, index) => {
    document.getElementById('yard' + (index + 1)).innerText = hole.teeBoxes[teeBox].yards;
    document.getElementById('par' + (index + 1)).innerText = hole.teeBoxes[teeBox].par;
    document.getElementById('handicap' + (index + 1)).innerText = hole.teeBoxes[teeBox].hcp;
  });
}
