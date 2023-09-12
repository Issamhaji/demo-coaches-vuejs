export default {
    namespaced: true,
    state(){
        return {
            lastFetch: null,
            coaches: [
                {
                    id: 'c1',
                    firstName: 'Maximilian',
                    lastName: 'Schwarzmüller',
                    areas: ['frontend', 'backend', 'career'],
                    description:
                        "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
                    hourlyRate: 30
                },
                {
                    id: 'c2',
                    firstName: 'Julie',
                    lastName: 'Jones',
                    areas: ['frontend', 'career'],
                    description:
                        'I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.',
                    hourlyRate: 30
                }
            ]
        };
    },
    mutations: {
        registerCoach(state,playload){
            state.coaches.push(playload);
        },
        setCoaches(state, payload){
            state.coaches = payload;

        }
    },
    actions: {
        async registerCoach(context, playload) {
            const coachId = context.rootGetters.userId;
            const newCoach = {
                firstName: playload.first,
                lastName: playload.last,
                description: playload.desc,
                hourlyRate: playload.rate,
                areas: playload.areas
            };
            const response = await fetch(`https://vue-http-coach-demo-7e413-default-rtdb.firebaseio.com/coaches/${coachId}.json`, {
                method: 'PUT',
                body: JSON.stringify(newCoach)
            });

            const responseData = await response.json();
            if(!responseData){
                //error handler
            }
            context.commit('registerCoach', {
                ...newCoach,
                id: coachId,
            });
        },
        async setCoaches(context, payload) {
            if (!payload.forceRefresh && !context.getters.shouldUpdate) {
                return;
            }
            const response = await  fetch(
                `https://vue-http-coach-demo-7e413-default-rtdb.firebaseio.com/coaches.json`
            );
            const responseData = await response.json();
            if (!response.ok) {
                const error = new Error(responseData.message || 'Failed to fetch!');
                throw error;
            }
            const coaches = [];
            for(const key in responseData){
                const coache ={
                    id: key,
                    firstName: responseData[key].firstName,
                    lastName: responseData[key].lastName,
                    description: responseData[key].description,
                    hourlyRate: responseData[key].hourlyRate,
                    areas: responseData[key].areas
                };
                coaches.push(coache);
            }
            context.commit('setCoaches', coaches);
        }
    },
    getters: {
        getCoaches(state){
            return state.coaches;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length > 0;
        },
        isCoach(getters,rootGetters) {
            const coaches = getters.coaches;
            const userId = rootGetters.userId;
            return coaches.some(coach => coach.id === userId);
        },
        shouldUpdate(state) {
            const lastFetch = state.lastFetch;
            if (!lastFetch) {
                return true;
            }
            const currentTimeStamp = new Date().getTime();
            return (currentTimeStamp - lastFetch) / 1000 > 60;
        }
    }
}