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
      console.log("I M SENDING URL TO FRONTEND");
      const problemId = req.params.id;
      const userId = req.result._id;

      const problem = await Problem.findById(problemId);

      if(!problem){
        throw new Error("Problem doesn't exist");
      }

      // Generate unique public_id for the video
      const timestamp = Math.round(new Date().getTime() / 1000);
      console.log(timestamp);
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
      console.log("GOT URL");
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
      console.log(err.message);
      res.status(400).send("ERROR : " + err.message);
  }
}

async function saveVideo(req,res){
  try{
    console.log("READY TO SAVE VIDEO");
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
    console.log("Problem id : ");
    console.log(problemId);
    console.log("public id : ");
    console.log(publicId);

    const arr = await Editorial.find({});
    console.log(arr);

    const vid = await Editorial.findOne({problemId});
    console.log(vid);
    if(vid){
      throw new Error("Video already exist for this problem");
    }

    const result = await Editorial.create({problemId,publicId,userId,thumbnailUrl,secureUrl,duration});

    res.status(200).json({
      message : "Video uploaded and link stored",
      videoUrl : result.secureUrl
    })

  }catch(err){
    console.log("ERROR : " + err.message);
  }


}

module.exports = {getCloudUrl,saveVideo}