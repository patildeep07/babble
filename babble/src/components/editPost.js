export const EditPost = ({ item }) => {
  console.log({ item });

  const {
    username,
    _id,
    content,
    likes,
    createdAt,
    postImage,
    showEditSection = true,
  } = item;

  //   UI HERE
  return (
    <div>
      <h2>Edit post</h2>
    </div>
  );
};
