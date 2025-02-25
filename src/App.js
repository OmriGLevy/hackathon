import { Container, Box, TextField, Typography, Button } from '@mui/material';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import axios from 'axios';
function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [validationResult, setValidationResult] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/validate`, {
        params: {
          wallet_address: searchQuery
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Search results:', response.data);

      setValidationResult({
        isValid: response.data.valid === 'true',
        message: response.data.valid === 'true' ? 'Wallet address is valid' : 'Wallet address is invalid'
      });

    } catch (error) {
      console.error('Error fetching search results:', error);
      setValidationResult({
        isValid: false,
        message: 'Error validating wallet address'
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            justifyItems: 'center',
            textAlign: 'center'
          }}
        >
          <Box sx={{ position: 'relative' }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '48px', md: '72px' },
                fontWeight: 'bold',
                letterSpacing: '1px',
              }}
            >
              <span
                style={{
                  backgroundImage: 'linear-gradient(to right, #60A5FA, #A855F7)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                SQ
              </span>
              <span
                style={{
                  backgroundImage: 'linear-gradient(to right, #A855F7, #EC4899)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  position: 'relative',
                }}
              >
                rypto
              </span>
              <CurrencyBitcoinIcon
                sx={{
                  position: 'absolute',
                  top: '-24px',
                  right: '-24px',
                  color: '#FCD34D',
                  fontSize: { xs: '32px', md: '48px' },
                  transform: 'rotate(267deg)'
                }}
              />
            </Typography>
            <Typography
              variant="h2"
              sx={{
                mt: 2,
                color: 'text.secondary',
                fontSize: { xs: '18px', md: '24px' },
                fontWeight: 'normal'
              }}
            >
              The Future of Data & Crypto
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              width: { xs: '100%', sm: '584px' },
            }}
          >
            <TextField
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search cryptocurrencies..."
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '24px',
                  '& fieldset': {
                    borderColor: '#dfe1e5',
                  },
                  '&:hover fieldset': {
                    borderColor: '#dfe1e5',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                borderRadius: '24px',
                minWidth: '56px',
                backgroundColor: '#1976d2',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              <SearchIcon />
            </Button>
          </Box>

          {validationResult && (
            <Typography
              sx={{
                color: validationResult.isValid ? 'success.main' : 'error.main',
                fontWeight: 'medium',
                mt: 2
              }}
            >
              {validationResult.message}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default App;
