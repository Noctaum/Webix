
var bar = {
    view:"toolbar",
    id:"myToolbar",
    cols:[
        { view:"label", label:"My App", align:"left" },
        { 
        	id:"userButton", 
        	view:"button", 
        	type:"icon", 
        	icon:"user", 
        	label:"Profile", 
        	width:100, 
        	align:"right",
        	click:function(){
        		$$("popup").show($$(this).getNode());
        	}
    	}]
};

var side = {
	view:"layout",
	cols:[
		list,
		{ view:"resizer"},
		{cells:[
			{ id:"Dashboard", cols:[table, form]},
			users,
			products,
			{ id:"Locations",template:"Template for Locations view"}
			],
		gravity: 6
		}
	]
};

webix.ui({
	view:"layout",
	id:"dsd",
   	rows:[bar, side,
   		{
   			view:"label", 
   			label:"The software is provided by <a href='https://webix.com'>https://webix.com</a>. All rights reserved (c).",
   			css: "textCenter"
   		}
   ]
});

var pop = webix.ui({
	view:"popup",
	id:"popup",
	height:85,
	position:"center",
	body:{
	view: "list",
	data: [ "Settings", "Log out"]
	}
});

$$("movieData").attachEvent("onAfterSelect", function(id){
	$$("movieForm").setValues({
		title: $$("movieData").getItem(id).title,
		year: $$("movieData").getItem(id).year,
		votes: $$("movieData").getItem(id).votes,
		rating: $$("movieData").getItem(id).rating,
		rank: $$("movieData").getItem(id).rank
	});
});

$$("list").select("Dashboard");

$$("filterForUser").attachEvent("onTimedKeyPress",function(){
  var value = this.getValue().toLowerCase();
  $$("listOfUsers").filter(function(obj){
    return obj.name.toLowerCase().indexOf(value)==0;
  })
});

