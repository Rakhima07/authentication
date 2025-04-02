import React, { useState } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore.ts';
import {axiosApi} from '../axiosApi.ts';
import { useNavigate } from 'react-router';
export const CreatePost = () => {
const navigate = useNavigate();
const [content, setContent] = useState('');
const { user } = useAuthStore();
const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
if (!user) return;
await axiosApi.post('/posts.json', {
content,
userId: user.id,
email: user.email,
createdAt: new Date().toISOString(),
});
setContent('');
navigate('/');
};
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
