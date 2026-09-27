const BASE = "https://api.api-store.workers.dev/api/fitlog";

const fallbackWorkouts = [
    { id: "1", name: "BARBELL BENCH PRESS", muscles: ["CHEST", "ARMS"], equipment: "Barbell, Bench", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=600", duration: 8, calories: 120, rating: 4.8 },
    { id: "2", name: "PULL-UP", muscles: ["BACK", "ARMS"], equipment: "Pull-up Bar", image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?w=600", duration: 6, calories: 90, rating: 4.7 },
    { id: "3", name: "BACK SQUAT", muscles: ["LEGS", "CORE"], equipment: "Barbell, Rack", image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600", duration: 10, calories: 150, rating: 4.9 },
    { id: "4", name: "OVERHEAD PRESS", muscles: ["SHOULDERS", "ARMS"], equipment: "Barbell", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600", duration: 7, calories: 100, rating: 4.6 },
    { id: "5", name: "DUMBBELL BICEP CURL", muscles: ["ARMS"], equipment: "Dumbbells", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600", duration: 5, calories: 70, rating: 4.5 },
    { id: "6", name: "HOLLOW-BODY PLANK", muscles: ["CORE"], equipment: "Mat", image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=600", duration: 4, calories: 50, rating: 4.4 },
    { id: "7", name: "CONVENTIONAL DEADLIFT", muscles: ["BACK", "LEGS"], equipment: "Barbell", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600", duration: 9, calories: 160, rating: 4.9 },
    { id: "8", name: "PUSH-UP", muscles: ["CHEST", "ARMS", "CORE"], equipment: "Bodyweight", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600", duration: 5, calories: 80, rating: 4.7 },
    { id: "9", name: "WALKING LUNGE", muscles: ["LEGS"], equipment: "Dumbbells", image: "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?w=600", duration: 8, calories: 110, rating: 4.6 },
    { id: "10", name: "RUSSIAN TWIST", muscles: ["CORE", "SHOULDERS"], equipment: "Mat", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600", duration: 6, calories: 85, rating: 4.5 },
    { id: "11", name: "LATERAL RAISE", muscles: ["SHOULDERS"], equipment: "Dumbbells", image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?w=600", duration: 5, calories: 75, rating: 4.4 },
    { id: "12", name: "BENT-OVER ROW", muscles: ["BACK", "ARMS"], equipment: "Barbell", image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=600", duration: 7, calories: 105, rating: 4.8 },
];

export const getWorkouts = async () => {
    try {
        const res = await fetch(BASE, { cache: "no-store" });
        const json = await res.json();
        const apiData = Array.isArray(json) ? json : json.data || json.workouts || json.result || [];
        if (apiData.length > 0) {
            console.log("API Data:", apiData[0]);
            return apiData;
        }
        return fallbackWorkouts;
    } catch (e) {
        console.error("API Failed, using fallback", e);
        return fallbackWorkouts;
    }
};

export const getWorkout = async (id: string) => {
    try {
        const res = await fetch(`${BASE}/${id}`, { cache: "no-store" });
        const json = await res.json();
        return json.data || json.workout || json.result || json;
    } catch {
        return fallbackWorkouts.find((w) => w.id === id);
    }
};