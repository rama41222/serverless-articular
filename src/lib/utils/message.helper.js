module.exports = {
  success: {
    login: 'Login Successful',
    register: 'Registration Successful',
    update: 'Update successful',
    general: 'Operation successful',
    topic: {
      created: 'Topic creation successful',
    },
    article: {
      created: 'Article creation successful'
    }
  },
  error: {
    login: 'Login Error',
    user: {
      not_found: 'User not found',
      duplicate: 'User already exist',
      invalid: 'Invalid user',
      registration: 'User registration failed',
      unauthorized: 'Unauthorized Request',
      update: 'User failed to update'
    },
    topic: {
      not_found: 'Topic not found',
      duplicate: 'Topic already exist',
      invalid: 'Invalid Topic',
      creation: 'Topic creation failed',
      unauthorized: 'Unauthorized Request',
    },
    article: {
      not_found: 'Article not found',
      duplicate: 'Article already exist',
      invalid: 'Invalid Article',
      creation: 'Article creation failed',
      unauthorized: 'Unauthorized Request',
      update: 'Article failed to update',
      invalid_bst: 'BST cant be generated'
  
    }
  }
};
