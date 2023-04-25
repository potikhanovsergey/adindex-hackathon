import {
  Course,
  CourseSection,
  CourseStep,
  CourseStepContentText,
  CourseStepContentVideo,
} from "@prisma/client"

export interface ExtendedCourseStep extends CourseStep {
  contentText: CourseStepContentText | null
  contentVideo: CourseStepContentVideo | null
}

export interface ExtendedSection extends CourseSection {
  steps: ExtendedCourseStep[]
}

export interface ExtendedCourse extends Course {
  sections: ExtendedSection[]
}

export interface CourseStepPageProps extends CourseStep {
  contentText: CourseStepContentText | null
  contentVideo: CourseStepContentVideo | null
  section: CourseSection & { course: ExtendedCourse; steps: ExtendedCourseStep[] }
}
