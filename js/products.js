var products = {
	view:"treetable",
	id:"Products",
	url:"js/data/products.js",
    datatype:"json",
    select:true,
    columns:[
    	{ id:"id", header:""},
    	{ id:"title", header:"Title", template:"{common.treetable()} #title#", width:200 },
    	{ id:"price", header:"Price" }
    ],
    on:{
    	onAfterLoad:function(){
      	this.openAll();
    	}
    }

}