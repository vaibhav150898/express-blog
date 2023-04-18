const BlogModel=require('../../models/Blog')
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'ddklchydr', 
    api_key: '598547216999494', 
    api_secret: 'VpLe-2Chunw6mTdk5KTPZuPSLl8',
    // secure: true
  });

class BlogController{
    static blogdisplay=async(req,res)=>{
        const data=await BlogModel.find()
        console.log(data)
        res.render('admin/blog/blogdisplay',{d:data})
    }
    static bloginsert=async(req,res)=>{
        // console.log('hello')
        // console.log(req.body)
        // console.log(req.files.image)
        const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder : 'blog_image'
        })
        // console.log(myimage)
        try{
            const result=new BlogModel({  
                title:req.body.title,
                description:req.body.description,
                image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url
                                             
                  }  
            })
            await result.save()
            //route url(app.js) in redirect
            res.redirect('/admin/blogdisplay')
        }catch(err){
            console.log(err)
        }
    }
    static blogview =async(req,res)=>{
        // console.log(req.params.id)
        try{
          const result = await BlogModel.findById(req.params.id)
          console.log(result)
          res.render('admin/blog/blogview',{b:result})
        }catch (err){
            console.log(err);
        }
    }
    static blogedit =async(req,res)=>{
        //  console.log(req.params.id)
         try{
            const result = await BlogModel.findById(req.params.id)
            console.log(result)
            res.render('admin/blog/blogedit',{b:result})
          }catch (err){
              console.log(err);
          }
    }

    static blogupdate =async(req,res)=>{

       try{
        // console.log(req.params.id)
        // console.log(req.body)

        //below for image deletion//
        const blogdata = await BlogModel.findById(req.params.id)
        // console.log(blogdata)
         const imageid = blogdata.image.public_id
         console.log(imageid)
         await cloudinary.uploader.destroy(imageid)

         //image updation
         const file=req.files.image
        const myimage=await cloudinary.uploader.upload(file.tempFilePath,{
            folder : 'blog_image'
        })
        const result = await BlogModel.findByIdAndUpdate(req.params.id,{
            title:req.body.title,
            description:req.body.description,
        image: {
            public_id: myimage.public_id,
            url: myimage.secure_url
                                 
      }
        })
       await result.save()
        //route url(app.js) in redirect
      res.redirect('/admin/blogdisplay')

       }catch(err){
        console.log(err);
       }
    }

    static blogdelete =async(req,res)=>{
        try{
            //below for image deletion//
            const blogdata = await BlogModel.findById(req.params.id)
            // console.log(blogdata)
            const imageid = blogdata.image.public_id
            console.log(imageid)
            await cloudinary.uploader.destroy(imageid)
            
            const result = await BlogModel.findByIdAndDelete(req.params.id,)
            res.redirect('/admin/blogdisplay')
        }catch(err){
            console.log(err);
        }

    }
}
module.exports=BlogController