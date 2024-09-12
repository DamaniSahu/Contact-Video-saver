
var Login_link = document.getElementById("login_link");
var Sign_link = document.getElementById("sign_link");
var login_page = document.getElementById("login_div");
var sign_page = document.getElementById("sign_div");

Login_link.onclick = function()
{
	sign_page.style.display = "none";
	login_page.style.display = "block";
}

Sign_link.onclick = function()
{
	login_page.style.display = "none";
	sign_page.style.display = "block";
}