import { Edge, Node, Profession, Viewport, Course } from "@prisma/client"
import { Flow } from "db"

export interface ExtendedFlow extends Flow {
  nodes: (Node & {
    course: Course
  })[]
  edges: Edge[]
}
