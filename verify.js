// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";

// Конфигурация Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAM7lLohh7L2Y5z_-cl33Vm4lcTibzgIm4",
  authDomain: "arthurstuff-dae5b.firebaseapp.com",
  databaseURL: "https://arthurstuff-dae5b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "arthurstuff-dae5b",
  storageBucket: "arthurstuff-dae5b.appspot.com",
  messagingSenderId: "536755331219",
  appId: "1:536755331219:web:232bb38b18590ce8756d66"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Экспортируем функцию в глобальный scope
window.checkCode = function () {
  const inputCode = document.getElementById('codeInput').value.trim();
  const resultElement = document.getElementById('result');
  const loaderElement = document.getElementById('loader');

  // Очистить старый результат и показать лоадер
  loaderElement.style.display = 'block';
  resultElement.textContent = '';
  resultElement.innerHTML = '';
  resultElement.style.color = '';

  if (!inputCode) {
    resultElement.textContent = 'Код не введен';
    resultElement.style.color = 'red';
    loaderElement.style.display = 'none';
    return;
  }

  const codeRef = ref(db, 'codes/' + inputCode);

  get(codeRef).then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      const dropName = data.dropName || 'Нет информации';
      const assignedTo = data.assignedTo || 'Нет информации';
      const individualNumber = data.individualNumber || 'Нет информации';
      const verified = data.verified || '×';

      resultElement.innerHTML = `
        <p style="margin-top: 0px">
          <strong class="output-info">Название коллекции:</strong>
          <span style="color: ${dropName === 'Нет информации' ? 'red' : 'green'}">${dropName}</span>
        </p>

        <p>
          <strong class="output-info">Предназначено:</strong>
          <span style="color: ${assignedTo === 'Нет информации' ? 'red' : 'green'}">${assignedTo}</span>
        </p>

        <p>
          <strong class="output-info">Номер из партии:</strong>
          <span style="color: ${individualNumber === 'Нет информации' ? 'red' : 'green'}">${individualNumber}</span>
        </p>

        <p>
          <strong class="output-info">Верификация:</strong>
          <span style="color: ${verified === '×' ? 'red' : 'green'}">${verified}</span>
        </p>
      `;
    } else {
      resultElement.textContent = 'Такого номера не существует';
      resultElement.style.color = 'red';
    }
  }).catch((error) => {
    console.error('Ошибка:', error);
    resultElement.textContent = 'Ошибка запроса';
    resultElement.style.color = 'orange';
  }).finally(() => {
    loaderElement.style.display = 'none';
  });
};