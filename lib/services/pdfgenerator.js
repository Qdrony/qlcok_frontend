import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Alert } from 'react-native';

const generateHtml = (logs) => {
  const rows = logs.map(log => `
    <tr>
      <td>${log.id}</td>
      <td>${log.userName}</td>
      <td>${log.action}</td>
      <td>${log.status}</td>
      <td>${log.time}</td>
    </tr>`).join('');

  return `
    <html>
      <body>
        <h1>QLock Naplók</h1>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <tr>
            <th>ID</th>
            <th>Felhasználó</th>
            <th>Akció</th>
            <th>Státusz</th>
            <th>Dátum</th>
          </tr>
          ${rows}
        </table>
      </body>
    </html>
  `;
};

export const exportPdf = async (logs) => {
  try {
    const html = generateHtml(logs);
    const { uri } = await Print.printToFileAsync({ html });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('Kész', `PDF fájl elérhető: ${uri}`);
    }
  } catch (error) {
    console.error('PDF generálás hiba:', error);
  }
};
