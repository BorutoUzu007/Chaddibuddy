const { updateProfilePicInDB } = require('./utils/user-profile');

async function test() {
    try {
        await updateProfilePicInDB('test-url', 'test-user-id');
    } catch (error) {
        console.error(error);
    }
}

test();