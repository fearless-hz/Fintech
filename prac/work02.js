var car = {
	name : "sonata",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

//car.start(); //"오브젝트명."을 통해 불러올 수 있다.

var car2 = {
	name : "BMW",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stoped");
	}
}

var car3 = {
	name : "AUDI",
	ph : "500ph",
	start : function () {
		console.log("engine is starting");
	},
	stop : function () {
		console.log("engine is stopped");
	}
}

var cars = [car,car2,car3];
var i;
for(i=0;i<cars.length;i++){
    
    if(cars[i].name=='BMW'){
        console.log(cars[i].name,'!');
    }
}