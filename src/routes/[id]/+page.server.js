import PocketBase from 'pocketbase';

const pb = new PocketBase('https://weak-football.pockethost.io');

export async function load({ params }) {
  const id = await params.id
  const record = await pb.collection('singledisplay').getOne(id);
  const fileName = record.media
  const url = pb.files.getUrl(record, fileName)
  console.log(url)

  return {
    url
  }
}