import axios from 'axios';

const useTracker = () => {
    const track = (eventType, meta = {}) => {
        axios.post('/api/tracker', {
            event_type: eventType,
            page_url: window.location.pathname + window.location.search,
            referrer: document.referrer || null,
            meta,
        }).catch(() => {});
    };

    return { track };
};

export default useTracker;
