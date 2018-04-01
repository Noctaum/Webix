var userList={
	rows:[
	 	{
	 		cols:[
				{
					view:"toolbar",
		     		view:"text", 
		     		id:"filterForUser",
		     		placeholder:"Type to filter..",
		     		gravity: 3
				},
		 		{
		 			view:"button", 
		 			id:"userASCsort", 
		 			label:"Sort asc", 
		 			gravity:1,
		 			click: ()=>{
						$$("listOfUsers").sort("#name#", "asc");
					}
		 		},
		 		{
		 			view:"button", 
		 			id:"userDESCsort", 
		 			label:"Sort desc", 
		 			gravity:1,
		 			click: ()=>{
						$$("listOfUsers").sort("#name#", "desc");
					}
		 		}
	 		]
	    },
		{
			view:"list",
			id:"listOfUsers",
			css:"userList",
			template:"#id#. <b>#name#</b> from #country# <span class='webix_icon fa-trash'></span>",
			url:"js/data/users.js",
		    datatype:"json",
		    onClick:{
	  			"fa-trash":function(e,id){
	           		this.remove(id);
	            	webix.message("Deleted");
	            	return false;
	    		}
			}
		}
	]
 
};

var userChart={
	view:"chart",
    url:"js/data/users.js",
    datatype:"json",
    type:"bar",
    value:"#age#",
    border:true,
    xAxis:{
        template:"#age#",
        title:"Age"
    },
};

var users = {
	view:"layout",
	id:"Users",
	rows:[userList, userChart]
};