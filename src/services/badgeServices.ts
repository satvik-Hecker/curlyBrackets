import { supabase } from "@/lib/supabaseClient";
import { getEarnedBadges, getUncompletedBadges, getBadgeProgress } from "@/utils/badgeUtils";
import { Badge } from "@/data/badgesData";


export async function fetchCompletedTopics(userId : string) : Promise <string[]>{
    const { data, error } = await supabase
    .from("lesson_progress")
    .select("subtopic_id")
    .eq("user_id",userId)
    .eq("is_completed",true);

    if( error){
        console.error("Error fetching completed topics: ", error);
        return [];
    }
    return data.map ( item => item.subtopic_id);
}

export async function fetchUserEarnedBadges(userId: string): Promise <Badge[]> {
    const completedTopics = await fetchCompletedTopics(userId);
    return getEarnedBadges(completedTopics);
}

export async function fetchUserUncompletedBadges (userId: string): Promise<Badge[]> {
    const completedTopics = await fetchCompletedTopics(userId);
    return getUncompletedBadges(completedTopics);
}

export async function fetchUserBadgeProgress(userId : string) {
    const completedTopics = await fetchCompletedTopics(userId);
    return getBadgeProgress(completedTopics);
}