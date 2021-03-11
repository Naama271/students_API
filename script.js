data = [];

const getData = async () => {
  let url = "https://apple-seeds.herokuapp.com/api/users/";
  const reqStudent = await fetch(url);
  const studentsData = await reqStudent.json();

  let studentsData2;
  for (let i = 0; i < studentsData.length; i++) {
    id = studentsData[i].id;

    let url2 = `https://apple-seeds.herokuapp.com/api/users/${id}`;
    const reqStudent2 = await fetch(url2);
    studentsData2 = await reqStudent2.json();
    data.push(studentsData2);
  }

  mergeData(studentsData, studentsData2);
};

getData();

mergedDataArr = [];

function mergeData(studentsData) {
  for (let i = 0; i < data.length; i++) {
    let id = studentsData[i].id;
    let firstName = studentsData[i].firstName;
    let lastName = studentsData[i].lastName;
    let capsule = studentsData[i].capsule;
    let city = data[i].city;
    let gender = data[i].gender;
    let hobby = data[i].hobby;
    let age = data[i].age;

    mergedDataArr.push({
      id,
      firstName,
      lastName,
      capsule,
      city,
      gender,
      hobby,
      age,
    });
  }
  printTable(mergedDataArr);
}

function printTable(mergedDataArr) {
  let table = document.querySelector("table");

  table.innerHTML = "";

  for (let i = 0; i < mergedDataArr.length; i++) {
    let id = mergedDataArr[i].id;
    let firstName = mergedDataArr[i].firstName;
    let lastName = mergedDataArr[i].lastName;
    let capsule = mergedDataArr[i].capsule;
    let city = mergedDataArr[i].city;
    let gender = mergedDataArr[i].gender;
    let hobby = mergedDataArr[i].hobby;
    let age = mergedDataArr[i].age;

    let container = document.querySelector(".itemsContainer");

    table.innerHTML += `<tr id="${id}"><td> ${id} </td> <td> ${firstName} </td> </td> <td> ${lastName}</td><td>${capsule} </td><td>${age}</td><td><a href="https://www.google.com/maps/place/${city}/" target="_blank">${city}</a><td><td>${hobby}</td><td>${gender}</td><td><input type ="button" value="X" class="removeBTN" data = "${i}"  onclick="removeStudent(${i})"></td><td><input type ="button" value="edit" class="editBTN" data ="${id}" onclick="editStudent(${id})"></td></tr>`;
  }
}

function removeStudent(i) {
  console.log(mergedDataArr.splice(i, 1));

  printTable(mergedDataArr);
}

let search = document.querySelector("#search");
//console.log(search);
search.addEventListener("keyup", function () {
  searchByValue();
});

function searchByValue() {
  let subject = document.querySelector("#subject");
  let selected = subject.value;
  // console.log(selected);
  let subjectValue = "firstName";

  searchByValueFilter(subjectValue);

  function searchByValueFilter(subjectValue) {
    if (selected == subjectValue) {
      mergedDataArr = mergedDataArr.filter((student) =>
        student.firstName.toLowerCase().includes(search.value.toLowerCase())
      );
     // printTable(mergedDataArr);
    } else {
      printTable(mergedDataArr);
    }
  }
  printTable(mergedDataArr);
}




function editStudent(index) {

 let tr = document.querySelectorAll("tr");
 // console.log(tr);
   tr=tr[index];

    tr.innerHTML = "";
    tr.innerHTML += `<td> ${index} </td> <td><input type="text" value="name"></td> </td> <td><input type="text" value="last"></td><td><input type="text" value="capsule"> </td><td><input type="text" value="age"></td><td>city<td><td><input type="text" value="hobby"></td><td><input type="text" value="gender"></td><td><input type ="button" value="X" class="removeBTN" data = "${index}"  onclick="removeStudent(${index})"></td><td><input type ="button" value="confirm" class="editBTN" data ="${index}" onclick="confirm(${index})"></td>`;
}

function editStudentConfirm() {}
