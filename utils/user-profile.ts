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
        const user = await getUserById(userId || "")
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
                console.log(dbUpload)
                if (dbUpload.success) {
                    if (user?.image?.includes(`${process.env.AWS_S3_BUCKET_NAME}`)) {
                        console.log("truee")
                    }

                    if (user?.image?.includes(`${process.env.AWS_S3_BUCKET_NAME}`)) { // checking if the user image url has the bucket name in it. If it has then we can say that the profilepicture has been updated once already
                        console.log(user?.image.split(`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`)[1])
                        const name = decodeURIComponent(user?.image.split(`${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/`)[1]) // replacing the encoding of %7C with | 
                        console.log(name)
                        if (await deleteOldProfilePictureFromS3(name))  resolve({success: "Profile picture updated successfully"})  
                        resolve({error: dbUpload.error})
                    }
                    resolve({error: dbUpload.error})
                    
                } 
                resolve({error: dbUpload.error})
            }
        });
    })
};

export async function updateProfilePicInDB(url: string, userId: string) {
    try {
        const data = {
            image: url
        }
        const res = await updateUserByID(data, userId)
        if(res != null) {
            console.log("Profile picture location updated in db")
            return {success: "Profile picture location updated in db"}
        }
        return {error: `Internal error: `}
    }
    catch (err) {
        return {error: `Internal error: ${err}`}
    }      
}

export async function deleteOldProfilePictureFromS3(name: string) {
        const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || "",
            Key: name
        }

        try {
            await s3.deleteObject(params).promise();
            console.log(`Successfully deleted ${name} from S3`)
            return true
        }
        catch {
            return false
        }
};