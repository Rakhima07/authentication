import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { useAuthStore } from '../store/useAuthStore.ts';
import { axiosApi } from '../axiosApi.ts';

interface Profile {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export const Profile = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    birthDate: ''
  });

  useEffect(() => {
    if (user) {
    
      axiosApi.get(`/profiles/${user.id}.json`).then((response) => {
        if (response.data) {
          setProfile(response.data);
        }
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
    
      await axiosApi.put(`/profiles/${user.id}.json`, profile);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" align="center">Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="First Name"
            name="firstName"
            value={profile.firstName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Birth Date"
            name="birthDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={profile.birthDate}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Save Profile
          </Button>
        </form>
      </Box>
    </Container>
  );
};