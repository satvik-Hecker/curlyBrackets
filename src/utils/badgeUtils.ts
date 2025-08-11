import { badges, Badge } from "@/data/badgesData";

export function getEarnedBadges(completedTopics: string[]): Badge []{
    return badges.filter(badge =>
        badge.topics.every(topic => completedTopics.includes(topic))
    );
}

export function getUncompletedBadges(completedTopics: string[]): Badge []{
    return badges.filter(badge =>
        !badge.topics.every(topic => completedTopics.includes(topic))
    );
}

export function getBadgeProgress(completedTopics: string[]){
    return badges.map(badge => {
        const completedCount = badge.topics.filter(topic => completedTopics.includes(topic)).length;

        const totalCount = badge.topics.length;

        return {
            badge,
            completedCount,
            totalCount,
            progress : totalCount > 0 ? completedCount / totalCount : 0
        };
    });
}

export function hasEarnedBadge(completedTopics: string[], badgeId: string): boolean {
  const badge = badges.find(b => b.id === badgeId);
  if (!badge) return false;
  return badge.topics.every(topic => completedTopics.includes(topic));
}