const dummy = (blogs) => {
  return blogs ? 1 : 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => {
    total += blog.likes
  })
  return total
}

const favoriteBlog = (blogs) => {
  let mostLikes = 0
  let mostLikesIndex = null
  if(!blogs.length) {
    return {}
  }
  for (let index = 0; index < blogs.length; index++) {
    if(blogs[index].likes >= mostLikes) {
      mostLikes = blogs[index].likes
      mostLikesIndex = index
    }
  }
  console.log('mlindex: ', mostLikesIndex)
  return { title: blogs[mostLikesIndex].title, author: blogs[mostLikesIndex].author, likes: blogs[mostLikesIndex].likes }
}

const mostBlogs = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    if(Object.keys(authors).includes(blog.author)){
      authors[blog.author] += 1
    } else {
      authors[blog.author] = 1
    }
  })
  let highest = ''
  let highestBlogs = 0
  for (const author in authors) {
    if (authors[author] > highestBlogs){
      highest = author
      highestBlogs = authors[author]
    }
  }
  return {
    author: highest,
    blogs: highestBlogs
  }
}

const mostLikes = (blogs) => {
  const authors = {}
  blogs.forEach(blog => {
    if(Object.keys(authors).includes(blog.author)){
      authors[blog.author] += blog.likes
    } else {
      authors[blog.author] = blog.likes
    }
  })
  let highest = ''
  let highestLikes = 0
  for (const author in authors) {
    if (authors[author] > highestLikes){
      highest = author
      highestLikes = authors[author]
    }
  }
  return {
    author: highest,
    likes: highestLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}