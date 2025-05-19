import S3 from 'aws-sdk/clients/s3';
import fs from 'fs';

const bucketName = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;
const accessKeyId = process.env.ACCESS_KEY;
const secretAccessKey = process.env.AS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export async function upload(fileBuffer, name) {
  //   const fileStream = fs.createReadStream(file);
  // console.log('got into fileStream');
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: name,
  };
  // console.log('AWS_BUCKET_NAME:', bucketName);
  // console.log('AWS_BUCKET_REGION:', region);
  // console.log('AWS_ACCESS_KEY:', process.env.AWS_ACCESS_KEY);
  // console.log('AWS_SECRET_KEY:', process.env.AWS_SECRET_KEY);
  try {
    return await s3.upload(uploadParams).promise();
  } catch (err) {
    console.error('Error in upload function:', err);
    throw new Error('Failed to upload to S3');
  }
}

export async function getFileStream(fileKey) {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };
    // return s3.getObject(downloadParams).createReadStream();
    return s3.getSignedUrlPromise('getObject', downloadParams);
  } catch (error) {
    console.error('Error in getFileStream function:', err);
    throw new Error('Failed to get from S3');
  }
}
