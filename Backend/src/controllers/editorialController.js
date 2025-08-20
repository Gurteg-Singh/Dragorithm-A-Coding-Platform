const Editorial = require('../models/editorial');
const Problem = require('../models/problem');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});  

async function getCloudUrl(req,res){
    try{
      const problemId = req.params.id;
      const userId = req.result._id;

      const problem = await Problem.findById(problemId);

      if(!problem){
        throw new Error("Problem doesn't exist");
      }

      const vid = await Editorial.findOne({problemId});

      if(vid){
        throw new Error("Video already exist for this problem");
      }

      // Generate unique public_id for the video
      const timestamp = Math.round(new Date().getTime() / 1000);
      const publicId = `dragorithm-editorial/${problemId}/${userId}_${timestamp}`;

      const uploadParams = {
        timestamp : timestamp,
        public_id : publicId,
        eager: 'so_1,w_480,c_scale/f_jpg'
      }

      const signature = cloudinary.utils.api_sign_request(
        uploadParams,
        process.env.CLOUDINARY_SECRET_KEY
      );
      // https://api.cloudinary.com/v1_1/<cloud_name>/<resource_type>/upload -- THIS IS URL STRUCTURE CLOUDINARY EXPECTS
      res.json({
        signature,
        timestamp,
        publicId,
        api_key: process.env.CLOUDINARY_API_KEY,
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/video/upload`,
      });

    }catch(err){
      res.status(401).json({ message: err.message });
  }
}

async function saveVideo(req,res){
  try{
    const {problemId,publicId,duration,thumbnailUrl,secureUrl} = req.body;
    const userId = req.result._id;

    // Verify the upload with Cloudinary
    const cloudinaryResource = await cloudinary.api.resource(
      publicId,
      { resource_type: 'video' }
    );

    if(!cloudinaryResource){
      throw new Error("Video is not uploaded on cloud");
    }

    const vid = await Editorial.findOne({problemId});

    if(vid){
      throw new Error("Video already exist for this problem");
    }

    const result = await Editorial.create({problemId,publicId,userId,thumbnailUrl,secureUrl,duration});

    res.status(200).json({
      message : "Video uploaded Successfully",
      videoUrl : result.secureUrl,
      createdAt : result.createdAt
    })

  }catch(err){
    res.status(401).json({ message: err.message });
  }


}

async function getEditorial(req,res){
  try{
    const problemId = req.params.id;
    if(!problemId){
      throw new Error("Problem id not found"); 
    }

    const vid = await Editorial.findOne({problemId});
    if(!vid){
      throw new Error("Problem not found");
    }

    res.status(200).send(vid);
  }catch(err){
    res.status(400).send("ERROR : " + err.message);
  }
}

async function deleteEditorial(req,res){
  try{
    const problemId = req.params.id;
    if(!problemId){
      throw new Error("Problem Id not found");
    }

    const vid = await Editorial.findOneAndDelete({problemId});
    if(!vid){
      throw new Error("No editorial was found for this problem");
    }

    await cloudinary.uploader.destroy(vid?.publicId, { resource_type: 'video' , invalidate: true });

    res.status(200).send("Video deleted successfully");

  }catch(err){
    res.status(400).json({message : err.message});
  }
}

module.exports = {getCloudUrl,saveVideo,getEditorial,deleteEditorial}