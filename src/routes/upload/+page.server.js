import PocketBase from 'pocketbase';

const pb = new PocketBase('https://weak-football.pockethost.io');

export const actions = {
  default: async ({ request }) => {
    const data = await request.formData()
    const record = await pb.collection('singledisplay').create(data);
    return record
  }
};