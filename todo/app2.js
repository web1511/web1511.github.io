
//本地存储封装
var store = {
	save : function(key,value){
		localStorage.setItem(key,JSON.stringify(value));
	},
	fetch :function(key){
		return JSON.parse(localStorage.getItem(key)) || [];
	}
}

//数据一开始是没有的
// var list = [
// 	{
// 	  title:'吃饭打豆豆',
// 	  isChecked:false  //状态为false，不选中，任务未完成		
// 	},
// 	{
// 	  title:'学习vue框架',
// 	  isChecked:true  //状态为true，选中，任务完成		
// 	}
		
// ];

var list = store.fetch("wcx-new");
var filter = {
	all : function(list){
		return list;
	},
	unfinished : function(list){
		return list.filter(function(item){
			  return !item.isChecked;
		})
	},
	finished : function(){
		return list.filter(function(item){
			  return item.isChecked;
		})
	}
}
var vm = new Vue({
	el:'.main',
	data:{
		list:list,
		todo:"",
		edtorTodos:'',  //记录正在编辑的数据
		beforeTitle:'', //记录正在编辑的数据的title
		visibility: "all" //通过这个属性值的变化对数据进行筛选
	},
	watch:{
		// list:function(){
		// 	store.save("wcx-new",this.list);
		// }
		//深度监听,也就是 list 数组里面 每个对象里面的值改变，也会更新视图
		list : {
			 handler :function(val,oldVal){
			 	store.save("wcx-new",this.list);
			 },
			 deep:true
		}
	},
	computed:{
		noCheckeLength : function(){//帅选没有选择的任务
			return this.list.filter(function(item){
				   return !item.isChecked;
			}).length;
		},
		filterList : function(){
			return filter[this.visibility] ? filter[this.visibility](this.list):this.list;
		}	
	},
	methods : {
		addTodo(ev){//添加任务
			//console.log(ev);
			//向list中添加数据,在method方法中list数组，
			//需要加this
			// if(ev.target.value.trim() !='' ){
			// 	this.list.push({
			// 		title: ev.target.value  
			// 	});
			// }
			if(this.todo.trim() !=''){
				this.list.push({
					title:this.todo,
					isChecked:false
				});
			}
			this.todo = '';
		},
		deleteTodo(num,item){//删除任务
			//var index = this.list.indexOf(todo);
			//console.log(num);
			//console.log(this.list[num].isChecked);
			//console.log(item.isChecked);	
			if(item.isChecked){
				this.list.splice(num,1);
			}else{
				alert('请勾选要删除的');
			}
			
		},
		editTodo(item){//编辑任务
			this.beforeTitle = item.title;
			this.edtorTodos = item;
			//console.log(this.item);
		},
		editTodoed(){//编辑完成
			this.edtorTodos = '';
		},
		cancelTodo(item){//取消编辑
			item.title = this.beforeTitle;
			this.edtorTodos = '';
		}
	},
	directives: { //自定义指令
		"focus" : {
			update(el,binding){
				// console.log(el); //当前的dom
				// console.log(binding);
				if(binding.value){
					el.focus();
				}
			}
		}
	}

});
function watchHash(){
	var hash = window.location.hash.slice(1);
	vm.visibility = hash;
}
watchHash();
window.addEventListener('hashchange',watchHash);