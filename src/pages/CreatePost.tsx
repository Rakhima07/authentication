import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore';
import { createPost } from '../Api/posts';
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [content, setContent] = useState('');
  const { user, profile } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
 
    if (profile && profile.role !== 'admin') {
      navigate('/');
    }
  }, [profile, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await createPost({
      content,
      userId: user.id,
      email: user.email || '',
      createdAt: new Date().toISOString(),
    });

    setContent('');
    navigate('/');
  };

  if (!profile || profile.role !== 'admin') {
    return (
      <Container maxWidth="md">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" color="error">
            You do not have permission to create posts.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="New Post"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Create Post
          </Button>
        </form>
      </Box>
    </Container>
  );
};
