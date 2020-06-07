showtask();
var input = document.getElementById('addtaskinput');
var addbtn = document.getElementById('adtbn');
var savebtn = document.getElementById('savebtn');


addbtn.addEventListener('click', function(e) {
    var value = input.value;

    if (value.trim() != 0) {
        let webtask = localStorage.getItem('localtask');

        if (webtask == null) {
            taskobj = [];
        } else {
            taskobj = JSON.parse(webtask);
        }
        taskobj.push(value);
        localStorage.setItem('localtask', JSON.stringify(taskobj));
    }
    input.value = "";
    showtask();
});




function showtask() {
    let webtask = localStorage.getItem('localtask');

    if (webtask == null) {
        taskobj = [];
    } else {
        taskobj = JSON.parse(webtask);
    }


    let html = '';
    let addedtasklist = document.getElementById('mytable');
    taskobj.forEach((row, index) => {
        var tbody = document.getElementById('tblbody');

        var date = new Date();
        html += `
       <tr>
       <td>${index+1}</td>
       <td>${row}</td>
       <td>${date.getFullYear()}-${date.getMonth()}-${date.getDate()}</td>
       <td>
                            <span class="btn btn-primary" onclick="edittask(${index})">
        <span class="glyphicon glyphicon-pencil"></span>
                            </span>
                            
                            <span class="btn btn-danger" onclick="deleteitem(${index})">
        <span class="glyphicon glyphicon-trash"></span>
                            </span>
                        </td>
       </tr>
                 `;

        tbody.innerHTML = html;
        addedtasklist.appendChild(tbody);


    });
}

function edittask(index) {

    addbtn.style.display = "none";
    var save = document.getElementById('saveindex')
    save.value = index;
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    input.value = taskobj[index];

}


var savebtn = document.getElementById('savebtn');

savebtn.addEventListener('click', function() {

    var save = document.getElementById('saveindex').value;
    var input = document.getElementById('addtaskinput');
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    taskobj[save] = input.value;

    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showtask();
    input.value = "";

});


function deleteitem(index) {
    let webtask = localStorage.getItem('localtask');
    let taskobj = JSON.parse(webtask);
    taskobj.splice(index, 1);
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showtask();
}

var removeaall = document.getElementById('removeall');
removeaall.addEventListener('click', function() {
    let webtask = localStorage.getItem('localtask');

    if (webtask == null) {
        taskobj = [];
    } else {
        taskobj = JSON.parse(webtask);
        taskobj = [];
    }
    localStorage.setItem('localtask', JSON.stringify(taskobj));
    showtask();
})


var search = document.getElementById('searchtax');

search.addEventListener('input', function() {
    let trlist = document.querySelectorAll("tr");
    Array.from(trlist).forEach(function(item, index) {
        console.log(item)
        let searchedtext = item.querySelectorAll("td")[0];
        console.log(searchedtext.innerText)


        // let searchtextboxval = searchedtext.value;

        // let re = new RegExp(searchtextboxval, 'gi');
        // if (searchedtext.match(re)) {
        //     item.style.display = "table-row";
        // } else {
        //     item.style.display = "none";
        // }
    })
})



var xmlthhp = new XMLHttpRequest();
xmlthhp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        data.forEach(function(row, index) {
            console.log(row.name);
            var table = document.getElementById('sectable');
            var body = document.getElementById('tbody');
            var tr = document.createElement('tr');
            tr.innerHTML = `<td>${index+1}</td><td>${row.name}</td><td>${row.email}</td>
                            <td>${row.address}</td>`

            body.appendChild(tr);
            table.appendChild(body);


        })


    }
}

xmlthhp.open('get', 'data.json', true);
xmlthhp.send();