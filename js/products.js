var products = {
	view:"treetable",
	id:"Products",
	url:"js/data/products.js",
    datatype:"json",
    select:true,
    
    columns:[
    	{ id:"id", header:""},
    	{ id:"title", header:"Title", template:"{common.treetable()} #title#", width:200, editor:"text"},
    	{ id:"price", header:"Price", editor:"text"}
    ],
    on:{
    	onAfterLoad:function(){
      	     this.openAll();
    	}
    },
    editable:true,
    rules:{
        title:function(value){
            value == "" ? false : true;
        },
        price:function(value){
            value <= 0.001 || value >= 99999999 ? false : true;
        },
    },
}