var countries = new webix.DataCollection({
    url:"js/extra-js/countries.js" 
});

var usersCollection = new webix.DataCollection({
    url:"js/data/users.js" 
});

var userList={
	rows:[
	 	{
	 		cols:[
				{
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
		 		},
		 		{
		 			view:"button", 
		 			id:"userAdd", 
		 			label:"Add new", 
		 			gravity:1,
		 			click: ()=>{
						$$("listOfUsers").add({
							name: "Jeck Dickens",
							age: Math.round(Math.random()*60)+10,
							country: countries.data.pull[Math.ceil(Math.random()*7)].value,
						},0);
					}
		 		}
	 		]
	    },
		{
			view:"editlist",
			id:"listOfUsers",
			editable:true,
			editor:"text",
 			editValue:"name",
			template:"#id#. <b>#name#</b> from #country# <span class='webix_icon fa-trash'></span>",
		    data:usersCollection,
		    onClick:{
	  			"fa-trash":function(e,id){
	           		this.remove(id);
	            	webix.message("Deleted");
	            	return false;
	    		}
			},
			scheme:{
    			$init:function(item){
    				if(item.age < 26) item.$css="youngUser";
    			},
    			$change:function(item){
            		if (item.name === "") {
            			item.name = "nameless User";
            			item.$css="emptyUser";
            		} else{
            			item.$css="fullUser";
            		}
             	}
    		},	
    //  		rules:{
	//     		name:function(value){
    //      			value === "" ? false : true;
    //    			},
	// 		},
			on:{
		    	onItemRender:function(){
					$$("userChart").group({ 
		        		by:"country", 
		        		map:{ 
		            		age:["age", "count"]
		            	}
		        	});	
				},			
			},
		}
	]
 
};

var userChart={
	view:"chart",
    id:"userChart",
    type:"bar",
    value: "#age#",
    border:true,
    yAxis:{},
    xAxis:{
        template:"#country#",
        title:"Country"
    },
};

var users = {
	view:"layout",
	id:"Users",
	rows:[userList, userChart]
};