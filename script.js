// 1. Настройки твоего Telegram-бота
const TG_TOKEN = "7742053123:AAFeVgkQ8TEIR7ZjD_XN3cDyoAodNEjPl1c"; // Замени на свой токен от @id199142634 (@BotFather)
const TG_CHAT_ID = "5400083800"; // Замени на свой ID от @userinfobot

// 2. Находим элементы на странице
const modal = document.getElementById("orderModal");
const closeModal = document.querySelector(".close-modal");
const modalTitle = document.getElementById("modalTitle");
const chosenCourseInput = document.getElementById("chosenCourse");
const orderButtons = document.querySelectorAll(".btn-order");

// 3. Открытие модального окна при клике на "Оставить заявку"
orderButtons.forEach(button => {
  button.addEventListener("click", function() {
    const courseName = this.getAttribute("data-course");
    modalTitle.innerText = `Запись на курс: ${courseName}`;
    chosenCourseInput.value = courseName;
    modal.style.display = "flex"; // Показываем окно
  });
});

// 4. Закрытие окна при клике на крестик
if(closeModal) {
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });
}

// 5. Закрытие окна при клике вне его области
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

// 6. Обработка отправки формы в Telegram
document.getElementById("tgForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Запрещаем перезагрузку страницы
  
  const name = document.getElementById("userName").value;
  const phone = document.getElementById("userPhone").value;
  const course = document.getElementById("chosenCourse").value;
  
  const message = `🔔 *Новая заявка РАФСКУЛ!*\n\n` +
                  `📚 *Курс:* ${course}\n` +
                  `👤 *ФИО:* ${name}\n` +
                  `📞 *Телефон:* ${phone}`;
  
  const url = `https://api.telegram.org/bot${TG_TOKEN}/sendMessage`;
  
  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TG_CHAT_ID,
      text: message,
      parse_mode: "Markdown"
    })
  })
  .then(response => {
    if (response.ok) {
      alert("Заявка успешно отправлена! Мы свяжемся с вами.");
      modal.style.display = "none";
      document.getElementById("tgForm").reset();
    } else {
      alert("Произошла ошибка при отправке. Проверьте Токен и ID чата.");
    }
  })
  .catch(error => {
    console.error("Ошибка:", error);
    alert("Ошибка сети.");
  });
});