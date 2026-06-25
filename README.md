# Шовгенов Ислам Русланович — портфолио

Персональный сайт-портфолио: врач анестезиолог-реаниматолог, clinical researcher,
специалист по биоэквивалентности, фармакокинетике и биостатистике, GCP-аудитор,
разработчик R/Python-инструментов для клинических исследований.

**Live:** https://islamshovgenov.github.io/portfolio/ *(доступно после включения GitHub Pages)*

## Стек

Статический сайт — **HTML + CSS + JavaScript**, без сборки и внешних зависимостей.
Тёмная тема, glassmorphism, ECG-анимации, адаптив (desktop / tablet / mobile).

```
index.html      разметка
styles.css      стили (тема, адаптив)
script.js       интерактив (скролл, меню, счётчики)
assets/         аватар, favicon, CV (PDF)
```

## Запуск локально

```bash
python -m http.server 8000
# затем открыть http://localhost:8000
```

Или просто открыть `index.html` в браузере.

## Публикация (GitHub Pages)

Settings → **Pages** → Build and deployment → Deploy from a branch → ветка `main`,
папка `/ (root)` → **Save**. Через минуту сайт будет доступен по адресу
`https://islamshovgenov.github.io/portfolio/`.

## Приватность

Файл `assets/Shovgenov_Islam_CV.pdf` — отдельная **очищенная** версия резюме без
паспортных данных, СНИЛС, номеров документов и адреса регистрации. В репозитории
нет персональных идентификаторов.

---

© 2026 Шовгенов Ислам Русланович.
