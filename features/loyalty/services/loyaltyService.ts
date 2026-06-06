import db from '@react-native-firebase/database';

const DATABASE_URL =
  'https://brning9-default-rtdb.asia-southeast1.firebasedatabase.app/';

export async function getTransactions(
  phone: string
) {
  const snapshot = await db()
    .app
    .database(DATABASE_URL)
    .ref(`/clientApp/${phone}/transactions`)
    .once('value');

  if (!snapshot.exists()) {
    return [];
  }

  const data = snapshot.val();

  return Object.entries(data).map(
    ([id, value]: any) => ({
      id,
      ...value,
    })
  );
}
