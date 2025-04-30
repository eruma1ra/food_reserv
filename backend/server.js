const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.db", (err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.message);
  } else {
    console.log("Подключено к базе данных SQLite");
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT,
        lastName TEXT,
        email TEXT UNIQUE,
        phone TEXT,
        password TEXT
      )
    `);
  }
});

const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const validatePhone = (phone) => {
  const phonePattern = /^(\+7|8)\d{10}$/;
  return phonePattern.test(phone);
};

app.post("/api/signup", (req, res) => {
  const { firstName, lastName, email, phone, password, confirmPassword } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !confirmPassword
  ) {
    return res.status(400).json({ message: "Все поля обязательны" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Некорректный формат email" });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ message: "Некорректный формат телефона" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Пароли не совпадают" });
  }

  const query = `INSERT INTO users (firstName, lastName, email, phone, password) VALUES (?, ?, ?, ?, ?)`;

  db.run(query, [firstName, lastName, email, phone, password], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).json({ message: "Email уже используется" });
      }
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: err.message });
    }
    res
      .status(201)
      .json({ message: "Регистрация успешна", userId: this.lastID });
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email и пароль обязательны" });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Некорректный формат email" });
  }

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.get(query, [email, password], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: err.message });
    }

    if (!row) {
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    res.status(200).json({ message: "Вход успешен", userId: row.id });
  });
});

app.get("/api/profile", (req, res) => {
  const email = req.query.email;

  if (!email) {
    return res.status(400).json({ message: "Email обязателен" });
  }

  const query = `SELECT firstName, lastName, email, phone FROM users WHERE email = ?`;
  db.get(query, [email], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: err.message });
    }

    if (!row) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    res.status(200).json(row);
  });
});

app.put("/api/profile", (req, res) => {
  const { firstName, lastName, email, phone } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Некорректный формат email" });
  }

  if (!validatePhone(phone)) {
    return res.status(400).json({ message: "Некорректный формат телефона" });
  }

  const query = `UPDATE users SET firstName = ?, lastName = ?, phone = ? WHERE email = ?`;

  db.run(query, [firstName, lastName, phone, email], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: err.message });
    }
    res.status(200).json({ message: "Профиль обновлен" });
  });
});

app.post("/api/change-password", (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, currentPassword], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: err.message });
    }

    if (!row) {
      return res.status(400).json({ message: "Неверный текущий пароль" });
    }

    const updateQuery = `UPDATE users SET password = ? WHERE email = ?`;
    db.run(updateQuery, [newPassword, email], function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: "Ошибка сервера", error: err.message });
      }
      res.status(200).json({ message: "Пароль изменен" });
    });
  });
});

app.delete("/api/delete-account", (req, res) => {
  const { email } = req.body;

  const query = `DELETE FROM users WHERE email = ?`;
  db.run(query, [email], function (err) {
    if (err) {
      return res
        .status(500)
        .json({ message: "Ошибка сервера", error: err.message });
    }
    res.status(200).json({ message: "Аккаунт удален" });
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
