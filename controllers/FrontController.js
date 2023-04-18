const { response } = require('express')
const BlogModel = require('../models/Blog')
const CategoryModel = require('../models/Category')
const ContactModel = require('../models/fcontact')
const AdminModel = require('../models/admin')
const AboutModel = require('../models/about')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
class FrontController{

    static home = async(req,res)=>{
        const data = await BlogModel.find().sort({_id:-1}).limit(6)
        //console.log(data)
        //res.send("hello home")
        res.render('home',{d:data})
    }

    static about =async(req,res)=>{
        const data = await AboutModel.find()
        // console.log(data)
        //res.send("hello home")
        res.render('about',{vasu:data})
    }

    static contact =(req,res)=>{
        //res.send("hello home")
        res.render('contact')
    }

    static blog = async(req,res)=>{
      const data = await BlogModel.find().sort({_id:-1})
        //res.send("hello home")
        res.render('blog',{n:data})
    }

   

    static blogdetail = async(req,res) =>{
      try{
        const category = await CategoryModel.find()
        const recentblog = await BlogModel.find().sort({_id:-1}).limit(6)
         const result = await BlogModel.findById(req.params.id);
         //console.log(result)
         res.render("blogdetail",{r:result,recentblog:recentblog,cat:category});
      }
      catch(err){
        console.log(err)
      }
 }
   static contactinsert = async(req,res) =>{
     const contact = await ContactModel.find()
    // console.log(req.body)
    try{
        const result = ContactModel({
            name:req.body.name,
            email:req.body.email,
            phone: req.body.phone,
            message:req.body.message
        })
        await result.save()
        res.render('contact')
    }catch(err){
        console.log(err)
    }
   }

   // admin login

   static login =(req,res)=>{
    //res.send("hello home")
    res.render('login',{message:req.flash('success'),message1:req.flash('error')})
 }

   static adminregister = async(req,res)=>{
    
    res.render('register',{message:req.flash('error')})
   }

   static admininsert = async(req,res)=>{
    
    try{
        // console.log(req.body)
        const{name,email,password,cpassword}=req.body
        const admin = await AdminModel.findOne({email:email})
        // console.log(admin)
        if(admin){
            req.flash('error','email already exists')
            res.redirect('/register')
        }
        else{
            if(name && email && password && cpassword){
              if(password == cpassword){
                try{
                    const hashpassword = await bcrypt.hash(password,10)
                   const result=await AdminModel({
                       name:name,
                       email:email,
                       password:hashpassword
                   })
                   await result.save();
                   req.flash('success','registeration successfull please login')
                   res.redirect("/login")
                }catch(err){
                    console.log(err)
                }

              }else{
                req.flash('error','password and confirm password does not match')
                res.redirect('/register')
              }


            }else{
                req.flash('error','All field are required')
                res.redirect('/register')
            }
        }

       
        
      
    }catch(err){
        console.log(err)
    }
    
   }

   static verifylogin =async(req,res)=>{

    try{
      //console.log(req.body)
      const {email,password} =req.body
      if(email && password){
        const admin = await AdminModel.findOne({email:email})
        if(admin != null){
          const ismatched = await bcrypt.compare(password,admin.password)
          if(ismatched ){
            //token generate
            const token = jwt.sign({ id: admin._id }, 'vaibhavprajapti150898');
            // console.log(token)
            res.cookie('token',token)
            res.redirect("/admin/dashboard")

          }
          else{
            req.flash("error", " email or password not matched");
            res.redirect("/login");
          }
        } 
        else{
          req.flash("error", "  You are not registered");
          res.redirect("/login");
        }

      }
      else{
        req.flash("error", "All Field are required");
        res.redirect("/login");
      }
    }
    catch(err){
      console.log(err)
    }
  }

  static logout = async (req,res)=>{
    try{
      res.clearCookie('token')
      res.redirect("/login")

    }
    catch(err){
     console.log(err)
    }
  }

}
module.exports = FrontController