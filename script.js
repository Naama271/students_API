data = [];

const getData = async () => {
  let url = "https://apple-seeds.herokuapp.com/api/users/";
  const reqStudent = await fetch(url);
  const studentsData = await reqStudent.json();

  let studentsData2;

  // const forLoop = async () => {
  // for (let i = 0; i < studentsData.length; i++) {
  // //  id = studentsData[i].id;

  //   let url2 = `https://apple-seeds.herokuapp.com/api/users/${i}`;
  //   const reqStudent2 = await fetch(url2);
  //   studentsData2 = await reqStudent2.json();

  await Promise.all(
    studentsData.map(async (student, i) => {
      const reqStudent2 = await fetch(
        `https://apple-seeds.herokuapp.com/api/users/${i}`
      );
      const studentsData2 = await reqStudent2.json();
      data.push(studentsData2);
    })
  );

  // }
  // }
  //   forLoop();

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
  table.innerHTML += `<tr><th> id </th> <th onclick="sortingByString('firstName')"> firstName </th> </th> <th onclick="sortingByString('lastName')"> lastName</th><th onclick="sortingByValue('capsule')"># </th><th onclick="sortingByValue('age')">age</th><th onclick="sortingByString('city')">city<th><th onclick="sortingByString('hobby')">hobby</th><th onclick="sortingByString('gender')">gender</th><th></th><th></th></tr>`;

  for (let i = 0; i < mergedDataArr.length; i++) {
    let id = mergedDataArr[i].id;
    let firstName = mergedDataArr[i].firstName;
    let lastName = mergedDataArr[i].lastName;
    let capsule = mergedDataArr[i].capsule;
    let city = mergedDataArr[i].city;
    let gender = mergedDataArr[i].gender.toLowerCase();
    let hobby = mergedDataArr[i].hobby;
    let age = mergedDataArr[i].age;

    // let container = document.querySelector(".itemsContainer");

    table.innerHTML += `<tr id="${id}"><td> ${id} </td> <td> ${firstName} </td> </td> <td> ${lastName}</td><td>${capsule} </td><td>${age}</td><td><a href="https://www.google.com/maps/place/${city}/" target="_blank">${city}</a><td><td>${hobby}</td><td><i class="fas fa-${gender}"></i></td><td onclick="removeStudent(${i})"><i class="fas fa-trash-alt" ></i></td><td onclick="editStudent(${id})" class="editBTN"><i class="fas fa-edit"></i></input></td></tr>`;
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

  searchByValueFilter("firstName");
  searchByValueFilter("lastName");
  searchByValueFilter("age");
  searchByValueFilter("city");
  searchByValueFilter("gender");
  searchByValueFilter("age");
  searchByValueFilter("hobby");
  searchByValueFilter("capsule");

  function searchByValueFilter(subjectValue) {
    let tr = document.querySelectorAll("tr");
    if (selected == subjectValue) {
      mergedDataArr = mergedDataArr.filter((student, index) => {
        if (
          mergedDataArr[index][subjectValue]
            .toString()
            .toLowerCase()
            .includes(search.value.toLowerCase())
        ) {
          tr[index].classList.add("hide");
        }

        return student[subjectValue]
          .toString()
          .toLowerCase()
          .includes(search.value.toLowerCase());
      });
    } else if (search.value === "") {
      mergedDataArr = mergedDataArr.filter((student, index) => {
        return student[subjectValue]
          .toString()
          .toLowerCase()
          .includes(search.value.toLowerCase());
      });
      printTable(mergedDataArr);
    }
  }
  printTable(mergedDataArr);
}

function editStudent(index) {
  let tr = document.querySelectorAll("tr");
  // console.log(tr);
  tr = tr[index];

  tr.innerHTML = "";
  tr.innerHTML = `<tr><td> ${index} </td> <td><input type="text" value="name" onclick="sortingByString("lastName")"></td> </td> <td><input type="text" value="last"></td><td><input type="text" value="capsule"> </td><td><input type="text" value="age"></td><td><input type="text" value="city"><td><td><input type="text" value="hobby"></td><td><input type="text" value="gender"></td><td><i class="fas fa-times" onclick="printTable(mergedDataArr)" class="cancelBTN"></i></td><td><i class="fas fa-check confirmBTN"></i></td><tr>`;

  cancelBTN = document.querySelector(".cancelBTN");
  confirmBTN = document.querySelector(".confirmBTN");

  confirmBTN.addEventListener("click", () => {
    editStudentConfirm(index);
    printTable(mergedDataArr);
  });
}

function editStudentConfirm(index) {
  let nameInput = document.querySelector('input[value="name"]');
  let lastInput = document.querySelector('input[value="last"]');
  let capsuleInput = document.querySelector('input[value="capsule"]');
  let ageInput = document.querySelector('input[value="age"]');
  let cityInput = document.querySelector('input[value="city"]');
  let hobbyInput = document.querySelector('input[value="hobby"]');
  let genderInput = document.querySelector('input[value="gender"]');

  console.log(cityInput.value);

  mergedDataArr[index].firstName = nameInput.value;
  mergedDataArr[index].lastName = lastInput.value;
  mergedDataArr[index].capsule = capsuleInput.value;
  mergedDataArr[index].hobby = hobbyInput.value;
  mergedDataArr[index].gender = genderInput.value;
  mergedDataArr[index].gender = ageInput.value;
  mergedDataArr[index].gender = cityInput.value;
  printTable(mergedDataArr);
}

// function sorting(val) {
// console.log(val);
//   //val=  sortStr;
//   sortingByString("firstName");
//   sortingByString("lastName");
//   sortingByString("hobby");
//   sortingByString("city");
//   sortingByString("gender");
//   sortingByValue("age");
//   sortingByValue("age");
//   sortingByValue("capsule");

function sortingByString(sortStr) {
  mergedDataArr.sort((a, b) => {
    a = a[sortStr];
    b = b[sortStr];
    let valueA = a.toUpperCase();
    let valueB = b.toUpperCase();
    if (valueA < valueB) {
      return -1;
    }
    if (valueA > valueB) {
      return 1;
    }
    return 0;
  });

  printTable(mergedDataArr);
}

function sortingByValue(sortValue) {
  mergedDataArr.sort(function (a, b) {
    return a[sortValue] - b[sortValue];
  });
  console.log(mergedDataArr);
  printTable(mergedDataArr);
}
// }
