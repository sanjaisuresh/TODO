var time, alarm, currentH, currentM,
  activeAlarm = false,
  sound = new Audio("https://freesound.org/data/previews/316/316847_4939433-lq.mp3");

document.addEventListener('DOMContentLoaded', () => {
  displayCurrentTime();
  displayReminders();
  setInterval(checkReminders, 1000); // Check reminders every second
});
function showUserInfo() {
  const loggedInUser = "JohnDoe"; // Replace with the actual logged-in user's name
  const deletedReminders = JSON.parse(localStorage.getItem('deletedReminders')) || [];

  let message = `Logged-in User: ${loggedInUser}\n\nDeleted Reminders:\n`;
  if (deletedReminders.length === 0) {
    message += "No deleted reminders.";
  } else {
    deletedReminders.forEach((reminder, index) => {
      message += `${index + 1}. ${reminder.message} - ${new Date(reminder.time).toLocaleString()}\n`;
    });
  }

  alert(message);
}

function displayCurrentTime() {
  const currentTimeElement = document.getElementById('current-time');
  setInterval(() => {
    const now = new Date();
    currentTimeElement.textContent = now.toLocaleString();
  }, 1000);
}

function setReminder() {
  const reminderMessage = document.getElementById('reminder-message').value;
  const reminderTime = document.getElementById('reminder-time').value;

  if (reminderMessage && reminderTime) {
    const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
    reminders.push({ message: reminderMessage, time: reminderTime });
    localStorage.setItem('reminders', JSON.stringify(reminders));

    displayReminders();
  }
}

function deleteReminder(index) {
  const reminders = JSON.parse(localStorage.getItem('reminders'));
  const deletedReminder = reminders[index];
  reminders.splice(index, 1);
  localStorage.setItem('reminders', JSON.stringify(reminders));

  const deletedReminders = JSON.parse(localStorage.getItem('deletedReminders')) || [];
  deletedReminders.push(deletedReminder);
  localStorage.setItem('deletedReminders', JSON.stringify(deletedReminders));

  displayReminders();
}


function displayReminders() {
  const reminderList = document.getElementById('reminder-ul');
  reminderList.innerHTML = '';

  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  reminders.forEach((reminder, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${reminder.message}</strong> - ${new Date(reminder.time).toLocaleString()}
                          <span class="delete-button" onclick="deleteReminder(${index})">Delete</span>`;
    reminderList.appendChild(listItem);
  });
}

function checkReminders() {
  const reminders = JSON.parse(localStorage.getItem('reminders')) || [];
  const now = new Date();

  reminders.forEach((reminder, index) => {
    const reminderTime = new Date(reminder.time);
    if (now >= reminderTime) {
      showReminderDialog(reminder.message);
      // Remove the reminder from the list after it has been alerted
      const updatedReminders = JSON.parse(localStorage.getItem('reminders')) || [];
      updatedReminders.splice(index, 1);
      localStorage.setItem('reminders', JSON.stringify(updatedReminders));

      displayReminders();
    }
  });
}

function showReminderDialog(message) {
  if (!activeAlarm) {
    activeAlarm = true;
    sound.loop = true;
    sound.play();

    if (window.confirm(`Reminder: ${message}\n\nPress OK to dismiss.`)) {
      sound.pause();
      sound.currentTime = 0;
      activeAlarm = false;
    }
  }
}
