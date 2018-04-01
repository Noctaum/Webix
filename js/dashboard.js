var list ={ 
	gravity:1.5, 
	view:"layout",
	css: "grayList",
	rows:[
		{
			view: "list",
			id:"list",
			select:true,
			on:{
		      	onAfterSelect:function(id){ 
		        	$$(id).show();
		        }
		    },
			data: ["Dashboard", "Users", "Products", "Locations"],
		},
		{},
		{	
			view:"label",
			align:"center",
			label: "<span class='webix_icon fa-check'></span>Connected", 
			css: "textGreen"
		}
	]};

var table = {
  	view: "datatable",
  	id:"movieData",
  	gravity: 4,
  	url:"js/data/data.js",
    datatype:"json",
    select:true,
  	columns:[
  	 	{id:"id", header:"Num", sort:"int", width: 50, css:"firstCol",css:{"text-align":"center"}},
	    {id:"title", header: ["Title" ,{ content:"textFilter"}], sort:"string"},
	    {id:"year", header: ["Year", { content:"textFilter"}], sort:"string",css:{"text-align":"center"}},
	    {id:"votes", header:["Votes", { content:"textFilter"}], sort:"string",css:{"text-align":"center"}},
	    {id:"rating", header:["Rating",{ content:"textFilter"}], sort:"string",css:{"text-align":"center"}},
	    {id:"rank", header:["Rank",{ content:"textFilter"}], sort:"string",css:{"text-align":"center"}},
	    {id:"trash", header:"Del", template:"{common.trashIcon()}", width: 40,css:{"text-align":"center"}}
	    //css:{"text-align":"right"}
    ],
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
	   	 		click: function(){
	    			if($$("movieForm").validate()){
	    				let item = $$("movieForm").getValues();
	    				for(let i in item) item[i]=item[i].replace(/<.*?>/g, '');
	    				$$("movieData").add(item);
	    				webix.message(
				          {text:"Validation is successful",
				           expire:0
				        });
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
		 {cols:[
	   	 	{ 
	   	 		view:"button", 
	   	 		label:"Edit", 
	   	 		click: function(){
	    			var sel = $$("movieData").getSelectedId();
				    if(!sel) return;

				    let itemNew = $$("movieForm").getValues();
	    			for(let i in itemNew) itemNew[i]=itemNew[i].replace(/<.*?>/g, '');
	    			var item = $$("movieData").getItem(sel);
	    			for(let i in item) item[i]=itemNew[i];
	    			$$("movieData").updateItem(sel, item);
	    			webix.message(
				        {text:"Validation is updated!",
				        expire:0
				    });
	    		}
	   	 	},
		 ]},
		 {}
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
