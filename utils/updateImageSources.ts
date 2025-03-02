export function joinPaths(...parts) {
  // Remove empty parts and trim slashes
  const cleanParts = parts
      .map(part => part.trim().replace(/^\/+|\/+$/g, ''))
      .filter(Boolean);

  // If the path starts with 'posts/', prepend 'content'
  if (cleanParts[0] === 'posts') {
    cleanParts.unshift('content');
  }

  let part1 = parts[0];
  let part2 = parts[1];

  if (part2.startsWith('../')) {
    part1 = part1.split('/');
    part1.pop();
    parts[0] = part1.join('/');
  }

  const x = parts.join("/").split("/");

  let finalPath = [];

  for (let i = 0; i < x.length; i++) {
    const element = x[i];
    if (element === '') continue;
    if (element === '..') {
        finalPath.pop();
      }
    else if (element === '.') {
      continue;
      // finalPath.pop();
    } else {
      finalPath.push(element);
    }
  }

  return "/" + finalPath.join('/');
}

export function updateImageSources(arr, postPath) {
  console.log("postPath", postPath);
  if (!Array.isArray(arr)) {
      return arr;
  }

  // Process current array
  if (arr[0] === 'img' && typeof arr[1] === 'object') {
      // Update src attribute if it exists and is relative
      if (arr[1].src && !arr[1].src.startsWith('http') && !arr[1].src.startsWith('//')) {
        arr[1].src = joinPaths(postPath, arr[1].src);
      }
  }

  // Recursively process remaining elements
  for (let i = 2; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
          arr[i] = updateImageSources(arr[i], postPath);
      }
  }

  return arr;
}

export function updateImagePost(post) {
  if (post.image?.startsWith('http') || post.image?.startsWith('//')) {
    return post;
  }

  if (post.image) {
    post.image = joinPaths(post.path, post.image);
  }

  if (post.content) {
    post.content = updateImageSources(post.content, post.path);
  }

  return post;
}

export function updateImagePosts(posts) {
  return posts.map(updateImagePost);
}
