export default {
    namespaced: true,
    state(){
        return {
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
        }
    },
    actions: {
        registerCoach(context, playload) {
            const newCoach = {
                id: 'c3',
                firstName: playload.first,
                lastName: playload.last,
                description: playload.desc,
                hourlyRate: playload.rate,
                areas: playload.areas
            };
            context.commit('registerCoach', newCoach);
        }
    },
    getters: {
        getCoaches(state){
            return state.coaches;
        },
        hasCoaches(state){
            return state.coaches && state.coaches.length > 0;
        }
    }
}