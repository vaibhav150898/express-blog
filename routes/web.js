const express = require('express')
const router = express.Router()
const FrontController = require('../controllers/FrontController')
const AboutController = require('../controllers/admin/AboutController')
const AdminController = require('../controllers/admin/admincontrollers')
const BlogController = require('../controllers/admin/BlogControllers')
const CategoryController = require('../controllers/admin/CategoryController')
const ContactController = require('../controllers/admin/ContactController')
const admin_auth = require('../middleware/auth') 
//rout frontcontroller

router.get("/",FrontController.home)
router.get("/about",FrontController.about)
router.get("/contact",FrontController.contact)
router.get("/blog",FrontController.blog)
router.get("/login",FrontController.login)
router.get("/blogdetail/:id",FrontController.blogdetail)
router.post('/contactinsert',FrontController.contactinsert)
router.get('/register',FrontController.adminregister)
router.post('/adminregister',FrontController.admininsert)
router.post('/verify_login',FrontController.verifylogin)
router.get('/logout',FrontController.logout)

//admin controller
router.get('/admin/dashboard',admin_auth,AdminController.Dashboard)

//admin blog controller
router.get('/admin/blogdisplay',admin_auth,BlogController.blogdisplay)
router.post('/bloginsert',admin_auth,BlogController.bloginsert)
router.get('/admin/blogview/:id',admin_auth,BlogController.blogview)
router.get('/admin/blogedit/:id',admin_auth,BlogController.blogedit)
router.post('/blogupdate/:id',admin_auth,BlogController.blogupdate)
router.get('/admin/blogdelete/:id',admin_auth,BlogController.blogdelete)

//category controller
router.get('/admin/categorydisplay',admin_auth,CategoryController.categorydisplay)
router.post('/categoryinsert',admin_auth,CategoryController.categoryinsert)
router.get('/admin/categoryview/:id',admin_auth,CategoryController.categoryview)
router.get('/admin/categoryedit/:id',admin_auth,CategoryController.categoryedit)
router.post('/categoryupdate/:id',admin_auth,CategoryController.categoryupdate)
router.get('/admin/categorydelete/:id',admin_auth,CategoryController.categorydelete)

//contact controller
router.get('/admin/contactdisplay',admin_auth,ContactController.contactdisplay)

//about controller
router.get('/admin/aboutdisplay',admin_auth,AboutController.aboutdisplay)
router.get('/admin/aboutedit/:id',admin_auth,admin_auth,AboutController.aboutedit)
router.post('/aboutupdate/:id',admin_auth,AboutController.aboutupdate)


module.exports = router