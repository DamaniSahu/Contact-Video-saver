
	if(sessionStorage.getItem("user") == null)
	{
		window.location.replace("../Index.html");
	}
	else
	{
		// Logout coding 
		var Logout = document.getElementById("logout");
		Logout.onclick = function()
		{
			sessionStorage.clear();
			var logoutText = document.getElementById("logout_text");
			logoutText.innerHTML = "Please wait...";
			setTimeout(function(){
				window.location = "../Index.html";
			},2000);
		}

		// Profile name coding
		var user_email = sessionStorage.getItem("user");
		var json_text = localStorage.getItem(user_email);
		var obj_data = JSON.parse(json_text);
		var profileName = document.getElementById("profile_name");
		profileName.innerHTML = atob(obj_data.sign_name);
		document.getElementById("profile_user").innerHTML = atob(obj_data.sign_name);

		// Profile picture coding
		var image_url = localStorage.getItem(user_email+"Image");
		var profilePicture = document.getElementById("profile_picture");
		profilePicture.style.backgroundImage = "url(" +image_url+ ")";
		profilePicture.style.backgroundSize = "cover";
		profilePicture.style.backgroundPosition = "center";

		if(localStorage.getItem(user_email+"Image") != null)
		{
			var profileContainer = document.getElementById("profile_container");
			profileContainer.style.display = "none";
		}
		
		// Profile picture upload coding
		var profileUpload = document.getElementById("profile_upload");
		profileUpload.onchange = function()
		{
			var reader = new FileReader();
			reader.readAsDataURL(profileUpload.files[0]);
			reader.onload = function()
			{
				var filename = reader.result;
				var profilePic = document.getElementById("profile_pic");
				var profileIcon = document.getElementById("profile_icon");
				profilePic.style.backgroundImage = "url(" +filename+ ")";
				profilePic.style.backgroundSize = "cover";
				profilePic.style.backgroundPosition = "center";
				profileIcon.style.display = "none";
				var nextBtn = document.getElementById("profile_btn");
				nextBtn.style.display = "block";

				nextBtn.onclick = function()
				{
					localStorage.setItem(user_email+"Image",filename);
					var profileContainer = document.getElementById("profile_container");
					profileContainer.style.display = "none";
					window.location = location.href;
				}
			}
		}
	}
