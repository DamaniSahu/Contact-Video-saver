

if(sessionStorage.getItem("user") == null)
{
	window.location.replace("../Index.html");
}
else
{
	var current_user = sessionStorage.getItem("user");

	var profilePic = document.getElementById("profile_pic");
	var url = localStorage.getItem(current_user+"Image");
	profilePic.style.backgroundImage = "url("+url+")";
	profilePic.style.backgroundSize = "cover";
	profilePic.style.backgroundPosition = "center";

	// Open new contact box
	var newContact = document.getElementById("new_contact");
	newContact.onclick = function()
	{
		var add_contactBox = document.getElementById("add_contact_box");
		add_contactBox.style.display = "block";
	}

	// Close contact box
	var Close = document.getElementById("close");
	Close.onclick = function()
	{
		var add_contactBox = document.getElementById("add_contact_box");
		add_contactBox.style.display = "none";
	}

	// Add contact in localstorage
	var Add = document.getElementById("add");
	Add.onclick = function()
	{
		var contactName = document.getElementById("contact_name");
		var contactNumber = document.getElementById("contact_number");
		if(contactName.value != "" && contactNumber.value != "")
		{
			var new_contact = {name:contactName.value,number:contactNumber.value};
			var json_text = JSON.stringify(new_contact);
			localStorage.setItem(current_user+ "_contact" +contactName.value,json_text);
		}
		else
		{
			if(contactName.value == "")
			{
				contactName.style.borderColor = "red";
				contactName.style.boxShadow = "0px 0px 7px red";
				document.getElementById("name_w").style.display = "block";

				contactName.onclick = function()
				{
					contactName.style.borderColor = "#17939f";
					contactName.style.boxShadow = "0px 0px 0px 0px";
					document.getElementById("name_w").style.display = "none";
				}
			}

			if(contactNumber.value == "")
			{
				contactNumber.style.borderColor = "red";
				contactNumber.style.boxShadow = "0px 0px 7px red";
				document.getElementById("num_w").style.display = "block";

				contactNumber.onclick = function()
				{
					contactNumber.style.borderColor = "#17939f";
					contactNumber.style.boxShadow = "0px 0px 0px 0px";
					document.getElementById("num_w").style.display = "none";
				}
			}
			return false;
		}
	}

	function all_contacts()
	{
		for(var i = 0;i<localStorage.length;i++)
		{
			var all_keys = localStorage.key(i);
			if(all_keys.match(sessionStorage.getItem("user")+"_contact"))
			{
				var json_text = localStorage.getItem(all_keys);
				var obj = JSON.parse(json_text);

				var Contact = document.createElement("DIV");
				Contact.setAttribute("id","contact");
				var nameP = document.createElement("P");
				nameP.setAttribute("class","contact_names");
				var userIcon = document.createElement("I");
				userIcon.setAttribute("class","fas fa-user");
				var Tools = document.createElement("DIV");
				Tools.setAttribute("id","tools");
				var Edit = document.createElement("I");
				Edit.setAttribute("class","fas fa-edit edit");
				var Trash = document.createElement("I");
				Trash.setAttribute("class","fas fa-trash delet");
				var Line = document.createElement("HR");
				Line.setAttribute("color","#17939f");
				Line.setAttribute("width","75%");
				Line.setAttribute("size","1px");
				var numP = document.createElement("P");
				numP.setAttribute("class","contact_numbers");
				var numIcon = document.createElement("I");
				numIcon.setAttribute("class","fas fa-mobile-alt");

				nameP.appendChild(userIcon);
				nameP.innerHTML += " "+obj.name;

				Tools.appendChild(Edit);
				Tools.appendChild(Trash);

				numP.appendChild(numIcon);
				numP.innerHTML += " "+obj.number;

				Contact.appendChild(nameP);
				Contact.appendChild(Tools);
				Contact.appendChild(Line);
				Contact.appendChild(numP);

				var allContact = document.getElementById("all_contact");
				allContact.appendChild(Contact);
			}
		}
	}

	all_contacts();

	// Searching coding

	var Search = document.getElementById("search");
	Search.oninput = function()
	{
		var all_contacts_name = document.getElementsByClassName("contact_names");
		for(var i=0; i<all_contacts_name.length; i++)
		{
			if(all_contacts_name[i].innerHTML.toUpperCase().match(Search.value.toUpperCase()))
			{
				all_contacts_name[i].parentElement.style.display = "block";
			}
			else
			{
				all_contacts_name[i].parentElement.style.display = "none";
			}
		}
	}

	// Delet button coding

	function delet()
	{
		var delet = document.getElementsByClassName("delet");
		for(var i = 0; i<delet.length; i++)
		{
			delet[i].onclick = function()
			{
				var parent = this.parentElement.parentElement;
				var p_element = parent.getElementsByClassName("contact_names")[0];
				var username = p_element.innerHTML.replace('<i class="fas fa-user"></i>','');
				localStorage.removeItem(current_user + "_contact" + username.trim());
				parent.className = "animate__animated animate__zoomOut";

				setTimeout(function(){
					parent.remove();
				},1000)
			}
		 }
	}

	delet();

	// Edit button coding

	function edit()
	{
		var edit = document.getElementsByClassName("edit");
		for(var i = 0; i<edit.length; i++)
		{
			edit[i].onclick = function()
			{
				var parent = this.parentElement.parentElement;
				var para = parent.getElementsByTagName("P");
				var name = para[0].innerHTML.replace('<i class="fas fa-user"></i>','').trim();
				var number = para[1].innerHTML.replace('<i class="fas fa-mobile-alt"></i>','').trim();
				var c_name = document.getElementById("contact_name");
				var c_number = document.getElementById("contact_number");
				var add_btn = document.getElementById("new_contact");
				var cHeading = document.getElementById("c_heading");
				var btn = document.getElementById("add");
				var close = document.getElementById("close");
				c_name.value = name;
				c_number.value = number;
				cHeading.innerHTML = "Edit Contact";
				btn.innerHTML = "Update"
				close.style.display = "none";
				add_btn.click();
				localStorage.removeItem(current_user + "_contact" + name);
			}
		}
	}

	edit();
}