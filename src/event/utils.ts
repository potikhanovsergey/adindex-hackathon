import { EventStatus, EventType } from "@prisma/client"

export const EVENT_TYPE_LABEL = {
  [EventType.LECTURE]: "Лекция",
  [EventType.FORUM]: "Форум",
  [EventType.COMPETITION]: "Соревнование",
}

export const EVENT_STATUS_LABEL = {
  [EventStatus.HIDDEN]: "Скрытое",
  [EventStatus.ONGOING]: "Активное",
  [EventStatus.PASSED]: "Прошедшее",
}

export const EVENT_STATUS_DATA = [
  {
    value: EventStatus.HIDDEN,
    label: EVENT_STATUS_LABEL[EventStatus.HIDDEN],
  },
  {
    value: EventStatus.ONGOING,
    label: EVENT_STATUS_LABEL[EventStatus.ONGOING],
  },
  {
    value: EventStatus.PASSED,
    label: EVENT_STATUS_LABEL[EventStatus.PASSED],
  },
]

export const EVENT_TYPE_DATA = [
  {
    value: EventType.LECTURE,
    label: EVENT_TYPE_LABEL[EventType.LECTURE],
  },
  {
    value: EventType.FORUM,
    label: EVENT_TYPE_LABEL[EventType.FORUM],
  },
  {
    value: EventType.COMPETITION,
    label: EVENT_TYPE_LABEL[EventType.COMPETITION],
  },
]
