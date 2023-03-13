export const slugify = (string) => {
  return string
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove any non-word characters except for spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/^-+|-+$/g, "") // Remove any leading/trailing hyphens
    .replace(/\-\-+/g, "-"); // Replace multiple consecutive hyphens with a single hyphen
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date)) {
    return "This is a Invalid date";
  }
  const options = {
    timeZone: "GMT",
    weekday: undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("bs-BN", options);
  return formattedDate;
}

export function formatBlogPosts(posts, {
  filterOutDrafts = true,
  filterOutFuturePosts = true,
  sortByDate = true,
  limit = undefined,
} = {}) {

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter;
    // filterOutDrafts if true
    if (filterOutDrafts && draft) return acc;

    // filterOutFuturePosts if true
    if (filterOutFuturePosts && new Date(date) > new Date()) return acc;

    // add post to acc
    acc.push(post)

    return acc;
  }, [])

  // sortByDate or randomize
  if (sortByDate) {
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  } else {
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  // limit if number is passed
  if (typeof limit === "number") {
    return filteredPosts.slice(0, limit);
  }
  return filteredPosts;

}