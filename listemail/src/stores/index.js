import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
    state: {
        emails: [],
        tenant: '',
        htmlMessage: ''
    },
    mutations: {
        setEmails(state, emails) {
            state.emails = emails;
        },
        setTenant(state, tenant) {
            state.tenant = tenant;
        },
        setHtmlMessage(state, htmlMessage) {
            state.htmlMessage = htmlMessage;
        }
    },
    actions: {
        async fetchEmails({ commit, state }) {
            try {
                const response = await axios.get(`http://localhost:5173/emails?tenant=${state.tenant}`);
                commit('setEmails', response.data);
            } catch (error) {
                console.error('Error fetching emails:', error);
            }
        },
        async sendEmail(_, emailData) {
            try {
                const response = await axios.post('http://localhost:5173/emails/submit', emailData);
                return response.data;
            } catch (error) {
                console.error('Error sending email:', error);
                throw error;
            }
        },
        setTenant({ commit, dispatch }, tenant) {
            commit('setTenant', tenant);
            if (tenant.length > 2) {
                dispatch('fetchEmails');
            } else {
                commit('setEmails', []);
            }
        },
        setHtmlMessage({ commit }, htmlMessage) {
            commit('setHtmlMessage', htmlMessage);
        }
    },
    modules: {}
});

export default store;
