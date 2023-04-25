export const COURSE_VALIDATION_LENGTH_MESSAGE = "Не соблюдается длина поля"
export const COURSE_NAME_MIN_LENGTH = 8
export const COURSE_NAME_MAX_LENGTH = 64
export const COURSE_SHORT_DESC_MIN_LENGTH = 8
export const COURSE_SHORT_DESC_MAX_LENGTH = 128
export const COURSE_DESC_MAX_LENGTH = 1024

export const validateCourseName = (value: string) =>
  value.length < COURSE_NAME_MIN_LENGTH || value.length > COURSE_NAME_MAX_LENGTH
    ? COURSE_VALIDATION_LENGTH_MESSAGE
    : null

export const validateCourseShortDescription = (value: string) =>
  value.length < COURSE_SHORT_DESC_MIN_LENGTH || value.length > COURSE_SHORT_DESC_MAX_LENGTH
    ? COURSE_VALIDATION_LENGTH_MESSAGE
    : null

export const validateCourseDescription = (value: string) =>
  value.length > COURSE_DESC_MAX_LENGTH ? COURSE_VALIDATION_LENGTH_MESSAGE : null
