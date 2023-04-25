export const validateEmail = (value: string) => (/^\S+@\S+$/.test(value) ? null : "Неверная почта")

export const validateFirstName = (value: string) =>
  value.length > 2 ? null : "Имя должно состоять более чем из 2 букв"

export const validateLastName = (value: string) =>
  value.length > 2 ? null : "Фамилия должна состоять более чем из 2 букв"

export const validatePatronymic = (value: string) =>
  value.length > 0 && value.length < 2 ? "Отчество должно состоять более чем из 2 букв" : null

export const validatePassword = (value: string) =>
  value.length > 10 ? null : "Пароль должен состоять более чем из 10 букв"
