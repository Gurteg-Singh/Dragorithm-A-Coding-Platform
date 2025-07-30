const Problem = require('../models/problem');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});  

async function getCloudUrl(){
    try{
      const problemId = req.params.id;
      const userId = req.result._id;

      const problem = await Problem.findById(problemId);

      if(!problem){
        throw new Error("Problem doesn't exist");
      }

      // Generate unique public_id for the video
      const timestamp = Math.round(new Date().getTime() / 1000);
      const publicId = `dragorith-editorial/${problemId}/${userId}_${timestamp}`;

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
      console.log(err.message);
      res.status(400).send("ERROR : " + err.message);
  }
}

module.exports = {getCloudUrl}