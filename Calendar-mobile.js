function Calendar() {
	
	var CONST_ADDED_EVENTS = 'CONST_ADDED_EVENTS';
	var CONST_DAYS_ROWS = 6;
	var CONST_DAYS_COLUMS = 7;
	var lang = 'ZH';
	var monthNames = {};
	monthNames['ZH'] = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aguest', 'September', 'October', 'November', 'December');
	var yearNames = {};
	yearNames['ZH'] = '';
	var monthDays = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	var weekNames = ['SUN.','MON.','TUE.','WED.','THU.','FRI.','SAT.'];
	var toDoObj = {};

	// set month 2022-05-31
	var currentYear = 2022;
	var currentMonth = 4;
	var currentDayIndex = 31;

	var priorityColor = ["#FFA07A","#FF00FF", "#708090", "#D2B48C"]

	function initCalendarAndEvents() {
		if (localStorage.getItem(CONST_ADDED_EVENTS)) {
			toDoObj = JSON.parse(localStorage.getItem(CONST_ADDED_EVENTS));
		}
		initDivDays();
		freshmonthTitle();
		initDaySpanHeight();
	};



	function deleteContent(obj) {
		for (var str in toDoObj) {
			var lArr = toDoObj[str];
			var oIndex = lArr.indexOf(obj);
			if (oIndex > -1) {
				lArr.splice(oIndex, 1);
			}
			if (lArr.length == 0) {
				var classname = lastClickSpan.className;
				if (classname.indexOf('haveEvent') > -1) {
					lastClickSpan.className = classname.replace('haveEvent', '');
				}
			}
		}
		localStorage.setItem(CONST_ADDED_EVENTS, JSON.stringify(toDoObj));
	}

	function initDaySpanHeight() {
		var container = document.getElementById('thismonth');
		var spans = container.getElementsByClassName('daySpan');
		
		var sLen = spans.length;
		for (var i = 0; i < sLen; i++) {
			var span = spans[i];
			span.style.height = span.style.width;
		}
	}
	
	function eventAddClick() {
		event.stopPropagation();
		var taskname = document.getElementById('taskname').value;
		var duetime = document.getElementById('duetime').value;
		var estumatedtime = document.getElementById("estumatedtime").value;
		var priority = document.getElementById("priority").value;
		if (taskname == '' || taskname == undefined || taskname == null) {
			taskname = 'task name';
		}


		var routine = document.getElementById("routine").value;

		if(routine == 0) {

			var cstr = currentYear + '-' + Number(currentMonth + 1) + '-' + currentDayIndex;
			var obj = {
				duetime: duetime,
				estumatedtime: estumatedtime,
				priority: priority,
				taskname: taskname
			};
			if (!toDoObj.hasOwnProperty(cstr)) {
				toDoObj[cstr] = {};
			}

			var toArr = toDoObj[cstr];
			obj['id'] = '1';
			toArr["duetime"] = duetime;
			toArr["estumatedtime"] = estumatedtime;
			toArr["priority"] = priority;
			toArr["taskname"] = taskname;
	
		} else if (routine == 1) {


			for(var index_day=0; index_day <= 31; index_day++) {
				var cstr = currentYear + '-' + Number(currentMonth + 1) + '-' + index_day;
				var obj = {
					duetime: duetime,
					estumatedtime: estumatedtime,
					priority: priority,
					taskname: taskname
				};
				if (!toDoObj.hasOwnProperty(cstr)) {
					toDoObj[cstr] = {};
				}

				var toArr = toDoObj[cstr];
				obj['id'] = '1';
				toArr["duetime"] = duetime;
				toArr["estumatedtime"] = estumatedtime;
				toArr["priority"] = priority;
				toArr["taskname"] = taskname;
				
			} 
		} else if (routine == 2) {

			for(var index_day=currentDayIndex; index_day <= 31;) {
				console.log(index_day);
				var cstr = currentYear + '-' + Number(currentMonth + 1) + '-' + index_day;
				console.log(cstr);
				var obj = {
					duetime: duetime,
					estumatedtime: estumatedtime,
					priority: priority,
					taskname: taskname
				};
				if (!toDoObj.hasOwnProperty(cstr)) {
					toDoObj[cstr] = {};
				}

				var toArr = toDoObj[cstr];
				obj['id'] = '1';
				toArr["duetime"] = duetime;
				toArr["estumatedtime"] = estumatedtime;
				toArr["priority"] = priority;
				toArr["taskname"] = taskname;


				index_day=Number(index_day) + 7;

				
			}
		} else if (routine == 3) {


			for(var index_month=currentMonth; index_month < 12;) {
				var cstr = currentYear + '-' + Number(index_month + 1) + '-' + currentDayIndex;
				var obj = {
					duetime: duetime,
					estumatedtime: estumatedtime,
					priority: priority,
					taskname: taskname
				};
				if (!toDoObj.hasOwnProperty(cstr)) {
					toDoObj[cstr] = {};
				}

				var toArr = toDoObj[cstr];
				obj['id'] = '1';
				toArr["duetime"] = duetime;
				toArr["estumatedtime"] = estumatedtime;
				toArr["priority"] = priority;
				toArr["taskname"] = taskname;

				index_month=Number(index_month) + 1;
				
			}
		}



		localStorage.setItem(CONST_ADDED_EVENTS, JSON.stringify(toDoObj));

		alert("add success");

		location.reload();



		
		/*
		setTimeout(function() {
			document.getElementById('eventName').value = '';
			document.getElementById('evevtTime').value = '00:00';
		}, 100)*/

	}



	function insertAfter(newElement, targetElement) {
		var parent = targetElement.parentNode; 
		if (parent.lastChild == targetElement) { 
			parent.appendChild(newElement); 
		} else { 
			parent.insertBefore(newElement, targetElement.nextSibling);
		}
	}
	
	function dayContainerClick(event) {
		
		// clear all add-task-div
		var addtaskdiv = document.getElementById("add-task");
		if(addtaskdiv) {
	        addtaskdiv.remove();
		}

        // create add-task-div
		var dayDIV = document.createElement('div');
		dayDIV.className = 'dayContainer';
		dayDIV.id = "add-task";
		dayDIV.style.height = "10rem";
		dayDIV.style.border= "1px solid #d4d4d4";

        // create add task input
		var eName = document.createElement('input');
		eName.type = 'text';
		eName.placeholder = 'task name';
		eName.id = 'createtaskname';
		eName.className = "taskname";
		dayDIV.appendChild(eName);

		// create add task button
		var eaddBtn1 = document.createElement('input');
		eaddBtn1.type = 'button';
		eaddBtn1.id = "createtaskid"
		eaddBtn1.value = '+ Add Task';
		eaddBtn1.className = "addtask-index";

		//eaddBtn1.style.left = '2px';
		dayDIV.appendChild(eaddBtn1);

		eaddBtn1.onclick = function(event) {
			var taskname = document.getElementById("createtaskname").value;
			if(taskname == "") {
				alert("please input taskname");
				return;
			}
			
			document.getElementById("taskname").value = taskname;
			document.getElementById("mask").style.display='block';
			document.getElementById("create-task-mobile").style.display='block';
		}

		insertAfter(dayDIV, event.target.parentNode);

		if (event.target && event.target.nodeName == 'SPAN') {
			event.stopPropagation();
			var span = event.target;
			lastClickSpan = span;
			if (span.innerHTML != '&nbsp;') {
				currentDayIndex = span.innerHTML;
			}
		}

        
        // creata task button
		document.getElementById("tasksave").onclick = function () {
			eventAddClick();
	   }
	   

	}

	function clearEventlist() {
			document.getElementById('eventList').innerHTML = '';
			document.getElementById('selectDayCount').innerHTML = '0 task';
		}
	
	
	function freshmonthTitle() {
			document.getElementById('monthTitle').innerHTML = monthNames[lang][currentMonth];
    }
	

	function isLeapYear(year) {
		var f = new Date();
		f.setYear(year);
		f.setMonth(1);
		f.setDate(29);
		return f.getDate() == 29;
	}
	

	function getFebDayNum(year) {
			var feb = 28;
			if (isLeapYear(year) === true) {
				feb = 29;
			} else {
				feb = 28;
			}
			return feb;
	}
	
	function initCalendarDiv() {
		for (var i = 0; i < CONST_DAYS_ROWS; i++) {
			var dayDIV = document.createElement('div');
			dayDIV.className = 'dayContainer';
			for (var j = 0; j < CONST_DAYS_COLUMS; j++) {
				var daySpan = document.createElement('span');
				daySpan.className = 'daySpan';
				// set click
				daySpan.onclick = function(event) {
					event.preventDefault();
					dayContainerClick(event);
				};
				var button
				dayDIV.appendChild(daySpan);
				daySpan.innerHTML = '&nbsp;';
			}
			document.getElementById('thismonth').appendChild(dayDIV);
		}
	}

	function initDivDays() {
		
		freshmonthTitle();
		freshDate = new Date(currentYear, currentMonth, currentDayIndex);
		freshDate.setDate(1);
		var now = freshDate;
		var firstDay = freshDate.getDay(); 
		var currentDayNum = monthDays[currentMonth];
		if (currentMonth == 1) {
			currentDayNum = getFebDayNum(currentYear);
		}
		var dayIndex = 1;

		var divs = document.getElementsByClassName('dayContainer');
		var divsLen = divs.length;
		for (var i = 0; i < divsLen; i++) {
			var dayDIV = divs[i];
			var spans = dayDIV.getElementsByTagName('span');
			var spansLen = spans.length;
			for (var j = 0; j < spansLen; j++) {
				var daySpan = spans[j];
				var strCNAME = daySpan.className;
				if (strCNAME.indexOf('today') > -1) {
					strCNAME = strCNAME.replace('today', '');
				}
				if (strCNAME.indexOf('selected') > -1) {
					strCNAME = strCNAME.replace('selected', '');
				}
				if (strCNAME.indexOf('haveEvent') > -1) {
					strCNAME = strCNAME.replace('haveEvent', '');
				}
				
				daySpan.className = strCNAME;



				if (i == 0) {
					if (j < firstDay) {
						daySpan.innerHTML = '&nbsp;';
					} else {
						daySpan.innerHTML = dayIndex;
						dayIndex++;
					}
				} else {
					if (dayIndex < currentDayNum + 1) {
						daySpan.innerHTML = dayIndex;
						dayIndex++;
					} else {
						daySpan.innerHTML = '&nbsp;';
					}
				}


				var str = currentYear + '-' + Number(currentMonth + 1) + '-' + Number(dayIndex - 1);
				
				if(toDoObj.hasOwnProperty(str)) {
					daySpan.style.background = priorityColor[toDoObj[str].priority];
					var tasknamespan = document.createElement('div');
					tasknamespan.innerHTML = toDoObj[str].taskname;
					tasknamespan.className = "taskname-div";
					//daySpan.innerHTML = toDoObj[str].taskname;
					//console.log(toDoObj[str].taskname);
					daySpan.appendChild(tasknamespan);
				}



			}
		}
	}
	

	function initHeadersAndAdds(id) {
		var mainBody = document.getElementById(id);
		
		var monthHead = document.createElement('div');
		monthHead.id = 'monthHeader';

		var mtitle = document.createElement('span');
		mtitle.id = 'monthTitle';
		monthHead.appendChild(mtitle);

		mainBody.appendChild(monthHead);
		
		var datecontent = document.createElement('div');
		datecontent.id = "datecontent";
		
		var weekHead = document.createElement('div');
		weekHead.className = 'weekHeader';
		var wLen = weekNames.length;
		for(var i=0;i<wLen;i++)
		{
			var weekD = document.createElement('span');
			weekD.innerHTML = weekNames[i];
			weekHead.appendChild(weekD);
		}
		//mainBody.appendChild(weekHead);
		datecontent.appendChild(weekHead);
		
		var thismonth = document.createElement('div');
		thismonth.id = 'thismonth';
		//mainBody.appendChild(thismonth);
		datecontent.appendChild(thismonth);
		mainBody.appendChild(datecontent);
		initCalendarDiv();

		initCalendarAndEvents();
	}


	function initDay() {

		if (localStorage.getItem(CONST_ADDED_EVENTS)) {
			toDoObj = JSON.parse(localStorage.getItem(CONST_ADDED_EVENTS));
		}

		console.log(toDoObj);

		for (var str in toDoObj) {
			var lArr = toDoObj[str];

			console.log("test");

			var taskitem = document.createElement('div');
			taskitem.className = 'taskitem';

			var taskitemname = document.createElement('div');
			taskitemname.className = 'taskitemname';
			taskitemname.innerHTML = lArr.taskname;
			taskitem.appendChild(taskitemname);


			var taskiteminfo = document.createElement('div');
			taskiteminfo.className = 'taskiteminfo';

			var taskitemduetime = document.createElement('div');
			taskitemduetime.className = 'taskitemduetime';
			taskitemduetime.innerHTML = "Due date" + ": " + lArr.duetime;
			taskiteminfo.appendChild(taskitemduetime);
			
			var taskitemetime = document.createElement('div');
			taskitemetime.className = 'taskitemtime';
			taskitemetime.innerHTML = "Estumated time date" + ": " + lArr.estumatedtime;
            taskiteminfo.appendChild(taskitemetime);
			

			// create add task button
			var eaddBtn2 = document.createElement('input');
			eaddBtn2.type = 'button';
			eaddBtn2.id = "deletetask"
			eaddBtn2.value = 'Delete Task';
			eaddBtn2.className = "addtask";
			eaddBtn2.setAttribute("datakey", str);

			taskiteminfo.appendChild(eaddBtn2);


			eaddBtn2.onclick = function(event) {
				var key = event.target.getAttribute("datakey");

				if (localStorage.getItem(CONST_ADDED_EVENTS)) {
					var testtoDoObj = JSON.parse(localStorage.getItem(CONST_ADDED_EVENTS));
				}
				delete testtoDoObj[key];
				localStorage.setItem(CONST_ADDED_EVENTS, JSON.stringify(testtoDoObj));
				alert("delete success, please reload page!!!");

			}


			// create add task button
			var eaddBtn3 = document.createElement('input');
			eaddBtn3.type = 'button';
			eaddBtn3.id = "timerid"
			eaddBtn3.value = 'timer';
			eaddBtn3.className = "addtask";
			taskiteminfo.appendChild(eaddBtn3);




			taskitem.appendChild(taskiteminfo);


			document.getElementById("task-all-info").appendChild(taskitem);



			// priority0

			var taskitemname1 = document.createElement('div');
			taskitemname1.className = 'taskitemname';
			taskitemname1.innerHTML = lArr.taskname;
			document.getElementById("priority" + lArr.priority).appendChild(taskitemname1);
		




			

		}


	}
	
	this.initHeadersAndAdds = initHeadersAndAdds;
	this.initDay = initDay;
}
