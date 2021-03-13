data = [];

const getData = async () => {
  let url = "https://apple-seeds.herokuapp.com/api/users/";
  const reqStudent = await fetch(url);
  const studentsData = await reqStudent.json();

  let studentsData2;

  // await Promise.all(
  //   async () => {
  for (let i = 0; i < studentsData.length; i++) {
    id = studentsData[i].id;

    let url2 = `https://apple-seeds.herokuapp.com/api/users/${id}`;
    const reqStudent2 = await fetch(url2);
    studentsData2 = await reqStudent2.json();
    data.push(studentsData2);
  }
  // })

  mergeData(studentsData, studentsData2);
};

getData();

mergedDataArr = [];

function mergeData(studentsData) {
  for (let i = 0; i < studentsData.length; i++) {
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

    table.innerHTML += `<tr id="${id}"><td> ${id} </td> <td> ${firstName} </td> </td> <td> ${lastName}</td><td>${capsule} </td><td>${age}</td><td><a href="https://www.google.com/maps/place/${city}/" target="_blank"><i class="fas fa-map-marker-alt"></i>${city}</a><td><td>${hobby}</td><td><i class="fas fa-${gender}"></i></td><td onclick="removeStudent(${i})"><i class="fas fa-trash-alt" ></i></td><td onclick="editStudent(${id})" class="editBTN"><i class="fas fa-edit"></i></input></td></tr>`;
  }
}

function removeStudent(i) {
  mergedDataArr.splice(i, 1);

  printTable(mergedDataArr);
}

let search = document.querySelector("#search");

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
            .toString().toLowerCase().includes(search.value.toLowerCase())
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
          .toString().toLowerCase().includes(search.value.toLowerCase());
      });
      printTable(mergedDataArr);
    }
  }
  printTable(mergedDataArr);
}

function editStudent(index) {
  let tr = document.querySelectorAll("tr");
  tr = tr[index];

  tr.innerHTML = "";
  tr.innerHTML = `<tr><td> ${index} </td> <td><input type="text" data="name" value="${mergedDataArr[index].firstName}" ></td> </td> <td><input type="text" data="last" value="${mergedDataArr[index].lastName}"></td><td><input type="number" data="capsule" value="${mergedDataArr[index].capsule}"> </td><td><input type="number" data="age" value="${mergedDataArr[index].age}"></td><td><input type="text" data="city" value="${mergedDataArr[index].city}"><td><td><input type="text" data="hobby" value="${mergedDataArr[index].hobby}"></td><td><input type="text" data="gender" value="${mergedDataArr[index].gender}"></td><td><i class="fas fa-times" onclick="printTable(mergedDataArr)" class="cancelBTN"></i></td><td><i class="fas fa-check confirmBTN"></i></td><tr>`;

  confirmBTN = document.querySelector(".confirmBTN");

  confirmBTN.addEventListener("click", () => {
    editStudentConfirm(index);
    printTable(mergedDataArr);
  });
}

function editStudentConfirm(index) {
  let nameInput = document.querySelector('input[data="name"]');
  let lastInput = document.querySelector('input[data="last"]');
  let capsuleInput = document.querySelector('input[data="capsule"]');
  let ageInput = document.querySelector('input[data="age"]');
  let cityInput = document.querySelector('input[data="city"]');
  let hobbyInput = document.querySelector('input[data="hobby"]');
  let genderInput = document.querySelector('input[data="gender"]');

  mergedDataArr[index].firstName = nameInput.value;
  mergedDataArr[index].lastName = lastInput.value;
  mergedDataArr[index].capsule = capsuleInput.value;
  mergedDataArr[index].hobby = hobbyInput.value;
  mergedDataArr[index].gender = genderInput.value;
  mergedDataArr[index].age = ageInput.value;
  mergedDataArr[index].city = cityInput.value;
  mergedDataArr[index].gender = genderInput.value;

  printTable(mergedDataArr);
}

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
  printTable(mergedDataArr);
}

