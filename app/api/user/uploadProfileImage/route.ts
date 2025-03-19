import { NextResponse } from 'next/server';
import { uploadProfilePicFileToS3 } from '@/utils/user-profile';
import { currentUser } from '@/lib/auth';

export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('profile') as File;
        const user = await currentUser();

        if (!file) {
            return NextResponse.json({ error: 'No file received' }, { status: 400 });
        }
        // Convert File to Buffer as AWS S3 doesnt allow Blobs to be uploaded only allows buffers or strings
        const bytes = await file.arrayBuffer();
        const size = file.size;
        const MAX_SIZE = 5 * 1024 * 1024;
        if (size > MAX_SIZE) {
            return NextResponse.json({ error: "File size greater than 5 MBs" }, { status: 400 });
        }
        const buffer = Buffer.from(bytes);

        const response = await uploadProfilePicFileToS3({
            buffer,
            originalname: file.name,
            mimetype: file.type,
            userId: user?.id
        });

        if (response.success) {
            return NextResponse.json({ message: 'Profile updated successfully' }, { status: 200 });
        }
        return NextResponse.json({ error: response.error }, { status: 400 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}