
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
      data: ["Dashboard", "Users", "Products", "Admit"],
    },
    {},
    { 
      view:"label",
      align:"center",
      label: "<span class='webix_icon fa-check'></span>Connected", 
      css: "textGreen"
    }
  ]};

var side = {
	view:"layout",
	cols:[
		list,
		{ view:"resizer"},
		{cells:[
			{ id:"Dashboard", cols:[table, form]},
			users,
			products,
			admit
			],
		gravity: 6
		}
	]
};

webix.protoUI({
    name:"editlist"
}, webix.EditAbility, webix.ui.list);

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

// $$("movieData").attachEvent("onAfterSelect", function(id){
// 	var item = $$("movieData").getItem(id)
// 	$$("movieForm").setValues(item);
// });

$$("list").select("Dashboard");

$$("filterForUser").attachEvent("onTimedKeyPress",function(){
  var value = this.getValue().toLowerCase();
  $$("listOfUsers").filter(function(obj){
    return obj.name.toLowerCase().indexOf(value)==0;
  })
});

$$('movieForm').bind($$('movieData'));

$$("movieData").registerFilter(
  $$("tabbarTable"), 
  {columnId:"year", compare:function(value, filter, item){
    if(filter == "allMovie")  return 1; 
    if(filter == "oldMovie")  return value <= 2000 ? true : false; 
    if(filter == "modermMovie")  return value <= 1914 && value >= 1880 ? 1 : 0;
    if(filter == "newMovie")  return value >= 2000 ? 1 : 0; 
  }},
  { 
    getValue:function(node){
      return node.getValue();
    },
    setValue:function(node, value){
      node.setValue(value);
    }
  }
);

$$("userChart").sync($$("listOfUsers"), function(){
    this.group({
        by:"country",
        map:{
            age:["age", "count"]
        }
    });
});

$$("categoriesData").sync(categories);
//$$("categoryId").sync(categories);
//$$("formCategory").sync(categories);
$$("categoryId").getList().data.sync(categories);
