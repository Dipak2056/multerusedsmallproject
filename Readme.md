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
