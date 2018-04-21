var RoomDatabase = []; //stores room.finds

function Database(roomname,data){
var n = IndexOf(RoomDatabase,roomname);
if (n >= 0){
if (RoomDatabase[n][data] != undefined && RoomDatabase[n][data] != null){
//console.log("Data: " + data + " has already been added to " + roomname + "'s database");
// room data of this type is in the database
return RoomDatabase[n][data] //return data
}
else {
//console.log("Data: " + data + " is being added to " + roomname + "'s database");
var request;
if (data == "STRUCTURES") request = Game.rooms[roomname].find(FIND_STRUCTURES);
if (data == "CONSTRUCTION_SITES") request = Game.rooms[roomname].find(FIND_CONSTRUCTION_SITES);
if (data == "CREEPS") request = Game.rooms[roomname].find(FIND_CREEPS);
if (data == "MY_CREEPS") request = Game.rooms[roomname].find(FIND_MY_CREEPS);
if (data == "HOSTILE_CREEPS") request = Game.rooms[roomname].find(FIND_HOSTILE_CREEPS);
if (data == "SOURCES") request = Game.rooms[roomname].find(FIND_SOURCES);
if (data == "DROPPED_ENERGY") request = Game.rooms[roomname].find(FIND_DROPPED_RESOURCES,{filter : (s) => s.resourceType == RESOURCE_ENERGY});
if (data == "MINERALS") request = Game.rooms[roomname].find(FIND_MINERALS);
if (data == "HOSTILE_STRUCTURES") request = Game.rooms[roomname].find(FIND_HOSTILE_STRUCTURES);
if (data == "DROPPED_RESOURCES") request = Game.rooms[roomname].find(FIND_DROPPED_RESOURCES);
var result = RoomDatabase[n][data] = request; // add requested data to the
return result
}
}
else {
// add the new room to the database
var newroom = {0:roomname};
var n = RoomDatabase.push(newroom); //add data and return index
var rm = n - 1;
var request;
if (data == "STRUCTURES") request = Game.rooms[roomname].find(FIND_STRUCTURES);
if (data == "CONSTRUCTION_SITES") request = Game.rooms[roomname].find(FIND_CONSTRUCTION_SITES);
if (data == "CREEPS") request = Game.rooms[roomname].find(FIND_CREEPS);
if (data == "MY_CREEPS") request = Game.rooms[roomname].find(FIND_MY_CREEPS);
if (data == "HOSTILE_CREEPS") request = Game.rooms[roomname].find(FIND_HOSTILE_CREEPS);
if (data == "SOURCES") request = Game.rooms[roomname].find(FIND_SOURCES);
if (data == "DROPPED_ENERGY") request = Game.rooms[roomname].find(FIND_DROPPED_ENERGY);
if (data == "MINERALS") request = Game.rooms[roomname].find(FIND_MINERALS);
if (data == "HOSTILE_STRUCTURES") request = Game.rooms[roomname].find(FIND_HOSTILE_STRUCTURES);
if (data == "DROPPED_RESOURCES") request = Game.rooms[roomname].find(FIND_DROPPED_RESOURCES);
var result = RoomDatabase[rm][data] = request; // add requested data to the 
console.log("|DATA| Created new Database for " + roomname + ">_"); 
return result //return data
}
}

function WipeDatabase(){
//exists solely to prevent data glitches
for (i in RoomDatabase){
RoomDatabase.splice(i,1);//remove all data
}
}

//--//_Creeps
function Creeproles(){
for (var i in Game.creeps) {
var creep = Game.creeps[i];
//HOW TO USE DATABASE v (example replacement of findInRange)
var structs = Database(creep.room.name,"STRUCTURES");
var container = _.filter(structs,(s) => s.pos && s.pos.getRangeTo(srcpos) <= 1 && s.structureType == STRUCTURE_CONTAINER)[0];
//Instead of doing this WITHOUT database
var container = src.pos.findInRange(FIND_STRUCTURES, 1, { filter: s => s.structureType == STRUCTURE_CONTAINER})[0];
}
}

//--//_Loop->
module.exports.loop = function (){
Creeproles();
WipeDatabase();
}
