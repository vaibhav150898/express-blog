const CategoryModel=require('../../models/Category')
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'ddklchydr', 
    api_key: '598547216999494', 
    api_secret: 'VpLe-2Chunw6mTdk5KTPZuPSLl8',
    // secure: true
  });

class CategoryController{
    static categorydisplay=async(req,res)=>{
        const data=await CategoryModel.find()
        console.log(data)
        res.render('admin/category/categorydisplay',{d:data})
    }
    static categoryinsert=async(req,res)=>{
        // console.log('hello')
        // console.log(req.body)
        // console.log(req.files.image)
        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder : 'category_image'
        })
        // console.log(myimage)
        try{
            const result=new CategoryModel({
                catname:req.body.catname,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                                         
              }
              
            })
            await result.save()
            //route url(app.js) in redirect
            res.redirect('/admin/categorydisplay')
        }catch(err){
            console.log(err)
        }
    }

    static categoryview =async(req,res)=>{
        console.log(req.params.id)

        try{
            const result = await CategoryModel.findById(req.params.id)
            console.log(result)
            res.render('admin/category/categoryview',{b:result})
          }catch (err){
              console.log(err);
          }

    }

    static categoryedit =async(req,res)=>{
        //  console.log(req.params.id)
         try{
            const result = await CategoryModel.findById(req.params.id)
            console.log(result)
            res.render('admin/category/categoryedit',{b:result})
          }catch (err){
              console.log(err);
          }
    }
     
    static categoryupdate =async(req,res)=>{
        try{
            // console.log(req.params.id)
            // console.log(req.body)

            //below for image deletion//
            const categorydata = await CategoryModel.findById(req.params.id)
            // console.log(categorydata)
            const imageid = categorydata.image.public_id
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            //image updation
            const file=req.files.image
            const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder : 'category_image'
        })  
            const result = await CategoryModel.findByIdAndUpdate(req.params.id,{
                catname:req.body.catname,
                image: {
                    public_id: myimage.public_id,
                    url: myimage.secure_url
                                         
              }
             
            })
            await result.save()
            //route url(app.js) in redirect
            res.redirect('/admin/categorydisplay')

        }
        catch(err){
            console.log(err);
        } 

    }
    static categorydelete =async(req,res)=>{
        try{

            //below for image deletion//
            const categorydata = await CategoryModel.findById(req.params.id)
            // console.log(categorydata)
            const imageid = categorydata.image.public_id
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)

            const result = await CategoryModel.findByIdAndDelete(req.params.id,)
            res.redirect('/admin/categorydisplay')
        }catch(err){
            console.log(err);
        }

    }
 
}
module.exports=CategoryController