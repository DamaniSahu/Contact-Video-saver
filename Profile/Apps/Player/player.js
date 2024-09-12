

if(sessionStorage.getItem("user") == null)
{
	window.location.replace("../../../Index.html");
}
else
{
	var current_user = sessionStorage.getItem("user");
	function play()
	{
		var video = document.getElementById("video_player");
		var playBtn = document.getElementById("play_btn");
		playBtn.onclick = function()
		{
			if(playBtn.className == "fa fa-play")
			{
				video.play();
				playBtn.className = "fa fa-pause";
			}
			else if(playBtn.className == "fa fa-pause")
			{
				video.pause();
				playBtn.className = "fa fa-play";
			}
		}
	}

	play();

	// Progress bar coding

	var video = document.getElementById("video_player");
	video.ontimeupdate = function()
	{
		var total_duration = this.duration;
		var current_duration = this.currentTime;
		var total_duration_sec = total_duration - parseInt(total_duration/60)*60;
		var current_duration_sec = current_duration - parseInt(current_duration/60)*60;
		var video_timing = document.getElementById("v_timing");
		var progressBar = document.getElementById("progress_bar");
		video_timing.innerHTML = parseInt(current_duration/60)+ ":" +parseInt(current_duration_sec)+ "/" +parseInt(total_duration/60)*60+ ":" +parseInt(total_duration_sec);
		var slid_parcentage = parseInt(current_duration*100/total_duration);
		progressBar.style.width = slid_parcentage+"%";

		if(current_duration == total_duration)
		{
			var playBtn = document.getElementById("play_btn");
			playBtn.className = "fa fa-play";
		}
	}

	// Open or close video box

	var addVideo = document.getElementById("add_video");
	addVideo.onclick = function()
	{
		var add_videoBox = document.getElementById("add_video_box");
		if(addVideo.className == "fas fa-plus-circle")
		{
			add_videoBox.style.display = "block";
			addVideo.className = "fas fa-times-circle";
		}
		else if(addVideo.className == "fas fa-times-circle")
		{
			add_videoBox.style.display = "none";
			addVideo.className = "fas fa-plus-circle";
		}
	}

	//Add video in localstoreage
	var save_videoBtn = document.getElementById("save_video_btn");
	save_videoBtn.onclick = function()
	{
		var videoName = document.getElementById("video_name");
		var videoLink = document.getElementById("video_link");
		if(videoName.value != "" && videoLink.value != "")
		{
			var save_video = {video_name:videoName.value,video_link:videoLink.value};
			var text_data = JSON.stringify(save_video);
			var s = localStorage.setItem(current_user+"video"+videoName.value,text_data);
		}
	}

	// Fetch all videos from localstorage

	function playlist()
	{
		for(var i = 0; i<localStorage.length; i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match(sessionStorage.getItem("user")+"video"))
			{
				var json_taxt = localStorage.getItem(all_keys);
				var obj = JSON.parse(json_taxt);

				var main_videoBox = document.createElement("DIV");
				main_videoBox.setAttribute("id","main_video_box");
				var videoPlaylist = document.createElement("P");
				videoPlaylist.setAttribute("id","video_playlist");
				videoPlaylist.className = "video_playlist";
				videoPlaylist.innerHTML = obj.video_name;
				var video_playBtn = document.createElement("BUTTON");
				video_playBtn.setAttribute("type","button");
				video_playBtn.setAttribute("id","video_play_btn");
				video_playBtn.className = "video_play_btn";
				video_playBtn.setAttribute("url",obj.video_link);
				video_playBtn.innerHTML = "Play";
				var video_deletBtn = document.createElement("BUTTON");
				video_deletBtn.setAttribute("type","button");
				video_deletBtn.setAttribute("id","video_delet_btn");
				video_deletBtn.className = "video_delet_btn";
				video_deletBtn.innerHTML = "Delet";

				main_videoBox.appendChild(videoPlaylist);
				main_videoBox.appendChild(video_playBtn);
				main_videoBox.appendChild(video_deletBtn);

				var bottom = document.getElementById("bottom");
				bottom.appendChild(main_videoBox);
			}
		}
	}
	playlist();

	// Video play btn coding
	function play_video()
	{
		var videoPlayBtn = document.getElementsByClassName("video_play_btn");
		for(var i = 0; i<videoPlayBtn.length; i++)
		{
			videoPlayBtn[i].onclick = function()
			{
				clear();
				var video_url = this.getAttribute("url");
				var videoSrc = document.getElementById("video_src");
				videoSrc.setAttribute("src",video_url);
				var video = document.getElementById("video_player");
				var playBtn = document.getElementById("play_btn");
				video.load();
				video.play();
				playBtn.className = "fa fa-pause";
				this.innerHTML = "Playing...";
			}
		}
	}
	play_video();

	function clear()
	{
		var videoPlayBtn = document.getElementsByClassName("video_play_btn");
		for(var i = 0; i<videoPlayBtn.length; i++)
		{
			videoPlayBtn[i].innerHTML = "play";
		}
	}

	// Next button coding
	 function next_button()
	 {
	 	var nextButton = document.getElementById("next_btn");
	 	nextButton.onclick = function()
	 	{
	 		var videoPlayBtn = document.getElementsByClassName("video_play_btn");
	 		for(var i = 0; i<videoPlayBtn.length; i++)
	 		{
	 			if(videoPlayBtn[i].innerHTML == "Playing...")
	 			{
	 				var next_video = videoPlayBtn[i].parentElement.nextSibling;
	 				var next_play_btn = next_video.getElementsByClassName("video_play_btn")[0];
	 				next_play_btn.click();
	 				return false;
	 			}
	 		}
	 	}
	 }
	 next_button();


	 // Previous button coding
	 function previous_button()
	 {
	 	var previousButton = document.getElementById("previous_btn");
	 	previousButton.onclick = function()
	 	{
	 		var videoPlayBtn = document.getElementsByClassName("video_play_btn");
	 		for(var i = 0; i<videoPlayBtn.length; i++)
	 		{
	 			if(videoPlayBtn[i].innerHTML == "Playing...")
	 			{
	 				var previous_video = videoPlayBtn[i].parentElement.previousSibling;
	 				var previous_play_btn = previous_video.getElementsByClassName("video_play_btn")[0];
	 				previous_play_btn.click();
	 				return false;
	 			}
	 		}
	 	}
	 }
	 previous_button();

	// Search video coding

	var videoSearch  = document.getElementById("video_search");
	videoSearch.oninput = function()
	{
		var videoPlaylist = document.getElementsByClassName("video_playlist");
		for(var i = 0; i<videoPlaylist.length; i++)
		{
			if(videoPlaylist[i].innerHTML.toUpperCase().match(videoSearch.value.toUpperCase()))
			{
				videoPlaylist[i].parentElement.style.display = "block";
			}
			else
			{
				videoPlaylist[i].parentElement.style.display = "none";
			}
		}
	}

	// Delet button coding

	function delet()
	{
		var videoDeletBtn = document.getElementsByClassName("video_delet_btn");
		for(var i = 0; i<videoDeletBtn.length; i++)
		{
			videoDeletBtn[i].onclick = function()
			{
				var parent = this.parentElement;
				var video_Name = parent.getElementsByClassName("video_playlist")[0].innerHTML;
				localStorage.removeItem(current_user+"video"+video_Name);
				parent.className = "animate__animated animate__zoomOut";

				setTimeout(function(){
					parent.remove();
				},1000)
			}
		}
	}
	delet();

	// Volum coding

	function volume()
	{
		var Volume = document.getElementById("volume");
		Volume.onclick = function()
		{
			var volume_rang = document.getElementById("volume_control");
			if(volume_rang.style.display == "none")
			{
				volume_rang.style.display = "block";
				volume_rang.oninput = function()
				{
					//var video = document.getElementById("video_player");
					video.volume = this.value;
				}
			}
			else if(volume_rang.style.display = "block")
			{
				volume_rang.style.display = "none";
			}
		}
	}
	volume();

	// Video forward or backward coding
	var progressBox = document.getElementById("progress_box");
	progressBox.onclick = function(event)
	{
		var par = event.offsetX/this.offsetWidth;
		video.currentTime = par*video.duration;
	}

	// Full screen coding
	var fullScreen = document.getElementById("full_screen");
	fullScreen.onclick = function()
	{
		video.requestFullscreen();
	}

	// Setting coding
	var speed = document.getElementById("speed");
	speed.onclick = function()
	{
		var speed_rang = document.getElementById("speed_control");
		if(speed_rang.style.display == "none")
		{
			speed_rang.style.display = "block";
			speed_rang.oninput = function()
			{
				//var video = document.getElementById("video_player");
				video.playbackRate = this.value;
			}
		}
		else if(speed_rang.style.display = "block")
		{
			speed_rang.style.display = "none";
		}
	}

}
