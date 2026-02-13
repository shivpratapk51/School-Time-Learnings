import { S3Client, CreateBucketCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3200;

const s3 = new S3Client({
  endpoint: 'https://s3.us-west-004.backblazeb2.com',
  region: 'us-west-004'
});


app.get("/get-presigned-url", (req, res)=>{
    //Get presigned URL logic will go here

    res.json({
        url:""
    })
})

app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

















// try {
//   await s3.send(new CreateBucketCommand({ Bucket: bucketName }));

//   await s3.send(new PutObjectCommand({
//     Bucket: bucketName,
//     Key: keyName,
//     Body: 'Hello World!'
//   }));

//   console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
// } catch (err) {
//   console.log("Error: ", err);
// }