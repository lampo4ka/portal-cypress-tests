export const schema = {
    type: 'object',
    properties: {
        page: { type: 'integer' },
        total_pages: { type: 'integer' },
        total_results: { type: 'integer' },
        results: {
            type: 'array',
            items: {
                type: 'object',
                ptoperties: {
                    adult: { type: 'boolean' },
                    backdrop_path: { type: 'string' },
                    genre_ids: { type: 'array' },
                    id: { type: 'integer' },
                    original_language: { type: 'string' },
                    original_title: { type: 'string' },
                    overview: { type: 'string' },
                    popularity: { type: 'number' },
                    poster_path: { type: 'string' },
                    release_date: { type: 'string' },
                    title: { type: 'string' },
                    video: { type: 'boolean' },
                    vote_average: { type: 'number' },
                    vote_count: { type: 'integer' },
                },
            },
        },
    },
    required: ['results', 'page', 'total_pages', 'total_results'],
};
