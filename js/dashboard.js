var categories = new webix.DataCollection({
    url:"js/extra-js/categories.js" 
});

var datatable = {
  	view: "datatable",
  	id:"movieData",
  	url:"js/data/data.js",
    datatype:"json",
    select:"row",
  	columns:[
  	 	{id:"id", header:"Num", sort:"int", width: 50, css:"firstCol",css:"textCenter"},
	    {id:"title", header: ["Title" ,{ content:"textFilter"}], sort:"string", fillspace:true, minWidth:150},
	    {id:"year", header:"Year", sort:"string",css:"textCenter"},
	    {id:"votes", header:["Votes", { content:"textFilter"}], sort:"string",css:"textCenter"},
	    {id:"rating", header:["Rating",{ content:"textFilter"}], sort:"string",css:"textCenter"},
	    {id:"rank", header:["Rank",{ content:"textFilter"}], sort:"string",css:"textCenter"},
	   	{id:"categoryId", header:"Category", editor:"select", options:categories},
	    {id:"trash", header:"Del", template:"{common.trashIcon()}", width: 40,css:"textCenter"}
    ],
    editable:true,
    scheme:{
    	$init:function(item){
        	item.categoryId = Math.ceil(Math.random()*(4));
        	//categories.data.pull[Math.ceil(Math.random()*(4))].value;
    	}
    },
    scrollY:true,
    onClick:{
	  	"fa-trash":function(e,id){
            this.remove(id);
            webix.message("Deleted");
            return false;
	    }
	},
	hover:"hover",
	//save: "https://docs.webix.com/samples/40_serverside/01_php_vanila/server/datatable_save.php"
	save: "rest->https://docs.webix.com/samples/40_serverside/03_php_custom/server/datatable_rest.php"

};

var table = {
	view:"layout",
	gravity: 4,
	rows:[
		{
			view: "tabbar",
			id:"tabbarTable",
			options: [
				{ value: "All", id: "allMovie"},
	            { value: "Old", id: "oldMovie"},
	            { value: "Modern", id: "modermMovie"},
	            { value: "New", id: "newMovie"}
        	],
        	on:{
        		onChange:function(){
          			$$("movieData").filterByAll();
        		}
     		}
		},
		datatable
	]	
};

var form = { 
	view:"form", 
	id:"movieForm",
	gravity: 2,
	scroll:false, 
	elements:[
		{type:"section", template:"edit films" },
		{view:"text", label:"Title", name:"title", invalidMessage:"Title shouldn't be empty!"},
		{view:"text", label:"Year", name:"year", invalidMessage:"Year should be '> 1970', and '< now'!"},
		{view:"text", label:"Votes", name:"votes", invalidMessage:"Votes shouldn't be bigger than 100000!"},
		{view:"text", label:"Rating", name:"rating", invalidMessage:"Rating shouldn't be empty or be 0!"},
		{view:"text", label:"Rank", name:"rank", invalidMessage:"Rating shouldn't be empty"},
		{view:"richselect", label:"Richselect", name:"categoryId", id:"categoryId", options:categories.data},
		{cols:[
	   	 	{ 
	   	 		view:"button", 
	   	 		label:"Add new", 
	   	 		css:"greenButton",
  				click: function (){
	  				var form = $$('movieForm');
					if(form.isDirty()){
						if(!form.validate())
						return false;
						form.save();
					}
				}
	   	 	},
	    	{ 	
	    		view:"button", 
	    		label:"Clear",
	    		click:function(){
			      	webix.confirm({
			        	title:"Clear form",
			          	text:"Do you really want to clear form?",
			          	callback:function(result){
            				if(result){
            					$$('movieForm').clear();
            					$$("movieForm").clearValidation();
            				}
            			}
            		})
			    }
	     	}
		]},
		{},
		{
			view:"button", value:"Unselect", click:function(){
                $$("movieData").unselectAll();
            }
        }
	],
	rules:{
	 	title:webix.rules.isNotEmpty,
	 	year:function(value){
	 		let date = new Date;
	 		if(value<1970 || value>date.getFullYear()) return false;
	 		else return true;
      	},
      	votes:function(value){
        	return value<100000;
      	},
      	rating:function(value){
      		if (webix.rules.Empty || value == 0) return false;
      		else return true;
      	}
	},
};
			
		




