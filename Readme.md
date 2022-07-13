So To use multer,

1.  npm i multer
2.  in the file ---- import or require multer from 'multer';
3.  instatite multer and save it as some functionalvariable as;-
    const variable = multer({dest:'uploads/'});

    //here dest refers to the destination folder where the files are going to get stored and the string defined in it is the name of the folder,
    ::FYI:- best practice is to first create the folder with that name and use it in the multer,

4.  now we use that function as a middle-ware, you know where middle-ware goes.

5.  upload.single('file') ---> to upload single file
6.  upload.array('file') ---> to upload multiple files
7.  upload.array('file',2)----> that 2 as second argument is the max-limit of file number.
8.  sometime you may have to save files in different fields to do that create new middlware as:-
    multiupload = upload.fields([{name:'name1',maxCount:1},{name:'name2',maxCount:2}])
9.  files you are sending actually comes to server as req.files, so console'em up and see the result
10. files you want to upload in the disk or to alter the name of the file,
    use the method called diskStorage and pass in some parameter with filename and distination, but this diskStorage method takes object as an argument and should be written in this way:

        const storage = multer.diskStorage({

    destination: (req, file, cb) => {
    cb(null, "uploads");
    },
    filename: (req, file, cb) => {
    const { originalname } = file;

        cb(null, `${uuid()}-${originalname}`);

    },
    });

now instead of using dest as destination use that storage as destination as:-
const upload = multer({ storage });

11. to check the type of file or do file filter we just neeed to check if the mimetype is what we are going to accept, we did that in the function written as the fileFilter, where we have splitted the file.mimtype and compared it with the image, if it passes from there, we are writing callback function with cb(null,true),here null is the error. true--> is giving acceptance
12. to limit the file size simply pass another argument, object limits with property filesize and the value in bits, you will be good to go

### to upload the files in the aws follow these steps:-

## must have active s3 bucket or create one and download accesskey and the secretkey and the bucket name

1. create one helper file for the configuration here i have created s3Service.js
   ===> this file will require npm package aws-sdk to work with so npm i aws-sdk
2. store the access key, secret key,, bucket name in the .env file and
3. export new fuction as this:-
   ===>
   exports.s3Uploadv2 = async (file) => {
   const s3 = new S3();
   const param = {
   Bucket: process.env.AWS_BUCKET_NAME,
   Key: `uploads/${uuid()}-${file.originalname}`,
   Body: file.buffer,
   };
   const result = await s3.upload(param).promise();
   return result;
   };

4. after you get the result head to the middleware where you want to use this configuration, in my case it is index.js
   => here, you will create a storage as memoryStorage
   => but in the post method await for the s3UploadV2(file) to execute and pass that as a
   response to set the response
