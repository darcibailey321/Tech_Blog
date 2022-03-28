const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
    const postId = document.querySelector('#data-id').value.trim();
  
    if (content && postId) {
      const response = await fetch(`/api/post/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ content, postId }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/api/post/${postId}`);
      } else {
        alert(response.statusText);
      }
    }
  };

  
  document
    .querySelector('#add-comment')
    .addEventListener('submit', commentFormHandler);
  

  