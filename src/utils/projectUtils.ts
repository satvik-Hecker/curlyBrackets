import { Project } from "@/data/projectData"
import { Badge } from "@/data/badgesData"

// Check if a project is unlocked
export function isProjectUnlocked(project: Project, earnedBadges: Badge[]): boolean {
  if (!project.requiredBadges || project.requiredBadges.length === 0) {
    return true
  }

  const earnedBadgeNames = earnedBadges.map(b => b.name)
  return project.requiredBadges.every(req => earnedBadgeNames.includes(req))
}

// Count how many projects are unlocked
export function countUnlockedProjects(projects: Project[], earnedBadges: Badge[]): number {
  return projects.filter(project => isProjectUnlocked(project, earnedBadges)).length
}
