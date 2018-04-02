var datatable = {
  	view: "datatable",
  	id:"movieData",
  	url:"js/data/data.js",
    datatype:"json",
    select:true,
  	columns:[
  	 	{id:"id", header:"Num", sort:"int", width: 50, css:"firstCol",css:"textCenter"},
	    {id:"title", header: ["Title" ,{ content:"textFilter"}], sort:"string", fillspace:true, minWidth:150},
	    {id:"year", header:"Year", sort:"string",css:"textCenter"},
	    {id:"votes", header:["Votes", { content:"textFilter"}], sort:"string",css:"textCenter"},
	    {id:"rating", header:["Rating",{ content:"textFilter"}], sort:"string",css:"textCenter"},
	    {id:"rank", header:["Rank",{ content:"textFilter"}], sort:"string",css:"textCenter"},
	   	{id:"category", header:"Category", editor:"select", options:"js/extra-js/categories.js"},
	    {id:"trash", header:"Del", template:"{common.trashIcon()}", width: 40,css:"textCenter"}
    ],
    editable:true,
    scheme:{
    	$init:function(item){
        	item.category = Math.ceil(Math.random()*(4));
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
	hover:"hover"
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
		{type:"section", template:"EDIT FILMS" },
		{view:"text", label:"Title", name:"title", invalidMessage:"Title shouldn't be empty!"},
		{view:"text", label:"Year", name:"year", invalidMessage:"Year should be '> 1970', and '< now'!"},
		{view:"text", label:"Votes", name:"votes", invalidMessage:"Votes shouldn't be bigger than 100000!"},
		{view:"text", label:"Rating", name:"rating", invalidMessage:"Rating shouldn't be empty or be 0!"},
		{view:"text", label:"Rank", name:"rank", invalidMessage:"Rating shouldn't be empty"},
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
			
		




