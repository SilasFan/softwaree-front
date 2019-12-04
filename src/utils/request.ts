const REMOTE = 'http://localhost:8080/backend';

export default function(path: string, method: string, data: string, token: string) {
    return fetch(REMOTE + path, {
        method,
        body: data,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
        },
    }).then((response: { ok: any; json: () => void }) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('--Network Error--');
        }
    });
}
