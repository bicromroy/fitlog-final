const BASE = "https://api.api-store.workers.dev/api/fitlog";

function normalize(ex: any) {
    const dur = Number(ex.duration || 15);
    return {
        id: ex.id || ex._id,
        name: (ex.name || "Workout").toUpperCase(),
        equipment: ex.equipment || "Bodyweight",
        duration: dur,
        calories: Number(ex.calories || ex.calorie || ex.kcal || ex.calories_burned || dur * 12),
        rating: Number(ex.rating || 4.5),
        image: ex.image || "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400",
        muscle: ex.muscle || "FULL BODY",
        description: ex.description || "Effective workout",
    };
}

export async function getWorkouts() {
    const res = await fetch(BASE, { cache: "no-store" });
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data || [];
    return list.map(normalize);
}

export async function getWorkoutById(id: string) {
    const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
    const json = await res.json();
    return normalize(json.data || json);
}