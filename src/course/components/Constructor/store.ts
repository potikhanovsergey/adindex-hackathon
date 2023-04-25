import { observable } from "@legendapp/state"
import { CourseStepType } from "db"
import { ExtendedSection } from "src/course/types"

export const courseStepType = observable(CourseStepType.text as keyof typeof CourseStepType)
export const sectionForEditableStep = observable(null as ExtendedSection | null)
