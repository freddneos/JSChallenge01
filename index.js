const express = require('express');
const server = express();

const projects = [{id: "1" , title:"novo projeto" , tasks:[ "Docs" , "teams" ] }]
const prefix = "/projects";
			

server.use(express.json());



function verifyIfProjectExist(req,res,next){

	let {project_id } = req.params;
	project_id = project_id - 1;
	project = projects[project_id];
	if(!project){
		return res.status(400).json({error:"Project not found."})
	}
	//creating variable!
	req.project = project;
	return next();

}

function verifyIfTaskExist(req,res,next){
	const {name }  = req.body;
	const project = req.project;
	console.log(project , project.tasks.indexOf(name));

	if(project.tasks.indexOf(name) === -1){
		return res.status(400).json({error:"Task not found."})
	}
	return next();
}

server.get('/hello' , (req,res) => {
	console.log('hello world');
	res.json({message:'hello world'});
})


server.get(prefix , (req,res) => {

	return res.json(projects);

});


server.get(`${prefix}/:project_id` ,verifyIfProjectExist, (req,res) => {

	return res.json(req.project);

});

server.post(prefix , (req,res) => {

	const {title , id} = req.body
	const newProject = {title , id , tasks:[]}

	projects.push(newProject);
	return res.json(projects);

})

//TODO: ost task on projects
server.post(`${prefix}/:project_id` ,verifyIfProjectExist, (req,res) => {

	const {title , id} = req.body
	const newProject = {title , id , tasks:[]}

	projects.push(newProject);
	return res.json(projects);

})

server.post(`${prefix}/:project_id/tasks` ,verifyIfProjectExist, (req,res) => {

	const {project_id} = req.params;
	const {name} = req.body;
	const project = req.project;

	project.tasks.push(name);

	return res.json(project);

})



server.delete(`${prefix}/:project_id` ,verifyIfProjectExist, (req,res) => {

	const project = req.project
	console.log(project)
	projects.splice( project.id.parseInt, 1);
	return res.json();

})

server.delete(`${prefix}/:project_id/tasks` ,verifyIfProjectExist,verifyIfTaskExist, (req,res) => {

	const {name} = req.body;
	const project = req.project;

	const taskToDelete = project.tasks.indexOf(name)

	project.tasks.splice(taskToDelete , 1);
	
	
	return res.json(project);

})







server.listen(3000);
