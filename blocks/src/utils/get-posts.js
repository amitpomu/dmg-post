// get search posts
export async function getSearchPosts(context, postsPerPage = 10, paged = 1) {
	if (context) {
		try {
			const response = await wp.apiFetch({
				path: `/wp/v2/search?search=${context}&per_page=${postsPerPage}&page=${paged}`,
				parse: false
			});
			const data = await response.json();
			const totalPages = parseInt(response.headers.get('X-WP-TotalPages'));
			return {data: data, pages: totalPages};
		} catch (error) {
			return error;
		}
	}
	return null;
}
