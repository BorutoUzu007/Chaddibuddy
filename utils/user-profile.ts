import 'server-only'
import AWS from 'aws-sdk';
import { getUserById, updateUserByID } from './user';

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your access key
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your secret key
    region: process.env.AWS_REGION // Your bucket region
});

export const s3 = new AWS.S3(); // Create S3 instance

interface UploadFileParams {
    buffer: Buffer;
    originalname: string;
    mimetype: string;
    userId: string | undefined;
}

export async function uploadProfilePicFileToS3({ buffer, originalname, mimetype, userId }: UploadFileParams): Promise<{error?: string, success?: string}> {
    return new Promise(async (resolve) =>  {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || "", // Your bucket name
            Key: `${process.env.AWS_S3_PROFILE_PIC_FOLDER}/${userId}|${originalname}`, // File name you want to save as in S3
            Body: buffer,
            ContentType: mimetype, // Set the content type
            ACL: 'public-read'  // Add this line to make the file publicly readable
        };

        s3.upload(params, async (err: Error, data: any) => {
            if (err) {
                console.error("Error uploading file:", err);
                resolve({ error: `Something went wrong: ${err}`})
            } else {
                console.log("File uploaded successfully:", data.Location);
                const dbUpload = await updateProfilePicInDB(data.Location, userId || "")
                if (dbUpload.success) resolve({success: "Profile picture updated successfully"})
                resolve({error: dbUpload.error})
            }
        });
    })
};

export async function updateProfilePicInDB(url: string, userId: string) {
    try {
        const user = await getUserById(userId)
        console.log(user)
        const data = {
            image: url
        }
        const res = await updateUserByID(data, userId)
        if(res != null) {
            return {success: "Profile picture location updated in db"}
        }
        return {error: `Internal error: `}
    }
    catch (err) {
        return {error: `Internal error: ${err}`}
    }   
    
    
}
