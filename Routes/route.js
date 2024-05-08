// import express
const express = require('express');

const userController = require('../Controllers/userController');
const projectController = require('../Controllers/projectController');
const jwtMiddleware = require('../MiddleWares/jwtMiddleware');
const multerConfig = require('../MiddleWares/multerMiddleware');

// create a router object of express to define routes(paths)
const router = new express.Router()

// using router object to define paths

// register api routes - localhost:4000/register
router.post('/register',userController.register)

// Login api routes - localhost:4000/login
router.post('/login',userController.login)

// add user-add project api routes - localhost:4000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

// get user project api routes - localhost:4000/project/all-user-projects
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

// get all project api routes - localhost:4000/project/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

// get home page routes - localhost:4000/project/home-projects
router.get('/project/home-projects',projectController.getHomeProjects)

// update project routes - localhost:4000/project/update-project/:id  id-78996665544
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

module.exports = router

