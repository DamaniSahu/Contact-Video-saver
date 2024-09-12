                                                                                      
/* Start sign up coding */
var signForm = document.getElementById("sign_form");

signForm.onsubmit = function()
{
	var signName = btoa(document.getElementById("sign_name").value);
	var signEmail = btoa(document.getElementById("sign_email").value);
	var signM_no = btoa(document.getElementById("sign_m_no").value);
	var signPassword = btoa(document.getElementById("sign_password").value);

	var sign_obj_data = {sign_name:signName,sign_email:signEmail,sign_m_no:signM_no,sign_password:signPassword};

	var user_text_data = JSON.stringify(sign_obj_data);

	if(signName != "" && signEmail != "" && signM_no != "" && signPassword != "")
	{
		localStorage.setItem(signEmail,user_text_data);
		var signBtn = document.getElementById("sign_btn");
		signBtn.style.background = "#14b129";
		signBtn.innerHTML = "<i class='fas fa-check-circle-o'></i> Sign up successful!";

		setTimeout(function(){
				signBtn.style.background = "linear-gradient(to right, #78ffd6, #007991)";
				signBtn.innerHTML = "Sign up";
				signForm.reset();
		},4000);
		return false;
	}
}

/* End sign up coding */

/* Start email validation coding */

var email_input = document.getElementById("sign_email");
email_input.onchange = function()
{
	var email = btoa(document.getElementById("sign_email").value);
	var warning = document.getElementById("email_warning");
	var sign_Btn = document.getElementById("sign_btn");
	if(localStorage.getItem(email) != null)
	{
		warning.style.display = "block";
		email_input.style.borderBottomColor = "red";
		sign_Btn.disabled = "true";
		sign_Btn.style.background = "#ccc";

		email_input.onclick = function()
		{
			email_input.value = "";
			warning.style.display = "none";
			email_input.style.borderBottomColor = "#727272";
			sign_Btn.disabled = false;
			sign_Btn.style.background = "linear-gradient(to right, #78ffd6, #007991)";
		}
	}
}

/* End email validation coding */

/* Start Login coding */

var loginForm = document.getElementById("login-form");
loginForm.onsubmit = function()
{
	var loginEmail = document.getElementById("login_email");
	var loginPassword = document.getElementById("login_password");

	if(localStorage.getItem(btoa(loginEmail.value)) == null)
	{
		document.getElementById("login_email_warning").style.display = "block";
		loginEmail.style.borderBottomColor = "red";

		loginEmail.onclick = function()
		{
			loginEmail.value = "";
			document.getElementById("login_email_warning").style.display = "none";
			loginEmail.style.borderBottomColor = "#727272";
		}
	}
	else
	{
		var text_data = localStorage.getItem(btoa(loginEmail.value));
		var obj_data = JSON.parse(text_data);
		var correct_email = obj_data.sign_email;
		var correct_password = obj_data.sign_password;

		if(btoa(loginEmail.value) == correct_email)
		{
			if(btoa(loginPassword.value) == correct_password)
			{
				sessionStorage.setItem("user",btoa(loginEmail.value));
				window.location.replace("Profile/profile.html"); 
			}
			else
			{
				document.getElementById("password_warning").style.display = "block";
				loginPassword.style.borderBottomColor = "red";

				loginPassword.onclick = function()
				{
					loginPassword.value = "";
					document.getElementById("password_warning").style.display = "none";
					loginPassword.style.borderBottomColor = "#727272";
				}
			}
		}
	}
	return false;
}

/* End Login coding */