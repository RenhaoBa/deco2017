function TimerClass() {
	
	

	function initTimer() {

		var margin = 30;
		var data = [56, 21];
		var svg = d3.select('svg');
		var width = svg.attr('width');
		var height = svg.attr('height');


		var g = svg.append('g').attr('transform', 'translate(' + margin + ',' + margin + ')');

		var scaleColor = d3.scaleOrdinal()
			.domain(d3.range(data.length))
			.range(d3.schemeCategory10);


		var pie = d3.pie();


		var arc = d3.arc()
		   .innerRadius(0)
		   .outerRadius(100)



		var pieData = pie(data);
		console.log(pieData);


		var gs = g.selectAll('.g')
			.data(pieData)
			.enter()
			.append('g')
			.attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');



		gs.append('path')
		   .attr('d', function (d, i) {
		   return arc(d);
		}).attr('fill', function (d, i) {
		   return scaleColor(i);
		})		


	}


	var time,showTime,startBn,restBn,pauseDate;
	var bool=false;
	var pauseTime=0;
	 
	init();
	function init() {
	    showTime=document.getElementById("showTime");
	    startBn=document.getElementById("startBn");
	    restBn=document.getElementById("restBn");
	    startBn.addEventListener("click",clickHandler);
	    restBn.addEventListener("click",clickHandler);
	    setInterval(animation,16);
	}

	function animation() {
	    if(!bool) return;
    	var times=new Date().getTime()-time-pauseTime;
	    var minutes=Math.floor(times/60000);
	    var seconds=Math.floor((times-minutes*60000)/1000);
    	var ms=Math.floor((times-minutes*60000-seconds*1000)/10);
	    showTime.innerHTML=(minutes<10 ? "0" +minutes : minutes)+":"+(seconds<10 ? "0"+seconds :seconds)+":"+(ms<10 ? "0"+ms : ms);
	}
	 
	function clickHandler(e) {
	    e= e || window.event;
	    if(this===startBn){
	        bool=!bool;
	        if(bool){
	            this.innerHTML="Stop";
            	pauseTime+=(!pauseDate ? 0 : new Date().getTime()-pauseDate);
	            if(time) return;
	            time=new Date().getTime();
	            return;
	        }
	 
	        this.innerHTML="Start";
	        pauseDate=new Date().getTime();
	        return;
	    }
	    startBn.innerHTML="Start";
	    pauseTime=0;
	    pauseDate=null;
	    bool=false;
	    time=0;
	    showTime.innerHTML="00:00:00";
	}



    function initPlayer() {

		let text = document.querySelector("span");

		// audio
		let music = document.getElementById('music')
		// 下拉列表
		let musics = document.getElementById('musics');
		// console.log(musics);
		// console.log(music);
		//定一个数组存放歌曲的地址
		let arr = [
			"./mp3/13061.mp3",
			"./mp3/13148.mp3"
		];
		console.log(arr);


		music.src = arr[musics.selectedIndex];
		// console.log(musics.selectedIndex);
	
	//双击播放
	musics.ondblclick = function () {
	music.src = arr[musics.selectedIndex];
	console.log(arr[musics.selectedIndex]);
	}
    }






    this.initPlayer = initPlayer;
	this.initTimer = initTimer;
}
