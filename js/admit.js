// var admit = {
// 	view:"layout",
// 	id:"Admit",
// 	rows:[categoriesTable]
// };

var admit = {
	view:"layout",
	id:"Admit",
	rows:[
		{cols:[
	  	{
	  		view: "datatable",
	  		id:"categoriesData",
	  		minHeight:300,
	  		data:categories,
	  		select:true,
	  		editable:true,
	  		editor:"text",
 			editValue:"value",
 			gravity:4,
	  		columns:[
	  	 		{id:"id", header:"ID", width: 50, css:"textCenter"},
	  	 		{id:"value", header:"Categories", sort:"string", css:"textCenter",editor:"text"},
	   		]
	   	},
	    {rows:[
		    { 
		   	 	view:"button", 
		   	 	label:"Add new", 
		   	 	css:"greenButton",
				click:function(){
	          		categories.add({title:"New category"})
	        	},
		   	},
		   	{ 
		   	 	view:"button", 
		   	 	label:"Remove selected", 
				click:function(){
					var one = $$("categoriesData").getSelectedId();
	          		if(one) categories.remove(one);
	        	}
	        },		
	   	],
	   	gravity:1
	   }
    ]},
    {}
    ]
   
};