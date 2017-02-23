var fs = require('fs');

var jsonfile = require('jsonfile');

var originalFile = 'kinectron.json';
 
json = jsonfile.readFileSync(originalFile);
//console.dir(json);

//console.log(json.length);
//var selectedFrames  = json.slice(80, 100);

//jsonfile.writeFile('kinectronCurated.json', selectedFrames, {spaces: 2}, function(err) {console.error(err)});
// console.log(selectedFrames);
// console.log(selectedFrames.length);

var hierarchy = [];

for (var j = -1; j < 56; j++) {
	var newObject = {"parent": j, "keys": []};
	hierarchy.push(newObject); 
}


// for (var n =0; n < hierarchy.length; n++) {
// 	console.log(hierarchy[n].parent);
// }

//console.log(hierarchy);
for (var i=0; i<json.length; i++) {
	var joints = json[i].joints;
	var time = (.1/3) * i;
	var scale = [1,1,1];
	//console.log(time);
	for (var k = 0; k < joints.length; k++) {
		var joint = joints[k];
		var position = [joint.cameraX, joint.cameraY, joint.cameraZ];
		var rotation = [joint.orientationX,joint.orientationY, joint.orientationZ, joint.orientationW];

		assignKey(k, {"pos":position, "time": time, "scl": scale, "rot":rotation});
		//console.log(rotation);
	}
}

//console.log(hierarchy[1].keys);

jsonfile.writeFile('hierarchy.json', hierarchy, {spaces: 2}, function(err) {console.error(err)});


function assignKey(joint, properties) {
	//console.log(joint, properties);
	var parent;

	switch (joint) {
		case 0: 
			parent = [0,1];
			break;
		case 1:
			parent = [11];
			break;
		case 2:
			parent = [13];
			break;
		case 3:
			parent = [14,15,16,17];
			break;
		case 4:
			parent = [37];
			break;
		case 5: 
			parent = [38];
			break;
		case 6:
			parent = [39];
			break;
		case 7:
			parent = [40];
			break;
		case 8:
			parent = [18];
			break;
		case 9:
			parent = [19];
			break;
		case 10:
			parent = [20];
			break;
		case 11:
			parent = [21];
			break;
		case 12:
			parent = [6];
			break;
		case 13:
			parent = [7];
			break;
		case 14:
			parent = [8];
			break;
		case 15:
			parent = [9];
			break;
		case 16:
			parent = [2];
			break;
		case 17:
			parent = [3];
			break;
		case 18:
			parent = [4];
			break; 
		case 19:
			parent = [5];
			break;
		case 20:
			parent = [12];
			break;
		case 21:
			parent = [41,42,43,44,45,46,47,48,49,50,51,52,53,54];
			break;
		case 22:
			parent = [55];
			break;
		case 23:
			parent = [22,23,24,25,26,27,28,29,30,31,32,33,34,35];
			break;
		case 24: 
			parent = [36];
			break;

		default:
			console.log("nm!");
	}

	if (parent) {
	for (var m = 0; m < parent.length; m++) {
		var pNom = parent[m];
		for (var n =0; n < hierarchy.length; n++) {
			if (pNom == hierarchy[n].parent) {
				hierarchy[n].keys.push(properties);	
			}
		}
	}
	}
}





// var sample = { "hierarchy": [{
// 	"parent":-1,
// 	"keys":[{
// 		"pos":[],
// 		"time":0,
// 		"scl":[],
// 		"rot":[]
// 	},{
// 		"pos":[],
// 		"time":0,
// 		"scl":[],
// 		"rot":[]
// 	}]
// }], 
// 	"length":1,
// "fps":30,
// "name": "sample"
// };