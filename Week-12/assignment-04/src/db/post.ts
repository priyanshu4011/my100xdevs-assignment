import { client } from '../index';

export async function createPost(userId: number, content: string) {
  const query = `INSERT INTO posts(user_id , content) VALUES($1 , $2) RETURNING *`
  const values = [userId, content]

  const post = await client.query(query, values)

  return post.rows[0]
}

export async function likePost(userId: number, postId: number) {
  const query = `INSERT INTO likes(user_id , post_id) VALUES($1 ,$2) RETURNING *`
  const values = [userId, postId]

  const like = await client.query(query, values)

  return like.rows[0]
}

// feed always consists of posts ,who made it ,and number of likes 
export async function getFeed() {
  const query = `
SELECT 
posts.id, posts.content, posts.created_at ,
users.username, users.name ,
COUNT(likes.id) AS like_count
FROM posts 
JOIN users ON posts.user_id = users.id 
LEFT JOIN likes ON likes.post_id = posts.id
GROUP BY posts.id, users.username, users.name
ORDER BY posts.created_at DESC
`

  const result = await client.query(query)
  return result.rows
}
