const AboutModel =require('../../models/about.js')
const { findById } = require('../../models/Blog.js')

class AboutController{
    static aboutdisplay=async(req,res)=>{
        const data = await AboutModel.find()
        // console.log(data)
        res.render('admin/about/aboutdisplay',{ab:data})
    }
    static aboutedit=async(req,res)=>{
        try{
          const data =await AboutModel.findById(req.params.id)
        //   console.log(data)
        res.render('admin/about/aboutedit',{vv:data})
        }catch(err){
            console.log(err)
        }
    }
    static aboutupdate=async(req,res)=>{
        try{
          const data= await AboutModel.findByIdAndUpdate(req.params.id,{
            description:req.body.description
          })
          await data.save()
          res.redirect('/admin/aboutdisplay')
        }catch(err){
            console.log(err)
        }
    }
}
module.exports=AboutController