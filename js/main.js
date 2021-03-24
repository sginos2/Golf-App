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
  document.getElementById('course-select').innerHTML = courseOptionsHtml;
});

courseDataPromise.then(data => {
  let teeBoxSelectHtml = ''
  data.teeBoxes.forEach(function (teeBox, index) {
    teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`
  });
  document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
})/

function print() {
  //when course and teebox are selected, print all the info for that course
  //print par, yardage, and handicap info
  //print names entered in and print scores when entered
}