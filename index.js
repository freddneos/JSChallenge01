const express = require('express');
const server = express();

const projects = [{id: "1" , title:"novo projeto" , tasks:[ "Docs" , "teams" ] }]
const prefix = "/projects";
			

server.use(express.json());



server.get('/hello' , (req,res) => {
	console.log('hello world');
	res.json({message:'hello world'});
})


server.get(prefix , (req,res) => {

	return res.json(projects);

});


server.get(`${prefix}/:project_id` , (req,res) => {

	const {project_id} = req.params
	return res.json(projects[id]);

});

server.post(prefix , (req,res) => {

	const {title , id} = req.body
	const newProject = {title , id , tasks:[]}

	projects.push(newProject);
	return res.json(projects);

})

//TODO: ost task on projects
server.post(`${prefix}/:project_id` , (req,res) => {

	const {title , id} = req.body
	const newProject = {title , id , tasks:[]}

	projects.push(newProject);
	return res.json(projects);

})










server.listen(3000);
