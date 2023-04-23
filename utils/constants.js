/* users.js */
const userMessageBadReqOne = 'Некорректные данные при регистрации пользователя';
const userMessageBadReqTwo = 'Невалидный id';
const userMessageBadReqThree = 'Некорректные данные при обновлении профиля';

const userMessageConflictOne = 'Такой пользователь уже существует';

const userMessageUnauthorizedOne = 'Неправильный логин или пароль';

const userMessageNotFoundOne = 'Пользователь не найден';

/* movies.js */
const movieMessageNotFoundOne = 'Фильмы не найдены';
const movieMessageNotFoundTwo = 'Фильм не найден';

const movieMessageBadReqOne = 'Некорректные данные для создания фильма';
const movieMessageBadReqTwo = 'Переданы некорректные данные для удаления фильма';

const movieMessageForbiddenOne = 'Нельзя удалять чужой фильм';

/* auth.js */
const authMessageUnauthorizedOne = 'Необходима авторизация';

module.exports = {
  userMessageBadReqOne,
  userMessageBadReqTwo,
  userMessageBadReqThree,
  userMessageConflictOne,
  userMessageUnauthorizedOne,
  userMessageNotFoundOne,
  movieMessageNotFoundOne,
  movieMessageNotFoundTwo,
  movieMessageBadReqOne,
  movieMessageBadReqTwo,
  movieMessageForbiddenOne,
  authMessageUnauthorizedOne,
};
