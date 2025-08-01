const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for interns
const mockInterns = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@shecanfoundation.org",
    referralCode: "sarah2025",
    donationsRaised: 15420,
    joinDate: "2024-01-15",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 2,
    name: "Maria Garcia",
    email: "maria@shecanfoundation.org", 
    referralCode: "maria2025",
    donationsRaised: 18750,
    joinDate: "2024-01-20",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 3,
    name: "Emily Chen",
    email: "emily@shecanfoundation.org",
    referralCode: "emily2025", 
    donationsRaised: 12300,
    joinDate: "2024-02-01",
    avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 4,
    name: "Aisha Patel",
    email: "aisha@shecanfoundation.org",
    referralCode: "aisha2025",
    donationsRaised: 9850,
    joinDate: "2024-02-10",
    avatar: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  },
  {
    id: 5,
    name: "Jessica Williams",
    email: "jessica@shecanfoundation.org",
    referralCode: "jessica2025",
    donationsRaised: 21600,
    joinDate: "2024-01-05",
    avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
  }
];

// Routes
app.get('/api/intern/:id', (req, res) => {
  const internId = parseInt(req.params.id);
  const intern = mockInterns.find(i => i.id === internId);
  
  if (!intern) {
    return res.status(404).json({ error: 'Intern not found' });
  }
  
  res.json(intern);
});

app.get('/api/leaderboard', (req, res) => {
  const sortedInterns = [...mockInterns]
    .sort((a, b) => b.donationsRaised - a.donationsRaised)
    .map((intern, index) => ({
      ...intern,
      rank: index + 1
    }));
  
  res.json(sortedInterns);
});

app.get('/api/intern/:id/stats', (req, res) => {
  const internId = parseInt(req.params.id);
  const intern = mockInterns.find(i => i.id === internId);
  
  if (!intern) {
    return res.status(404).json({ error: 'Intern not found' });
  }
  
  // Calculate some additional stats
  const totalInterns = mockInterns.length;
  const currentRank = [...mockInterns]
    .sort((a, b) => b.donationsRaised - a.donationsRaised)
    .findIndex(i => i.id === internId) + 1;
  
  const monthlyGrowth = Math.floor(Math.random() * 30) + 10; // Mock growth
  
  res.json({
    donationsRaised: intern.donationsRaised,
    currentRank,
    totalInterns,
    monthlyGrowth,
    referralCode: intern.referralCode
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});